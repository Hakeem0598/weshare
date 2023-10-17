export const parseCookies = (cookieHeader: string): Record<string, string> => {
	const cookies = cookieHeader.split('; ');

	const cookiesObj = cookies.reduce((acc, curr) => {
		const [cookieName, cookieValue] = curr.split('=');

		return {
			...acc,
			[cookieName]: cookieValue,
		};
	}, {});

	return cookiesObj;
};