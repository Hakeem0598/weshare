import Button from './components/Button/Button';
import CallToAction from './components/CallToAction/CallToAction';
import Friends from './components/Friends/Friends';
import { Header } from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import UploadContainer from './components/UploadContainer/UploadContainer';

function App() {
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

fetch('https://saturncloud.io/blog/how-to-retrieve-cognito-user-pool-client-id-with-terraform-a-comprehensive-guide/', {
})