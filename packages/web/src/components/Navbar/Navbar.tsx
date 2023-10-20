import { useAuthStore } from '../../store/useAuthStore';
import Button from '../Button/Button';
import { useShallow } from 'zustand/react/shallow';

const Navbar = () => {
	const { user, isLoading } = useAuthStore(
		useShallow(({ user, isLoading }) => ({ user, isLoading }))
	);

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
					{isLoading ? (
						<Button size='md' className='shimmer bg-lighter-gray/50' disabled></Button>
					) : user ? (
						<Button
							href='https://api-staging.hakeem.bio/auth/verify'
							variant='primary'
							size='md'
						>
							Sign out
						</Button>
					) : (
						<Button
							href='https://api-staging.hakeem.bio/auth/verify'
							variant='primary'
							size='md'
						>
							Join
						</Button>
					)}
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
