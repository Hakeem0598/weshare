import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import {
	MetricUnits,
	Metrics,
	logMetrics,
} from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import axios from 'axios';

import httpHeaderNormalizer from '@middy/http-header-normalizer';
import {
	CLIENT_ID,
	CLIENT_SECRET,
	COGNITO_OAUTH_TOKEN_URI,
	REDIRECT_URI,
} from '../config.js';
import { htmlResponse } from '../utils/htmlResponse.js';
import { jsonResponse } from '../utils/jsonResponse.js';
import { parseCookies } from '../utils/parseCookies.js';

const tracer = new Tracer();
const logger = new Logger();
const metrics = new Metrics();

const IDPCallbackHandler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async (event, context) => {
	const { code, state } = event.queryStringParameters!;

	if (!state) {
		return jsonResponse(400, {
			message: 'Missing state param',
		});
	}

	if (!code) {
		return jsonResponse(400, {
			message: 'Missing code param',
		});
	}

	// Get state cookie from header
	const cookieHeader = event.headers['cookie'];

	if (!cookieHeader) {
		return jsonResponse(400, {
			message: 'No cookie header found in request',
		});
	}

	const cookies = parseCookies(cookieHeader);

	const stateCookie = cookies['state'];

	if (!stateCookie) {
		return jsonResponse(400, {
			message: 'No state cookie found in request',
		});
	}

	// Check that state cookie matches the state query param
	if (stateCookie !== state) {
		return jsonResponse(400, {
			message: 'Invalid state',
		});
	}

	metrics.addMetric('SessionRetrievalCount', MetricUnits.Count, 1);

	try {
		const formData = new URLSearchParams();

		formData.append('grant_type', 'authorization_code');
		formData.append('client_id', CLIENT_ID);
		formData.append('client_secret', CLIENT_SECRET);
		formData.append('redirect_uri', REDIRECT_URI);
		formData.append('code', code);

		const res = await axios.post(COGNITO_OAUTH_TOKEN_URI, formData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		metrics.addMetric('TokenRequestCount', MetricUnits.Count, 1);

		const { access_token, id_token, refresh_token, token_type } = res.data;

		const payload = {
			id_token,
			access_token,
			refresh_token,
			token_type,
		};

		return jsonResponse(200, payload);
	} catch (err) {
		const error = err as Error;
		logger.error({ error, message: error.message });

		return htmlResponse(
			500,
			`Oops. Something went wrong with request ID: ${context.awsRequestId}`
		);
	}
};

export const handler = middy(IDPCallbackHandler)
	.use(injectLambdaContext(logger, { logEvent: true }))
	.use(logMetrics(metrics))
	.use(captureLambdaHandler(tracer))
	.use(httpHeaderNormalizer());
