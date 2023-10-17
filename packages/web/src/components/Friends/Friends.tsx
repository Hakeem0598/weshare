import { FriendProp } from './Friends.types';

const Friend = ({ bgColor, children }: FriendProp) => {
	return (
		<div
			className={`${bgColor} h-[--button-height] w-[--button-height] rounded-full border border-white flex items-center justify-center font-semibold text-lg text-blue-400`}
		>
			{children}
		</div>
	);
};

const LENGTH = 4;

const Friends = () => {
	const colors = [
		'bg-sky-200',
		'bg-yellow-200',
		'bg-purple-200',
		'bg-blue-100',
	];

	return (
		<div className='flex'>
			{Array.from({ length: LENGTH }, (_, i) => (
				<div
					key={i}
					style={{
						transform:
							i > 0 ? `translateX(calc(-1.2rem * ${i}))` : 'translateX(0)',
					}}
				>
					<Friend
						bgColor={colors[i]}
						children={i + 1 === LENGTH ? `+${LENGTH + 1}` : ''}
					/>
				</div>
			))}
		</div>
	);
};

export default Friends;
