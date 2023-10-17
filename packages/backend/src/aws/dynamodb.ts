import {
	DynamoDBClient,
	GetItemCommand,
	GetItemCommandInput,
	PutItemCommand,
	PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { AWS_REGION } from '../config.js';

const client = new DynamoDBClient({ region: AWS_REGION });

export const dynamodbPutItem = async <T>(tableName: string, item: T) => {
	try {
		const params: PutItemCommandInput = {
			TableName: tableName,
			Item: marshall(item),
		};

		const command = new PutItemCommand(params);

		return await client.send(command);
	} catch (error) {
		throw new Error(
			`dynamodbPutItem error response: ${(error as Error).message}`
		);
	}
};

export const dynamodbGetItem = async <T>(
	tableName: string,
	key: Partial<T>
) => {
	try {
		const params: GetItemCommandInput = {
			TableName: tableName,
			Key: marshall(key),
		};

		const command = new GetItemCommand(params);

		return await client.send(command);
	} catch (error) {
		throw new Error(
			`dynamodbGetItem error response: ${(error as Error).message}`
		);
	}
};
