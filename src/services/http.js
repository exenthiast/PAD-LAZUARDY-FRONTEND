export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include', // biar cookie (sanctum) ikut
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
