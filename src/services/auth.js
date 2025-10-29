import { api } from "./http.js";

export function loginRequest({ email, password }) {
  return api("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function fetchMe() {
  return api("/api/user", {
    method: "GET",
  });
}
