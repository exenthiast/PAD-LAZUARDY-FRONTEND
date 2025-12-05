import { api } from "./http";

/**
 * Get student's schedules
 * @param {string} status - Filter: 'all', 'upcoming', 'completed', 'cancelled'
 */
export const getMySchedules = async (status = "all") => {
  try {
    const response = await api(`/api/student/schedules?status=${status}`);
    console.log("API Response for student schedules:", response);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching student schedules:", error);
    throw error;
  }
};

/**
 * Submit attendance proof for a schedule
 * @param {number} scheduleId - ID of the schedule
 * @param {FormData} formData - Form data containing notes and proof_document
 */
export const submitAttendance = async (scheduleId, formData) => {
  try {
    const response = await api(`/api/student/attendance/${scheduleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    console.log("Submit attendance response:", response);
    return response;
  } catch (error) {
    console.error("Error submitting attendance:", error);
    throw error;
  }
};

/**
 * Submit review for a tutor
 * @param {number} tutorId - ID of the tutor
 * @param {FormData} formData - Form data containing rating, comment, and optional photo
 */
export const submitReview = async (tutorId, formData) => {
  try {
    const response = await api(`/api/student/review/${tutorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    console.log("Submit review response:", response);
    return response;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};
