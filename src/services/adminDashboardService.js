import { api } from "./http";

/**
 * Get admin dashboard statistics
 */
export const getAdminStatistics = async () => {
  try {
    const response = await api("/api/admin/dashboard/statistics");
    console.log("API Response for statistics:", response); // Debug
    return response;
  } catch (error) {
    console.error("Error fetching admin statistics:", error);
    throw error;
  }
};

/**
 * Get pending tutor verifications
 */
export const getPendingTutors = async () => {
  try {
    const response = await api("/api/admin/dashboard/pending-tutors");
    console.log("API Response for pending tutors:", response); // Debug
    return response.data || [];
  } catch (error) {
    console.error("Error fetching pending tutors:", error);
    return []; // Return empty array on error
  }
};

/**
 * Get pending payment verifications
 */
export const getPendingPayments = async () => {
  try {
    const response = await api("/api/admin/dashboard/pending-payments");
    console.log("API Response for pending payments:", response); // Debug
    return response.data || [];
  } catch (error) {
    console.error("Error fetching pending payments:", error);
    return []; // Return empty array on error
  }
};

/**
 * Approve tutor
 * @param {number} userId - User ID of the tutor
 */
export const approveTutor = async (userId) => {
  try {
    const response = await api("/api/admin/tutor/approve", {
      method: "PATCH",
      body: JSON.stringify({ user_id: userId }),
    });
    return response;
  } catch (error) {
    console.error("Error approving tutor:", error);
    throw error;
  }
};

/**
 * Reject tutor
 * @param {number} userId - User ID of the tutor
 */
export const rejectTutor = async (userId) => {
  try {
    const response = await api("/api/admin/tutor/reject", {
      method: "PATCH",
      body: JSON.stringify({ user_id: userId }),
    });
    return response;
  } catch (error) {
    console.error("Error rejecting tutor:", error);
    throw error;
  }
};

/**
 * Verify payment
 * @param {number} paymentId - Payment ID
 */
export const verifyPayment = async (paymentId) => {
  try {
    const response = await api("/api/admin/payment/verify", {
      method: "PATCH",
      body: JSON.stringify({ payment_id: paymentId }),
    });
    return response;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

/**
 * Reject payment
 * @param {number} paymentId - Payment ID
 */
export const rejectPayment = async (paymentId) => {
  try {
    const response = await api("/api/admin/payment/reject", {
      method: "PATCH",
      body: JSON.stringify({ payment_id: paymentId }),
    });
    return response;
  } catch (error) {
    console.error("Error rejecting payment:", error);
    throw error;
  }
};

/**
 * Get tutor detail
 * @param {number} userId - User ID of the tutor
 */
export const getTutorDetail = async (userId) => {
  try {
    const response = await api(`/api/admin/tutor/${userId}`);
    console.log("API Response for tutor detail:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching tutor detail:", error);
    throw error;
  }
};

/**
 * Get payment detail by ID
 * @param {number} paymentId - Payment ID
 */
export const getPaymentDetail = async (paymentId) => {
  try {
    const response = await api(`/api/admin/payment/${paymentId}`);
    console.log("API Response for payment detail:", response);
    return response;
  } catch (error) {
    console.error("Error fetching payment detail:", error);
    throw error;
  }
};
