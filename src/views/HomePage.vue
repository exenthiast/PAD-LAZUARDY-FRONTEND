<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- NAVBAR -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <img src="../assets/logo.svg" alt="Bimbel Lazuardy" class="" />
          <span class="sr-only">Bimbel Lazuardy</span>
        </div>
        <div class="flex items-center gap-4">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            placeholder="Pencarian"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
          />
          <button
            @click="handleNext"
            class="bg-teal-500 hover:bg-teal-600 text-white px-3 py-0 md:px-8 md:py-2 rounded-lg font-medium transition-colors"
          >
            Masuk / Register
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1">
      <!-- HERO -->
      <section class="bg-teal-600 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gray-200 rounded-lg p-12 text-center">
            <h1 class="text-2xl font-semibold text-gray-800">
              Gambar atau iklan mengenai lazuardy
            </h1>
          </div>
        </div>
      </section>

      <!-- TUTOR REKOMENDASI -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">Tutor Rekomendasi</h2>
            <button
              class="text-teal-600 hover:text-teal-700 flex items-center gap-2"
            >
              Lihat Semua Tutor →
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article
              v-for="tutor in topTutors"
              :key="tutor.id"
              class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-start gap-4">
                <img
                  :src="tutor.image"
                  :alt="tutor.name"
                  class="w-20 h-20 rounded-full bg-gray-300 object-cover"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-lg text-gray-900">
                    {{ tutor.name }}
                  </h3>
                  <p class="text-gray-600 text-sm mb-2">{{ tutor.subject }}</p>
                  <div class="flex items-center gap-1">
                    <!-- Star icon (inline SVG, no JSX) -->
                    <svg
                      class="w-4 h-4 text-yellow-400"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                    <span class="font-semibold text-gray-900">{{
                      tutor.rating
                    }}</span>
                    <span class="text-gray-500 text-sm"
                      >({{ tutor.reviews }})</span
                    >
                  </div>
                </div>
                <button
                  class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Pesan
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ABOUT -->
      <section class="py-16 bg-teal-600">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-white text-center mb-12">
            ABOUT LAZUARDY
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="item in aboutItems"
              :key="item"
              class="bg-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow cursor-pointer text-gray-900 font-semibold text-lg text-center"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ (reveal saat scroll) -->
      <section class="py-16 bg-gradient-to-r from-blue-400 to-teal-500">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-white text-center mb-12">
            Paling sering ditanyakan
          </h2>

          <div
            ref="faqBlock"
            :class="[
              'transition-all duration-700',
              faqVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6',
            ]"
            class="space-y-4"
          >
            <div
              v-for="(faq, index) in faqData"
              :key="index"
              class="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <button
                @click="toggleFaq(index)"
                class="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span class="font-medium text-gray-900 text-left">{{
                  faq.question
                }}</span>
                <!-- Chevron icon -->
                <svg
                  class="w-5 h-5 text-gray-500 transition-transform"
                  :class="openFaq === index ? 'rotate-180' : ''"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6z"
                  />
                </svg>
              </button>
              <div
                v-if="openFaq === index"
                class="px-6 py-4 bg-gray-50 border-t border-gray-200"
              >
                <p class="text-gray-700">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between gap-8">
          <div class="flex-1">
            <h3 class="text-xl font-bold mb-4">ABOUT US</h3>
            <p class="text-gray-300 mb-4">
              Bimbel Lazuardy adalah platform bimbingan belajar online
              terpercaya yang menghubungkan siswa dengan tutor berkualitas.
            </p>
            <p class="text-gray-400 text-sm">
              © 2025 Bimbel Lazuardy. All rights reserved.
            </p>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold mb-4">GET IN TOUCH</h3>
            <div class="space-y-2 text-gray-300">
              <p>Email: info@lazuardy.com</p>
              <p>Phone: +62 812-3456-7890</p>
              <p>Address: Yogyakarta, Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/search",
      query: { q: searchQuery.value },
    });
  }
};

/* Dummy data */
const topTutors = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    subject: "Matematika",
    rating: 4.9,
    reviews: 156,
    image: "https://picsum.photos/seed/t1/80/80",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    subject: "Fisika",
    rating: 4.8,
    reviews: 142,
    image: "https://picsum.photos/seed/t2/80/80",
  },
  {
    id: 3,
    name: "Budi Santoso",
    subject: "Kimia",
    rating: 4.8,
    reviews: 138,
    image: "https://picsum.photos/seed/t3/80/80",
  },
  {
    id: 4,
    name: "Rina Wijaya",
    subject: "Biologi",
    rating: 4.7,
    reviews: 129,
    image: "https://picsum.photos/seed/t4/80/80",
  },
  {
    id: 5,
    name: "Dedi Kurniawan",
    subject: "Bahasa Inggris",
    rating: 4.7,
    reviews: 125,
    image: "https://picsum.photos/seed/t5/80/80",
  },
  {
    id: 6,
    name: "Maya Kartika",
    subject: "Ekonomi",
    rating: 4.6,
    reviews: 118,
    image: "https://picsum.photos/seed/t6/80/80",
  },
];
const aboutItems = [
  "Keunggulan lazuardy",
  "Pendaftaran lazuardy",
  "Credit lazuardy",
  "FAQ",
];

/* FAQ + reveal on scroll */
const faqData = [
  {
    question: "Apa yang dimaksud dengan aplikasi belajar online?",
    answer:
      "Aplikasi belajar online adalah platform digital yang memungkinkan siswa belajar dengan tutor secara virtual melalui internet.",
  },
  {
    question: "Bagaimana efektivitas pembelajaran online di Indonesia?",
    answer:
      "Fleksibilitas waktu dan akses tutor berkualitas meningkatkan kepuasan pengguna, meskipun kualitas koneksi tetap berpengaruh.",
  },
  {
    question: "Apakah bimbel Lazuardy tersedia di desktop?",
    answer: "Ya, dapat diakses via browser di PC, laptop, tablet, dan ponsel.",
  },
  {
    question: "Apa saja kendalanya?",
    answer:
      "Koneksi internet tidak stabil, keterbatasan perangkat, dan adaptasi metode belajar digital.",
  },
  {
    question: "Apa itu belajar online?",
    answer:
      "Pembelajaran jarak jauh memanfaatkan internet untuk menghubungkan siswa dan tutor, sinkron atau asinkron.",
  },
  {
    question: "Langkah-langkah menerapkan belajar online?",
    answer:
      "Daftar akun, pilih tutor/mapel, jadwalkan sesi, bergabung, ikuti pembelajaran & tugas.",
  },
];
const openFaq = ref(null);
const toggleFaq = (idx) => (openFaq.value = openFaq.value === idx ? null : idx);

const faqBlock = ref(null);
const faqVisible = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          faqVisible.value = true;
          observer?.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  if (faqBlock.value) observer.observe(faqBlock.value);
});
onBeforeUnmount(() => observer?.disconnect());

const handleNext = () => {
  router.push("/login");
};
</script>
