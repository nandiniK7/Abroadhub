import axios from 'axios';

// Base URL priority:
// 1. REACT_APP_API_BASE_URL (real AbroadHub API when confirmed)
// 2. Fallback to REACT_APP_BACKEND_URL + /api (Emergent template backend)
const API_BASE =
  process.env.REACT_APP_API_BASE_URL?.trim() ||
  `${process.env.REACT_APP_BACKEND_URL || ''}/api`;

export const http = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token from localStorage (matches how mobile apps typically do JWT).
// This will be replaced with the confirmed AbroadHub auth mechanism once known.
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('ah_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('ah_token');
      localStorage.removeItem('ah_user');
    }
    return Promise.reject(err);
  }
);
