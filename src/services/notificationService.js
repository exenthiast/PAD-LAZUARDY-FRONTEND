import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

/**
 * Get all notifications (paginated)
 * @param {number} page - Page number
 * @returns {Promise}
 */
export const getNotifications = async (page = 1) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_BASE_URL}/notifications`, {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

/**
 * Get unread notifications count
 * @returns {Promise}
 */
export const getUnreadCount = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(
      `${API_BASE_URL}/notifications/unread-count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    throw error;
  }
};

/**
 * Mark specific notification as read
 * @param {number} id - Notification ID
 * @returns {Promise}
 */
export const markAsRead = async (id) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.patch(
      `${API_BASE_URL}/notifications/${id}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

/**
 * Mark all notifications as read
 * @returns {Promise}
 */
export const markAllAsRead = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.patch(
      `${API_BASE_URL}/notifications/read-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking all as read:", error);
    throw error;
  }
};

/**
 * Delete specific notification
 * @param {number} id - Notification ID
 * @returns {Promise}
 */
export const deleteNotification = async (id) => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${API_BASE_URL}/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

/**
 * Delete all read notifications
 * @returns {Promise}
 */
export const deleteAllRead = async () => {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(
      `${API_BASE_URL}/notifications/read-all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting all read notifications:", error);
    throw error;
  }
};
