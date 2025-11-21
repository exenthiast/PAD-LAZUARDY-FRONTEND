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

      <!-- Detail Tutor -->
      <section class="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
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
              {{ tutor.keahlian }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Market Siswa</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.marketSiswa }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Pengalaman</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.pengalaman }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Skill Bahasa</label>
            <p class="text-base font-medium text-gray-800">
              {{ tutor.skillBahasa }}
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
              v-if="tutor.status === 'Menunggu'"
              @click="handleApprove"
              class="px-6 py-3 bg-[#41a6c2] hover:bg-[#358a9f] text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Setujui
            </button>
            <button
              v-if="tutor.status === 'Menunggu'"
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

const route = useRoute();
const router = useRouter();

// Dummy data tutor (nanti dari API berdasarkan ID)
const tutor = ref({
  id: 1,
  namaLengkap: "Budi Santoso",
  email: "Lief@example.com",
  jenisKelamin: "Laki-laki",
  tanggalLahir: "12-5-2006",
  noTelepon: "082255422134",
  agama: "Islam",
  provinsi: "Jawa Barat",
  kota: "Bekasi",
  kecamatan: "Tambun",
  desa: "Muhammad Alief",
  alamatLengkap: "Grand Wisata",
  keahlian: "Matematika",
  marketSiswa: "Sma",
  pengalaman: "3 Tahun Mengajar Les privat SMA",
  skillBahasa: "Bahasa Indonesia",
  documents: {
    cv: "#",
    ktp: "#",
    ijazah: "#",
  },
  status: "Menunggu",
});

const showModal = ref(false);
const showToast = ref(false);
const toastMessage = ref("");
const modalTitle = ref("");
const modalMessage = ref("");
const modalAction = ref("");

const statusClass = computed(() => {
  switch (tutor.value.status) {
    case "Menunggu":
      return "bg-yellow-100 text-yellow-800";
    case "Disetujui":
      return "bg-green-100 text-green-800";
    case "Ditolak":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
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

  if (modalAction.value === "approve") {
    // TODO: Call API to approve tutor
    tutor.value.status = "Disetujui";
    toastMessage.value = "Tutor berhasil disetujui!";
  } else {
    // TODO: Call API to reject tutor
    tutor.value.status = "Ditolak";
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
};

const goBack = () => {
  router.push("/admin/dashboard");
};

// Load tutor data based on ID from route
onMounted(() => {
  const tutorId = route.query.id;
  if (tutorId) {
    // TODO: Fetch tutor data from API
    console.log("Loading tutor data for ID:", tutorId);
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
