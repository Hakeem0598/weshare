import { type VariantProps } from 'class-variance-authority';
import { HTMLMotionProps } from 'framer-motion';
import { button } from './Button.data';

type ButtonBaseProps = VariantProps<typeof button>;

type ButtonAsAnchorProps = HTMLMotionProps<'a'> &
	Omit<React.ComponentProps<'a'>, 'ref'>;

export type ButtonAsButtonProps = HTMLMotionProps<'button'> &
	Omit<React.ComponentProps<'button'>, 'ref'> & {
		href?: never;
	};

export type ButtonProps = ButtonBaseProps &
	(ButtonAsButtonProps | ButtonAsAnchorProps);
