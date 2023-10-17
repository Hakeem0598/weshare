import { cx } from 'class-variance-authority';
import { LoaderProps } from './Loader.types';

const Loader = ({ stopLoading = false, children }: LoaderProps) => {
	return (
		<div className='h-[--button-height] w-[--button-height] rounded-full border-4 border-lighter-gray relative'>
			<div
				className={cx(
					'absolute rounded-full inset-[-4px] border-4 border-lighter-gray border-t-green-400 animate-spin',
					stopLoading ? 'hidden' : 'block'
				)}
			/>
			<div className='absolute inset-0 rounded-full flex items-center justify-center'>
				{children}
			</div>
		</div>
	);
};

export default Loader;
