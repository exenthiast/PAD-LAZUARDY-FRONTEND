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

      <!-- Verifikasi Pembayaran Siswa -->
      <section class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-[#41a6c2] mb-6 text-center">
          Verifikasi Pembayaran Siswa
        </h3>

        <div class="space-y-4 mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-500 mb-1">Nama Paket</label>
              <p class="text-base font-medium text-gray-800">
                {{ payment.packageName }}
              </p>
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Status</label>
              <span
                :class="[
                  'inline-block px-3 py-1 rounded-full text-sm font-semibold',
                  statusClass,
                ]"
              >
                {{ payment.status }}
              </span>
            </div>
          </div>

          <!-- Bukti Pembayaran -->
          <div class="border-t pt-4">
            <label class="block text-sm text-gray-500 mb-2"
              >Bukti Pembayaran</label
            >
            <div class="bg-gray-50 rounded-lg p-4">
              <input
                type="text"
                :value="payment.proofUrl"
                readonly
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700"
              />
            </div>
          </div>
        </div>

        <!-- Verification Button -->
        <div class="flex justify-center">
          <button
            v-if="payment.status === 'Menunggu'"
            @click="handleVerify"
            class="px-8 py-3 bg-[#41a6c2] hover:bg-[#358a9f] text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            Verifikasi
          </button>
          <span
            v-else-if="payment.status === 'Terverifikasi'"
            class="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold"
          >
            Sudah Diverifikasi
          </span>
        </div>
      </section>

      <!-- Detail Pribadi -->
      <section class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-[#41a6c2] mb-6">Detail Pribadi</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Nama Lengkap</label>
            <p class="text-base font-medium text-gray-800">
              {{ student.namaLengkap }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Email</label>
            <p class="text-base font-medium text-gray-800">
              {{ student.email }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Jenis Kelamin</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ student.jenisKelamin }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Tanggal Lahir</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ student.tanggalLahir }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">No. telepon</label>
            <p class="text-base font-medium text-gray-800">
              {{ student.noTelepon }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Agama</label>
            <p class="text-base font-medium text-gray-800">
              {{ student.agama }}
            </p>
          </div>
        </div>
      </section>

      <!-- Detail Alamat -->
      <section class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-[#41a6c2] mb-6">Detail Alamat</h3>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Provinsi</label>
            <p class="text-base font-medium text-gray-800">
              {{ student.provinsi }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Kota/Kabupaten</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ student.kota }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Kecamatan</label>
            <p class="text-base font-medium text-gray-800">
              {{ student.kecamatan }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Desa/Kelurahan</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ student.desa }}
            </p>
          </div>
          <div class="col-span-2">
            <label class="block text-sm text-gray-500 mb-1"
              >Alamat Lengkap</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ student.alamatLengkap }}
            </p>
          </div>
        </div>
      </section>

      <!-- Detail Sekolah -->
      <section class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-[#41a6c2] mb-6">Detail Sekolah</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-500 mb-1">Jenjang</label>
            <p class="text-base font-medium text-gray-800">
              {{ student.jenjang }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1">Kelas</label>
            <p class="text-base font-medium text-gray-800">
              {{ student.kelas }}
            </p>
          </div>
        </div>
      </section>

      <!-- Kontak Orang Tua/Wali -->
      <section class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 class="text-xl font-bold text-[#41a6c2] mb-6">
          Kontak Orang tua/Wali
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Nama orang tua/Wali</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ student.namaOrangTua }}
            </p>
          </div>
          <div>
            <label class="block text-sm text-gray-500 mb-1"
              >Nomor orang tua</label
            >
            <p class="text-base font-medium text-gray-800">
              {{ student.nomorOrangTua }}
            </p>
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
          Konfirmasi Verifikasi
        </h2>
        <p class="text-gray-600 mb-6 text-center">
          Apakah Anda yakin ingin memverifikasi pembayaran untuk paket
          <strong>{{ payment.packageName }}</strong
          >?
        </p>
        <div class="flex gap-3">
          <button
            @click="showModal = false"
            class="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium transition"
          >
            Batal
          </button>
          <button
            @click="confirmVerify"
            class="flex-1 px-4 py-3 rounded-lg bg-[#41a6c2] hover:bg-[#358a9f] text-white font-medium transition"
          >
            Ya, Verifikasi
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
        <span class="font-medium">Pembayaran berhasil diverifikasi!</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavbarAdmin from "@/components/layout/navbar-admin.vue";
import { ArrowLeft } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();

// Dummy data siswa
const student = ref({
  id: 1,
  namaLengkap: "Muhammad Alief",
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
  jenjang: "Sman 12",
  kelas: "12",
  namaOrangTua: "Muhammad Alief",
  nomorOrangTua: "085733215339",
});

// Payment data
const payment = ref({
  id: 1,
  packageName: "Paket Matematika 4x",
  status: "Menunggu",
  proofUrl: "https://example.com/proof/payment123.jpg",
});

const showModal = ref(false);
const showToast = ref(false);

const statusClass = computed(() => {
  switch (payment.value.status) {
    case "Menunggu":
      return "bg-yellow-100 text-yellow-800";
    case "Terverifikasi":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
});

const handleVerify = () => {
  showModal.value = true;
};

const confirmVerify = async () => {
  showModal.value = false;

  // TODO: Call API to verify payment
  payment.value.status = "Terverifikasi";

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

// Load student and payment data based on ID from route
onMounted(() => {
  const paymentId = route.query.id;
  if (paymentId) {
    // TODO: Fetch student and payment data from API
    console.log("Loading payment data for ID:", paymentId);
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
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>
