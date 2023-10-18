import { useEffect } from 'react';
import { request } from './api';
import Button from './components/Button/Button';
import CallToAction from './components/CallToAction/CallToAction';
import Friends from './components/Friends/Friends';
import { Header } from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import UploadContainer from './components/UploadContainer/UploadContainer';
import { parseQueryString } from './utils/parseQueryString';

function App() {
	useEffect(() => {
		(async () => {
			const url = new URL(window.location.href);

			if (url.searchParams.size !== 2) return;

			const queryString = url.search.substring(1);

			const queryObj = parseQueryString(queryString);

			if (!queryObj['code'] || !queryObj['state']) return;

			const res = await request(`/auth/callback${url.search}`);

			console.log(res.data);

			if (res.status !== 200) return;

			const { access_token } = res.data;

			request.defaults.headers.common = {
				Authorization: `Bearer ${access_token}`,
			};

			// window.location.replace(window.location.origin);
		})();
	}, []);

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
