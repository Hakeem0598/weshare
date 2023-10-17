import React from 'react';

type CardProps = React.ComponentProps<'div'>;

const Card = ({ children }: CardProps) => {
	return (
		<div className='bg-white shadow-2xl rounded-3xl p-8 w-full'>{children}</div>
	);
};

export default Card;
