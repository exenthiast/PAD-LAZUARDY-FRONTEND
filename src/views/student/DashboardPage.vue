<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- NAVBAR -->
    <Navbar />

    <!-- MAIN -->
    <main class="flex-1">
      <!-- HERO -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gray-300 rounded-lg p-12 text-center">
            <h1 class="text-2xl font-semibold text-gray-800">
              Gambar atau iklan mengenai lazuardy
            </h1>
          </div>
        </div>
      </section>
    </main>

    <!-- SECTION: Cards -->
    <section class="py-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Card Paket Belajar (hanya muncul jika ada paket) -->
          <article
            v-if="paketAktif"
            class="rounded-xl border border-teal-600/40 bg-white p-5 shadow-sm"
          >
            <header class="flex items-center justify-between mb-3">
              <h3 class="text-teal-700 font-semibold">Paket Belajar</h3>
              <span class="px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-700">
                Aktif
              </span>
            </header>

            <p class="text-sm text-gray-600">
              {{ paketAktif.nama }} (Berlaku s/d
              <span class="font-medium">{{ formatDate(paketAktif.berlakuSampai) }}</span>)
            </p>

            <div class="mt-3 text-sm text-gray-700">
              Sisa sesi:
              <span class="font-semibold">{{ sisaSesi }}</span> / {{ totalSesi }}
            </div>
          </article>

          <!-- Card Progress Belajar -->
          <article class="rounded-xl border border-teal-600/40 bg-white p-5 shadow-sm lg:col-span-2">
            <header class="flex items-center justify-between mb-4">
              <h3 class="text-teal-700 font-semibold">Progress Belajar</h3>
              <span class="text-xs text-gray-500">update terakhir: {{ formatDate(progress.updatedAt) }}</span>
            </header>

            <div class="space-y-1 text-sm">
              <p class="text-gray-700"><span class="font-medium">{{ progress.mapel }}</span> · {{ progress.program }}</p>
              <p class="text-gray-500">Tutor: {{ progress.tutor }} · Jadwal berikutnya: {{ progress.jadwalBerikut }}</p>
            </div>

            <!-- progress bar -->
            <div class="mt-4">
              <div class="h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  class="h-3 bg-[#41a6c2]"
                  :style="{ width: progressPercent + '%' }"
                />
              </div>
              <div class="mt-1 text-xs text-gray-600">
                {{ progress.sesiSelesai }} dari {{ progress.totalSesi }} sesi selesai ({{ Math.round(progressPercent) }}%)
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- TUTOR REKOMENDASI -->
    <section class="py-8 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-xl font-semibold text-teal-700">Tutor Rekomendasi</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="t in top3Tutors"
            :key="t.id"
            class="rounded-xl border border-teal-600/40 bg-white p-5 shadow-sm"
          >
            <div class="flex gap-4">
              <img :src="t.photo" :alt="t.name" class="w-16 h-16 rounded-full bg-gray-200 object-cover" />
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900">{{ t.name }}</h4>
                <p class="text-sm text-gray-600">{{ t.subject }} • {{ t.level }}</p>

                <div class="mt-1 flex items-center gap-1">
                  <!-- star -->
                  <svg class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  <span class="font-medium">{{ t.rating.toFixed(1) }}</span>
                  <span class="text-gray-500 text-sm">({{ t.reviews }} ulasan)</span>
                </div>
              </div>
            </div>

            <p class="mt-3 text-sm text-gray-700 line-clamp-2">
              {{ t.bio }}
            </p>

            <div class="mt-4 flex items-center justify-between">
              <a
                :href="waLink(t.whatsapp)"
                target="_blank" rel="noopener"
                class="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <!-- whatsapp -->
                <i class="bi bi-whatsapp text-base"></i>
                WhatsApp
              </a>
            </div>
          </article>
        </div>

        <!-- Tombol FULL -->
        <div class="mt-6">
          <RouterLink
            :to="{ name: 'TutorList' }"
            class="w-full inline-flex justify-center items-center rounded-xl bg-[#41a6c2] text-white font-semibold py-3 hover:bg-teal-700"
          >
            FULL
          </RouterLink>
        </div>
      </div>
    </section>


    <SidebarLeft v-if="showStandaloneSidebars" />
    <SidebarRight v-if="showStandaloneSidebars" />

    <!-- FOOTER -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import SidebarLeft from "@/components/layout/sidebar-left.vue";
import SidebarRight from "@/components/layout/sidebar-right.vue";
import Footer from "@/components/layout/footer.vue";

const showStandaloneSidebars = false;

const router = useRouter();

// Scroll state untuk navbar
const isScrolled = ref(false);

// Handle scroll event
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const faqBlock = ref(null);
const faqVisible = ref(false);
let observer;

// ==== DUMMY DATA ====
// Untuk menyembunyikan kartu paket, ubah ke: const paketAktif = ref(null)
const paketAktif = ref({
  nama: 'Paket Bulanan',
  totalSesi: 8,
  sesiTerpakai: 2,
  berlakuSampai: '2025-09-30'
})

const progress = ref({
  program: 'Matematika · 8 Pertemuan',
  mapel: 'Matematika',
  tutor: 'Budi Santoso',
  totalSesi: 8,
  sesiSelesai: 6,
  jadwalBerikut: 'Selasa, 23:00 — 24:00 (Online)',
  updatedAt: '2025-09-11'
})

// ==== COMPUTED & HELPERS ====
const totalSesi = computed(() => paketAktif?.value?.totalSesi ?? 0)
const sisaSesi  = computed(() => {
  if (!paketAktif.value) return 0
  return paketAktif.value.totalSesi - paketAktif.value.sesiTerpakai
})

const progressPercent = computed(() => {
  const t = progress.value.totalSesi || 1
  return (progress.value.sesiSelesai / t) * 100
})

function formatDate(str) {
  const d = new Date(str)
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

// dummy tutors (bisa taruh di services nanti)
const tutors = ref([
  {
    id: 1,
    name: 'Budi Santoso',
    subject: 'Matematika',
    level: 'SMP & SMA',
    rating: 4.9,
    reviews: 225,
    photo: 'https://picsum.photos/seed/tutor1/80/80',
    whatsapp: '+628123456789',
    bio: 'Tutor Matematika bersertifikat, berpengalaman lebih dari 6 tahun mengajar siswa SMP & SMA.'
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    subject: 'Fisika',
    level: 'SMA',
    rating: 4.8,
    reviews: 190,
    photo: 'https://picsum.photos/seed/tutor2/80/80',
    whatsapp: '081234567880',
    bio: 'Ahli Fisika dengan pendekatan praktis. Fokus pada pemahaman konsep dan latihan soal berjenjang.'
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    subject: 'Kimia',
    level: 'SMA',
    rating: 4.8,
    reviews: 174,
    photo: 'https://picsum.photos/seed/tutor3/80/80',
    whatsapp: '628111223344',
    bio: 'Berpengalaman olimpiade Kimia, membimbing banyak siswa lolos PTN favorit.'
  },
  {
    id: 4,
    name: 'Rina Wijaya',
    subject: 'Biologi',
    level: 'SMP',
    rating: 4.7,
    reviews: 130,
    photo: 'https://picsum.photos/seed/tutor4/80/80',
    whatsapp: '+62 811-7777-999',
    bio: 'Metode belajar interaktif dengan visual dan eksperimen sederhana.'
  }
])

// ambil 3 terbaik (rating, lalu jumlah ulasan)
const top3Tutors = computed(() =>
  [...tutors.value]
    .sort((a, b) => (b.rating - a.rating) || (b.reviews - a.reviews))
    .slice(0, 3)
)

// helper link WhatsApp
function waLink(number) {
  // ambil hanya angka & plus, lalu format untuk wa.me
  const n = (number || '').replace(/[^\d+]/g, '')
  const msisdn = n.startsWith('+') ? n.slice(1) : n
  return `https://wa.me/${msisdn}`
}

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
</script>
