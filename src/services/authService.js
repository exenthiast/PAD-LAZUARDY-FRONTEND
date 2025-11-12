import { api } from "./http";

// Ambil user yang sedang login
export async function getMe() {
  // backend: GET /api/me
  return api("/api/me");
}

// Login (dipakai di LoginPage.vue)
export async function login(payload) {
  const res = await api("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  // Sesuaikan dengan response backend-mu
  // misal: { token, user }
  if (res.token) {
    localStorage.setItem("auth_token", res.token);
  }

  return res;
}

// Logout
export async function logout() {
  await api("/api/logout", { method: "POST" });
  localStorage.removeItem("auth_token");
}

// Update profile
export async function updateProfile(payload) {
  // backend: PUT /api/profile atau POST /api/profile/update
  return api("/api/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
