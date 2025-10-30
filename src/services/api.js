// src/services/api.js
import axios from 'axios';

// 1. Buat instance axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ganti sesuai URL backend kamu
  timeout: 5000, // waktu maksimal request 5 detik
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Optional: interceptor untuk request / response
// Misal nambah token auth
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // misal simpan token di localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Export instance supaya bisa dipakai di vue component
export default api;
