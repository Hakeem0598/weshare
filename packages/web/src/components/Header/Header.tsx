import Navbar from '../Navbar/Navbar';
import LogoIcon from '../icons/LogoIcon';

export const Header = () => {
	return (
		<header>
			<div className='flex justify-between items-center'>
				<a className='inline-flex gap-3 items-center' href='/'>
					<span className='inline-flex items-center justify-center h-[--button-height] w-[--button-height] rounded-2xl bg-dark-blue text-white text-2xl font-bold'>
						<LogoIcon />
					</span>
					<span className='text-dark-blue text-2xl font-semibold'>Send</span>
				</a>

				<Navbar />
			</div>
		</header>
	);
};
