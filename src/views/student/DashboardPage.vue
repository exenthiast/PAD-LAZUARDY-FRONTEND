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
            <!-- Loading State -->
            <div v-if="isLoadingDashboard" class="text-center py-8">
              <div
                class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#41a6c2] border-t-transparent"
              ></div>
              <p class="mt-2 text-gray-500 text-sm">Memuat data...</p>
            </div>

            <!-- Paket Aktif -->
            <div
              v-else-if="paketAktif"
              class="border rounded-xl p-5 shadow-sm bg-gradient-to-br from-teal-50 to-blue-50"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h3 class="font-bold text-gray-800 text-lg">
                    {{ paketAktif.nama }}
                  </h3>
                  <p
                    class="text-sm text-gray-600 mt-1"
                    v-if="paketAktif.berlakuSampai"
                  >
                    Berlaku s/d
                    <span class="font-semibold text-gray-800">{{
                      formatDate(paketAktif.berlakuSampai)
                    }}</span>
                  </p>
                </div>
                <span
                  class="px-3 py-1 text-xs font-semibold rounded-full bg-teal-500 text-white"
                >
                  Aktif
                </span>
              </div>
              <div class="bg-white rounded-lg p-3 mt-3">
                <p class="text-sm text-gray-600 mb-1">Sisa Pertemuan</p>
                <div class="flex items-baseline gap-2">
                  <span class="text-2xl font-bold text-[#41a6c2]">{{
                    sisaSesi
                  }}</span>
                  <span class="text-gray-500">/ {{ totalSesi }} sesi</span>
                </div>
              </div>
            </div>

            <!-- Belum Ada Paket Approved -->
            <div v-else class="text-center py-8">
              <div
                class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4"
              >
                <p class="text-yellow-800 font-medium mb-2">
                  ⚠️ Anda belum membeli paket belajar
                </p>
                <p class="text-sm text-yellow-700">
                  Silakan beli paket terlebih dahulu untuk dapat booking jadwal
                  tutor
                </p>
              </div>
              <button
                @click="router.push('/packages')"
                class="bg-[#41a6c2] text-white px-8 py-3 rounded-lg hover:bg-[#3592ab] font-semibold transition-all transform hover:scale-105"
              >
                Pilih Paket Belajar
              </button>
            </div>
          </section>

          <!-- Progress Belajar -->
          <section class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-semibold text-[#41a6c2] mb-4">
              Progress Belajar
            </h2>

            <!-- Loading State -->
            <div v-if="isLoadingDashboard" class="text-center py-8">
              <div
                class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#41a6c2] border-t-transparent"
              ></div>
            </div>

            <!-- Progress Card (New Design) -->
            <div
              v-else-if="progress.totalSesi > 0"
              class="border rounded-xl p-5 bg-gradient-to-br from-blue-50 to-teal-50 shadow-sm"
            >
              <!-- Header: Paket - Mapel (Tutor) -->
              <div class="mb-4 pb-3 border-b border-gray-200">
                <h3 class="font-bold text-gray-800 text-lg">
                  {{ progress.program }} - {{ progress.mapel }}
                </h3>
                <p class="text-sm text-gray-600 mt-1" v-if="progress.tutor">
                  Tutor: <span class="font-semibold">{{ progress.tutor }}</span>
                </p>
              </div>

              <!-- Tutor Info & Schedule -->
              <div class="bg-white rounded-lg p-4 mb-4 space-y-2">
                <div class="flex items-start gap-3">
                  <div class="flex-1">
                    <!-- Total Booking (1 booking = 4 pertemuan) -->
                    <p class="text-sm text-gray-600">
                      Total Booking:
                      <span class="font-semibold text-gray-800">
                        {{ Math.ceil(progress.totalSesi / 4) }} kali
                      </span>
                      <span class="text-xs text-gray-500">
                        ({{ progress.totalSesi }} pertemuan)</span
                      >
                    </p>

                    <!-- Jadwal Berikutnya -->
                    <p class="text-sm text-gray-600 mt-2">
                      📅 Jadwal berikutnya:
                      <span class="font-medium text-gray-800">{{
                        progress.jadwalBerikut
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="bg-white rounded-lg p-4">
                <p class="text-sm font-medium text-gray-700 mb-2">
                  Sisa Pertemuan
                </p>
                <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    class="bg-gradient-to-r from-teal-500 to-blue-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    :style="{ width: progressPercent + '%' }"
                  >
                    <span
                      v-if="progressPercent > 10"
                      class="text-xs text-white font-bold"
                    >
                      {{ Math.round(progressPercent) }}%
                    </span>
                  </div>
                </div>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-600">
                    <span class="font-bold text-[#41a6c2]">{{
                      progress.sesiSelesai
                    }}</span>
                    / {{ progress.totalSesi }} pertemuan selesai
                  </span>
                  <span class="text-xs text-gray-500">
                    Sisa
                    {{ progress.totalSesi - progress.sesiSelesai }} pertemuan
                  </span>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8">
              <div class="bg-gray-50 rounded-lg p-6">
                <p class="text-gray-500">📊 Belum ada progress belajar</p>
                <p class="text-xs text-gray-400 mt-1">
                  Progress akan muncul setelah tutor menyimpan laporan sesi
                </p>
              </div>
            </div>
          </section>

          <!-- Jadwal Belajar -->
          <section class="bg-white rounded-2xl shadow p-6">
            <h2 class="text-xl font-semibold text-[#41a6c2] mb-3">
              Jadwal Belajar
            </h2>

            <div v-if="isLoadingDashboard" class="text-center py-8">
              <div
                class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#41a6c2] border-t-transparent"
              ></div>
            </div>

            <div
              v-else-if="jadwalList.length > 0"
              class="text-gray-600 text-sm space-y-2"
            >
              <div
                v-for="(jadwal, index) in jadwalList"
                :key="index"
                class="border rounded-lg p-3 flex justify-between hover:shadow-md transition"
              >
                <span class="font-medium">{{ jadwal.matkul }}</span>
                <span class="text-gray-500">{{ jadwal.waktu }}</span>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
              <p>Belum ada jadwal belajar</p>
            </div>
          </section>
        </div>

        <!-- ===== KANAN: Tutor Rekomendasi (scroll terpisah) ===== -->
        <div class="w-full lg:flex-1">
          <section
            class="bg-white rounded-2xl shadow p-6 lg:h-[calc(100vh-120px)] lg:sticky lg:top-24 flex flex-col"
          >
            <h2 class="text-xl font-semibold text-[#41a6c2] mb-4">
              Rekomendasi Tutor
            </h2>

            <div
              v-if="isLoadingTutors"
              class="flex-1 flex items-center justify-center"
            >
              <div class="text-center py-8">
                <div
                  class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#41a6c2] border-t-transparent"
                ></div>
                <p class="mt-2 text-gray-500 text-sm">Memuat tutor...</p>
              </div>
            </div>

            <div
              v-else-if="tutors.length > 0"
              class="flex-1 overflow-y-auto mb-4 space-y-4"
            >
              <div
                v-for="tutor in tutors"
                :key="tutor.id"
                class="border rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow bg-white"
              >
                <!-- Header: Foto + Nama -->
                <div class="flex items-start gap-4 mb-4">
                  <img
                    :src="tutor.photo"
                    :alt="tutor.name"
                    class="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    @error="handleTutorPhotoError"
                  />
                  <div class="flex-1">
                    <h3
                      @click="goToTutorDetail(tutor)"
                      class="font-bold text-gray-900 text-lg cursor-pointer hover:text-[#41a6c2] transition"
                    >
                      {{ tutor.name }}
                    </h3>
                    <p class="text-sm text-gray-600 mt-0.5">
                      {{ tutor.keahlian || tutor.subject }}
                    </p>
                  </div>
                </div>

                <!-- Rating & Stats -->
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <!-- Rating -->
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                      <span class="text-yellow-500">⭐</span>
                      <span class="font-semibold text-gray-800">{{
                        tutor.rating.toFixed(1)
                      }}</span>
                    </div>
                    <span class="text-xs text-gray-500"
                      >({{ tutor.totalReviews }} ulasan)</span
                    >
                  </div>

                  <!-- Total Siswa -->
                  <div class="flex items-center gap-2 text-gray-700">
                    <User class="w-4 h-4 text-[#41a6c2]" />
                    <span class="text-sm">{{ tutor.totalStudents }} siswa</span>
                  </div>

                  <!-- Total Sesi -->
                  <div class="flex items-center gap-2 text-gray-700">
                    <ChartColumn class="w-4 h-4 text-[#41a6c2]" />
                    <span class="text-sm">{{ tutor.totalSessions }} sesi</span>
                  </div>

                  <!-- Online/Offline -->
                  <div class="flex items-center gap-2 text-gray-700">
                    <Globe class="w-4 h-4 text-[#41a6c2]" />
                    <span class="text-sm text-capitalize">{{
                      formatCourseMode(tutor.courseMode)
                    }}</span>
                  </div>
                </div>

                <!-- Latest Review -->
                <div
                  v-if="tutor.latestReview"
                  class="bg-gray-50 rounded-lg p-3 mb-4"
                >
                  <p class="text-xs text-gray-600 line-clamp-2 italic">
                    "{{ tutor.latestReview.review_text }}"
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    - {{ tutor.latestReview.student_name }}
                  </p>
                </div>

                <!-- Button Detail -->
                <button
                  @click="goToTutorDetail(tutor)"
                  class="w-full bg-[#41a6c2] text-white py-2.5 rounded-lg hover:bg-[#3592ab] transition font-medium text-sm"
                >
                  Lihat Detail
                </button>
              </div>
            </div>

            <div v-else class="flex-1 flex items-center justify-center">
              <p class="text-gray-500">Belum ada rekomendasi tutor</p>
            </div>

            <!-- Tombol FULL - Fixed di bawah -->
            <div class="mt-auto pt-4 border-t">
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
import { User, ChartColumn, Globe } from "lucide-vue-next";
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
const isLoadingDashboard = ref(false);
const isLoadingTutors = ref(false);

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

// State untuk data dari backend
const paketAktif = ref(null);

const progress = ref({
  program: "",
  mapel: "",
  tutor: "",
  totalSesi: 0,
  sesiSelesai: 0,
  jadwalBerikut: "Belum ada jadwal",
  updatedAt: "",
});

// Jadwal Belajar
const jadwalList = ref([]);

// Rekomendasi Tutor
const tutors = ref([]);

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

  try {
    const d = new Date(dateStr);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
  } catch (_) {
    // ignore
  }

  return String(dateStr);
}

// Helper link WhatsApp
function waLink(number) {
  if (!number) return "#";
  const n = number.replace(/[^\d+]/g, "");
  const msisdn = n.startsWith("+") ? n.slice(1) : n;
  return `https://wa.me/${msisdn}`;
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
    // kalau gagal parse, pakai string aslinya
  }

  return [tgl, timeStr].filter(Boolean).join(", ");
}

// ==== LOAD DATA DARI BACKEND ====
async function loadDashboard() {
  try {
    isLoadingDashboard.value = true;

    // 1. Ambil user yang sedang login
    const meRes = await getMe();
    user.value = meRes.user;

    // 2. Ambil data dashboard student -> /api/dashboard/student
    const dashRes = await getStudentDashboard();
    const data = dashRes.data || dashRes;

    // ====== PAKET BELAJAR & PROGRESS ======
    const packages = data.packages || [];

    if (packages.length > 0) {
      const pkg = packages[0];

      // Hitung total pertemuan dari package (24 atau 48 sesi)
      const totalPertemuan = pkg.package_session ?? 0;

      // Hitung sesi selesai dari remaining_session
      const sisaPertemuan = pkg.remaining_session ?? totalPertemuan;
      const pertemuanSelesai = totalPertemuan - sisaPertemuan;

      paketAktif.value = {
        nama: pkg.package_name || "Paket Belajar",
        totalSesi: totalPertemuan,
        sesiTerpakai: pertemuanSelesai,
        berlakuSampai: pkg.end_date || null, // Deadline paket
      };

      progress.value.program = pkg.package_name || "Paket Belajar";
      progress.value.mapel = pkg.subject_name || "Mapel";
      progress.value.tutor = pkg.tutor_name || "-";
      progress.value.totalSesi = totalPertemuan;
      progress.value.sesiSelesai = pertemuanSelesai;
    } else {
      // Belum ada paket yang approved
      paketAktif.value = null;
      progress.value.totalSesi = 0;
      progress.value.sesiSelesai = 0;
      progress.value.program = "";
      progress.value.mapel = "";
      progress.value.tutor = "";
    }

    // ====== JADWAL BELAJAR ======
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
  } catch (err) {
    console.error("Gagal load dashboard:", err);

    if (
      err.message?.toLowerCase().includes("unauthenticated") ||
      err.message?.includes("401")
    ) {
      router.push({ name: "login" });
    }
  } finally {
    isLoadingDashboard.value = false;
  }
}

async function loadRecommendedTutors() {
  try {
    isLoadingTutors.value = true;

    const recRes = await getRecommendedTutors(1);
    const recData = recRes.data || recRes;

    tutors.value = (recData || []).map((t) => ({
      id: t.tutor_id,
      name: t.tutor_name,
      keahlian:
        t.keahlian ||
        (t.subjects || []).map((s) => s.subject_name).join(", ") ||
        "-",
      subject: (t.subjects || []).map((s) => s.subject_name).join(", ") || "-",
      rating: t.rating ?? 0,
      totalReviews: t.total_reviews ?? 0,
      totalStudents: t.total_students ?? 0,
      totalSessions: t.total_sessions ?? 0,
      courseMode: t.course_mode || "online",
      photo:
        t.tutor_photo && t.tutor_photo !== "default"
          ? `http://localhost:8000/storage/${t.tutor_photo}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              t.tutor_name || "Tutor"
            )}&size=200&background=41a6c2&color=fff`,
      whatsapp: t.telephone_number || "",
      bio: t.description || "",
      latestReview: t.latest_review || null,
      education: t.education || "",
      price: t.price || 0,
    }));
  } catch (err) {
    console.error("Gagal load tutor rekomendasi:", err);
  } finally {
    isLoadingTutors.value = false;
  }
}

// Helper untuk format course mode
function formatCourseMode(mode) {
  if (!mode) return "Online";

  const modes = {
    online: "Online",
    offline: "Offline",
    both: "Online & Offline",
    hybrid: "Online & Offline",
  };

  return modes[mode.toLowerCase()] || mode;
}

// Handle tutor photo error
function handleTutorPhotoError(event) {
  event.target.src =
    "https://ui-avatars.com/api/?name=Tutor&size=200&background=41a6c2&color=fff";
}

function goToTutorDetail(tutor) {
  console.log("Navigating to tutor detail with data:", tutor);
  console.log("Tutor ID being sent:", tutor.id);

  router.push({
    path: "/tutors/tutor-detail",
    query: {
      id: tutor.id,
      name: tutor.name,
      subject: tutor.subject,
      keahlian: tutor.keahlian,
      rating: tutor.rating,
      totalReviews: tutor.totalReviews,
      totalStudents: tutor.totalStudents,
      totalSessions: tutor.totalSessions,
      courseMode: tutor.courseMode,
      photo: tutor.photo,
      whatsapp: tutor.whatsapp,
      bio: tutor.bio,
      education: tutor.education,
      price: tutor.price,
    },
  });
}

// ==== LIFECYCLE HOOKS ====
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

  // Load data dari backend
  loadDashboard();
  loadRecommendedTutors();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  observer?.disconnect();
});
</script>
