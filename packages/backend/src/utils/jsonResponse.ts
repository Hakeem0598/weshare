import { APIGatewayProxyResult } from 'aws-lambda';
import { ResponseHeader } from '../types/header.js';

export function jsonResponse(
	statusCode: number,
	object: object,
	headers: ResponseHeader = {}
): APIGatewayProxyResult {
	return {
		statusCode,
		headers: {
			...headers,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(object),
	};
}
