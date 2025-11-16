export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function api(path, options = {}) {
  const token = localStorage.getItem("auth_token");
  
  const isFormData =
    options.body instanceof FormData || options.body instanceof URLSearchParams;

  const headers = {
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  // Hanya set Content-Type ke JSON kalau bukan FormData/URLSearchParams
  if (!isFormData && !options.headers?.["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
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
      (data && (data.message || data.error)) || `HTTP ${res.status}`;
    throw new Error(message);
  }

  return data;
}
