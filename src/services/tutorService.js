import api from "./api";

/**
 * Get public tutor list (no authentication required)
 * @param {Object} params - Search parameters
 * @param {string} params.search - Search query (name)
 * @param {string} params.subject - Filter by subject
 * @param {string} params.level - Filter by class level (SD, SMP, SMA)
 * @param {string} params.mode - Filter by teaching mode (online/offline)
 * @returns {Promise<Object>} Tutor list
 */
export async function getPublicTutors(params = {}) {
  try {
    const response = await api.get("/tutors/public", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching public tutors:", error);
    throw error;
  }
}

/**
 * Search for tutors with filters (requires authentication and user location)
 * @param {Object} params - Search parameters
 * @param {string} params.search - Search query (name, subject, etc)
 * @param {string} params.subject - Filter by subject
 * @param {string} params.level - Filter by class level (SD, SMP, SMA)
 * @param {string} params.mode - Filter by teaching mode (online/offline)
 * @param {number} params.latitude - User latitude for geospatial search
 * @param {number} params.longitude - User longitude for geospatial search
 * @param {number} params.radius - Search radius in km
 * @returns {Promise<Object>} Tutor list with pagination
 */
export async function searchTutors(params = {}) {
  try {
    const response = await api.get("/find-tutor", { params });
    return response.data;
  } catch (error) {
    console.error("Error searching tutors:", error);
    throw error;
  }
}

/**
 * Get tutor detail by ID
 * @param {number} tutorId - Tutor user ID
 * @returns {Promise<Object>} Tutor detail data
 */
export async function getTutorDetail(tutorId) {
  try {
    const response = await api.get(`/tutors/${tutorId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tutor detail:", error);
    throw error;
  }
}

/**
 * Get available time slots for a tutor
 * @param {number} tutorId - Tutor user ID
 * @returns {Promise<Object>} Available schedules
 */
export async function getAvailableSlots(tutorId) {
  try {
    const response = await api.get(`/tutors/${tutorId}/available-schedules`);
    return response.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
}
