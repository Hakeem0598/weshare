import { RawAxiosRequestHeaders } from "axios";

export type CreateUploadLinkResponse = {
	filename: string;
	downloadUrl: string;
	uploadUrl: string;
	headers: RawAxiosRequestHeaders;
};

export type UploadProps = React.ComponentProps<'div'>;
