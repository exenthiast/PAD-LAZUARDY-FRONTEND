<template>
  <div class="min-h-screen bg-white pb-20">
    <NavbarTutor />

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
      ></div>
    </div>

    <!-- Content -->
    <template v-else-if="student">
      <!-- Header -->
      <div class="bg-[#41a6c2] text-white py-12 px-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <ArrowLeft class="w-6 h-6 text-white" />
            </button>
            <h1 class="text-xl font-semibold">Profil Siswa</h1>
          </div>
        </div>
      </div>

      <!-- Profile Photo -->
      <div class="flex justify-center -mt-12 mb-6">
        <div
          class="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200"
        >
          <img
            :src="student.photo || getDefaultAvatar(student.nama)"
            :alt="student.nama"
            @error="(e) => (e.target.src = getDefaultAvatar(student.nama))"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Detail Card -->
      <div class="max-w-4xl mx-auto px-6">
        <div class="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <!-- Detail Pribadi -->
          <div>
            <h2 class="text-[#41a6c2] text-lg font-semibold mb-4">
              Detail Pribadi
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Nama Lengkap</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.nama }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Jenis Kelamin</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.jenisKelamin }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Tanggal Lahir</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.tanggalLahir }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">No. Telepon</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.telepon }}
                </p>
              </div>
            </div>
          </div>

          <!-- Detail Alamat -->
          <div>
            <h2 class="text-[#41a6c2] text-lg font-semibold mb-4">
              Detail Alamat
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <p class="text-xs text-gray-500 mb-1">Alamat Lengkap</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.alamat.detail }}
                </p>
              </div>
            </div>

            <!-- Map -->
            <div
              class="mt-4 w-full h-64 bg-gray-100 rounded-lg overflow-hidden"
            >
              <div
                v-if="student.alamat.latitude && student.alamat.longitude"
                class="w-full h-full"
              >
                <iframe
                  :src="`https://www.google.com/maps?q=${student.alamat.latitude},${student.alamat.longitude}&output=embed`"
                  width="100%"
                  height="100%"
                  style="border: 0"
                  allowfullscreen=""
                  loading="lazy"
                >
                </iframe>
              </div>
              <!-- Fallback jika tidak ada koordinat -->
              <div
                v-else
                class="flex items-center justify-center h-full bg-gray-100"
              >
                <div class="text-center text-gray-500">
                  <MapPin class="w-12 h-12 mx-auto mb-2" />
                  <p class="text-sm">{{ student.alamat.detail }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Detail Sekolah -->
          <div>
            <h2 class="text-[#41a6c2] text-lg font-semibold mb-4">
              Detail Sekolah
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Asal Sekolah</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.sekolah.nama }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Kelas</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.sekolah.kelas }}
                </p>
              </div>
            </div>
          </div>

          <!-- Kontak Orang Tua/Wali -->
          <div>
            <h2 class="text-[#41a6c2] text-lg font-semibold mb-4">
              Kontak Orang tua/Wali
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Nama Orang tua/Wali</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.namaOrangTua }}
                </p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Nomor Handphone</p>
                <p class="text-sm font-medium text-gray-800">
                  {{ student.teleponOrangTua }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 pt-4">
            <button
              @click="acceptStudent"
              :disabled="processing"
              class="flex-1 bg-[#41a6c2] hover:bg-[#358a9f] text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ processing ? "Memproses..." : "Terima" }}
            </button>
            <button
              @click="rejectStudent"
              :disabled="processing"
              class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ processing ? "Memproses..." : "Tolak" }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ArrowLeft, MapPin } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavbarTutor from "../../components/layout/navbar-tutor.vue";
import {
  getStudentDetail,
  acceptLearningRequest,
  rejectLearningRequest,
} from "@/services/tutorDashboardService";

const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const processing = ref(false);
const student = ref(null);

const getDefaultAvatar = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "Student"
  )}&size=300&background=41a6c2&color=fff&bold=true`;
};

onMounted(async () => {
  const takenScheduleId = route.query.id;

  if (!takenScheduleId) {
    alert("ID tidak valid");
    router.push("/tutor/dashboard");
    return;
  }

  try {
    isLoading.value = true;
    const data = await getStudentDetail(takenScheduleId);
    student.value = data;
    console.log("Student detail loaded:", data);
  } catch (error) {
    console.error("Error loading student detail:", error);
    alert("Gagal memuat data siswa");
    router.push("/tutor/dashboard");
  } finally {
    isLoading.value = false;
  }
});

const goBack = () => {
  router.push("/tutor/dashboard");
};

const acceptStudent = async () => {
  if (!confirm(`Terima siswa ${student.value.nama}?`)) {
    return;
  }

  try {
    processing.value = true;
    await acceptLearningRequest(student.value.id);
    alert("Siswa berhasil diterima! Siswa akan masuk ke daftar siswa Anda.");
    router.push("/tutor/dashboard");
  } catch (error) {
    console.error("Error accepting student:", error);
    alert("Gagal menerima siswa");
  } finally {
    processing.value = false;
  }
};

const rejectStudent = async () => {
  if (!confirm(`Tolak siswa ${student.value.nama}?`)) {
    return;
  }

  try {
    processing.value = true;
    await rejectLearningRequest(student.value.id);
    alert("Siswa ditolak!");
    router.push("/tutor/dashboard");
  } catch (error) {
    console.error("Error rejecting student:", error);
    alert("Gagal menolak siswa");
  } finally {
    processing.value = false;
  }
};
</script>
