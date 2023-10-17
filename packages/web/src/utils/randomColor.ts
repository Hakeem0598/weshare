import defaultColors from 'tailwindcss/colors';
import { DefaultColors } from 'tailwindcss/types/generated/colors';

delete (defaultColors as Partial<DefaultColors>)['lightBlue'];
delete (defaultColors as Partial<DefaultColors>)['warmGray'];
delete (defaultColors as Partial<DefaultColors>)['trueGray'];
delete (defaultColors as Partial<DefaultColors>)['coolGray'];
delete (defaultColors as Partial<DefaultColors>)['blueGray'];

type Color = keyof typeof defaultColors;

const colors = Object.keys(defaultColors).filter((color) => {
	if (
		typeof defaultColors[color as Color] !== 'string' &&
		color !== 'neutral' &&
		color !== 'slate' &&
		color !== 'zinc' &&
		color !== 'gray'
	) {
		return color;
	}
});

export const getRandomColor = (): Color =>
	colors[Math.floor(Math.random() * colors.length)] as Color;
