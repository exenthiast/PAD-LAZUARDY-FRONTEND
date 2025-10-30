<template>
  <div class="bg-white min-h-screen">
    <!-- Header -->
    <header class="bg-primary text-white py-4 shadow">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">Cari Tutor</h1>
        <button class="bg-white text-primary font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90">
          Masuk / Register
        </button>
      </div>
    </header>

    <!-- Filter Section -->
    <section class="bg-secondary-light py-4 border-b border-gray-200">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select v-model="selectedSubject" class="filter-select">
          <option value="">Semua Mata Pelajaran</option>
          <option v-for="subject in subjects" :key="subject">{{ subject }}</option>
        </select>

        <select v-model="selectedLevel" class="filter-select">
          <option value="">Semua Jenjang</option>
          <option v-for="level in levels" :key="level">{{ level }}</option>
        </select>

        <select v-model="selectedMode" class="filter-select">
          <option value="">Semua Mode</option>
          <option>Online</option>
          <option>Offline</option>
        </select>

        <button @click="applyFilter" class="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark">
          Terapkan Filter
        </button>
      </div>
    </section>

    <!-- Tutor List -->
    <section class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-semibold mb-6">100+ Tutor Tersedia</h2>

      <div class="flex flex-col gap-6">
        <div
          v-for="tutor in filteredTutors"
          :key="tutor.id"
          class="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <img
            :src="tutor.image"
            alt="Tutor Photo"
            class="w-24 h-24 rounded-full object-cover border border-gray-200"
          />

          <div class="flex-1">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 class="font-semibold text-xl">{{ tutor.name }}</h3>
                <p class="text-gray-600">{{ tutor.subject }}</p>
                <div class="flex items-center gap-2 mt-1 flex-wrap">
                  <span class="text-sm bg-green-100 text-green-600 px-2 py-0.5 rounded">Online</span>
                  <span class="text-sm bg-blue-100 text-blue-600 px-2 py-0.5 rounded">SMP - SMA</span>
                </div>
              </div>

              <div class="text-right mt-3 md:mt-0">
                <p class="text-lg font-semibold text-primary">${{ tutor.price }}/jam</p>
                <p class="text-sm text-gray-500">Tersedia sekarang</p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-sm text-gray-600 mt-3">
              <p><strong>{{ tutor.students }}+</strong> siswa</p>
              <p>•</p>
              <p><strong>{{ tutor.sessions }}+</strong> sesi</p>
              <p>•</p>
              <p class="flex items-center text-yellow-500">
                ★ <span class="ml-1 text-gray-800">{{ tutor.rating }}</span>
                <span class="text-gray-500 ml-1">({{ tutor.reviews }} ulasan)</span>
              </p>
            </div>

            <p class="text-gray-700 text-sm mt-3 mb-4">
              {{ tutor.description }}
            </p>

            <button
              class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition w-fit"
            >
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-primary to-secondary text-white py-8 mt-10">
      <div class="container mx-auto px-4 grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Tentang Lazuardy</h3>
          <p class="text-sm opacity-90">
            Bimbel Lazuardy adalah platform bimbingan belajar online terpercaya
            yang menghubungkan siswa dengan tutor berkualitas.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">Kontak Kami</h3>
          <ul class="text-sm opacity-90">
            <li>Email: info@lazuardy.com</li>
            <li>Telepon: +62 812-3456-7890</li>
            <li>Alamat: Yogyakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <p class="text-center text-sm mt-6 opacity-80">© 2025 Bimbel Lazuardy. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const subjects = ["Matematika", "Fisika", "Kimia", "Biologi", "Bahasa Inggris", "Ekonomi"];
const levels = ["SD", "SMP", "SMA"];

const selectedSubject = ref("");
const selectedLevel = ref("");
const selectedMode = ref("");

const tutors = ref([
  {
    id: 1,
    name: "Ahmad Fauzi",
    subject: "Matematika",
    rating: 4.9,
    reviews: 156,
    students: 100,
    sessions: 50,
    description: "Tutor Matematika bersertifikasi, ramah, dan berpengalaman lebih dari 3 tahun.",
    price: 12,
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    subject: "Fisika",
    rating: 4.8,
    reviews: 142,
    students: 100,
    sessions: 50,
    description: "Tutor Fisika berpengalaman mengajar siswa SMP & SMA dengan metode interaktif.",
    price: 15,
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=200&h=200&fit=crop",
  },
]);

const filteredTutors = computed(() => {
  return tutors.value.filter((t) => {
    return (
      (!selectedSubject.value || t.subject === selectedSubject.value) &&
      (!selectedLevel.value || true) &&
      (!selectedMode.value || true)
    );
  });
});

const applyFilter = () => {};
</script>

<style scoped>
.container {
  max-width: 900px;
}

/* Warna utama Lazuardy */
:root {
  --primary: #2ba9b2;
  --primary-dark: #228c92;
  --secondary: #66d6c3;
  --secondary-light: #e6f9f7;
}

.bg-primary {
  background-color: var(--primary);
}
.bg-secondary {
  background-color: var(--secondary);
}
.bg-secondary-light {
  background-color: var(--secondary-light);
}
.text-primary {
  color: var(--primary);
}

.filter-select {
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  background-color: white;
  color: #374151;
}
</style>
