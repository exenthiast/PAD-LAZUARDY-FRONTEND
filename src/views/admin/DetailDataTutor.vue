<template>
  <div class="min-h-screen bg-gradient-to-br from-[#e3f2f7] to-[#f0f9fc]">
    <!-- Navbar -->
    <NavbarAdmin />

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="flex items-center gap-2 text-[#41a6c2] hover:text-[#358a9f] font-medium mb-6 transition"
      >
        <ArrowLeft class="w-5 h-5" />
        <span>Kembali ke Dashboard</span>
      </button>

      <!-- Title -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-[#41a6c2] mb-2">Detail Tutor</h2>
      </div>

      <!-- Photo Profile -->
      <div v-if="!loading && tutor.photo" class="flex justify-center mb-6">
        <img
          :src="tutor.photo"
          alt="Foto Profil"
          class="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-[#41a6c2]"
        />
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#41a6c2]"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data tutor...</p>
      </div>

      <!-- Detail Tutor -->
      <section v-else class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
        <h3
          class="text-xl font-bold text-[#41a6c2] mb-6 pb-3 border-b-2 border-[#41a6c2]/20"
        >
          Detail Tutor
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Nama Lengkap</label>
            <p class="text-base font-semibold text-gray-800">
              {{ tutor.namaLengkap }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Email</label>
            <p class="text-base font-medium text-gray-800">{{ tutor.email }}</p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Jenis Kelamin</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ tutor.jenisKelamin }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Tanggal Lahir</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ tutor.tanggalLahir }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">No. telepon</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.noTelepon }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Agama</label>
            <p class="text-base font-medium text-gray-800">{{ tutor.agama }}</p>
          </div>
        </div>
      </section>

      <!-- Tentang Saya -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
        <h3
          class="text-xl font-bold text-[#41a6c2] mb-6 pb-3 border-b-2 border-[#41a6c2]/20"
        >
          Tentang Saya
        </h3>
        <p class="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
          {{ tutor.tentangSaya || "Belum ada deskripsi" }}
        </p>
      </section>

      <!-- Detail Alamat -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
        <h3
          class="text-xl font-bold text-[#41a6c2] mb-6 pb-3 border-b-2 border-[#41a6c2]/20"
        >
          Detail Alamat
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Provinsi</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.provinsi }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Kota/Kabupaten</label
            >
            <p class="text-base font-medium text-gray-800">{{ tutor.kota }}</p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Kecamatan</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.kecamatan }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Desa/Kelurahan</label
            >
            <p class="text-base font-medium text-gray-800">{{ tutor.desa }}</p>
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm text-gray-500 mb-1"
              >Alamat Lengkap</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ tutor.alamatLengkap }}
            </p>
          </div>
        </div>

        <!-- Google Maps -->
        <div v-if="tutor.latitude && tutor.longitude" class="mt-6">
          <label class="block text-sm text-gray-500 mb-2">Lokasi di Peta</label>
          <div class="rounded-lg overflow-hidden shadow-md">
            <iframe
              :src="`https://maps.google.com/maps?q=${tutor.latitude},${tutor.longitude}&z=15&output=embed`"
              width="100%"
              height="300"
              frameborder="0"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      <!-- Data Akademik & Pengalaman -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
        <h3
          class="text-xl font-bold text-[#41a6c2] mb-6 pb-3 border-b-2 border-[#41a6c2]/20"
        >
          Data Akademik & Pengalaman
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Keahlian</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.keahlian || "N/A" }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Market Siswa</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.marketSiswa || "N/A" }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Pengalaman Mengajar</label
            >
            <p class="text-base font-medium text-gray-800 whitespace-pre-wrap">
              {{ tutor.pengalaman || "N/A" }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Skill Bahasa</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.skillBahasa || "N/A" }}
            </p>
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm text-gray-500 mb-1">Organisasi</label>
            <p class="text-base font-medium text-gray-800 whitespace-pre-wrap">
              {{ tutor.organisasi || "N/A" }}
            </p>
          </div>
        </div>

        <!-- Pendidikan -->
        <div
          v-if="
            tutor.pendidikan &&
            Array.isArray(tutor.pendidikan) &&
            tutor.pendidikan.length > 0
          "
          class="mt-6 pt-6 border-t border-gray-200"
        >
          <h4 class="text-lg font-semibold text-gray-800 mb-4">
            Riwayat Pendidikan
          </h4>
          <div class="space-y-4">
            <div
              v-for="(edu, index) in tutor.pendidikan"
              :key="index"
              class="bg-gray-50 rounded-lg p-4"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <span
                    :class="[
                      'inline-block px-2 py-0.5 text-xs font-medium rounded mb-2',
                      edu.type === 'pendidikan'
                        ? 'bg-blue-100 text-blue-800'
                        : edu.type === 'pengalaman'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800',
                    ]"
                  >
                    {{
                      edu.type === "pendidikan"
                        ? "Pendidikan"
                        : edu.type === "pengalaman"
                        ? "Pengalaman"
                        : "Organisasi"
                    }}
                  </span>
                  <h5 class="font-semibold text-gray-800">
                    {{ edu.title || edu.degree || "N/A" }}
                  </h5>
                  <p class="text-sm text-gray-600">
                    {{ edu.org || edu.institution || "N/A" }}
                  </p>
                </div>
                <span class="text-xs text-gray-500">{{
                  edu.period || edu.year || "N/A"
                }}</span>
              </div>
              <p
                v-if="edu.detail || edu.description"
                class="text-sm text-gray-700 mt-2"
              >
                {{ edu.detail || edu.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Jadwal Mengajar -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
        <h3
          class="text-xl font-bold text-[#41a6c2] mb-6 pb-3 border-b-2 border-[#41a6c2]/20"
        >
          Jadwal Mengajar
        </h3>
        <div
          v-if="tutor.jadwalMengajar && tutor.jadwalMengajar.length > 0"
          class="divide-y divide-gray-200"
        >
          <div
            v-for="(jadwal, index) in tutor.jadwalMengajar"
            :key="index"
            class="py-3 flex items-center justify-between"
          >
            <div>
              <p class="font-semibold text-gray-800">{{ jadwal.day }}</p>
              <p class="text-sm text-gray-600">{{ jadwal.subject }}</p>
            </div>
            <p class="text-sm text-gray-500">{{ jadwal.time }}</p>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500">Belum ada jadwal mengajar</p>
      </section>

      <!-- Harga & Data Bank -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
        <h3
          class="text-xl font-bold text-[#41a6c2] mb-6 pb-3 border-b-2 border-[#41a6c2]/20"
        >
          Harga & Data Bank
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Harga Per Pertemuan</label
            >
            <p class="text-base font-semibold text-gray-800">
              Rp
              {{
                tutor.hargaPerPertemuan
                  ? tutor.hargaPerPertemuan.toLocaleString("id-ID")
                  : "0"
              }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Nama Bank</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.bankName }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Nomor Rekening</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ tutor.bankAccountNumber }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Nama Pemilik Rekening</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ tutor.bankAccountName }}
            </p>
          </div>
        </div>
      </section>

      <!-- Dokumen Pendukung -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
        <h3
          class="text-xl font-bold text-[#41a6c2] mb-6 pb-3 border-b-2 border-[#41a6c2]/20"
        >
          Dokumen Pendukung
        </h3>
        <div class="space-y-4">
          <div
            class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div class="flex items-center gap-3">
              <FileText class="w-5 h-5 text-[#41a6c2]" />
              <span class="text-sm font-medium text-gray-700">CV</span>
            </div>
            <a
              :href="tutor.documents.cv"
              target="_blank"
              class="text-sm text-[#41a6c2] hover:text-[#358a9f] font-medium"
            >
              Lihat Dokumen →
            </a>
          </div>
          <div
            class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div class="flex items-center gap-3">
              <FileText class="w-5 h-5 text-[#41a6c2]" />
              <span class="text-sm font-medium text-gray-700">KTP</span>
            </div>
            <a
              :href="tutor.documents.ktp"
              target="_blank"
              class="text-sm text-[#41a6c2] hover:text-[#358a9f] font-medium"
            >
              Lihat Dokumen →
            </a>
          </div>
          <div
            class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div class="flex items-center gap-3">
              <FileText class="w-5 h-5 text-[#41a6c2]" />
              <span class="text-sm font-medium text-gray-700">Ijazah</span>
            </div>
            <a
              :href="tutor.documents.ijazah"
              target="_blank"
              class="text-sm text-[#41a6c2] hover:text-[#358a9f] font-medium"
            >
              Lihat Dokumen →
            </a>
          </div>
        </div>
      </section>

      <!-- Status Section -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <label class="block text-sm text-gray-500 mb-2">Status</label>
            <span
              :class="[
                'inline-block px-4 py-2 rounded-full text-sm font-semibold',
                statusClass,
              ]"
            >
              {{ tutor.status }}
            </span>
          </div>
          <div class="flex gap-3">
            <button
              v-if="tutor.statusEnum === 'verify'"
              @click="handleApprove"
              class="px-6 py-3 bg-[#41a6c2] hover:bg-[#358a9f] text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Setujui
            </button>
            <button
              v-if="tutor.statusEnum === 'verify'"
              @click="handleReject"
              class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Tolak
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- Confirmation Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4"
    >
      <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">
          {{ modalTitle }}
        </h2>
        <p class="text-gray-600 mb-6 text-center">{{ modalMessage }}</p>
        <div class="flex gap-3">
          <button
            @click="showModal = false"
            class="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium transition"
          >
            Batal
          </button>
          <button
            @click="confirmAction"
            :class="[
              'flex-1 px-4 py-3 rounded-lg font-medium transition',
              modalAction === 'approve'
                ? 'bg-[#41a6c2] hover:bg-[#358a9f] text-white'
                : 'bg-red-500 hover:bg-red-600 text-white',
            ]"
          >
            Ya, {{ modalAction === "approve" ? "Setujui" : "Tolak" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="fade">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-medium">{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarAdmin from "@/components/layout/navbar-admin.vue";
import { ArrowLeft, FileText } from "lucide-vue-next";
import {
  getTutorDetail,
  approveTutor as approveUserTutor,
  rejectTutor as rejectUserTutor,
} from "@/services/adminDashboardService";

const route = useRoute();
const router = useRouter();

// Loading state
const loading = ref(true);

// Tutor data from API
const tutor = ref({
  id: null,
  namaLengkap: "",
  email: "",
  photo: null,
  jenisKelamin: "",
  tanggalLahir: "",
  noTelepon: "",
  agama: "",
  provinsi: "",
  kota: "",
  kecamatan: "",
  desa: "",
  alamatLengkap: "",
  latitude: null,
  longitude: null,
  keahlian: "",
  marketSiswa: "",
  pengalaman: "",
  organisasi: "",
  skillBahasa: "",
  pendidikan: [],
  tentangSaya: "",
  jadwalMengajar: [],
  hargaPerPertemuan: 0,
  bankName: "",
  bankAccountNumber: "",
  bankAccountName: "",
  documents: {
    cv: null,
    ktp: null,
    ijazah: null,
  },
  status: "",
  statusEnum: "",
});

const showModal = ref(false);
const showToast = ref(false);
const toastMessage = ref("");
const modalTitle = ref("");
const modalMessage = ref("");
const modalAction = ref("");

const statusClass = computed(() => {
  const status = tutor.value.status.toLowerCase();
  if (status.includes("menunggu") || status.includes("verify")) {
    return "bg-yellow-100 text-yellow-800";
  } else if (status.includes("aktif") || status.includes("disetujui")) {
    return "bg-green-100 text-green-800";
  } else if (status.includes("ditolak") || status.includes("rejected")) {
    return "bg-red-100 text-red-800";
  }
  return "bg-gray-100 text-gray-800";
});

const handleApprove = () => {
  modalTitle.value = "Konfirmasi Persetujuan";
  modalMessage.value = `Apakah Anda yakin ingin menyetujui tutor ${tutor.value.namaLengkap}?`;
  modalAction.value = "approve";
  showModal.value = true;
};

const handleReject = () => {
  modalTitle.value = "Konfirmasi Penolakan";
  modalMessage.value = `Apakah Anda yakin ingin menolak tutor ${tutor.value.namaLengkap}?`;
  modalAction.value = "reject";
  showModal.value = true;
};

const confirmAction = async () => {
  showModal.value = false;

  try {
    if (modalAction.value === "approve") {
      await approveUserTutor(tutor.value.id);
      toastMessage.value = "Tutor berhasil disetujui!";
    } else {
      await rejectUserTutor(tutor.value.id);
      toastMessage.value = "Tutor berhasil ditolak!";
    }

    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
      // Redirect back to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 500);
    }, 2000);
  } catch (error) {
    console.error("Error updating tutor status:", error);
    alert(
      error?.response?.data?.message ||
        `Gagal ${
          modalAction.value === "approve" ? "menyetujui" : "menolak"
        } tutor`
    );
  }
};

const goBack = () => {
  router.push("/admin/dashboard");
};

// Load tutor data based on ID from route
onMounted(async () => {
  const tutorId = route.query.id;
  if (!tutorId) {
    alert("ID tutor tidak ditemukan");
    router.push("/admin/dashboard");
    return;
  }

  try {
    loading.value = true;
    console.log("Loading tutor data for ID:", tutorId);
    const data = await getTutorDetail(tutorId);
    console.log("Tutor data received:", data);
    tutor.value = data;
  } catch (error) {
    console.error("Error loading tutor data:", error);
    alert("Gagal memuat data tutor");
    router.push("/admin/dashboard");
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
}
</style>
