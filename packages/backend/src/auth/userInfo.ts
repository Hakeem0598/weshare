import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import { Metrics, logMetrics } from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import axios from 'axios';

import { COGNITO_OAUTH_USER_INFO_URI } from '../config.js';
import { jsonResponse } from '../utils/jsonResponse.js';
import { parseCookies } from '../utils/parseCookies.js';

const tracer = new Tracer();
const logger = new Logger();
const metrics = new Metrics();

const userInfoHandler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async (event) => {
	const cookieHeader = event.headers['cookie'];

	if (!cookieHeader) {
		return jsonResponse(400, {
			message: 'No cookie header sent in request',
		});
	}

	const cookies = parseCookies(cookieHeader);

	const access_token = cookies['access_token'];

	if (!access_token) {
		return jsonResponse(400, {
			message: 'No access token cookie sent in request',
		});
	}

	try {
		const res = await axios(COGNITO_OAUTH_USER_INFO_URI, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return jsonResponse(200, res.data);
	} catch (err) {
		const error = err as Error;
		logger.error({ error, message: error.message });
		return jsonResponse(401, { message: 'Unauthorized' });
	}
};

export const handler = middy(userInfoHandler)
	.use(injectLambdaContext(logger, { logEvent: true }))
	.use(logMetrics(metrics))
	.use(captureLambdaHandler(tracer))
	.use(httpHeaderNormalizer());
