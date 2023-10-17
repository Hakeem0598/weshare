import { Logger, injectLambdaContext } from '@aws-lambda-powertools/logger';
import {
	MetricUnits,
	Metrics,
	logMetrics,
} from '@aws-lambda-powertools/metrics';
import { Tracer, captureLambdaHandler } from '@aws-lambda-powertools/tracer';
import middy from '@middy/core';
import httpContentNegotiation, { Event } from '@middy/http-content-negotiation';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import sanitizeFilename from 'sanitize-filename';
import { s3CreateSignedPutObjectUrl } from './aws/s3';
import { BASE_URL, BUCKET_NAME, DEFAULT_EXPIRY } from './config';
import { createKey } from './utils';

const tracer = new Tracer();
const logger = new Logger();
const metrics = new Metrics();

const MIME_TYPE = 'application/octect-stream';

const createShareHandler: Handler<
	APIGatewayEvent & Event,
	APIGatewayProxyResultV2
> = async (event) => {
	try {
		// Create key (file name)
		const id = randomUUID();
		const key = createKey(id);

		const filename = event.queryStringParameters?.filename;
		const sanitizedFilename = filename && sanitizeFilename(filename);
		const contentDisposition =
			sanitizedFilename && `attachment; filename="${sanitizedFilename}"`;
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

		let body = `
			Upload with: curl -X PUT -T ${filename || '<FILENAME>'} ${
			contentDispositionHeader ? `-H '${contentDispositionHeader}'` : ''
		} ${uploadUrl}

			Download with: curl ${downloadUrl}
		`;

		let headers = {
			'content-type': 'text/plain',
		};

		if (event.preferredMediaType === 'application/json') {
			body = JSON.stringify({
				filename,
				downloadUrl,
				uploadUrl,
				headers: {
					'content-disposition': contentDisposition,
				},
			});

			headers = {
				'content-type': 'application/json',
			};
		}

		return {
			statusCode: 201,
			headers,
			body,
		};
	} catch (err) {
		const error = err as Error;

		logger.error(error.message, error);

		return {
			statusCode: 500,
			body: JSON.stringify({
				message: error.message,
			}),
		};
	}
};

export const handler = middy(createShareHandler)
	.use(injectLambdaContext(logger, { logEvent: true }))
	.use(logMetrics(metrics))
	.use(captureLambdaHandler(tracer))
	.use(httpHeaderNormalizer())
	.use(
		httpContentNegotiation({
			parseCharsets: false,
			parseLanguages: false,
			parseEncodings: false,
			failOnMismatch: false,
			availableMediaTypes: ['text/plain', 'application/json'],
		})
	);
