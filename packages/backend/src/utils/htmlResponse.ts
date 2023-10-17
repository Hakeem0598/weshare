import { APIGatewayProxyResult } from 'aws-lambda';
import { ResponseHeader } from '../types/header';

export function htmlResponse(
	statusCode: number,
	text: string,
	headers: ResponseHeader = {}
): APIGatewayProxyResult {
	return {
		statusCode,
		headers: {
			...headers,
			'Content-Type': 'text/html',
		},
		body: `<html>${text}</html>`,
	};
}
