<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <NavbarTutor />
    <!-- MAIN -->
    <main class="flex-1 py-8 px-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="max-w-6xl mx-auto text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data dashboard...</p>
      </div>

      <!-- Dashboard Content -->
      <template v-else>
        <!-- Statistik -->
        <div class="max-w-6xl mx-auto mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white shadow rounded-2xl p-4">
              <h3 class="text-sm text-gray-500">Total Siswa</h3>
              <p class="text-2xl font-bold text-[#41a6c2]">
                {{ totalStudents }}
              </p>
              <p class="text-xs text-gray-400 mt-1">Siswa yang memilih Anda</p>
            </div>
            <div class="bg-white shadow rounded-2xl p-4">
              <h3 class="text-sm text-gray-500">Sesi Bulan Ini</h3>
              <p class="text-2xl font-bold text-[#41a6c2]">
                {{ sessionsThisMonth }}
              </p>
              <p class="text-xs text-gray-400 mt-1">Sesi yang diselesaikan</p>
            </div>
            <div class="bg-white shadow rounded-2xl p-4">
              <h3 class="text-sm text-gray-500">Laporan Terkirim</h3>
              <p class="text-2xl font-bold text-[#41a6c2]">
                {{ laporanTerkirim }}
              </p>
              <p class="text-xs text-gray-400 mt-1">Data dummy</p>
            </div>
          </div>
        </div>

        <!-- Daftar Ajuan Belajar -->
        <div class="max-w-6xl mx-auto mb-8">
          <div class="bg-white shadow rounded-2xl p-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-[#41a6c2] text-lg font-semibold">
                Daftar Ajuan Belajar
              </h2>
              <router-link
                to="/tutor/ajuan-belajar"
                class="text-[#41a6c2] hover:text-[#358a9f] text-sm font-medium hover:underline space-x-2"
              >
                Lihat Selengkapnya
              </router-link>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="border-b-2 border-gray-200">
                  <tr class="text-left text-gray-600">
                    <th class="pb-3 px-2">Nomor</th>
                    <th class="pb-3 px-2">Nama</th>
                    <th class="pb-3 px-2">Mapel</th>
                    <th class="pb-3 px-2">Tanggal</th>
                    <th class="pb-3 px-2">Jam</th>
                    <th class="pb-3 px-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="learningRequests.length === 0">
                    <td
                      colspan="6"
                      class="py-8 text-center text-gray-400 italic"
                    >
                      Tidak ada ajuan belajar
                    </td>
                  </tr>
                  <tr
                    v-for="(request, index) in learningRequests"
                    :key="request.id"
                    class="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td class="py-3 px-2">{{ index + 1 }}</td>
                    <td class="py-3 px-2 font-medium text-gray-800">
                      {{ request.name }}
                    </td>
                    <td class="py-3 px-2 text-gray-600">
                      {{ request.subject }}
                    </td>
                    <td class="py-3 px-2 text-gray-600">{{ request.date }}</td>
                    <td class="py-3 px-2 text-gray-600">{{ request.time }}</td>
                    <td class="py-3 px-2 text-center">
                      <button
                        @click="viewRequestDetail(request.id)"
                        class="bg-[#41a6c2] hover:bg-[#358a9f] text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        Lihat Data
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Jadwal Harian -->
        <div class="max-w-6xl mx-auto mb-8">
          <div class="bg-white shadow rounded-2xl p-4">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-lg font-semibold text-[#41a6c2]">
                Jadwal Hari Ini
              </h2>

              <div class="flex items-center space-x-2">
                <button
                  @click="prevDay"
                  class="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>

                <input
                  type="date"
                  v-model="selectedDate"
                  class="border rounded-lg px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-400"
                />

                <button
                  @click="nextDay"
                  class="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div
              class="h-[400px] overflow-y-auto border-t border-gray-200 pt-2"
            >
              <div
                v-for="(slot, index) in schedule"
                :key="index"
                class="flex items-center py-2 border-b border-gray-100 last:border-none"
              >
                <div class="w-20 text-sm font-medium text-gray-600">
                  {{ slot.time }}
                </div>

                <div v-if="slot.session" class="flex-1">
                  <div
                    class="p-3 rounded-xl shadow-sm border flex justify-between items-center"
                    :class="{
                      'bg-green-100 border-green-400':
                        slot.session.status === 'berjalan',
                      'bg-blue-100 border-blue-400':
                        slot.session.status === 'selesai',
                      'bg-red-100 border-red-400':
                        slot.session.status === 'belum',
                    }"
                  >
                    <div>
                      <p class="text-gray-800 font-semibold text-sm">
                        {{ slot.session.student }}
                      </p>
                      <p class="text-gray-600 text-xs">
                        {{ slot.session.subject }}
                      </p>
                    </div>
                    <span
                      class="text-xs px-2 py-1 rounded-full font-medium"
                      :class="{
                        'bg-green-500 text-white':
                          slot.session.status === 'berjalan',
                        'bg-blue-500 text-white':
                          slot.session.status === 'selesai',
                        'bg-red-500 text-white':
                          slot.session.status === 'belum',
                      }"
                    >
                      {{ slot.session.status }}
                    </span>
                  </div>
                </div>

                <div v-else class="flex-1 text-gray-400 text-sm italic">
                  — kosong —
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Daftar Siswa -->
        <div class="max-w-6xl mx-auto">
          <div class="bg-white shadow rounded-2xl p-4">
            <h2 class="text-lg font-semibold text-[#41a6c2] mb-4">
              Daftar Siswa
            </h2>
            <div class="overflow-y-auto max-h-[300px]">
              <table class="min-w-full text-sm text-left">
                <thead class="text-gray-600 border-b">
                  <tr>
                    <th class="pb-2">Nama</th>
                    <th class="pb-2">Mapel</th>
                    <th class="pb-2">Status</th>
                    <th class="pb-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="student in students"
                    :key="student.name"
                    class="border-b hover:bg-gray-50"
                  >
                    <td class="py-2 flex items-center space-x-2">
                      <img
                        :src="student.image"
                        alt="avatar"
                        class="w-8 h-8 rounded-full object-cover"
                      />
                      <span class="font-medium text-gray-700">{{
                        student.name
                      }}</span>
                    </td>
                    <td>{{ student.subject }}</td>
                    <td>
                      <span
                        class="px-2 py-1 rounded-full text-xs font-semibold"
                        :class="
                          student.active
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        "
                      >
                        {{ student.active ? "Aktif" : "Tidak Aktif" }}
                      </span>
                    </td>
                    <td class="text-center">
                      <button
                        @click="viewAttendance(student.id)"
                        class="bg-[#41a6c2] hover:bg-[#358a9f] text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        Lihat Absensi
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";
import {
  getTutorSummary,
  getTutorDashboard,
} from "@/services/tutorDashboardService";

const router = useRouter();

// Loading states
const isLoading = ref(true);
const dashboardData = ref(null);
const summaryData = ref(null);

// Get today's date in local timezone (YYYY-MM-DD)
const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const selectedDate = ref(getTodayDate());

// Computed properties untuk statistik
const totalStudents = computed(() => summaryData.value?.total_students || 0);
const sessionsThisMonth = computed(
  () => summaryData.value?.completed_sessions_this_month || 0
);
const laporanTerkirim = ref(0); // Dummy - sesuai permintaan user

// Computed untuk daftar ajuan belajar (active schedules dari siswa)
const learningRequests = computed(() => {
  if (!dashboardData.value?.taken_schedules) return [];

  console.log("All taken_schedules:", dashboardData.value.taken_schedules);

  // Filter schedule yang active (sudah dibayar, menunggu konfirmasi tutor) dan belum diterima
  const filtered = dashboardData.value.taken_schedules.filter((schedule) => {
    const isActive = schedule.status === "active";
    const isFutureDate =
      new Date(schedule.date) >= new Date().setHours(0, 0, 0, 0);
    const isNotAccepted = schedule.is_accepted === false; // Only show not yet accepted

    console.log(
      `Schedule ${schedule.id}: status=${schedule.status}, date=${schedule.date}, isActive=${isActive}, isFuture=${isFutureDate}, isAccepted=${schedule.is_accepted}`
    );

    return isActive && isFutureDate && isNotAccepted;
  });

  console.log("Filtered learning requests:", filtered);

  return filtered.map((schedule, index) => ({
    id: schedule.id,
    name: schedule.student_name || "N/A",
    subject: schedule.subject_name || "N/A",
    date: formatDate(schedule.date),
    time: schedule.schedule_time || "N/A",
  }));
});

// Computed untuk daftar siswa
const students = computed(() => {
  if (!dashboardData.value?.students) return [];

  return dashboardData.value.students.map((student) => ({
    id: student.student_user_id,
    name: student.student_name || "N/A",
    subject: student.subject_name || "N/A",
    active: student.remaining_session > 0,
    image:
      student.student_photo ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        student.student_name || "S"
      )}&size=80&background=41a6c2&color=fff`,
    remaining_session: student.remaining_session,
    total_session: student.total_session,
  }));
});

// Computed untuk jadwal hari ini
const schedule = computed(() => {
  const timeSlots = [];
  for (let hour = 7; hour <= 20; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    timeSlots.push({ time, session: null });
  }

  if (!dashboardData.value?.taken_schedules) return timeSlots;

  // Filter schedules untuk tanggal yang dipilih dan sudah diterima
  const schedulesForDate = dashboardData.value.taken_schedules.filter(
    (schedule) => {
      // Convert ISO date to YYYY-MM-DD for comparison
      const scheduleDate = schedule.date ? schedule.date.split("T")[0] : "";
      return (
        scheduleDate === selectedDate.value &&
        schedule.is_accepted === true && // Only show accepted schedules
        schedule.status === "active"
      );
    }
  );

  // Map schedules ke time slots
  schedulesForDate.forEach((schedule) => {
    const scheduleTime = schedule.schedule_time?.substring(0, 5); // "08:00:00" -> "08:00"
    const slotIndex = timeSlots.findIndex((slot) => slot.time === scheduleTime);

    if (slotIndex !== -1) {
      timeSlots[slotIndex].session = {
        student: schedule.student_name || "N/A",
        subject: schedule.subject_name || "N/A",
        status: mapScheduleStatus(schedule.status),
      };
    }
  });

  return timeSlots;
});

// Helper function untuk format tanggal
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

// Helper function untuk mapping status
const mapScheduleStatus = (status) => {
  const statusMap = {
    completed: "selesai",
    active: "belum", // Active = menunggu/belum dimulai
    expired: "terlewat",
    cancelled: "dibatalkan",
  };
  return statusMap[status] || "belum";
};

// Load dashboard data
const loadDashboard = async () => {
  try {
    isLoading.value = true;

    // Load summary dan full dashboard secara parallel
    const [summary, dashboard] = await Promise.all([
      getTutorSummary(),
      getTutorDashboard(),
    ]);

    summaryData.value = summary;
    dashboardData.value = dashboard;

    console.log("Dashboard loaded:", { summary, dashboard });
  } catch (error) {
    console.error("Error loading dashboard:", error);
    alert("Gagal memuat data dashboard");
  } finally {
    isLoading.value = false;
  }
};

const prevDay = () => {
  const d = new Date(selectedDate.value);
  d.setDate(d.getDate() - 1);
  selectedDate.value = d.toISOString().substr(0, 10);
};

const nextDay = () => {
  const d = new Date(selectedDate.value);
  d.setDate(d.getDate() + 1);
  selectedDate.value = d.toISOString().substr(0, 10);
};

const viewRequestDetail = (id) => {
  router.push(`/tutor/data-siswa?id=${id}`);
};

const viewAttendance = (studentId) => {
  router.push(`/tutor/absensi-student?id=${studentId}`);
};

// Load data on mount
onMounted(() => {
  loadDashboard();
});
</script>
