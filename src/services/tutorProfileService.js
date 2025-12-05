import { api } from "./http";

/**
 * Get authenticated tutor's profile
 * @returns {Promise<Object>} Tutor profile data
 */
export const getTutorProfile = async () => {
  try {
    const response = await api("/api/tutor/profile");
    // Response langsung adalah object data tanpa nested data property
    return response;
  } catch (error) {
    console.error("Error fetching tutor profile:", error);
    throw error;
  }
};

/**
 * Update authenticated tutor's profile
 * @param {Object|FormData} profileData - Tutor profile data to update (can be FormData for file uploads)
 * @returns {Promise<Object>} Updated tutor profile
 */
export const updateTutorProfile = async (profileData) => {
  try {
    // Jika FormData, gunakan POST dengan _method=PATCH (Laravel method spoofing)
    // Karena FormData dengan PATCH kadang bermasalah di beberapa browser
    const isFormData = profileData instanceof FormData;

    const response = await api("/api/tutor/profile", {
      method: isFormData ? "POST" : "PATCH",
      body: isFormData ? profileData : JSON.stringify(profileData),
    });
    return response;
  } catch (error) {
    console.error("Error updating tutor profile:", error);
    throw error;
  }
};

export default {
  getTutorProfile,
  updateTutorProfile,
};
