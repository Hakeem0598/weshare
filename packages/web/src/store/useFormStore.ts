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

const INITIAL_STATE: State = {
	file: null,
	downloadUrl: '',
	isUploading: false,
	sidebarIsOpen: false,
};

export const useFormStore = create<State & Actions>((set) => ({
	...INITIAL_STATE,
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
		set(INITIAL_STATE);
	},
}));
