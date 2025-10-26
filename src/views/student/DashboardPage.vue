<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- NAVBAR -->
    <Navbar />

    <!-- MAIN -->
    <main class="flex-1 py-8 px-6">
      <!-- HERO / Banner -->
      <section class="max-w-6xl mx-auto mb-6">
        <div class="bg-[#41a6c2] rounded-2xl p-8 md:p-12 text-center shadow">
          <h1 class="text-xl md:text-2xl font-semibold text-white">
            Gambar atau iklan mengenai lazuardy
          </h1>
        </div>
      </section>

      <!-- CONTENT GRID -->
      <div class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        <!-- ===== KIRI: Paket, Progress, Jadwal ===== -->
        <div class="w-full lg:flex-[2] space-y-6">
          <!-- Paket Belajar -->
          <section class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-semibold text-[#41a6c2] mb-4">
              Paket Belajar
            </h2>
            <div v-if="paketAktif" class="border rounded-xl p-4 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-800">
                  {{ paketAktif.nama }}
                </h3>
                <span
                  class="px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-700"
                >
                  Aktif
                </span>
              </div>
              <p class="text-sm text-gray-600 mb-2">
                Berlaku s/d
                <span class="font-medium">{{
                  formatDate(paketAktif.berlakuSampai)
                }}</span>
              </p>
              <div class="text-sm text-gray-700">
                Sisa sesi: <span class="font-semibold">{{ sisaSesi }}</span> /
                {{ totalSesi }}
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <p>Belum ada paket aktif</p>
              <button
                class="mt-4 bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700"
              >
                Pilih Paket
              </button>
            </div>
          </section>

          <!-- Progress Belajar -->
          <section class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-semibold text-[#41a6c2] mb-3">
              Progress Belajar
            </h2>
            <div class="space-y-2 text-sm mb-4">
              <p class="text-gray-700">
                <span class="font-medium">{{ progress.mapel }}</span> ·
                {{ progress.program }}
              </p>
              <p class="text-gray-600">Tutor: {{ progress.tutor }}</p>
              <p class="text-gray-500 text-xs">
                Jadwal berikutnya: {{ progress.jadwalBerikut }}
              </p>
            </div>
            <p class="text-sm text-gray-600 mb-2">Sisa Pertemuan</p>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div
                class="bg-[#41a6c2] h-3 rounded-full transition-all duration-500"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
            <div class="mt-2 text-xs text-gray-600">
              {{ progress.sesiSelesai }} dari {{ progress.totalSesi }} sesi
              selesai ({{ Math.round(progressPercent) }}%)
            </div>
          </section>

          <!-- Jadwal Belajar -->
          <section class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-semibold text-[#41a6c2] mb-3">
              Jadwal Belajar
            </h2>
            <div class="text-gray-600 text-sm">
              <div
                v-for="(jadwal, index) in jadwalList"
                :key="index"
                class="border rounded-lg p-3 mb-2 flex justify-between hover:shadow-md transition"
              >
                <span class="font-medium">{{ jadwal.matkul }}</span>
                <span class="text-gray-500">{{ jadwal.waktu }}</span>
              </div>
            </div>
          </section>
        </div>

        <!-- ===== KANAN: Tutor Rekomendasi (scroll terpisah) ===== -->
        <div class="w-full lg:flex-1">
          <section
            class="bg-white rounded-2xl shadow p-6 lg:h-[calc(100vh-120px)] lg:overflow-y-auto lg:sticky lg:top-24"
          >
            <h2 class="text-xl font-semibold text-[#41a6c2] mb-4">
              Rekomendasi Tutor
            </h2>
            <div
              v-for="tutor in tutors"
              :key="tutor.id"
              class="border rounded-xl p-4 mb-3 shadow-sm hover:shadow-md transition"
            >
              <div class="flex items-center gap-3 mb-2">
                <img
                  :src="tutor.photo"
                  :alt="tutor.name"
                  class="w-12 h-12 bg-gray-200 rounded-full object-cover"
                />
                <div>
                  <h3 class="font-semibold text-gray-800">{{ tutor.name }}</h3>
                  <p class="text-sm text-gray-500">{{ tutor.subject }}</p>
                </div>
              </div>
              <p class="text-xs text-gray-500 mb-2 line-clamp-2">
                {{ tutor.bio }}
              </p>
              <div class="text-sm text-gray-600 flex items-center gap-1">
                <span>⭐ {{ tutor.rating.toFixed(1) }}</span>
                <span>•</span>
                <span>{{ tutor.level }}</span>
                <span class="text-gray-400 text-xs ml-1"
                  >({{ tutor.reviews }})</span
                >
              </div>
              <a
                :href="waLink(tutor.whatsapp)"
                target="_blank"
                rel="noopener"
                class="mt-3 w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition text-sm"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                  />
                </svg>
                WhatsApp
              </a>
            </div>

            <!-- Tombol FULL -->
            <div class="mt-6">
              <RouterLink
                to="/tutors"
                class="w-full inline-flex justify-center items-center rounded-xl bg-[#41a6c2] text-white font-semibold py-3 hover:bg-[#3592ab] transition-colors"
              >
                FULL
              </RouterLink>
            </div>
          </section>
        </div>
      </div>
    </main>

    <SidebarLeft v-if="showStandaloneSidebars" />
    <SidebarRight v-if="showStandaloneSidebars" />

    <!-- FOOTER -->
    <FooterStudent />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter, RouterLink } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import SidebarLeft from "@/components/layout/sidebar-left.vue";
import SidebarRight from "@/components/layout/sidebar-right.vue";
import FooterStudent from "@/components/layout/footer.vue";

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
  nama: "Paket Bulanan",
  totalSesi: 8,
  sesiTerpakai: 2,
  berlakuSampai: "2025-09-30",
});

const progress = ref({
  program: "Matematika · 8 Pertemuan",
  mapel: "Matematika",
  tutor: "Budi Santoso",
  totalSesi: 8,
  sesiSelesai: 6,
  jadwalBerikut: "Selasa, 23:00 — 24:00 (Online)",
  updatedAt: "2025-09-11",
});

// Jadwal Belajar dummy
const jadwalList = ref([
  { matkul: "Matematika", waktu: "Senin, 08:00 - 09:30" },
  { matkul: "Fisika", waktu: "Rabu, 10:00 - 11:30" },
  { matkul: "Kimia", waktu: "Jumat, 14:00 - 15:30" },
]);

// ==== COMPUTED & HELPERS ====
const totalSesi = computed(() => paketAktif?.value?.totalSesi ?? 0);
const sisaSesi = computed(() => {
  if (!paketAktif.value) return 0;
  return paketAktif.value.totalSesi - paketAktif.value.sesiTerpakai;
});

const progressPercent = computed(() => {
  const t = progress.value.totalSesi || 1;
  return (progress.value.sesiSelesai / t) * 100;
});

function formatDate(str) {
  const d = new Date(str);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// dummy tutors (bisa taruh di services nanti)
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
  },
]);

// ambil 3 terbaik (rating, lalu jumlah ulasan)
const top3Tutors = computed(() =>
  [...tutors.value]
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    .slice(0, 3)
);

// helper link WhatsApp
function waLink(number) {
  // ambil hanya angka & plus, lalu format untuk wa.me
  const n = (number || "").replace(/[^\d+]/g, "");
  const msisdn = n.startsWith("+") ? n.slice(1) : n;
  return `https://wa.me/${msisdn}`;
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
