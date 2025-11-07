import { api } from "./http";

// Summary dashboard student
export async function getStudentSummary() {
  // backend: GET /api/dashboard/student/summary
  const res = await api("/api/dashboard/student/summary");
  return res; // biasanya { status, data: {...} }
}

export async function getStudentDashboard() {
  return api("/api/dashboard/student");
}

// Tutor rekomendasi
export async function getRecommendedTutors(page = 1) {
  const res = await api(
    `/api/dashboard/student/recommended-tutors?page=${page}`
  );
  return res; // biasanya { status, data: [...], pagination: {...} }
}
