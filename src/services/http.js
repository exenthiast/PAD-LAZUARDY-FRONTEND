export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function api(path, options = {}) {
  // tambahin Authorization otomatis kalau ada token
  const token = localStorage.getItem("auth_token");

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `HTTP ${res.status}`;
    throw new Error(message);
  }

  return data;
}
