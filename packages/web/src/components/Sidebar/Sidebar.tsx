import { cx } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { byteConverter } from '../../utils/byteConverter';
import Button from '../Button/Button';
import Navbar from '../Navbar/Navbar';
import CheckMarkIcon from '../icons/CheckMarkIcon';
import CrossIcon from '../icons/CrossIcon';

type ListItemProps = { children: string; border?: boolean; green?: boolean };

const ListItem = ({ children, border = false, green }: ListItemProps) => {
	return (
		<li className='flex gap-3 items-center'>
			<div
				className={cx(
					'text-xs w-5 h-5 rounded-full flex items-center justify-center',
					border ? 'border-2 border-lighter-gray' : '',
					green ? 'bg-light-green text-white' : 'bg-white text-dark-blue'
				)}
			>
				<CheckMarkIcon />
			</div>

			<span className='text-dark-blue'>{children}</span>
		</li>
	);
};

const Sidebar = () => {
	const showSidebar = useStore((state) => state.showSidebar);
	const sidebarIsOpen = useStore((state) => state.sidebarIsOpen);
	const file = useStore((state) => state.file);

	return (
		<AnimatePresence>
			{sidebarIsOpen && (
				<motion.div
					initial={{ x: '100%' }}
					animate={{
						x: '0%',
					}}
					exit={{
						x: '100%',
					}}
					transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
					className='absolute bg-white shadow-xl top-0 right-0 w-full max-w-[71%] h-full pt-[--app-padding] px-[--app-padding]'
				>
					<div className='flex items-center justify-between'>
						<Button onClick={() => showSidebar(false)} variant='gray' size='xs'>
							<CrossIcon />
						</Button>

						<Navbar />
					</div>

					<hr className='mt-10 mb-10 bg-lightest-gray'></hr>

					<div className='flex gap-20 mb-10'>
						<motion.div
							initial={{ y: '100%' }}
							animate={{
								y: '0%',
							}}
							exit={{
								y: '0%',
							}}
							transition={{
								type: 'spring',
								bounce: 0,
								duration: 0.3,
								delay: 0.1,
							}}
							className='p-10 bg-light-orange rounded-2xl flex-grow flex flex-col'
						>
							<h3 className='font-medium text-3xl text-dark-blue'>
								Manage your transfers easily
							</h3>

							<ul className='space-y-5 my-10'>
								<ListItem>See when your files where downloaded</ListItem>
								<ListItem>See who downloaded your files</ListItem>
								<ListItem>Review and resend your old transfers</ListItem>
							</ul>

							<Button variant='white' size='md' className='mt-auto'>
								Get PRO
							</Button>
						</motion.div>

						<motion.div
							initial={{ y: '100%' }}
							animate={{
								y: '0%',
							}}
							exit={{
								y: '0%',
							}}
							transition={{
								type: 'spring',
								bounce: 0,
								duration: 0.3,
								delay: 0.2,
							}}
							className='p-10 rounded-2xl border-[3px] border-lightest-gray  flex flex-col'
						>
							<h5 className='text-light-green font-semibold'>Free forever</h5>
							<h4 className='text-dark-blue font-semibold text-lg'>
								Quicksend guest
							</h4>

							<ul className='space-y-5 my-10'>
								<ListItem border>No storage</ListItem>
								<ListItem green>Send up to 2GB</ListItem>
								<ListItem green>Resend and delete</ListItem>
							</ul>

							<Button
								variant='secondary'
								border='dark-blue'
								size='md'
								width='full'
								className='mt-auto'
							>
								Sign up for free
							</Button>
						</motion.div>
					</div>

					<div>
						<h2 className='text-4xl font-bold'>Transfer Details</h2>
						<p className='font-medium mb-2 mt-1'>1 file - Expires in 1 week</p>

						<div>
							<div className='pt-5 pb-2 border-t-2 border-lightest-gray'>
								<h4 className='font-medium'>{file!.name}</h4>
								<p className='text-light-gray text-xs'>
									{byteConverter(file!.size)}
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Sidebar;
