import Button from '../Button/Button';

const Navbar = () => {
	return (
		<nav>
			<ul className='flex items-center gap-10 [&>li]:font-medium'>
				<li className='hover:underline'>
					<a href='/'>About</a>
				</li>
				<li className='hover:underline'>
					<a href='/'>Features</a>
				</li>
				<li>
					<Button href='https://api-staging.hakeem.bio/auth/verify' variant='primary' size='md'>
						Join
					</Button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
