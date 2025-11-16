import { api } from "./http.js";

export async function loginRequest(credentials) {
  return api("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
}

export async function fetchMe() {
  return api("/api/me", {
    method: "GET",
  });
}
