import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://api-staging.hakeem.bio';

export const request = axios.create({
	baseURL: API_URL,
});

request.defaults.withCredentials = true;

// request.defaults.headers.common = { 'Authorization': `Bearer ${token}` }