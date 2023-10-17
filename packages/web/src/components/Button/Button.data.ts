import { cva, cx } from 'class-variance-authority';

export const button = cva(
	cx(
		'inline-flex items-center justify-center rounded-2xl h-[--button-height] font-semibold relative',
		'disabled:select-none'
	),
	{
		variants: {
			variant: {
				primary: ['bg-dark-blue text-white'],
				secondary: ['bg-transparent text-dark-blue border-2'],
				tertiary: ['bg-light-green text-white'],
				pink: ['bg-pink-500', 'text-white'],
				gray: ['bg-lightest-gray', 'text-black'],
				white: ['bg-white', 'text-dark-blue'],
			},
			width: {
				full: ['w-full'],
			},
			size: {
				xs: ['text-lg min-w-[--button-height]'],
				sm: ['text-sm px-6'],
				md: ['text-md px-10'],
			},
			border: {
				'light-gray': ['border-light-gray'],
				'dark-blue': ['border-dark-blue'],
			},
			hover: {
				true: [
					'enabled:transition-transform enabled:duration-300 enabled:hover:translate-y-1',
				],
				false: ['enabled:hover:translate-y-0'],
			},
		},
		defaultVariants: {
			size: 'xs',
			hover: true,
		},
	}
);
