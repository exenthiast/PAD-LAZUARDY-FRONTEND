<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 pb-24 relative">
    <!-- Header -->
    <header class="bg-white border-b py-8">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 px-4">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
          alt="profile"
          class="w-28 h-28 rounded-full object-cover shadow"
        />
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Budi Speed</h1>
          <p class="text-sm text-gray-500">Siswa SMA Kelas 12 • Bimbel Lazuardy</p>
          <div class="flex gap-2 mt-3 flex-wrap">
            <span class="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">UTBK</span>
            <span class="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">Intensif</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Body -->
    <main class="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <!-- Tentang Saya -->
      <section>
        <h2 class="text-lg font-semibold mb-2 text-gray-800">Tentang saya</h2>
        <p class="text-sm leading-relaxed text-gray-600">
          Halo! Saya Alief — siswa SMA yang sedang mempersiapkan UTBK dan ujian akhir. Saya suka belajar
          dengan metode terstruktur dan latihan soal berkala. Saya ingin meningkatkan kemampuan matematika
          dan bahasa Inggris saya.
        </p>
        <div class="mt-3 flex gap-2 flex-wrap">
          <span
            v-for="t in ['UTBK Preparation', 'SMA Kelas 12', 'Belajar Intensif']"
            :key="t"
            class="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
          >
            {{ t }}
          </span>
        </div>
      </section>

      <!-- Penilaian -->
      <section>
        <h2 class="text-lg font-semibold mb-3 text-gray-800">Penilaian kelas</h2>
        <div class="flex items-center gap-6">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary">4.8</div>
            <div class="text-xs text-gray-500">34 ulasan</div>
          </div>
          <div class="flex-1 space-y-2">
            <div v-for="(val, key) in ratings" :key="key">
              <div class="flex justify-between text-sm mb-1">
                <span class="capitalize">{{ key }}</span>
                <span>{{ val }}</span>
              </div>
              <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-1.5 bg-primary" :style="{ width: (val / 5) * 100 + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Jadwal -->
      <section>
        <h2 class="text-lg font-semibold mb-3 text-gray-800">Jadwal mendatang</h2>
        <div class="divide-y divide-gray-200 border rounded-lg overflow-hidden bg-white">
          <div
            v-for="(item, i) in schedule"
            :key="i"
            class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
          >
            <div>
              <div class="text-sm font-medium text-gray-800">{{ item.title }}</div>
              <div class="text-xs text-gray-500">{{ item.note }}</div>
            </div>
            <div class="text-sm text-gray-600">
              <span class="font-medium">{{ item.date }}</span> • {{ item.time }}
            </div>
          </div>
        </div>
        <button class="mt-3 text-sm text-primary hover:underline font-medium">Lihat semua jadwal</button>
      </section>

      <!-- Testimoni -->
      <section>
        <h2 class="text-lg font-semibold mb-3 text-gray-800">Testimoni</h2>
        <div v-for="t in testimonials" :key="t.id" class="py-3 border-b last:border-0">
          <div class="flex items-start gap-3">
            <img :src="t.photo" class="w-10 h-10 rounded-full object-cover" />
            <div>
              <div class="flex justify-between items-center">
                <b class="text-sm">{{ t.name }}</b>
                <span class="text-yellow-500 text-xs font-semibold">★ {{ t.rating }}</span>
              </div>
              <p class="text-xs text-gray-500">{{ t.date }}</p>
              <p class="text-sm mt-1 text-gray-700">{{ t.comment }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CV -->
      <section>
        <h2 class="text-lg font-semibold mb-3 text-gray-800">Pendidikan & Pengalaman</h2>
        <div v-for="(cv, idx) in cvList" :key="idx" class="py-2">
          <div class="flex justify-between text-sm">
            <div>
              <b>{{ cv.title }}</b>
              <div class="text-xs text-gray-500">{{ cv.org }}</div>
            </div>
            <div class="text-xs text-gray-500">{{ cv.period }}</div>
          </div>
          <p class="text-sm mt-1 text-gray-600">{{ cv.detail }}</p>
        </div>
      </section>
    </main>

    <!-- Tombol fixed bawah -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
      <div class="max-w-4xl mx-auto flex justify-end">
        <button
          @click="openModal = true"
          class="bg-primary hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition w-full md:w-auto"
        >
          Pilih Tutor Ini
        </button>
      </div>
    </div>

    <!-- Modal Pilih Jadwal -->
    <div
      v-if="openModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div class="bg-white w-96 rounded-xl shadow-lg p-6 relative">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 text-center">Pilih Jadwal Tersedia</h2>

        <div class="space-y-3">
          <button
            v-for="slot in jadwal"
            :key="slot.id"
            @click="selectedSlot = slot"
            :class="[
              'w-full border rounded-lg py-2 transition',
              selectedSlot?.id === slot.id
                ? 'bg-primary text-white border-primary'
                : 'hover:bg-gray-100',
            ]"
          >
            {{ slot.hari }}, {{ slot.waktu }}
          </button>
        </div>

        <div class="mt-6 flex justify-between">
          <button @click="openModal = false" class="text-gray-500 hover:text-gray-700 font-medium">
            Batal
          </button>
          <button
            @click="konfirmasiAjukan"
            :disabled="!selectedSlot"
            :class="[
              'px-5 py-2 rounded-lg font-semibold transition',
              selectedSlot
                ? 'bg-primary text-white hover:bg-teal-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed',
            ]"
          >
            Ajukan
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div class="bg-white w-96 rounded-xl shadow-lg p-6 text-center">
        <h2 class="text-lg font-semibold text-yellow-700 mb-3">Konfirmasi Pengajuan</h2>
        <p class="text-gray-600 mb-5">
          Kamu akan mengajukan <b>{{ selectedSlot.hari }}</b> pukul
          <b>{{ selectedSlot.waktu }}</b>. <br />Lanjutkan?
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="showConfirm = false"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            @click="ajukanTutor"
            class="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
          >
            Ya, Ajukan
          </button>
        </div>
      </div>
    </div>

    <!-- Toast sukses -->
    <transition name="fade">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 text-sm font-medium"
      >
        ✅ Pengajuan tutor berhasil dikirim!
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const ratings = { dukungan: 5.0, kejelasan: 4.9, progres: 4.8, persiapan: 4.7 };
const schedule = [
  { date: "30 Okt", time: "09:00 - 10:00", title: "Matematika", note: "Latihan UTBK" },
  { date: "31 Okt", time: "16:00 - 17:00", title: "Bahasa Inggris", note: "Reading Practice" },
  { date: "1 Nov", time: "14:00 - 15:00", title: "Fisika", note: "Simulasi Soal" },
];
const testimonials = [
  { id: 1, name: "Yeva", photo: "https://i.pravatar.cc/100?img=12", date: "9 Okt 2025", rating: 5, comment: "Saya baru 1 bulan belajar dengan Alief, tetapi sudah terlihat hasilnya!" },
  { id: 2, name: "Fahad", photo: "https://i.pravatar.cc/100?img=5", date: "30 Sep 2025", rating: 5, comment: "Belajarnya seru dan terstruktur. Sangat membantu persiapan UTBK." },
];
const cvList = [
  { title: "Siswa SMA Negeri 1 Yogyakarta", org: "Jurusan IPA", period: "2021 - Sekarang", detail: "Aktif di klub matematika dan olimpiade sains." },
  { title: "Kursus Bahasa Inggris", org: "Lazuardy English Class", period: "2022 - 2023", detail: "Mendalami TOEFL dasar dan speaking." },
];

const openModal = ref(false);
const showConfirm = ref(false);
const showToast = ref(false);
const selectedSlot = ref(null);

const jadwal = [
  { id: 1, hari: "Senin", waktu: "19.00 - 20.00" },
  { id: 2, hari: "Rabu", waktu: "13.00 - 14.00" },
  { id: 3, hari: "Jumat", waktu: "08.00 - 09.00" },
];

function konfirmasiAjukan() {
  if (!selectedSlot.value) return;
  openModal.value = false;
  showConfirm.value = true;
}

function ajukanTutor() {
  showConfirm.value = false;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2500);
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