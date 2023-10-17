import { create } from 'zustand';

type State = {
	file: File | null;
	downloadUrl: string;
	isUploading: boolean;
	sidebarIsOpen: boolean;
};

type Actions = {
	setDownloadUrl: (url: string) => void;
	setIsUploading: (isUploading: boolean) => void;
	setFile: (file: File | null) => void;
	showSidebar(sidebarIsOpen: boolean): void;
	reset(): void;
};

const initialState: State = {
	file: null,
	downloadUrl: '',
	isUploading: false,
	sidebarIsOpen: false,
};

export const useStore = create<State & Actions>((set) => ({
	...initialState,
	setFile(file) {
		set(() => ({ file }));
	},
	setDownloadUrl(url) {
		set(() => ({ downloadUrl: url }));
	},
	setIsUploading(isUploading) {
		set(() => ({ isUploading }));
	},
	showSidebar(sidebarIsOpen) {
		set(() => ({ sidebarIsOpen }));
	},
	reset() {
		set(initialState);
	},
}));
