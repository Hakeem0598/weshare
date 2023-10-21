import { create } from 'zustand';

type User = {
	sub: string;
	email_verified: string;
	email: string;
	username: string;
} | null;

type State = {
	user: User;
	isLoading: boolean;
	accessToken: string;
	refreshToken: string;
};

type Actions = {
	setAccessToken(token: string): void;
	setRefreshToken(token: string): void;
	setUser(user: User): void;
	setIsLoading(isLoading: boolean): void;
	reset(): void;
};

const INITIAL_STATE: State = {
	accessToken: '',
	refreshToken: '',
	isLoading: false,
	user: null,
};

export const useAuthStore = create<State & Actions>((set) => ({
	...INITIAL_STATE,
	setAccessToken(token) {
		set(() => ({ accessToken: token }));
	},
	setRefreshToken(token) {
		set(() => ({ refreshToken: token }));
	},
	setUser(user) {
		set(() => ({ user }));
	},
	setIsLoading(isLoading) {
		set(() => ({ isLoading }));
	},
	reset() {
		set(INITIAL_STATE);
	},
}));
