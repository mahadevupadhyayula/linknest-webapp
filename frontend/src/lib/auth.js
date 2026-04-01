import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const TOKEN_KEY = 'linknest_auth_token';

export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Security note: localStorage is vulnerable to XSS. Prefer httpOnly cookies when backend supports cookie auth.
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

authApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function signup(payload) {
  return authApi.post('/auth/signup', payload).then((res) => res.data);
}

export function login(payload) {
  return authApi.post('/auth/login', payload).then((res) => res.data);
}

export function getMe() {
  return authApi.get('/auth/me').then((res) => res.data);
}
