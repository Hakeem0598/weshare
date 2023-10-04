import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import {
	MetricUnits,
	Metrics,
	logMetrics,
} from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { s3GetSignedGetObjectUrl } from './aws/s3';
import { BUCKET_NAME, DEFAULT_EXPIRY } from './types';
import middy from '@middy/core';
import { createKey } from './utils';

const tracer = new Tracer();
const logger = new Logger();
const metrics = new Metrics();

export const downloadHandler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async (event) => {
	try {
		const id = event.pathParameters!.id!;
		const key = createKey(id);

		const downloadUrl = await s3GetSignedGetObjectUrl({
			bucketName: BUCKET_NAME,
			bucketKey: key,
			expiry: DEFAULT_EXPIRY,
		});

		logger.info(`Downloading`, {
			id,
			key,
		});

		metrics.addMetric('downloadShare', MetricUnits.Count, 1);

		return {
			statusCode: 301,
			headers: {
				Location: downloadUrl,
			},
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: (error as Error).message,
			}),
		};
	}
};

export const handler = middy(downloadHandler)
	.use(injectLambdaContext(logger, { logEvent: true }))
	.use(logMetrics(metrics))
	.use(captureLambdaHandler(tracer));
