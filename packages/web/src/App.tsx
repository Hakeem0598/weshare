import { useEffect } from 'react';
import { request } from './api';
import Button from './components/Button/Button';
import CallToAction from './components/CallToAction/CallToAction';
import Friends from './components/Friends/Friends';
import { Header } from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import UploadContainer from './components/UploadContainer/UploadContainer';
import { useAuthStore } from './store/useAuthStore';
import { parseQueryString } from './utils/parseQueryString';

function App() {
	const {
		setAccessToken,
		setUser,
		setRefreshToken,
		accessToken,
		setIsLoading,
	} = useAuthStore(
		({
			setAccessToken,
			setUser,
			setRefreshToken,
			accessToken,
			setIsLoading,
		}) => ({
			setAccessToken,
			setUser,
			setRefreshToken,
			accessToken,
			setIsLoading,
		})
	);

	useEffect(() => {
		(async () => {
			const url = new URL(window.location.href);

			if (url.searchParams.size !== 2) return;

			const queryString = url.search.substring(1);

			const queryObj = parseQueryString(queryString);

			if (!queryObj['code'] || !queryObj['state']) return;

			const res = await request(`/auth/callback${url.search}`);

			if (res.status !== 200) return;

			const { access_token, refresh_token } = res.data;

			setAccessToken(access_token);
			setRefreshToken(refresh_token);

			window.history.pushState({}, '', window.location.origin);
		})();
	}, [setAccessToken, setRefreshToken]);

	useEffect(() => {
		setIsLoading(true);

		(async () => {
			try {
				const res = await request('/auth/userInfo');
				setUser(res.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [setUser, setIsLoading, accessToken]);

	return (
		<div className='p-[--app-padding] h-full relative'>
			<Header />
			<main className='h-[calc(100%-4rem)] flex flex-col'>
				<div className='mt-auto h-full flex items-center'>
					<div className='flex gap-20 flex-1 items-center'>
						<UploadContainer />
						<CallToAction />
					</div>
				</div>

				<div className='flex items-center'>
					<Friends />
					<Button
						className='-translate-x-10'
						variant='secondary'
						border='light-gray'
						size='sm'
					>
						Invite A Friend
					</Button>
				</div>
			</main>

			<Sidebar />
		</div>
	);
}

export default App;
