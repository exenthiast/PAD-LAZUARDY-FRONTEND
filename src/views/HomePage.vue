<template>
  <div :style="{ '--nav-h': navHeight }">
    <!-- NAVBAR -->
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'pt-4' : '',
      ]"
    >
      <div
        :class="[
          'transition-all duration-300 flex items-center justify-between px-6',
          isScrolled
            ? 'max-w-7xl mx-auto backdrop-blur-md shadow-lg rounded-full h-16'
            : 'max-w-full bg-white shadow-sm h-[75px]',
        ]"
      >
        <div class="flex items-center gap-3">
          <img 
          src="@/assets/logo2.svg" 
          alt="Bimbel Lazuardy" 
          :class="[
              'transition-all duration-300',
              isScrolled ? 'h-8' : 'h-10',
            ]" 
            />
        </div>
        <div class="flex items-center gap-4">
          <button
            @click="handleNext"
            class="w-full flex item-center gap-3 rounded-lg text-black px-3 py-2 md:px-8 md:py-2 rounded-lg font-bold transition-colors"
          >
            <span class="">Login</span>
          </button>
          <button
            @click="handleNext"
            class="w-full flex item-center gap-3 rounded-full bg-[#41a6c2] hover:bg-teal-600 text-white px-3 py-2 md:px-8 md:py-2 rounded-full font-medium transition-colors"
          >
            <span class="">Register</span>
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1 py-16">
      <!-- HERO -->
      <section class="py-16" style="background-color: #41a6c2">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div class="bg-gray-300 rounded-lg p-12 text-center">
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
              @click="handleNext"
              class="text-teal-600 hover:text-teal-700 flex items-center gap-2"
            >
              Lihat Semua Tutor →
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="tutor in topTutors"
              :key="tutor.id"
              class="bg-white rounded-lg overflow-hidden shadow-md hover:bg-teal-500 hover:text-white transition-all duration-300 group"
            >
              <div class="p-6">
                <div class="flex items-start gap-4 mb-4">
                  <img
                    :src="tutor.image"
                    :alt="tutor.name"
                    class="w-16 h-16 rounded-full bg-gray-300 object-cover"
                  />
                  <div class="flex-1">
                    <h3
                      class="font-medium text-gray-900 group-hover:text-white"
                    >
                      {{ tutor.name }}
                    </h3>
                    <p class="text-gray-600 text-sm group-hover:text-white/90">
                      {{ tutor.subject }}
                    </p>
                    <div class="flex items-center mt-1">
                      <span
                        class="text-xs text-gray-500 group-hover:text-white/80"
                        >SMP • SMA</span
                      >
                      <span class="mx-2 text-gray-300">•</span>
                      <div class="flex gap-1">
                        <span
                          v-for="mode in tutor.teachingMode"
                          :key="mode"
                          class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded group-hover:bg-white group-hover:text-teal-600"
                        >
                          {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div
                    class="text-center p-2 bg-gray-50 rounded group-hover:bg-white/10"
                  >
                    <div
                      class="font-semibold text-gray-900 group-hover:text-white"
                    >
                      100+
                    </div>
                    <div
                      class="text-xs text-gray-500 group-hover:text-white/80"
                    >
                      Siswa
                    </div>
                  </div>
                  <div
                    class="text-center p-2 bg-gray-50 rounded group-hover:bg-white/10"
                  >
                    <div
                      class="font-semibold text-gray-900 group-hover:text-white"
                    >
                      50+
                    </div>
                    <div
                      class="text-xs text-gray-500 group-hover:text-white/80"
                    >
                      Sesi
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 mb-4">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                    <span class="ml-1 font-medium group-hover:text-white">{{
                      tutor.rating
                    }}</span>
                  </div>
                  <span class="text-gray-500 text-sm group-hover:text-white/80"
                    >({{ tutor.reviews }} ulasan)</span
                  >
                </div>

                <p class="text-sm text-gray-600 mb-4 group-hover:text-white/90">
                  Tutor {{ tutor.subject }} bersertifikasi, ramah, dan
                  berpengalaman lebih dari 3 tahun mengajar siswa SMP & SMA
                </p>

                <div
                  class="border-t border-gray-200 group-hover:border-white/20 -mx-6 px-6 py-4 mt-4"
                >
                  <div class="flex justify-center">
                    <button
                      class="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm"
                    >
                      <i class="bi bi-whatsapp text-base"></i>
                      Hubungi via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT -->
      <section class="py-16" style="background-color: #41a6c2">
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
import { LogIn } from 'lucide-vue-next';

const router = useRouter();

// Scroll state untuk navbar
const isScrolled = ref(false);

const navHeight = "75px";

// Handle scroll event
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const topTutors = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    subject: "Matematika",
    rating: 4.9,
    reviews: 156,
    image: "https://picsum.photos/seed/t1/80/80",
    teachingMode: ["online", "offline"],
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    subject: "Fisika",
    rating: 4.8,
    reviews: 142,
    image: "https://picsum.photos/seed/t2/80/80",
    whatsapp: "+628123456789",
    teachingMode: ["online"],
  },
  {
    id: 3,
    name: "Budi Santoso",
    subject: "Matematika",
    level: "SMP & SMA",
    rating: 4.9,
    reviews: 225,
    image: "https://picsum.photos/seed/tutor1/80/80",
    teachingMode: ["online", "offline"],
  },
  {
    id: 4,
    name: "Rina Wijaya",
    subject: "Biologi",
    rating: 4.7,
    reviews: 129,
    image: "https://picsum.photos/seed/t4/80/80",
    teachingMode: ["online"],
  },
  {
    id: 5,
    name: "Dedi Kurniawan",
    subject: "Bahasa Inggris",
    rating: 4.7,
    reviews: 125,
    image: "https://picsum.photos/seed/t5/80/80",
    teachingMode: ["offline"],
  },
  {
    id: 6,
    name: "Maya Kartika",
    subject: "Ekonomi",
    rating: 4.6,
    reviews: 118,
    image: "https://picsum.photos/seed/t6/80/80",
    teachingMode: ["online", "offline"],
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
  // Scroll listener untuk navbar
  window.addEventListener("scroll", handleScroll);

  // Intersection observer untuk FAQ
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

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  observer?.disconnect();
});

const handleNext = () => {
  router.push("/login");
};
</script>
