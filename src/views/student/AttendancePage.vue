<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data jadwal...</p>
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Header -->
        <div class="mb-8">
          <button
            @click="goBack"
            class="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft class="w-5 h-5 mr-2" />
            Kembali ke Jadwal
          </button>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            Konfirmasi Kehadiran
          </h1>
          <p class="text-gray-600">
            Upload bukti kehadiran dan catatan pembelajaran
          </p>
        </div>

        <!-- Schedule Info Card -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="bg-[#41a6c2]/10 p-3 rounded-lg">
              <Calendar class="w-8 h-8 text-[#41a6c2]" />
            </div>
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">
                {{ scheduleInfo.subject }}
              </h2>
              <div class="space-y-1 text-sm text-gray-600">
                <p class="flex items-center gap-2">
                  <User class="w-4 h-4" />
                  Tutor: {{ scheduleInfo.tutorName }}
                </p>
                <p class="flex items-center gap-2">
                  <Clock class="w-4 h-4" />
                  {{ scheduleInfo.date }} • {{ scheduleInfo.time }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Attendance Form -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            Bukti Kehadiran
          </h3>

          <!-- Notes Input -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Catatan Pembelajaran
              <span class="text-gray-400 font-normal">(Opsional)</span>
            </label>
            <textarea
              v-model="formData.notes"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
              placeholder="Tuliskan catatan tentang pembelajaran hari ini (materi yang dipelajari, kesulitan, dll)"
            ></textarea>
          </div>

          <!-- File Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Upload Bukti Kehadiran
              <span class="text-gray-400 font-normal"
                >(Foto bersama tutor, screenshot meeting, dll)</span
              >
            </label>

            <div
              v-if="!previewUrl"
              @click="$refs.fileInput.click()"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleFileDrop"
              :class="[
                'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
                isDragging
                  ? 'border-[#41a6c2] bg-[#41a6c2]/5'
                  : 'border-gray-300 hover:border-[#41a6c2]',
              ]"
            >
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                @change="handleFileSelect"
                accept="image/*,.pdf"
              />
              <Upload
                :class="[
                  'w-12 h-12 mx-auto mb-3 transition-colors',
                  isDragging ? 'text-[#41a6c2]' : 'text-gray-400',
                ]"
              />
              <p class="text-sm text-gray-600 mb-1">
                Drag & Drop atau klik untuk upload
              </p>
              <p class="text-xs text-gray-400">
                Format: JPG, PNG, PDF (Maks. 5MB)
              </p>
            </div>

            <!-- Preview -->
            <div
              v-else
              class="border-2 border-[#41a6c2] rounded-lg p-4 relative"
            >
              <button
                @click="removeFile"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              >
                <X class="w-4 h-4" />
              </button>

              <div v-if="fileType === 'image'" class="text-center">
                <img
                  :src="previewUrl"
                  alt="Preview"
                  class="max-h-64 mx-auto rounded-lg"
                />
              </div>

              <div v-else class="flex items-center gap-3">
                <FileText class="w-10 h-10 text-[#41a6c2]" />
                <div>
                  <p class="font-medium text-gray-800">{{ fileName }}</p>
                  <p class="text-xs text-gray-500">{{ fileSize }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end gap-3">
          <button
            @click="goBack"
            class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            @click="submitAttendance"
            :disabled="isSubmitting"
            class="px-6 py-3 bg-[#41a6c2] text-white rounded-lg font-semibold hover:bg-[#2e8694] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span v-if="isSubmitting">Mengirim...</span>
            <span v-else>Kirim Bukti Kehadiran</span>
            <Send class="w-4 h-4" v-if="!isSubmitting" />
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Upload,
  X,
  FileText,
  Send,
} from "lucide-vue-next";
import {
  getMySchedules,
  submitAttendance as submitAttendanceAPI,
} from "@/services/studentService";

const router = useRouter();
const route = useRoute();
const fileInput = ref(null);

const isLoading = ref(true);
const isSubmitting = ref(false);
const isDragging = ref(false);

const scheduleInfo = ref({
  id: null,
  subject: "",
  tutorName: "",
  date: "",
  time: "",
});

const formData = ref({
  notes: "",
  file: null,
});

const previewUrl = ref(null);
const fileName = ref("");
const fileSize = ref("");
const fileType = ref("");

const loadScheduleInfo = async () => {
  const scheduleId = parseInt(route.params.scheduleId);

  if (!scheduleId) {
    alert("ID jadwal tidak valid");
    router.push("/student/schedule");
    return;
  }

  try {
    isLoading.value = true;
    const schedules = await getMySchedules("all");
    const schedule = schedules.find((s) => s.id === scheduleId);

    if (!schedule) {
      alert("Jadwal tidak ditemukan");
      router.push("/student/schedule");
      return;
    }

    scheduleInfo.value = {
      id: schedule.id,
      subject: schedule.subject,
      tutorName: schedule.tutor_name,
      date: formatDate(schedule.date),
      time: schedule.time,
    };
  } catch (error) {
    console.error("Error loading schedule:", error);
    alert("Gagal memuat data jadwal");
    router.push("/student/schedule");
  } finally {
    isLoading.value = false;
  }
};

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

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  processFile(file);
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (!file) return;
  processFile(file);
};

const processFile = (file) => {
  // Validate file type
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  if (!validTypes.includes(file.type)) {
    alert("Format file tidak didukung. Gunakan JPG, PNG, atau PDF");
    return;
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("Ukuran file maksimal 5MB");
    return;
  }

  formData.value.file = file;
  fileName.value = file.name;
  fileSize.value = formatFileSize(file.size);

  // Determine file type
  if (file.type.startsWith("image/")) {
    fileType.value = "image";
    const reader = new FileReader();
    reader.onload = (e) => {
      previewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else if (file.type === "application/pdf") {
    fileType.value = "pdf";
    previewUrl.value = "pdf";
  }
};

const removeFile = () => {
  formData.value.file = null;
  previewUrl.value = null;
  fileName.value = "";
  fileSize.value = "";
  fileType.value = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const submitAttendance = async () => {
  if (!formData.value.file && !formData.value.notes) {
    alert("Minimal isi catatan atau upload bukti kehadiran");
    return;
  }

  try {
    isSubmitting.value = true;

    const data = new FormData();
    if (formData.value.notes) {
      data.append("notes", formData.value.notes);
    }
    if (formData.value.file) {
      data.append("proof_document", formData.value.file);
    }

    await submitAttendanceAPI(scheduleInfo.value.id, data);

    alert("Bukti kehadiran berhasil dikirim!");

    // Redirect ke halaman review tutor
    const tutorId = scheduleInfo.value.tutor_id;
    if (tutorId) {
      router.push({
        name: "ReviewPage",
        params: { tutorId },
        query: {
          scheduleId: scheduleInfo.value.id,
          fromAttendance: "true",
        },
      });
    } else {
      // Fallback jika tutorId tidak tersedia
      router.push("/student/schedule");
    }
  } catch (error) {
    console.error("Error submitting attendance:", error);
    alert("Gagal mengirim bukti kehadiran. Silakan coba lagi.");
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push("/student/schedule");
};

onMounted(() => {
  loadScheduleInfo();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
