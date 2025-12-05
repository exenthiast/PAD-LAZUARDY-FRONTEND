import { api } from "./http";

/**
 * Create order for study package
 * @param {number} packageId - Package ID
 * @param {number} totalAmount - Total amount after discount
 * @param {string} paymentMethod - Payment method (transfer, e-wallet, cash)
 */
export const createOrder = async (packageId, totalAmount, paymentMethod) => {
  try {
    // Get token explicitly to ensure it's included in the request
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }

    // Debug: Log payload before sending
    const payload = {
      package_id: packageId,
      total_amount: totalAmount,
      payment_method: paymentMethod,
    };

    console.log("[CREATE ORDER] Payload:", payload);
    console.log("[CREATE ORDER] Package ID type:", typeof packageId);
    console.log("[CREATE ORDER] Package ID value:", packageId);

    const response = await api("/api/package/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Explicit Authorization header
      },
      body: JSON.stringify(payload),
    });
    console.log("Create order response:", response);
    return response;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

/**
 * Upload payment proof
 * @param {number} orderId - Order ID
 * @param {File} file - Payment proof file (jpg, png, pdf)
 */
export const uploadPaymentProof = async (orderId, file) => {
  try {
    // Get token explicitly
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login ulang.");
    }

    const formData = new FormData();
    formData.append("order_id", orderId);
    formData.append("file_upload", file);

    const response = await api("/api/package/payment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Explicit Authorization header
        // Don't set Content-Type for FormData - browser sets it with boundary
      },
      body: formData,
    });
    console.log("Upload payment proof response:", response);
    return response;
  } catch (error) {
    console.error("Error uploading payment proof:", error);
    throw error;
  }
};

/**
 * Get payment history
 */
export const getPaymentHistory = async () => {
  try {
    const response = await api("/api/payment/history");
    console.log("Payment history response:", response);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
};

/**
 * Get payment detail
 * @param {number} paymentId - Payment ID
 */
export const getPaymentDetail = async (paymentId) => {
  try {
    const response = await api(
      `/api/payment/history/detail?payment_id=${paymentId}`
    );
    console.log("Payment detail response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching payment detail:", error);
    throw error;
  }
};
