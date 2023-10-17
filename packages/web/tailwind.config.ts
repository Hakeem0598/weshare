import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Prompt', ...defaultTheme.fontFamily.sans],
			},
			colors(utils) {
				return {
					background: utils.colors.gray['50'],
					'light-green': utils.colors.green['400'],
					'dark-blue': utils.colors.sky['950'],
					'lightest-gray': utils.colors.gray['100'],
					'lighter-gray': utils.colors.gray['200'],
					'light-gray': utils.colors.gray['400'],
					'light-orange': '#fec28f',
				};
			},
			maxWidth: {
				'card': 'var(--max-card-width)',
			},
		},
	},
	plugins: [],
} satisfies Config;
