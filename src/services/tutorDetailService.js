import { api } from "./http";

/**
 * Get tutor profile detail
 * @param {number} tutorId - ID tutor
 */
export const getTutorDetail = async (tutorId) => {
  try {
    console.log("Fetching tutor detail for ID:", tutorId);
    const url = `/api/tutor-profile/${tutorId}`;
    console.log("Request URL:", url);

    const response = await api(url);
    console.log("API Response for tutor detail:", response);

    // Backend returns { status: 'success', data: {...} }
    // or directly the data object depending on api wrapper
    const data = response.data?.data || response.data || response || {};
    console.log("Processed data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching tutor detail:", error);
    console.error("Error details:", {
      message: error.message,
      response: error.response,
      status: error.response?.status,
    });
    throw error;
  }
};

/**
 * Get available slots for specific date
 * @param {number} tutorId - ID tutor
 * @param {string} date - Format: YYYY-MM-DD
 */
export const getAvailableSlots = async (tutorId, date) => {
  try {
    const response = await api(
      `/api/tutor-profile/${tutorId}/available-slots?date=${date}`
    );
    console.log("API Response for available slots:", response);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};
