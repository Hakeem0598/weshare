import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { request } from '../../api';
import { useStore } from '../../store/useStore';
import Button from '../Button/Button';
import Card from '../Card/Card';
import LoaderWithProgress from '../LoaderWithProgress/LoaderWithProgress';
import EllipsisIcon from '../icons/EllipsisIcon';
import PlusIcon from '../icons/PlusIcon';
import { CreateUploadLinkResponse, UploadProps } from './Upload.types';
import { sleep } from '../../utils/sleep';

const Upload = ({ children }: UploadProps) => {
	const {
		file,
		setFile,
		setDownloadUrl,
		isUploading,
		setIsUploading,
		showSidebar,
	} = useStore(
		useShallow(
			({
				file,
				setFile,
				isUploading,
				setDownloadUrl,
				setIsUploading,
				showSidebar,
			}) => ({
				file,
				setFile,
				setDownloadUrl,
				isUploading,
				setIsUploading,
				showSidebar,
			})
		)
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		setFile(e.target.files[0]);
	};

	const handleUpload = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		if (!file) return;

		try {
			setIsUploading(true);

			const createShareResp = await request<CreateUploadLinkResponse>(
				`/share/?filename=${file.name}`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
					},
				}
			);

			if (createShareResp.status !== 201) return;

			const { uploadUrl, headers } = createShareResp.data;

			const uploadResp = await axios(uploadUrl, {
				method: 'PUT',
				headers: {
					...headers,
					'Content-Type': 'application/octet-stream',
				},
				data: new File([file], file.name),
			});

			await sleep(1000);

			if (uploadResp.status !== 200) return;

			setDownloadUrl(uploadResp.data.downloadUrl);
			showSidebar(true);
		} catch (error) {
			console.log(error);
		}

		setIsUploading(false);
	};

	const fileIsEmpty = !file;

	const isDisabled = isUploading || fileIsEmpty;

	return (
		<Card>
			{children}
			<div className='flex items-center gap-4 mb-12'>
				<Button
					whileTap={{
						color: 'rgba(255 255 255)',
						backgroundColor: 'var(--dark-blue)',
						transition: {
							duration: 0.2,
						},
					}}
					className='relative'
					variant='secondary'
					border='dark-blue'
				>
					<label
						htmlFor='file'
						className='h-[--button-height] w-[--button-height] absolute rounded-2xl cursor-pointer'
					/>
					<input
						type='file'
						id='file'
						onChange={handleChange}
						className='hidden'
					/>
					<PlusIcon />
				</Button>
				<div>
					<h4 className='text-dark-blue font-semibold'>Add more files</h4>
					<p className='text-light-gray text-xs font-medium'>Up to 2 GB free</p>
				</div>
			</div>

			<div className='flex items-center gap-4'>
				<AnimatePresence mode='popLayout'>
					{isUploading ? (
						<motion.div
							key='loader'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<LoaderWithProgress />
						</motion.div>
					) : (
						<motion.div
							key='ellipsis'
							initial={false}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
						>
							<Button variant='secondary'>
								<EllipsisIcon />
							</Button>
						</motion.div>
					)}
				</AnimatePresence>

				<Button
					onClick={handleUpload}
					variant='tertiary'
					width='full'
					size='sm'
					animate={
						isUploading && {
							transition: { duration: 0.4 },
							color: ['rgba(255 255 255)', 'rgba(8, 47, 73)'],
							backgroundColor: ['rgba(8, 47, 73)', 'rgba(8, 47, 73, 0.1)'],
							scale: [1, 1.05, 1],
						}
					}
					transition={{ easings: ['easeIn', 'easeOut'] }}
					hover={false}
					disabled={isDisabled}
				>
					Upload
					<motion.span
						animate={
							isUploading && {
								transition: { duration: 0.4 },
								opacity: [1, 0],
								scale: [1, 0.95, 1],
							}
						}
						className='absolute inset-[-7px] rounded-3xl border-2 border-dark-blue opacity-0'
					></motion.span>
				</Button>
			</div>
		</Card>
	);
};

export default Upload;

const url = new URLSearchParams(
	'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=671128082532-jhphbq6d0e1gnsus9mn7vf8a6fjn10mp.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fapp.diagrams.net%2Fgoogle&response_type=code&include_granted_scopes=true&access_type=offline&prompt=consent%20select_account&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.install%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&state=cId%3D671128082532-jhphbq6d0e1gnsus9mn7vf8a6fjn10mp.apps.googleusercontent.com%26domain%3Dapp.diagrams.net%26token%3Di2ijvpncun71g9ugc98cbaodesqqfqffkniu81q8cpqkjoos69p&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow'
);

const params = [...url.entries()].reduce((acc, [key, value]) => {
	return { ...acc, [key]: value };
}, {});

console.log(JSON.stringify(params, null, 4));