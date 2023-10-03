import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import { s3CreateSignedPutObjectUrl } from './aws/s3';
import { BASE_URL, BUCKET_NAME, DEFAULT_EXPIRY } from './types';
import { createKey } from './utils';

const MIME_TYPE = 'application/octect-stream';

export const handler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async (event) => {
	try {
		// Create key (file name)
		const id = randomUUID();
		const key = createKey(id);

		// Create a download URL
		const downloadUrl = `${BASE_URL}/share/${id}`;

		const filename = event.queryStringParameters?.filename;
		const contentDisposition =
			filename && `content-disposition: attachment; filename="${filename}"`;

		const signableHeaders = new Set([`content-type: ${MIME_TYPE}`]);
		if (contentDisposition) signableHeaders.add(contentDisposition);

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
				Upload with: curl -X PUT -T ${filename || '<FILENAME>'} ${contentDisposition ? `-H '${contentDisposition}'` : ''} ${uploadUrl}

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

// UPLOAD
// MAKE POST request to <uploadUrl> with a <file name>

// DOWNLOAD
// MAKE GET request to <downloadUrl>
