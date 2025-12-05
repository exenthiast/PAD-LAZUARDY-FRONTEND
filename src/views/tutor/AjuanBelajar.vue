<template>
  <div class="min-h-screen bg-white">
    <NavbarTutor />
    <!-- MAIN -->
    <main class="flex-1 py-8 px-6">
      <!-- Header with Back Button -->
      <div class="max-w-6xl mx-auto mb-6">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-[#41a6c2] hover:text-[#359299] font-medium mb-4"
        >
          <ArrowLeft class="w-5 h-5" />
          Kembali
        </button>

        <h1 class="text-3xl font-bold text-[#41a6c2]">Ajuan Belajar</h1>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="max-w-6xl mx-auto text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
        ></div>
        <p class="mt-4 text-gray-600">Memuat ajuan belajar...</p>
      </div>

      <!-- Student Request Cards -->
      <div v-else class="max-w-6xl mx-auto space-y-6">
        <div
          v-for="student in students"
          :key="student.id"
          class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Student Photo -->
            <div class="flex-shrink-0">
              <img
                :src="student.photo"
                :alt="student.name"
                @error="
                  (e) =>
                    (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      student.name
                    )}&size=150&background=41a6c2&color=fff&bold=true`)
                "
                class="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
              />
            </div>

            <!-- Student Info -->
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                {{ student.name }}
              </h3>

              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <BookOpen class="w-5 h-5 text-[#41a6c2]" />
                  <span class="font-medium">{{ student.subject }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <Calendar class="w-5 h-5 text-[#41a6c2]" />
                  <span>{{ student.schedule }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <Clock class="w-5 h-5 text-[#41a6c2]" />
                  <span>{{ student.time }}</span>
                </div>

                <div v-if="student.phone" class="flex items-center gap-2">
                  <Phone class="w-5 h-5 text-[#41a6c2]" />
                  <span>{{ student.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex md:flex-col gap-3 justify-end items-end">
              <button
                @click="handleReject(student.id)"
                :disabled="processing === student.id"
                class="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ processing === student.id ? "Memproses..." : "Tolak" }}
              </button>
              <button
                @click="handleAccept(student.id)"
                :disabled="processing === student.id"
                class="px-6 py-2 bg-[#41a6c2] text-white rounded-lg font-semibold hover:bg-[#359299] transition w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ processing === student.id ? "Memproses..." : "Terima" }}
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="students.length === 0"
          class="bg-white rounded-2xl shadow-md p-12 text-center"
        >
          <Inbox class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500 text-lg">Belum ada ajuan belajar</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Phone,
  Inbox,
} from "lucide-vue-next";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";
import {
  getTutorDashboard,
  acceptLearningRequest,
  rejectLearningRequest,
} from "@/services/tutorDashboardService";

const router = useRouter();
const isLoading = ref(true);
const processing = ref(null);
const students = ref([]);

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

// Load learning requests from API
const loadLearningRequests = async () => {
  try {
    isLoading.value = true;
    const dashboard = await getTutorDashboard();

    console.log("Dashboard data:", dashboard);

    // Filter only active (pending approval) schedules that haven't been accepted yet
    const activeRequests =
      dashboard.taken_schedules?.filter(
        (schedule) =>
          schedule.status === "active" &&
          schedule.is_accepted === false && // Only show not yet accepted
          new Date(schedule.date) >= new Date().setHours(0, 0, 0, 0)
      ) || [];

    console.log("Active requests:", activeRequests);

    students.value = activeRequests.map((schedule) => ({
      id: schedule.id,
      name: schedule.student_name || "N/A",
      photo:
        schedule.student_photo && schedule.student_photo.trim() !== ""
          ? schedule.student_photo
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              schedule.student_name || "Student"
            )}&size=150&background=41a6c2&color=fff&bold=true`,
      subject: schedule.subject_name || "N/A",
      schedule: formatDate(schedule.date),
      time: schedule.schedule_time || "N/A",
      phone: schedule.student_phone || null,
    }));

    console.log("Formatted students:", students.value);
  } catch (error) {
    console.error("Error loading learning requests:", error);
    alert("Gagal memuat daftar ajuan belajar");
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  router.push("/tutor/dashboard");
};

const handleAccept = async (studentId) => {
  if (!confirm("Apakah Anda yakin ingin menerima ajuan belajar ini?")) {
    return;
  }

  try {
    processing.value = studentId;
    await acceptLearningRequest(studentId);

    const student = students.value.find((s) => s.id === studentId);
    alert(
      `Ajuan dari ${student.name} telah diterima! Siswa akan masuk ke daftar siswa Anda.`
    );

    // Remove from list after accepting
    students.value = students.value.filter((s) => s.id !== studentId);

    // Redirect to dashboard to see updated data
    router.push("/tutor/dashboard");
  } catch (error) {
    console.error("Error accepting request:", error);
    alert("Gagal menerima ajuan belajar");
  } finally {
    processing.value = null;
  }
};

const handleReject = async (studentId) => {
  if (!confirm("Apakah Anda yakin ingin menolak ajuan belajar ini?")) {
    return;
  }

  try {
    processing.value = studentId;
    await rejectLearningRequest(studentId);

    const student = students.value.find((s) => s.id === studentId);
    alert(`Ajuan dari ${student.name} telah ditolak.`);

    // Remove from list after rejecting
    students.value = students.value.filter((s) => s.id !== studentId);
  } catch (error) {
    console.error("Error rejecting request:", error);
    alert("Gagal menolak ajuan belajar");
  } finally {
    processing.value = null;
  }
};

// Load data on mount
onMounted(() => {
  loadLearningRequests();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
