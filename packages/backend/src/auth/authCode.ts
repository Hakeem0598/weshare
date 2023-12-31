import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import { Metrics, logMetrics } from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { cryptoRandomStringAsync } from 'crypto-random-string';
import {
	CLIENT_ID,
	COGNITO_OAUTH_AUTHORIZE_URI,
	COOKIE_DOMAIN,
	REDIRECT_URI
} from '../config.js';

const tracer = new Tracer();
const logger = new Logger();
const metrics = new Metrics();

const authCodeHandler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async () => {
	const state = await cryptoRandomStringAsync({ length: 32, type: 'url-safe' });

	const url = new URL(COGNITO_OAUTH_AUTHORIZE_URI);
	url.searchParams.append('response_type', 'code');
	url.searchParams.append('client_id', CLIENT_ID);
	url.searchParams.append('redirect_uri', REDIRECT_URI);
	url.searchParams.append('state', state);
	url.searchParams.append('scope', 'openid');

	return {
		statusCode: 302,
		headers: {
			Location: url.toString(),
			'Set-Cookie': `state=${state}; Domain=${COOKIE_DOMAIN}; Secure; HttpOnly; SameSite=Lax; Path=/`,
		},
	};
};

export const handler = middy(authCodeHandler)
	.use(injectLambdaContext(logger, { logEvent: true }))
	.use(logMetrics(metrics))
	.use(captureLambdaHandler(tracer));
