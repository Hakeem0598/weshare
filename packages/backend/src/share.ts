import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import {
	MetricUnits,
	Metrics,
	logMetrics,
} from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import { s3CreateSignedPutObjectUrl } from './aws/s3';
import { BASE_URL, BUCKET_NAME, DEFAULT_EXPIRY } from './types';
import { createKey } from './utils';

const tracer = new Tracer();
const logger = new Logger();
const metrics = new Metrics();

const MIME_TYPE = 'application/octect-stream';

const createShareHandler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async (event) => {
	try {
		// Create key (file name)
		const id = randomUUID();
		const key = createKey(id);

		const filename = event.queryStringParameters?.filename;
		const contentDisposition = filename && `attachment; filename="${filename}"`;
		const contentDispositionHeader =
			contentDisposition && `content-disposition: ${contentDisposition}`;

		const signableHeaders = new Set([`content-type: ${MIME_TYPE}`]);
		if (contentDisposition) signableHeaders.add(contentDispositionHeader!);

		logger.info(`Creating share`, {
			id,
			key,
			filename,
			contentDispositionHeader,
		});

		metrics.addMetric('createShare', MetricUnits.Count, 1);

		// Create a download URL
		const downloadUrl = `${BASE_URL}/share/${id}`;

		// Create an upload URL
		const uploadUrl = await s3CreateSignedPutObjectUrl({
			bucketName: BUCKET_NAME,
			bucketKey: key,
			expiry: DEFAULT_EXPIRY,
			inputOptions: {
				ContentDisposition: contentDisposition,
			},
			presignOptions: {
				signableHeaders,
			},
		});

		return {
			statusCode: 201,
			body: `
				Upload with: curl -X PUT -T ${filename || '<FILENAME>'} ${
				contentDispositionHeader ? `-H '${contentDispositionHeader}'` : ''
			} ${uploadUrl}

				Download with: curl ${downloadUrl}
			`,
			headers: {
				'content-type': 'application/json',
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

export const handler = middy(createShareHandler)
	.use(injectLambdaContext(logger, { logEvent: true }))
	.use(logMetrics(metrics))
	.use(captureLambdaHandler(tracer));
