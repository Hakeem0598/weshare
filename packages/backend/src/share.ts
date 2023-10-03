import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import { s3CreateSignedPutObjectUrl } from './aws/s3';
import { BASE_URL, BUCKET_NAME, DEFAULT_EXPIRY } from './types';
import { createKey } from './utils';

export const handler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async () => {
	try {
		// Create key (file name)
		const id = randomUUID();
		const key = createKey(id);

		// Create a download URL
		const downloadUrl = `${BASE_URL}/share/${id}`;

		// Create an upload URL
		const uploadUrl = await s3CreateSignedPutObjectUrl({
			bucketName: BUCKET_NAME,
			bucketKey: key,
			expiry: DEFAULT_EXPIRY,
		});

		return {
			statusCode: 201,
			body: JSON.stringify({
				uploadUrl,
				downloadUrl,
			}),
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
