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
 * Reject payment (Delete payment data)
 * @param {number} paymentId - Payment ID
 */
export const rejectPayment = async (paymentId) => {
  try {
    const response = await api("/api/admin/payment/reject", {
      method: "PATCH",
      body: JSON.stringify({ payment_id: paymentId }),
    });
    console.log("API Response for reject payment:", response);
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

/**
 * Get all tutors for management (Kelola Tutor)
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search by name
 * @param {string} params.subject - Filter by subject ID
 */
export const getAllTutors = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append("search", params.search);
    if (params.subject) queryParams.append("subject", params.subject);

    const url = `/api/admin/tutors${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;
    const response = await api(url);
    console.log("API Response for all tutors:", response);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching all tutors:", error);
    return [];
  }
};

/**
 * Get tutor detail for admin
 * @param {number} tutorId - Tutor ID
 */
export const getAdminTutorDetail = async (tutorId) => {
  try {
    const response = await api(`/api/admin/tutors/${tutorId}`);
    console.log("API Response for tutor detail:", response);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching tutor detail:", error);
    throw error;
  }
};

/**
 * Get subjects list
 */
export const getSubjects = async () => {
  try {
    const response = await api("/api/subjects");
    console.log("API Response for subjects:", response);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return [];
  }
};

/**
 * Get tutor management summary for dashboard
 * Note: This endpoint may not exist yet in backend
 * Returns empty array if endpoint is not available
 */
export const getTutorManagementSummary = async () => {
  try {
    const response = await api("/api/admin/dashboard/tutor-management");
    console.log("API Response for tutor management summary:", response);
    return response.data || [];
  } catch (error) {
    // If endpoint doesn't exist (404), return empty array silently
    if (error?.response?.status === 404) {
      console.warn("Tutor management summary endpoint not yet implemented");
      return [];
    }
    console.error("Error fetching tutor management summary:", error);
    return [];
  }
};

/**
 * Get tutor salary history
 * @param {number} tutorId - Tutor user ID
 */
export const getTutorSalaryHistory = async (tutorId) => {
  try {
    const response = await api(`/api/admin/tutor/${tutorId}/salary-history`);
    console.log("API Response for salary history:", response);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching salary history:", error);
    return [];
  }
};

/**
 * Submit salary invoice
 * @param {Object} data - Invoice data
 * @param {number} data.tutor_id - Tutor user ID
 * @param {number} data.amount - Salary amount
 * @param {string} data.paid_at - Payment date (YYYY-MM-DD)
 * @param {File} data.file - Invoice file (PDF/image)
 * @param {string} data.notes - Optional notes
 */
export const submitSalaryInvoice = async (data) => {
  try {
    const formData = new FormData();
    formData.append("tutor_id", data.tutor_id);
    formData.append("amount", data.amount);
    formData.append("paid_at", data.paid_at);
    formData.append("file", data.file);
    if (data.notes) {
      formData.append("notes", data.notes);
    }

    const response = await api("/api/admin/salary-invoice", {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary for FormData
    });
    console.log("API Response for submit invoice:", response);
    return response;
  } catch (error) {
    console.error("Error submitting salary invoice:", error);
    throw error;
  }
};
