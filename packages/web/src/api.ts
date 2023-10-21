import axios from 'axios';
import { useAuthStore } from './store/useAuthStore';

const API_URL =
	import.meta.env.VITE_API_URL || 'https://api-staging.hakeem.bio';

export const request = axios.create({
	baseURL: API_URL,
});

request.defaults.withCredentials = true;

request.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		delete config.headers['Authorization'];
	}

	return config;
});
