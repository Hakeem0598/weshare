import { AxiosHeaderValue, AxiosHeaders } from 'axios';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

type CommonResponseHeadersList =
	| 'Server'
	| 'Content-Type'
	| 'Content-Length'
	| 'Cache-Control'
	| 'Content-Encoding';

type HeaderValue = Exclude<AxiosHeaderValue, AxiosHeaders | null | string[]>;

type HeaderKey = LiteralUnion<CommonResponseHeadersList>;

export type ResponseHeader = Partial<Record<HeaderKey, HeaderValue>>;
