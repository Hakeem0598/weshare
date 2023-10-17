import { useRef } from 'react';
import { useStore } from '../../store/useStore';
import { copyText } from '../../utils/copyText';
import Button from '../Button/Button';
import Card from '../Card/Card';
import CheckMarkIcon from '../icons/CheckMarkIcon';
import LinkIcon from '../icons/LinkIcon';

const CopyLink = ({ text }: { text: string }) => {
	const ref = useRef<HTMLInputElement>(null!);

	const handleClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		ref.current.select();
		ref.current.setSelectionRange(0, 99999);

		await copyText(text);
	};

	return (
		<div className='border-2 border-lightest-gray p-2 flex rounded-2xl'>
			<input
				ref={ref}
				type='text'
				value={text}
				className='w-full mr-2 text-center text-sm'
				onChange={() => {}}
			/>
			<Button onClick={handleClick} size='xs' variant='gray' className='min-w-[3rem] h-12'>
				<LinkIcon />
			</Button>
		</div>
	);
};

const UploadComplete = () => {
	const downloadUrl = useStore((state) => state.downloadUrl);
	const reset = useStore((state) => state.reset);

	return (
		<Card>
			<div className='space-y-4 text-center'>
				<div className='text-center text-5xl rounded-full border-[7px] border-lightest-gray flex items-center justify-center text-light-green h-32 w-32 mx-auto'>
					<CheckMarkIcon />
				</div>

				<div>
					<h3 className='font-medium text-dark-blue text-2xl'>You're done!</h3>
					<p className='text-sm'>
						Copy your download link or <br />{' '}
						<a className='text-purple-400 underline' href='/'>
							see what's inside
						</a>
					</p>
				</div>

				<CopyLink text={downloadUrl} />

				<Button onClick={reset} variant='pink' size='sm'>
					Send another
				</Button>
			</div>
		</Card>
	);
};

export default UploadComplete;
