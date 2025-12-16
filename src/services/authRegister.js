import { api } from "./http";

// 1) Initiate register (guest) -> POST /api/register
export async function initiateRegister(payload) {
  return api("/api/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// 2) Verify email/OTP (guest) -> PATCH /api/register/verify
export async function verifyEmail(payload) {
  // payload example: { email, otp }
  return api("/api/register/verify", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// 3) Resend OTP (guest) -> PATCH /api/register/resend-otp
export async function resendOtp(payload) {
  // payload example: { email }
  return api("/api/register/resend-otp", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// 4) Complete student role data (requires auth) -> PATCH /api/register/student
export async function updateStudentRole(payload) {
  // payload depends on backend requirement for completing student profile
  return api("/api/register/student", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

// 5) Complete tutor role data (requires auth) -> PATCH /api/register/tutor
export async function updateTutorRole(payload) {
  // Check if payload contains files (FormData) or just data (object)
  const isFormData = payload instanceof FormData;

  // For FormData with files, use POST with _method spoofing (Laravel requirement)
  if (isFormData) {
    payload.append("_method", "PATCH");
    return api("/api/register/tutor", {
      method: "POST", // Use POST for file uploads
      body: payload,
      // Don't set headers for FormData - let browser set multipart/form-data with boundary
      // Accept and X-Requested-With will be added by http.js
    });
  }

  // For JSON payload (no files)
  return api("/api/register/tutor", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
