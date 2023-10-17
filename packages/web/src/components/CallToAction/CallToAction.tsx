import Button from '../Button/Button';

const CallToAction = () => {
	return (
		<div className='max-w-sm flex flex-col h-[13.125rem]'>
			<h2 className='text-dark-blue font-bold text-3xl flex-grow'>You can upload up to 200GB files</h2>
			<p className='text-black flex-grow'>
				We generate the best scenarios for everyone to make farming process
				easier and accessible
			</p>
			<div className='space-x-7 mt-auto'>
				<Button variant='secondary' size='sm' border='dark-blue'>
					Become a member
				</Button>
				<a className='text-dark-blue text-sm font-semibold hover:underline' href='/'>
					Log in
				</a>
			</div>
		</div>
	);
};

export default CallToAction;
