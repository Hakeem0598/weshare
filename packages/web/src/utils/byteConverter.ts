export const byteConverter = (size: number): string => {
	const length = size.toString().length;

	if (length < 4) {
		return `${size} bytes`;
	} else if (length < 7) {
		return `${(size / 1_000).toFixed(1)} KB`;
	} else if (length < 10) {
		return `${(size / 1_000_000).toFixed(1)} MB`;
	}

	return `${(size / 1_000_000_000).toFixed(1)} GB`;
};
