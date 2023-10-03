import {
	GetObjectCommand,
	GetObjectCommandInput,
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AWSRegions } from '../types';

const s3Client = new S3Client({ region: AWSRegions['eu-west-2'] });

export const s3CreateSignedPutObjectUrl = async ({
	bucketName,
	bucketKey,
	expiry = 3600,
}: {
	bucketName: string;
	bucketKey: string;
	expiry?: number;
}) => {
	const params: PutObjectCommandInput = {
		Bucket: bucketName,
		Key: bucketKey,
	};

	const command = new PutObjectCommand(params);

	try {
		const url = await getSignedUrl(s3Client, command, { expiresIn: expiry });
		return url;
	} catch (error) {
		throw new Error(`s3PutObject error: ${(error as Error).message}`);
	}
};

export const s3GetSignedGetObjectUrl = async ({
	bucketName,
	bucketKey,
	expiry = 3600,
}: {
	bucketName: string;
	bucketKey: string;
	expiry?: number;
}) => {
	try {
		const params: GetObjectCommandInput = {
			Bucket: bucketName,
			Key: bucketKey,
		};

		const command = new GetObjectCommand(params);

		const url = await getSignedUrl(s3Client, command, { expiresIn: expiry });

		return url;
	} catch (error) {
		throw new Error(`s3getPresignedUrl error: ${(error as Error).message}`);
	}
};
