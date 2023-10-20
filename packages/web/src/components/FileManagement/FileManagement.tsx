import { cx } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, useRef } from 'react';
import defaultColors from 'tailwindcss/colors';
import { useFormStore } from '../../store/useFormStore';
import { byteConverter } from '../../utils/byteConverter';
import { getRandomColor } from '../../utils/randomColor';
import LoaderWithProgress from '../LoaderWithProgress/LoaderWithProgress';
import Upload from '../Upload/Upload';

const FileItem = ({ name, size }: { name: string; size: string }) => {
	const color = useRef(getRandomColor());

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<div
					style={
						{
							'--bg-color': defaultColors[color.current][200],
							'--fg-color': defaultColors[color.current][400],
						} as CSSProperties
					}
					className={cx(
						'h-[--button-height] w-[--button-height] rounded-2xl bg-[--bg-color] relative',
						'before:content-[""] before:h-[calc(var(--button-height)-1rem)] before:w-[calc(var(--button-height)-1rem)] before:bg-[--fg-color] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full'
					)}
				/>

				<div>
					<h5 className='font-semibold text-dark-blue truncate max-w-[6rem]'>
						{name}
					</h5>
					<p className='text-light-gray text-xs'>{size}</p>
				</div>
			</div>

			<LoaderWithProgress key={name} />
		</div>
	);
};

const FileManagement = () => {
	const file = useFormStore((state) => state.file);
	const isUploading = useFormStore((state) => state.isUploading);

	return (
		<Upload>
			<div className='mb-[--button-height]'>
				<AnimatePresence mode='wait'>
					<motion.h3
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						key={isUploading ? 'heading1' : 'heading2'}
						className='mb-8 font-semibold text-dark-blue'
					>
						{isUploading ? 'Uploading Files' : 'File Management'}
					</motion.h3>
				</AnimatePresence>

				<div className='flex flex-col gap-[--button-height]'>
					<FileItem name={file!.name} size={byteConverter(file!.size)} />
				</div>
			</div>
		</Upload>
	);
};

export default FileManagement;
