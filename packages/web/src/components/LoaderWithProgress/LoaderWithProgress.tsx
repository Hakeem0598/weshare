import {
	AnimatePresence,
	animate,
	motion,
	useMotionValue,
	useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useFormStore } from '../../store/useFormStore';
import Loader from '../Loader/Loader';
import CheckMarkIcon from '../icons/CheckMarkIcon';

const LoaderWithProgress = () => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, Math.round);
	const [progress, setProgress] = useState(0);

	const isUploading = useFormStore((state) => state.isUploading);

	useEffect(() => {
		const MAX = 100;

		const animation = animate(count, MAX, {
			duration: 2,
			onUpdate(latest) {
				if (Math.round(latest) === MAX - 1 && isUploading) {
					animation.pause();
				}
			},
			onComplete() {
				setProgress(MAX);
			},
		});

		return animation.stop;
	}, [count, isUploading]);

	const stopLoading = progress === 100;

	return (
		<Loader stopLoading={stopLoading}>
			<AnimatePresence mode='wait'>
				{!stopLoading ? (
					<>
						<motion.span
							key='progress'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='text-dark-blue text-sm'
						>
							{rounded}
						</motion.span>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='text-sm'
						>
							%
						</motion.span>
					</>
				) : (
					<motion.span
						key='check'
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0 }}
					>
						<CheckMarkIcon className='text-light-green' />
					</motion.span>
				)}
			</AnimatePresence>
		</Loader>
	);
};

export default LoaderWithProgress;
