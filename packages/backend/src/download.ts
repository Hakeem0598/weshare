import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { s3getPresignedUrl } from './aws/s3';
import { BUCKET_NAME, DEFAULT_EXPIRY } from './types';

export const handler: Handler<
	APIGatewayEvent,
	APIGatewayProxyResultV2
> = async (event) => {
	const id = event.pathParameters!.id!;

	const downloadUrl = await s3getPresignedUrl({
		bucketName: BUCKET_NAME,
		bucketKey: id,
		expiry: DEFAULT_EXPIRY,
	});

	return {
		statusCode: 301,
		body: JSON.stringify({
			downloadUrl,
		}),
	};
};
