<template>
  <div class="min-h-screen bg-white">
    <NavbarTutor />

    <!-- Header Section -->
    <div class="bg-[#41a6c2] py-8 px-6">
      <div class="max-w-6xl mx-auto">
        <button
          @click="goBack"
          class="mb-4 flex items-center text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft class="w-5 h-5 mr-2" />
          Kembali
        </button>

        <!-- Student Info -->
        <div class="flex items-center space-x-4 text-white">
          <div
            class="w-20 h-20 rounded-full overflow-hidden bg-white border-4 border-white"
          >
            <img
              :src="student.photo"
              :alt="student.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 class="text-2xl font-bold">{{ student.name }}</h1>
            <p class="text-white/90">{{ student.subject }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data absensi...</p>
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Progress Section -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">
              {{ student.subject }} - {{ student.sessions }} Pertemuan
            </h2>
            <p class="text-sm text-gray-500">
              Sesi selesai: {{ student.completedSessions }} dari
              {{ student.sessions }}
            </p>
          </div>

          <!-- Progress Bar -->
          <div
            class="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden"
          >
            <div
              class="absolute top-0 left-0 h-full bg-[#41a6c2] transition-all duration-300"
              :style="{ width: `${student.progress}%` }"
            ></div>
            <div
              class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700"
            >
              {{ student.progress }}%
            </div>
          </div>
        </div>

        <!-- Schedule Calendar -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 class="text-lg font-semibold text-[#41a6c2] mb-4">
            Jadwal Tutor
          </h2>

          <!-- Date Navigation -->
          <div class="flex items-center justify-center space-x-4 mb-6">
            <button
              @click="previousWeek"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft class="w-5 h-5 text-gray-600" />
            </button>

            <div class="flex items-center space-x-2">
              <Calendar class="w-5 h-5 text-[#41a6c2]" />
              <span class="text-sm font-medium text-gray-700">{{
                currentWeekRange
              }}</span>
            </div>

            <button
              @click="nextWeek"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight class="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <!-- Days Grid -->
          <div class="grid grid-cols-7 gap-2 mb-6">
            <div v-for="day in weekDays" :key="day.date" class="text-center">
              <div class="text-xs text-gray-500 mb-2">{{ day.name }}</div>
              <div
                :class="[
                  'p-2 rounded-lg text-sm font-medium transition-colors',
                  day.hasSession
                    ? 'bg-[#41a6c2] text-white'
                    : 'bg-gray-100 text-gray-600',
                ]"
              >
                {{ day.date }}
              </div>
            </div>
          </div>
        </div>

        <!-- Meeting Link Section (Online Mode Only) -->
        <div
          v-if="meetingLinkData.courseMode === 'online'"
          class="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 class="text-lg font-semibold text-[#41a6c2] mb-4">
            Link Kelas Online
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Link Meeting (Zoom / Google Meet)
              </label>
              <input
                v-model="meetingLinkData.link"
                type="url"
                :disabled="meetingLinkData.isSent"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2] disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="https://meet.google.com/abc-defg-hij atau https://zoom.us/j/123456789"
              />
            </div>

            <div class="flex items-center gap-3">
              <button
                v-if="!meetingLinkData.isSent"
                @click="sendMeetingLinkToStudent"
                :disabled="isSendingLink || !meetingLinkData.link"
                class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSendingLink">Mengirim...</span>
                <span v-else>Kirim Link ke Student</span>
              </button>

              <span
                v-else
                class="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold flex items-center gap-2"
              >
                <CheckCircle class="w-5 h-5" />
                Link Sudah Dikirim
              </span>
            </div>

            <p class="text-sm text-gray-500">
              💡 Link akan otomatis muncul di jadwal student dan notifikasi akan
              dikirim.
            </p>
          </div>
        </div>

        <!-- Review Pembelajaran -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 class="text-lg font-semibold text-[#41a6c2] mb-4">
            Review Pembelajaran
          </h2>

          <div class="flex flex-wrap gap-2 mb-4">
            <button
              v-for="session in sessionData"
              :key="session.id"
              @click="selectedSession = session.id"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedSession === session.id
                  ? 'bg-[#41a6c2] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ]"
            >
              Pertemuan {{ session.id }}
            </button>
          </div>

          <!-- Session Content -->
          <div v-if="currentSessionData" class="space-y-4">
            <!-- Materi yang di pelajari -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Materi yang di pelajari</label
              >
              <input
                v-model="currentSessionData.material"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]"
                placeholder="Masukkan materi yang dipelajari"
              />
            </div>

            <!-- Nilai tugas -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nilai tugas</label
              >
              <input
                v-model="currentSessionData.score"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]"
                placeholder="Masukkan nilai tugas"
              />
            </div>

            <!-- Review dari tutor -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Review dari tutor</label
              >
              <textarea
                v-model="currentSessionData.review"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]"
                placeholder="Masukkan review pembelajaran"
              ></textarea>
            </div>

            <!-- Dokumen tasi pertemuan -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Dokumen tasi pertemuan</label
              >

              <!-- Show existing document if available -->
              <div
                v-if="currentSessionData.documentUrl && !uploadedFile"
                class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <p class="text-sm text-blue-800 mb-2">
                  Dokumen sudah diupload: {{ currentSessionData.fileName }}
                </p>
                <a
                  :href="currentSessionData.documentUrl"
                  target="_blank"
                  class="text-sm text-[#41a6c2] hover:underline"
                >
                  Lihat Dokumen →
                </a>
              </div>

              <div
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#41a6c2] transition-colors cursor-pointer"
                @click="$refs.fileInput.click()"
              >
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  accept="image/*,.pdf"
                />
                <Upload class="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p class="text-sm text-gray-500">
                  Drag & Drop atau klik<br />Upload foto pertemuan
                </p>
                <button
                  class="mt-4 px-6 py-2 bg-[#41a6c2] text-white rounded-lg text-sm font-medium hover:bg-[#358a9f] transition-colors"
                >
                  Pilih File
                </button>
              </div>
              <p
                v-if="uploadedFile || currentSessionData.fileName"
                class="mt-2 text-sm text-gray-600"
              >
                File: {{ uploadedFile?.name || currentSessionData.fileName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            @click="saveAttendance"
            class="px-8 py-3 bg-[#41a6c2] hover:bg-[#358a9f] text-white rounded-lg font-semibold transition-colors"
          >
            Simpan Absensi
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle,
} from "lucide-vue-next";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";
import {
  getStudentAttendance,
  saveSessionReport,
  sendMeetingLink,
} from "@/services/tutorDashboardService";

const router = useRouter();
const route = useRoute();
const fileInput = ref(null);

// Loading state
const isLoading = ref(true);
const isSendingLink = ref(false);

// Student data
const student = ref({
  id: null,
  name: "",
  subject: "",
  sessions: 0,
  completedSessions: 0,
  progress: 0,
  photo: "",
});

// Student package ID (needed for saving)
const studentPackageId = ref(null);

// Meeting link data
const meetingLinkData = ref({
  scheduleId: null,
  link: "",
  isSent: false,
  courseMode: "online",
});

// Session data - initialize with empty sessions
const selectedSession = ref(1);
const sessionData = ref([]);

// Uploaded file
const uploadedFile = ref(null);

const currentSessionData = computed(() => {
  return sessionData.value.find((s) => s.id === selectedSession.value);
});

// Calendar data
const currentWeekStart = ref(new Date());
const scheduleDates = ref([]);

const currentWeekRange = computed(() => {
  const start = new Date(currentWeekStart.value);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return `${formatDate(start)} - ${formatDate(end)}`;
});

const weekDays = computed(() => {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const result = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekStart.value);
    date.setDate(date.getDate() + i);

    // Check if this date has a scheduled session
    const dateStr = date.toISOString().split("T")[0];
    const hasSession = scheduleDates.value.some((sd) => {
      const scheduleDate = new Date(sd.date).toISOString().split("T")[0];
      return scheduleDate === dateStr;
    });

    result.push({
      name: days[i],
      date: date.getDate(),
      hasSession: hasSession,
    });
  }

  return result;
});

const previousWeek = () => {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() - 7);
  currentWeekStart.value = newDate;
};

const nextWeek = () => {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() + 7);
  currentWeekStart.value = newDate;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && currentSessionData.value) {
    uploadedFile.value = file;
    currentSessionData.value.fileName = file.name;
  }
};

// Watch selectedSession to reset uploaded file when switching sessions
watch(selectedSession, () => {
  uploadedFile.value = null;
});

const saveAttendance = async () => {
  if (!currentSessionData.value) {
    alert("Pilih pertemuan terlebih dahulu");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("student_package_id", studentPackageId.value);
    formData.append("session_number", selectedSession.value);
    formData.append("material", currentSessionData.value.material || "");
    formData.append("score", currentSessionData.value.score || "");
    formData.append("review", currentSessionData.value.review || "");
    formData.append("session_date", new Date().toISOString().split("T")[0]);

    if (uploadedFile.value) {
      formData.append("document", uploadedFile.value);
    }

    await saveSessionReport(formData);
    alert("Data absensi berhasil disimpan!");

    // Reload data
    await loadAttendanceData();
    uploadedFile.value = null;
  } catch (error) {
    console.error("Error saving attendance:", error);
    alert("Gagal menyimpan data absensi");
  }
};

const loadAttendanceData = async () => {
  const studentId = parseInt(route.query.id);
  if (!studentId) {
    alert("Student ID tidak valid");
    router.push("/tutor/dashboard");
    return;
  }

  try {
    isLoading.value = true;
    const response = await getStudentAttendance(studentId);

    console.log("Attendance data:", response);

    // Set student info
    student.value = {
      id: response.student.id,
      name: response.student.name,
      subject: response.student.subject,
      sessions: response.sessions.total,
      completedSessions: response.sessions.completed,
      progress: response.sessions.progress,
      photo: response.student.photo,
    };

    studentPackageId.value = response.student_package_id;
    scheduleDates.value = response.schedule_dates || [];

    // Set meeting link data from first schedule (if available)
    if (scheduleDates.value.length > 0) {
      const firstSchedule = scheduleDates.value[0];
      meetingLinkData.value = {
        scheduleId: firstSchedule.schedule_id,
        link: firstSchedule.meeting_link || "",
        isSent: firstSchedule.meeting_link_sent || false,
        courseMode: firstSchedule.course_mode || "online",
      };
    }

    // Initialize session data based on total sessions
    const totalSessions = response.sessions.total;
    sessionData.value = [];

    for (let i = 1; i <= totalSessions; i++) {
      // Find existing report for this session
      const existingReport = response.session_reports?.find(
        (r) => r.session_number === i
      );

      sessionData.value.push({
        id: i,
        material: existingReport?.material || "",
        score: existingReport?.score || "",
        review: existingReport?.review || "",
        fileName: existingReport?.document_url
          ? existingReport.document_url.split("/").pop()
          : "",
        documentUrl: existingReport?.document_url || null,
      });
    }
  } catch (error) {
    console.error("Error loading attendance:", error);
    alert("Gagal memuat data absensi");
    router.push("/tutor/dashboard");
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/tutor/dashboard");
};

const sendMeetingLinkToStudent = async () => {
  if (!meetingLinkData.value.link) {
    alert("Masukkan link meeting terlebih dahulu");
    return;
  }

  // Validate URL
  try {
    new URL(meetingLinkData.value.link);
  } catch {
    alert(
      "Link tidak valid. Masukkan URL yang benar (contoh: https://meet.google.com/xxx)"
    );
    return;
  }

  // Validate schedule ID
  if (!meetingLinkData.value.scheduleId) {
    alert(
      "Schedule ID tidak ditemukan. Pastikan student memiliki jadwal aktif."
    );
    console.error("Meeting link data:", meetingLinkData.value);
    return;
  }

  console.log("Sending meeting link:", {
    studentId: student.value.id,
    scheduleId: meetingLinkData.value.scheduleId,
    link: meetingLinkData.value.link,
  });

  try {
    isSendingLink.value = true;
    const response = await sendMeetingLink(
      student.value.id,
      meetingLinkData.value.scheduleId,
      meetingLinkData.value.link
    );

    console.log("Meeting link sent successfully:", response);
    meetingLinkData.value.isSent = true;
    alert("Link meeting berhasil dikirim ke student!");
  } catch (error) {
    console.error("Error sending meeting link:", error);

    let errorMessage = "Gagal mengirim link meeting";

    if (error && error.response && error.response.data) {
      errorMessage = error.response.data.message || errorMessage;
    } else if (error && error.message) {
      errorMessage = error.message;
    }

    alert(`Gagal mengirim link meeting: ${errorMessage}`);
  } finally {
    isSendingLink.value = false;
  }
};

onMounted(() => {
  loadAttendanceData();
});
</script>
