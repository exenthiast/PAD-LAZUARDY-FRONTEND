<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 text-gray-800">
    <div class="max-w-4xl mx-auto space-y-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">Progress Belajar Saya</h1>

      <!-- Loop paket -->
      <div
        v-for="paket in paketList"
        :key="paket.id"
        class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 transition hover:shadow-md"
      >
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h2 class="text-lg font-semibold">{{ paket.nama }}</h2>
            <p
              v-if="paket.status === 'belum-aktif'"
              class="text-gray-500 text-sm"
            >
              Menunggu aktivasi admin...
            </p>
            <p
              v-else-if="paket.status === 'aktif-belum-tutor'"
              class="text-primary text-sm"
            >
              Paket aktif, silakan pilih tutor terlebih dahulu
            </p>
            <p
              v-else-if="paket.status === 'pending'"
              class="text-yellow-600 text-sm"
            >
              Menunggu konfirmasi tutor
            </p>
            <p
              v-else-if="paket.status === 'berjalan'"
              class="text-green-600 text-sm"
            >
              Tutor: <b>{{ paket.tutor }}</b>
            </p>
          </div>

          <!-- Tombol aksi -->
          <div>
            <button
              v-if="paket.status === 'aktif-belum-tutor'"
              @click="openModalPilihTutor(paket)"
              class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition"
            >
              Pilih Tutor
            </button>

            <button
              v-else-if="paket.status === 'berjalan'"
              @click="lihatProgress(paket)"
              class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
            >
              Lihat Progress
            </button>

            <button
              v-else
              disabled
              class="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
            >
              {{ statusLabel(paket.status) }}
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-4">
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              class="h-2 bg-primary transition-all"
              :style="{ width: paket.progress + '%' }"
            ></div>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            {{ paket.progress }}% selesai dari {{ paket.totalPertemuan }} pertemuan
          </p>
        </div>
      </div>
    </div>

    <!-- Toast sukses -->
    <transition name="fade">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 text-sm font-medium"
      >
        ✅ Tutor berhasil diajukan!
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showToast = ref(false);

const paketList = ref([
  {
    id: 1,
    nama: "Paket UTBK Premium",
    status: "belum-aktif",
    tutor: null,
    progress: 0,
    totalPertemuan: 8,
  },
  {
    id: 2,
    nama: "Paket Intensif Fisika",
    status: "aktif-belum-tutor",
    tutor: null,
    progress: 0,
    totalPertemuan: 10,
  },
  {
    id: 3,
    nama: "Paket Bahasa Inggris Reguler",
    status: "berjalan",
    tutor: "Siti Nurhaliza",
    progress: 60,
    totalPertemuan: 12,
  },
]);

function openModalPilihTutor(paket) {
  // nanti bisa buka modal Pilih Tutor dari komponen lain
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2500);
}

function lihatProgress(paket) {
  alert(`Lihat progress untuk ${paket.nama}`);
}

function statusLabel(status) {
  switch (status) {
    case "belum-aktif":
      return "Menunggu Aktivasi";
    case "pending":
      return "Pending";
    default:
      return "Tidak Tersedia";
  }
}
</script>

<style scoped>
.bg-primary {
  background-color: #2ba9b2;
}
.text-primary {
  color: #2ba9b2;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
