import { AnimatePresence, motion } from 'framer-motion';
import { useFormStore } from '../../store/useFormStore';
import Upload from '../Upload/Upload';
import UploadComplete from '../UploadComplete/UploadComplete';
import FileManagement from '../FileManagement/FileManagement';

const UploadContainer = () => {
	const file = useFormStore((state) => state.file);
	const uploadComplete =
		useFormStore((state) => state.downloadUrl).length !== 0;

	return (
		<AnimatePresence mode='popLayout'>
			<div className='w-full max-w-card'>
				{uploadComplete ? (
					<motion.div
						key='upload-complete'
						initial={{ opacity: 0, y: '-10%' }}
						animate={{ opacity: 1, y: '0%' }}
						exit={{ opacity: 0 }}
						transition={{
							type: 'tween',
							duration: 0.3,
						}}
					>
						<UploadComplete />
					</motion.div>
				) : file ? (
					<motion.div
						key='upload1'
						initial={{ opacity: 0, y: '-10%' }}
						animate={{ opacity: 1, y: '0%' }}
						exit={{ opacity: 0 }}
						transition={{
							type: 'tween',
							duration: 0.3,
						}}
					>
						<FileManagement />
					</motion.div>
				) : (
					<motion.div
						key='upload2'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, y: '20%' }}
					>
						<Upload />
					</motion.div>
				)}
			</div>
		</AnimatePresence>
	);
};

export default UploadContainer;
