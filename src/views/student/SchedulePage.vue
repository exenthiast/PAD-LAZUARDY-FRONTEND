<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Jadwal Belajar</h1>
        <p class="text-gray-600">
          Kelola dan lihat jadwal pertemuan dengan tutor kamu
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6 flex gap-2 border-b border-gray-200">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-4 py-2 font-medium text-sm transition-colors',
            activeTab === tab.value
              ? 'text-[#41a6c2] border-b-2 border-[#41a6c2]'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
        ></div>
        <p class="mt-4 text-gray-600">Memuat jadwal...</p>
      </div>

      <!-- Calendar View (Mendatang) -->
      <div v-else-if="activeTab === 'upcoming'" class="space-y-4">
        <div
          v-for="schedule in upcomingSchedules"
          :key="schedule.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div class="flex items-start gap-4">
              <div class="bg-[#41a6c2]/10 p-3 rounded-lg">
                <Calendar class="w-6 h-6 text-[#41a6c2]" />
              </div>
              <div>
                <h3 class="font-semibold text-lg text-gray-800 mb-1">
                  {{ schedule.subject }}
                </h3>
                <p class="text-sm text-gray-600 mb-2">
                  Tutor: {{ schedule.tutor }}
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ schedule.date }} • {{ schedule.time }}
                  </span>
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      schedule.mode === 'online'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700',
                    ]"
                  >
                    {{ schedule.mode === "online" ? "Online" : "Offline" }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="handleJoinClass(schedule)"
                v-if="schedule.mode === 'online'"
                :disabled="!schedule.meetingLink"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition',
                  schedule.meetingLink
                    ? 'bg-[#41a6c2] text-white hover:bg-[#2e8694]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                ]"
              >
                {{ schedule.meetingLink ? "Gabung Kelas" : "Menunggu Link" }}
              </button>
              <button
                v-if="!schedule.hasAttendance"
                @click="handleSubmitAttendance(schedule.id)"
                class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
              >
                Kirim Absensi
              </button>
              <span
                v-else
                class="px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-700 flex items-center gap-1"
              >
                <CheckCircle class="w-4 h-4" />
                Absensi Terkirim
              </span>
            </div>
          </div>
        </div>

        <div v-if="upcomingSchedules.length === 0" class="text-center py-12">
          <Calendar class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500">Belum ada jadwal mendatang</p>
        </div>
      </div>

      <!-- History -->
      <div v-if="activeTab === 'history'" class="space-y-4">
        <div
          v-for="schedule in historySchedules"
          :key="schedule.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div class="flex items-start gap-4">
              <div class="bg-gray-100 p-3 rounded-lg">
                <CheckCircle class="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 class="font-semibold text-lg text-gray-800 mb-1">
                  {{ schedule.subject }}
                </h3>
                <p class="text-sm text-gray-600 mb-2">
                  Tutor: {{ schedule.tutor }}
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ schedule.date }} • {{ schedule.time }}
                  </span>
                  <span
                    class="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700"
                  >
                    Selesai
                  </span>
                </div>
              </div>
            </div>
            <button
              @click="handleSubmitReview(schedule)"
              class="border-2 border-[#41a6c2] text-[#41a6c2] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#41a6c2] hover:text-white transition"
            >
              Beri Review
            </button>
          </div>
        </div>

        <div v-if="historySchedules.length === 0" class="text-center py-12">
          <CheckCircle class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500">Belum ada riwayat pertemuan</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import { Calendar, Clock, CheckCircle } from "lucide-vue-next";
import { getMySchedules } from "@/services/studentService";

const router = useRouter();
const activeTab = ref("upcoming");
const isLoading = ref(true);
const allSchedules = ref([]);

const tabs = [
  { label: "Mendatang", value: "upcoming" },
  { label: "Riwayat", value: "history" },
];

// Load schedules from backend
const loadSchedules = async () => {
  try {
    isLoading.value = true;
    const response = await getMySchedules("all");
    allSchedules.value = response;
    console.log("Loaded schedules:", response);
  } catch (error) {
    console.error("Error loading schedules:", error);
    alert("Gagal memuat jadwal");
  } finally {
    isLoading.value = false;
  }
};

// Filter schedules based on active tab
const upcomingSchedules = computed(() => {
  console.log("[UPCOMING] Raw schedules from backend:", {
    total: allSchedules.value.length,
    schedules: allSchedules.value.map((s) => ({
      id: s.id,
      subject: s.subject,
      date: s.date,
      status: s.status,
      tutor: s.tutor_name,
    })),
  });

  // Status yang dianggap "upcoming" - backend already filters by date
  // Kita hanya perlu filter berdasarkan status
  const upcomingStatuses = [
    "paid",
    "approved",
    "unpaid",
    "active",
    "scheduled",
    "pending",
  ];

  const filtered = allSchedules.value
    .filter((schedule) => {
      // Safe status check with fallback
      const normalizedStatus = (schedule.status || "").toString().toLowerCase();
      const isUpcoming = upcomingStatuses.includes(normalizedStatus);

      console.log("[UPCOMING FILTER]", {
        id: schedule.id,
        subject: schedule.subject,
        date: schedule.date,
        originalStatus: schedule.status,
        normalizedStatus: normalizedStatus,
        isUpcoming: isUpcoming,
      });

      return isUpcoming;
    })
    .map((schedule) => ({
      id: schedule.id,
      subject: schedule.subject,
      tutor: schedule.tutor_name,
      tutorId: schedule.tutor_id,
      date: formatDate(schedule.date),
      time: schedule.time,
      mode: schedule.course_mode || "online",
      status: schedule.status,
      hasAttendance: schedule.has_attendance,
      meetingLink: schedule.meeting_link,
      meetingLinkSent: schedule.meeting_link_sent,
    }));

  console.log("[UPCOMING] Filtered result:", {
    count: filtered.length,
    schedules: filtered,
  });
  return filtered;
});

const historySchedules = computed(() => {
  console.log("[HISTORY] Raw schedules from backend:", {
    total: allSchedules.value.length,
    schedules: allSchedules.value.map((s) => ({
      id: s.id,
      subject: s.subject,
      date: s.date,
      status: s.status,
    })),
  });

  // Status yang dianggap "completed/history" (case-insensitive)
  const historyStatuses = ["completed", "cancelled", "finished", "done"];

  const filtered = allSchedules.value
    .filter((schedule) => {
      // Safe status check with fallback
      const normalizedStatus = (schedule.status || "").toString().toLowerCase();
      const isHistory = historyStatuses.includes(normalizedStatus);

      console.log("[HISTORY FILTER]", {
        id: schedule.id,
        subject: schedule.subject,
        originalStatus: schedule.status,
        normalizedStatus: normalizedStatus,
        isHistory: isHistory,
      });

      return isHistory;
    })
    .map((schedule) => ({
      id: schedule.id,
      subject: schedule.subject,
      tutor: schedule.tutor_name,
      tutorId: schedule.tutor_id,
      date: formatDate(schedule.date),
      time: schedule.time,
      mode: schedule.course_mode || "online",
      status: schedule.status,
      hasAttendance: schedule.has_attendance,
    }));

  console.log("[HISTORY] Filtered result:", {
    count: filtered.length,
    schedules: filtered,
  });
  return filtered;
});

// Format date helper
const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

const handleJoinClass = (schedule) => {
  if (schedule.mode === "online") {
    if (schedule.meetingLink) {
      // Open meeting link in new tab
      window.open(schedule.meetingLink, "_blank");
    } else {
      alert(
        "Link meeting belum dikirim oleh tutor. Silakan tunggu tutor mengirim link."
      );
    }
  }
};

const handleSubmitAttendance = (scheduleId) => {
  router.push(`/student/attendance/${scheduleId}`);
};

const handleSubmitReview = (schedule) => {
  router.push({
    path: `/student/review/${schedule.tutorId}`,
    query: {
      name: schedule.tutor,
      subject: schedule.subject,
    },
  });
};

onMounted(() => {
  loadSchedules();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
