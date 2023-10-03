import { APIGatewayEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { s3GetSignedGetObjectUrl } from './aws/s3';
import { BUCKET_NAME, DEFAULT_EXPIRY } from './types';
import { createKey } from './utils';

export const handler: Handler<
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
