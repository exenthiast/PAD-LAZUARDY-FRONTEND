<template>
  <div class="bg-white min-h-screen">
    <Navbar />

    <!-- Search Bar -->
    <section class="bg-white py-6 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="relative max-w-2xl mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari tutor berdasarkan nama..."
            class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <search
            v-model="searchQuery"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="bg-secondary-light py-4 border-b border-gray-200">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select v-model="selectedSubject" class="filter-select">
          <option value="">Semua Mata Pelajaran</option>
          <option v-for="subject in subjects" :key="subject">
            {{ subject }}
          </option>
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

        <button
          @click="applyFilter"
          class="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark"
        >
          Terapkan Filter
        </button>
      </div>
    </section>

    <!-- Tutor List -->
    <section class="container mx-auto px-4 py-8">
      <h2 class="text-2xl font-semibold mb-6">
        {{ filteredTutors.length }} Tutor Tersedia
      </h2>

      <div class="flex flex-col gap-6">
        <div
          v-for="tutor in filteredTutors"
          :key="tutor.id"
          class="bg-white shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <img
            :src="tutor.photo"
            alt="Tutor Photo"
            class="w-24 h-24 rounded-full object-cover border border-gray-200"
          />

          <div class="flex-1">
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h3 class="font-semibold text-xl">{{ tutor.name }}</h3>
                <p class="text-gray-600">{{ tutor.subject }}</p>
                <div class="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    v-for="mode in tutor.teachingMode"
                    :key="mode"
                    :class="[
                      'text-sm px-2 py-0.5 rounded',
                      mode === 'online'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600',
                    ]"
                  >
                    {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
                  </span>
                  <span
                    class="text-sm bg-blue-100 text-blue-600 px-2 py-0.5 rounded"
                    >{{ tutor.level }}</span
                  >
                </div>
              </div>

              <div class="text-right mt-3 md:mt-0">
                <p class="text-lg font-semibold text-primary">
                  {{ formatPrice(tutor.price) }}/jam
                </p>
                <p class="text-sm text-gray-500">Tersedia sekarang</p>
              </div>
            </div>

            <div class="flex items-center gap-3 text-sm text-gray-600 mt-3">
              <p class="flex items-center text-yellow-500">
                ★ <span class="ml-1 text-gray-800">{{ tutor.rating }}</span>
                <span class="text-gray-500 ml-1"
                  >({{ tutor.reviews }} ulasan)</span
                >
              </p>
            </div>

            <p class="text-gray-700 text-sm mt-3 mb-4">
              {{ tutor.bio }}
            </p>

            <div class="flex gap-3 flex-wrap">
              <button
                @click="handleChatTutor(tutor.id, tutor.name)"
                class="bg-[#2ba9b2] hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition md:w-auto"
              >
                Chat Tutor
              </button>
              <button
                @click="goToDetail(tutor.id)"
                class="border-2 border-primary text-primary px-6 py-2 rounded-lg hover:bg-[#2ba9b2] hover:text-white transition w-fit"
              >
                Lihat Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="bg-gradient-to-r from-primary to-secondary text-white py-8 mt-10"
    >
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
      <p class="text-center text-sm mt-6 opacity-80">
        © 2025 Bimbel Lazuardy. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Search } from "lucide-vue-next";
import Navbar from "@/components/layout/navbar.vue";

const router = useRouter();
const subjects = [
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Bahasa Inggris",
  "Ekonomi",
];
const levels = ["SD", "SMP", "SMA"];

const searchQuery = ref("");
const selectedSubject = ref("");
const selectedLevel = ref("");
const selectedMode = ref("");

const tutors = ref([
  {
    id: 1,
    name: "Budi Santoso",
    subject: "Matematika",
    level: "SMP & SMA",
    rating: 4.9,
    reviews: 225,
    photo: "https://picsum.photos/seed/tutor1/80/80",
    whatsapp: "+628123456789",
    bio: "Tutor Matematika bersertifikat, berpengalaman lebih dari 6 tahun mengajar siswa SMP & SMA.",
    teachingMode: ["online", "offline"],
    price: 50000,
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    subject: "Fisika",
    level: "SMA",
    rating: 4.8,
    reviews: 190,
    photo: "https://picsum.photos/seed/tutor2/80/80",
    whatsapp: "081234567880",
    bio: "Ahli Fisika dengan pendekatan praktis. Fokus pada pemahaman konsep dan latihan soal berjenjang.",
    teachingMode: ["online"],
    price: 55000,
  },
  {
    id: 3,
    name: "Ahmad Fauzi",
    subject: "Kimia",
    level: "SMA",
    rating: 4.8,
    reviews: 174,
    photo: "https://picsum.photos/seed/tutor3/80/80",
    whatsapp: "628111223344",
    bio: "Berpengalaman olimpiade Kimia, membimbing banyak siswa lolos PTN favorit.",
    teachingMode: ["online", "offline"],
    price: 60000,
  },
  {
    id: 4,
    name: "Rina Wijaya",
    subject: "Biologi",
    level: "SMP",
    rating: 4.7,
    reviews: 130,
    photo: "https://picsum.photos/seed/tutor4/80/80",
    whatsapp: "+62 811-7777-999",
    bio: "Metode belajar interaktif dengan visual dan eksperimen sederhana.",
    teachingMode: ["online"],
    price: 45000,
  },
  {
    id: 5,
    name: "Dedi Kurniawan",
    subject: "Bahasa Inggris",
    level: "SD, SMP & SMA",
    rating: 4.6,
    reviews: 125,
    photo: "https://picsum.photos/seed/t5/80/80",
    whatsapp: "+62 812-8888-9999",
    bio: "Pengajar Bahasa Inggris dengan metode conversational dan grammar yang mudah dipahami.",
    teachingMode: ["offline"],
    price: 50000,
  },
  {
    id: 6,
    name: "Maya Kartika",
    subject: "Ekonomi",
    level: "SMA",
    rating: 4.6,
    reviews: 118,
    photo: "https://picsum.photos/seed/t6/80/80",
    whatsapp: "+62 813-9999-0000",
    bio: "Spesialis Ekonomi SMA dengan fokus pada persiapan UTBK dan Ujian Sekolah.",
    teachingMode: ["online", "offline"],
    price: 52000,
  },
]);

const filteredTutors = computed(() => {
  return tutors.value.filter((t) => {
    const matchSearch =
      !searchQuery.value ||
      t.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchSubject =
      !selectedSubject.value || t.subject === selectedSubject.value;
    const matchLevel =
      !selectedLevel.value || t.level.includes(selectedLevel.value);
    const matchMode =
      !selectedMode.value ||
      t.teachingMode?.includes(selectedMode.value.toLowerCase());
    return matchSearch && matchSubject && matchLevel && matchMode;
  });
});

const applyFilter = () => {};

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const handleChatTutor = (tutorId, tutorName) => {
  router.push({
    path: `/messages/${tutorId}`,
  });
};

const goToDetail = (tutorId) => {
  router.push({
    path: "/tutors/tutor-detail",
    query: { id: tutorId },
  });
};
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
