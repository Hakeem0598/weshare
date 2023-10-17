import { motion } from 'framer-motion';
import { button } from './Button.data';
import { ButtonAsButtonProps, ButtonProps } from './Button.types';

const Button = ({
	size,
	width,
	hover,
	border,
	variant,
	children,
	className,
	...props
}: ButtonProps) => {
	const classes = button({
		size,
		width,
		hover,
		border,
		variant,
		className,
	});

	if (props.href) {
		const { href, ...rest } = props;

		return (
			<motion.a href={href} className={classes} {...rest}>
				{children}
			</motion.a>
		);
	}

	return (
		<motion.button className={classes} {...(props as ButtonAsButtonProps)}>
			{children}
		</motion.button>
	);
};

export default Button;
