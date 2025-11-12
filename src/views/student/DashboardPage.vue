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
                @click="router.push('/packages')"
                class="mt-4 bg-[#41a6c2] text-white px-6 py-2 rounded-md hover:bg-[#3592ab]"
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
                  <h3
                    @click="goToTutorDetail(tutor)"
                    class="font-semibold text-gray-800 cursor-pointer hover:text-[#41a6c2] transition"
                  >
                    {{ tutor.name }}
                  </h3>
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
                <i class="bi bi-whatsapp"></i>
                WhatsApp
              </a>
            </div>

            <!-- Tombol FULL -->
            <div class="mt-6">
              <RouterLink
                to="/tutors"
                class="w-full inline-flex justify-center items-center rounded-xl bg-[#41a6c2] text-white font-semibold py-3 hover:bg-[#3592ab] transition-colors"
              >
                Selengkapnya
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
import { getMe } from "@/services/authService.js";
import {
  getStudentDashboard,
  getRecommendedTutors,
} from "@/services/studentDashboardService";

const user = ref(null);

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
const paketAktif = ref(null);

const progress = ref({
  program: "",
  mapel: "",
  tutor: "",
  totalSesi: 0,
  sesiSelesai: 0,
  jadwalBerikut: "",
  updatedAt: "",
});

// Jadwal Belajar dummy
const jadwalList = ref([]);

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

function formatDate(dateStr) {
  if (!dateStr) return "-";

  let tgl = dateStr;
  try {
    const d = new Date(dateStr);
    if (!Numbber.isNaN(d.getTime())) {
      tgl = d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  } catch (_) {}

  return String(dateStr);
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
  // {
  //   id: 4,
  //   name: "Rina Wijaya",
  //   subject: "Biologi",
  //   level: "SMP",
  //   rating: 4.7,
  //   reviews: 130,
  //   photo: "https://picsum.photos/seed/tutor4/80/80",
  //   whatsapp: "+62 811-7777-999",
  //   bio: "Metode belajar interaktif dengan visual dan eksperimen sederhana.",
  // },
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

async function loadDashboard() {
  try {
    // 1. Ambil user yang sedang login -> /api/me
    const meRes = await getMe();
    // LoginController@me return: { user: {...} }
    user.value = meRes.user;

    // 2. Ambil data dashboard student -> /api/dashboard/student
    const dashRes = await getStudentDashboard();
    // StudentDashboardController@index return: { status, data: { ... } }
    const data = dashRes.data || dashRes;

    // ====== PAKET BELAJAR & PROGRESS ======
    const packages = data.packages || [];

    if (packages.length > 0) {
      // untuk sementara ambil paket pertama sebagai "paket aktif"
      const pkg = packages[0];

      // bentuknya sesuai mapping di StudentDashboardController:
      // 'package_name', 'package_session', 'remaining_session', 'used_session', 'subject_name', 'tutor_name', ...

      paketAktif.value = {
        nama: pkg.package_name || "Paket Belajar",
        totalSesi: pkg.package_session ?? 0,
        sesiTerpakai: pkg.used_session ?? 0,
        // backend belum kirim tanggal expired, jadi untuk sekarang null
        berlakuSampai: null,
      };

      // sesuaikan progress card
      progress.value.program = `${pkg.package_name || "Paket Belajar"} · ${
        pkg.package_session ?? 0
      } Pertemuan`;
      progress.value.mapel = pkg.subject_name || "Mapel";
      progress.value.tutor = pkg.tutor_name || "-";
      progress.value.totalSesi = pkg.package_session ?? 0;
      progress.value.sesiSelesai = pkg.used_session ?? 0;
    } else {
      paketAktif.value = null;
      progress.value.totalSesi = 0;
      progress.value.sesiSelesai = 0;
      progress.value.program = "";
      progress.value.mapel = "";
      progress.value.tutor = "";
      progress.value.jadwalBerikut = "Belum ada jadwal";
    }

    // ====== JADWAL BELAJAR ======
    // di backend: $upcomingSchedules -> 'upcoming_schedules' di JSON
    // mapping: id, date, status, subject_name, tutor_name, schedule_time, ...
    const upcoming = data.upcoming_schedules || [];

    jadwalList.value = upcoming.map((js) => ({
      matkul: js.subject_name || "-",
      waktu: formatJadwal(js.date, js.schedule_time),
    }));

    if (upcoming.length > 0) {
      const first = upcoming[0];
      progress.value.jadwalBerikut = formatJadwal(
        first.date,
        first.schedule_time
      );
    } else {
      progress.value.jadwalBerikut = "Belum ada jadwal";
    }

    // ====== REKOMENDASI TUTOR ======
    // StudentDashboardController@getRecommendedTutors
    // return: { status, data: [ { tutor_id, tutor_name, tutor_photo, education, description, subjects: [...] } ], pagination: {...} }
    const recRes = await getRecommendedTutors(1);
    const recData = recRes.data || recRes;

    tutors.value = (recData || []).map((t) => ({
      id: t.tutor_id,
      name: t.tutor_name,
      // gabung nama mapel dari array 'subjects'
      subject: (t.subjects || []).map((s) => s.subject_name).join(", ") || "-",
      level: t.education || "", // backend punya 'education', bisa dipakai sbg level
      // backend belum kirim rating & reviews -> set default
      rating: t.rating ?? 0,
      reviews: t.reviews ?? 0,
      photo:
        t.tutor_photo ||
        "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(t.tutor_name || "Tutor"),
      // backend belum kirim nomor WA, jadi untuk sekarang kosong
      whatsapp: "",
      bio: t.description || "",
    }));
  } catch (err) {
    console.error("Gagal load dashboard:", err);

    // kalau belum login / token invalid -> balikin ke login
    if (
      err.message?.toLowerCase().includes("unauthenticated") ||
      err.message?.includes("401")
    ) {
      router.push({ name: "login" });
    }
  }
}

function formatJadwal(dateStr, timeStr) {
  if (!dateStr && !timeStr) return "-";

  let tgl = dateStr;
  try {
    const d = new Date(dateStr);
    if (!Number.isNaN(d.getTime())) {
      tgl = d.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "short",
      });
    }
  } catch (_) {
    // kalau gagal parse, pakai string aslinya saja
  }

  return [tgl, timeStr].filter(Boolean).join(", ");
}

function goToTutorDetail(tutor) {
  router.push({
    path: "/tutors/tutor-detail",
    query: {
      id: tutor.id,
      name: tutor.name,
      subject: tutor.subject,
      level: tutor.level,
      rating: tutor.rating,
      reviews: tutor.reviews,
      photo: tutor.photo,
      whatsapp: tutor.whatsapp,
      bio: tutor.bio,
    },
  });
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

  loadDashboard();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  observer?.disconnect();
});
</script>
