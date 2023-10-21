import { request } from '../../api';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../Button/Button';

const Navbar = () => {
	const { reset, isLoading, user, refreshToken } = useAuthStore(
		({ user, isLoading, reset, refreshToken }) => ({
			user,
			refreshToken,
			isLoading,
			reset,
		})
	);

	const signOut = async () => {
		try {
			const res = await request.post('/auth/signOut', {
				refresh_token: refreshToken,
			});

			if (res.status !== 200) return;

			reset();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav>
			<ul className='flex items-center gap-10 [&>li]:font-medium'>
				<li className='hover:underline'>
					<a href='/'>About</a>
				</li>
				<li className='hover:underline'>
					<a href='/'>Features</a>
				</li>
				<li className='w-[9.375rem]'>
					{isLoading ? (
						<Button
							className='shimmer bg-lighter-gray/50'
							width='full'
							disabled
						></Button>
					) : user ? (
						<Button onClick={signOut} variant='primary' width='full'>
							Sign out
						</Button>
					) : (
						<Button
							href='https://api-staging.hakeem.bio/auth/verify'
							variant='primary'
							width='full'
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
