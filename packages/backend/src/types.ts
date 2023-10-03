export enum AWSRegions {
	'eu-west-2' = 'eu-west-2',
}

export const DEFAULT_EXPIRY = 24 * 60 * 60;

export const BUCKET_NAME = process.env.BUCKET_NAME!;

const ENVIRONMENT = process.env.ENVIRONMENT!;

const URL = process.env.BASE_URL!;

export const BASE_URL = ENVIRONMENT === 'production' ? URL : `api-${ENVIRONMENT}.${URL}`;
