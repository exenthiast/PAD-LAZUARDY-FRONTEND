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
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">Memuat data tutor...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto"
      >
        <svg
          class="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          Terjadi Kesalahan
        </h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button
          @click="loadTutors"
          class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredTutors.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg">Tidak ada tutor yang ditemukan</p>
        <p class="text-gray-500 text-sm mt-2">
          Coba ubah filter atau kata kunci pencarian
        </p>
      </div>

      <!-- Tutor List -->
      <div v-else>
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
                <a
                  :href="waLink(tutor.whatsapp)"
                  target="_blank"
                  rel="noopener"
                  class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition md:w-auto inline-flex items-center gap-2"
                >
                  <i class="bi bi-whatsapp"></i>
                  WhatsApp
                </a>
                <button
                  @click="goToDetail(tutor)"
                  class="border-2 border-primary text-primary px-6 py-2 rounded-lg hover:bg-[#2ba9b2] hover:text-white transition w-fit"
                >
                  Lihat Detail
                </button>
              </div>
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
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { Search } from "lucide-vue-next";
import Navbar from "@/components/layout/navbar.vue";
import { getPublicTutors } from "@/services/tutorService";

const router = useRouter();

// Dynamic subjects and levels from backend
const subjects = ref([]);
const levels = ["SD", "SMP", "SMA"];

// Filter states
const searchQuery = ref("");
const selectedSubject = ref("");
const selectedLevel = ref("");
const selectedMode = ref("");

// Data states
const tutors = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Fetch tutors from backend
async function loadTutors() {
  try {
    isLoading.value = true;
    error.value = null;

    const params = {};

    // Add search query if exists
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }

    // Add filters
    if (selectedSubject.value) {
      params.subject = selectedSubject.value;
    }
    if (selectedLevel.value) {
      params.level = selectedLevel.value;
    }
    if (selectedMode.value) {
      params.mode = selectedMode.value.toLowerCase();
    }

    console.log("Fetching public tutors with params:", params);
    const response = await getPublicTutors(params);

    console.log("========== PUBLIC TUTORS RESPONSE ==========");
    console.log("Response:", response);
    console.log("Response data:", response.data);
    console.log("Total tutors:", response.total);

    // Debug first tutor data structure
    if (response.data && response.data.length > 0) {
      console.log("First tutor raw data:", response.data[0]);
      console.log("- profile_photo_url:", response.data[0].profile_photo_url);
      console.log("- keahlian:", response.data[0].keahlian);
      console.log("- market_siswa:", response.data[0].market_siswa);
      console.log("- price:", response.data[0].tutor_info?.price);
      console.log("- subjects:", response.data[0].subjects);
    }
    console.log("==========================================");

    // Handle response format
    let tutorData = [];

    if (response.data && Array.isArray(response.data)) {
      tutorData = response.data;
      console.log("✅ Found", tutorData.length, "tutors");
    }

    // Map backend data to frontend format
    if (tutorData.length > 0) {
      tutors.value = tutorData.map((tutor) => {
        // Get subjects
        const tutorSubjects = tutor.subjects || [];
        const subjectNames = tutorSubjects.map((s) => s.name).join(", ");

        // Fallback: jika subjects kosong, gunakan keahlian
        const displaySubject = subjectNames || tutor.keahlian || "-";

        // Get class levels
        const classNames = [
          ...new Set(tutorSubjects.map((s) => s.class?.name).filter(Boolean)),
        ];

        // Fallback: jika tidak ada class, gunakan market_siswa
        const level =
          classNames.length > 0
            ? classNames.join(", ")
            : tutor.market_siswa
            ? tutor.market_siswa.toUpperCase()
            : "-";

        // Parse teaching mode
        const courseMode = tutor.teaching_method?.course_mode || "both";
        const teachingMode = [];
        if (courseMode === "online" || courseMode === "both")
          teachingMode.push("online");
        if (courseMode === "offline" || courseMode === "both")
          teachingMode.push("offline");

        // Get photo URL - prioritas: profile_photo_url dari backend
        let photo = tutor.profile_photo_url;
        if (!photo) {
          photo = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            tutor.name || "User"
          )}&background=2ba9b2&color=fff`;
        }

        // Format WhatsApp number
        const whatsapp = tutor.telephone_number || "";

        // Get description - gabungkan berbagai sumber
        const bio =
          tutor.tutor_info?.description ||
          tutor.tutor_info?.pengalaman ||
          tutor.teaching_method?.description ||
          "-";

        return {
          id: tutor.user_id,
          name: tutor.name || "N/A",
          subject: displaySubject,
          level: level,
          rating: tutor.rating?.average || 0,
          reviews: tutor.rating?.count || 0,
          photo: photo,
          whatsapp: whatsapp,
          bio: bio,
          teachingMode: teachingMode,
          price: tutor.tutor_info?.price || 0,
        };
      });

      // Extract unique subjects for filter dropdown
      const uniqueSubjects = new Set();
      tutorData.forEach((tutor) => {
        if (tutor.subjects && Array.isArray(tutor.subjects)) {
          tutor.subjects.forEach((s) => {
            if (s.name) uniqueSubjects.add(s.name);
          });
        }
        // Juga tambahkan keahlian jika ada
        if (tutor.keahlian) {
          uniqueSubjects.add(tutor.keahlian);
        }
      });
      subjects.value = Array.from(uniqueSubjects).sort();

      console.log("✅ Successfully mapped", tutors.value.length, "tutors");
      console.log("First mapped tutor:", tutors.value[0]);
      console.log("Available subjects for filter:", subjects.value);
    } else {
      console.warn("No tutors found");
      tutors.value = [];
    }
  } catch (err) {
    console.error("Error loading tutors:", err);
    console.error("Error response:", err.response);
    console.error("Error data:", err.response?.data);

    let errorMsg = "Gagal memuat data tutor";

    if (err.response?.status === 500) {
      errorMsg = "Terjadi kesalahan server. Silakan coba lagi nanti.";
    } else if (err.response?.data?.message) {
      errorMsg = err.response.data.message;
    }

    error.value = errorMsg;
    tutors.value = [];
  } finally {
    isLoading.value = false;
  }
}

// Auto search on query change (debounced)
let searchTimeout = null;
watch(searchQuery, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadTutors();
  }, 500);
});

// Apply filter button
const applyFilter = () => {
  loadTutors();
};

// Computed filtered tutors (client-side filtering as fallback)
const filteredTutors = computed(() => {
  if (!tutors.value) return [];
  return tutors.value;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const waLink = (number) => {
  // ambil hanya angka & plus, lalu format untuk wa.me
  const n = (number || "").replace(/[^\d+]/g, "");
  const msisdn = n.startsWith("+") ? n.slice(1) : n;
  return `https://wa.me/${msisdn}`;
};

const goToDetail = (tutor) => {
  console.log("Navigating to tutor detail with data:", tutor);
  console.log("Tutor ID being sent:", tutor.id);

  router.push({
    path: "/tutors/tutor-detail",
    query: {
      id: tutor.id,
      name: tutor.name,
      subject: tutor.subject,
      rating: tutor.rating,
      totalReviews: tutor.reviews,
      photo: tutor.photo,
      whatsapp: tutor.whatsapp,
      bio: tutor.bio,
      price: tutor.price,
      courseMode: tutor.teachingMode.join(","), // Convert array to string
      level: tutor.level,
    },
  });
};

// Load tutors on mount
onMounted(() => {
  loadTutors();
});
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
