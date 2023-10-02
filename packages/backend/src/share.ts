import { Handler, APIGatewayEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import { s3PutObject, s3getPresignedUrl } from './aws/s3';

const EXPIRY = 24 * 60 * 60;
const BUCKET_NAME = process.env.BUCKET_NAME!;

export const handler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async () => {
	// Create key (file name)
	const id = randomUUID();
	const key = `shares/${id[0]}/${id[1]}/${id}`;

	// Create a download URL
	const downloadUrl = await s3getPresignedUrl({
		bucketName: BUCKET_NAME,
		bucketKey: key,
		expiry: EXPIRY,
	});

	// Create an upload URL
	const uploadUrl = await s3PutObject({
		bucketName: BUCKET_NAME,
		bucketKey: key,
		expiry: EXPIRY,
	});

	return {
		statusCode: 201,
		body: JSON.stringify({
			uploadUrl,
			downloadUrl
		}),
		headers: {
			'content-type': 'application/json',
		},
	};
};

// UPLOAD
// MAKE POST request to <uploadUrl> with a <file name>

// DOWNLOAD
// MAKE GET request to <downloadUrl>