import { api } from "./http";

/**
 * Get tutor dashboard summary (untuk statistik widget)
 */
export const getTutorSummary = async () => {
  try {
    const response = await api("/api/dashboard/tutor/summary");
    console.log("API Response for tutor summary:", response);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching tutor summary:", error);
    throw error;
  }
};

/**
 * Get full tutor dashboard data
 */
export const getTutorDashboard = async () => {
  try {
    const response = await api("/api/dashboard/tutor");
    console.log("🔍 API Response for tutor dashboard:", response);
    console.log("🔍 Response data:", response.data);
    console.log("🔍 Taken schedules:", response.data?.taken_schedules);
    console.log(
      "🔍 Taken schedules count:",
      response.data?.taken_schedules?.length
    );

    // Log each schedule in detail
    if (response.data?.taken_schedules) {
      response.data.taken_schedules.forEach((schedule, index) => {
        console.log(`🔍 Schedule ${index + 1}:`, {
          id: schedule.id,
          student_name: schedule.student_name,
          subject_name: schedule.subject_name,
          date: schedule.date,
          schedule_time: schedule.schedule_time,
          status: schedule.status,
          is_accepted: schedule.is_accepted,
        });
      });
    }

    return response.data || {};
  } catch (error) {
    console.error("Error fetching tutor dashboard:", error);
    throw error;
  }
};

/**
 * Accept learning request
 */
export const acceptLearningRequest = async (requestId) => {
  try {
    const response = await api(`/api/tutor/requests/${requestId}/accept`, {
      method: "POST",
    });
    console.log("Accept request response:", response);
    return response;
  } catch (error) {
    console.error("Error accepting request:", error);
    throw error;
  }
};

/**
 * Reject learning request
 */
export const rejectLearningRequest = async (requestId) => {
  try {
    const response = await api(`/api/tutor/requests/${requestId}/reject`, {
      method: "POST",
    });
    console.log("Reject request response:", response);
    return response;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

/**
 * Get student detail by taken_schedule ID
 */
export const getStudentDetail = async (takenScheduleId) => {
  try {
    const response = await api(`/api/tutor/students/${takenScheduleId}`);
    console.log("Student detail response:", response);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching student detail:", error);
    throw error;
  }
};

/**
 * Get student attendance data
 */
export const getStudentAttendance = async (studentUserId) => {
  try {
    const response = await api(`/api/tutor/attendance/${studentUserId}`);
    console.log("Student attendance response:", response);
    return response.data || {};
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    throw error;
  }
};

/**
 * Save session report
 */
export const saveSessionReport = async (formData) => {
  try {
    const response = await api("/api/tutor/session-report", {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary for FormData
    });
    console.log("Save session report response:", response);
    return response;
  } catch (error) {
    console.error("Error saving session report:", error);
    throw error;
  }
};

/**
 * Send meeting link to student
 */
export const sendMeetingLink = async (
  studentUserId,
  scheduleId,
  meetingLink
) => {
  try {
    const response = await api(`/api/tutor/meeting-link/${studentUserId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schedule_id: scheduleId,
        meeting_link: meetingLink,
      }),
    });
    console.log("Send meeting link response:", response);
    return response;
  } catch (error) {
    console.error("Error sending meeting link:", error);
    throw error;
  }
};
