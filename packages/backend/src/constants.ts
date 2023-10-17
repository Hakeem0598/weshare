export enum OAuthErrorCodes {
	// OAuth 2.0 Response error codes (https://www.rfc-editor.org/rfc/rfc6749#section-5.2)
	INVALID_REQUEST = 'invalid_request',
	INVALID_CLIENT = 'invalid_client',
	INVALID_GRANT = 'invalid_grant',
	UNAUTHORIZED_CLIENT = 'unauthorized_client',
	UNSUPPORTED_GRANT_TYPE = 'unsupported_grant_type',
	INVALID_SCOPE = 'invalid_scope',
}
