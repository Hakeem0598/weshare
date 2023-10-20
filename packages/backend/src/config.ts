const USER_POOL_DOMAIN = process.env.USER_POOL_DOMAIN!;

export const DEFAULT_EXPIRY = 24 * 60 * 60;

export const BASE_URL = process.env.BASE_URL!;

const paths = new URL(BASE_URL).host.split('.');
const domainPaths = paths.slice(-2);
domainPaths.unshift('');

export const DOMAIN = domainPaths.join('.');

export const CLIENT_URL = process.env.CLIENT_URL!;
export const REDIRECT_URI = `${CLIENT_URL}/auth/callback`;

export const CLIENT_ID = process.env.CLIENT_ID!;
export const CLIENT_SECRET = process.env.CLIENT_SECRET!;

export const AWS_REGION = process.env.AWS_REGION!;
export const BUCKET_NAME = process.env.BUCKET_NAME!;

export const COGNITO_OAUTH_BASE_URI = `https://${USER_POOL_DOMAIN}.auth.${AWS_REGION}.amazoncognito.com/oauth2`;
export const COGNITO_OAUTH_AUTHORIZE_URI = `${COGNITO_OAUTH_BASE_URI}/authorize`;
export const COGNITO_OAUTH_TOKEN_URI = `${COGNITO_OAUTH_BASE_URI}/token`;
export const COGNITO_OAUTH_USER_INFO_URI = `${COGNITO_OAUTH_BASE_URI}/userInfo`;
