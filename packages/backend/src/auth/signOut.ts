import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import { Metrics, logMetrics } from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import axios from 'axios';

import {
	CLIENT_ID,
	CLIENT_SECRET,
	COGNITO_OAUTH_REVOKE_URI,
	COOKIE_DOMAIN,
} from '../config.js';
import { jsonResponse } from '../utils/jsonResponse.js';

const tracer = new Tracer();
const logger = new Logger();
const metrics = new Metrics();

const signOutHandler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async (event) => {
	if (!event.body) {
		return jsonResponse(400, {
			message: 'The request body is missing or invalid.',
		});
	}

	const body = JSON.parse(event.body);

	const refreshToken = body.refresh_token;

	if (!refreshToken) {
		return jsonResponse(400, {
			message: 'The request body is missing refresh_token parameter',
		});
	}

	try {
		const formData = new URLSearchParams();

		formData.append('token', refreshToken);

		const token = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

		const res = await axios.post(COGNITO_OAUTH_REVOKE_URI, formData, {
			headers: {
				Accept: 'application/json',
				Authorization: `Basic ${token}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		if (res.status !== 204) {
			logger.error(res.data);
			return jsonResponse(res.status, res.data);
		}

		return {
			statusCode: 204,
			headers: {
				'Set-Cookie': `access_token=; Secure; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; Domain=${COOKIE_DOMAIN}`,
			},
		};
	} catch (err) {
		const error = err as Error;
		logger.error({ error, message: error.message });

		return jsonResponse(500, {
			message: `Oops. Something went wrong`,
		});
	}
};

export const handler = middy(signOutHandler)
	.use(injectLambdaContext(logger, { logEvent: true }))
	.use(logMetrics(metrics))
	.use(captureLambdaHandler(tracer))
	.use(httpHeaderNormalizer());
