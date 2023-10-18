export const parseQueryString = (
	queryString: string
): Record<string, string> => {
	const params = queryString.split('&');

	const queryObj = params.reduce((acc, curr) => {
		const [key, value] = curr.split('=');
		return {
			...acc,
			[key]: value,
		};
	}, {});

    return queryObj;
};
