<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 pb-24 relative">
    <Navbar />

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data tutor...</p>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="tutor">
      <!-- Header -->
      <header class="bg-white border-b py-8">
        <div
          class="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 px-4"
        >
          <img
            :src="tutor.photo"
            alt="profile"
            class="w-28 h-28 rounded-full object-cover shadow"
            @error="
              (e) =>
                (e.target.src =
                  'https://ui-avatars.com/api/?name=' +
                  encodeURIComponent(tutor.name))
            "
          />
          <div>
            <h1 class="text-2xl font-semibold text-gray-800">
              {{ tutor.name }}
            </h1>
            <p class="text-sm text-gray-500">
              {{ tutor.subject }} • {{ tutor.level }}
            </p>
            <div class="flex gap-2 mt-3 flex-wrap">
              <span
                v-for="mode in tutor.teachingMode"
                :key="mode"
                class="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
              >
                {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
              </span>
            </div>
          </div>
        </div>
      </header>

      <!-- Body -->
      <main class="max-w-4xl mx-auto px-4 py-8 space-y-12">
        <!-- Tentang Tutor -->
        <section>
          <h2 class="text-lg font-semibold mb-2 text-gray-800">
            Tentang Tutor
          </h2>
          <p class="text-sm leading-relaxed text-gray-600">
            {{ tutor.bio }}
          </p>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg border">
              <p class="text-sm text-gray-500">Tarif per Pertemuan</p>
              <p class="text-xl font-bold text-primary">
                {{ formatPrice(tutor.price) }}
              </p>
            </div>
            <div class="bg-white p-4 rounded-lg border">
              <p class="text-sm text-gray-500">Rating</p>
              <p class="text-xl font-bold text-yellow-500">
                ★ {{ tutor.rating.toFixed(1) }}
              </p>
              <p class="text-xs text-gray-500">{{ tutor.reviews }} ulasan</p>
            </div>
          </div>
        </section>

        <!-- Penilaian -->
        <section>
          <h2 class="text-lg font-semibold mb-3 text-gray-800">
            Penilaian kelas
          </h2>
          <div class="flex items-center gap-6">
            <div class="text-center">
              <div class="text-4xl font-bold text-primary">
                {{ tutor.rating.toFixed(1) }}
              </div>
              <div class="text-xs text-gray-500">
                {{ tutor.reviews }} ulasan
              </div>
            </div>
            <div class="flex-1 space-y-2">
              <div v-for="(val, key) in ratings" :key="key">
                <div class="flex justify-between text-sm mb-1">
                  <span class="capitalize">{{ key }}</span>
                  <span>{{ val }}</span>
                </div>
                <div
                  class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    class="h-1.5 bg-primary"
                    :style="{ width: (val / 5) * 100 + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Jadwal -->
        <section>
          <h2 class="text-lg font-semibold mb-4 text-gray-800">Schedule</h2>

          <!-- Info -->
          <div
            class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3"
          >
            <svg
              class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-sm text-blue-800">
              Choose the time for your first lesson. The timings are displayed
              in your local timezone.
            </p>
          </div>

          <!-- Calendar Navigation -->
          <div class="bg-white border rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
              <button
                @click="previousWeek"
                class="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div class="text-center">
                <h3 class="font-semibold text-gray-800">
                  {{ currentWeekRange }}
                </h3>
              </div>

              <button
                @click="nextWeek"
                class="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Timezone -->
            <div class="flex justify-end mb-4">
              <div
                class="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg"
              >
                Asia/Jakarta (GMT +7:00)
              </div>
            </div>

            <!-- Calendar Grid -->
            <div class="overflow-x-auto">
              <div class="min-w-[700px]">
                <!-- Days Header -->
                <div class="grid grid-cols-7 gap-2 mb-4">
                  <div
                    v-for="day in weekDays"
                    :key="day.date"
                    class="text-center"
                  >
                    <div class="text-sm font-medium text-gray-700">
                      {{ day.dayName }}
                    </div>
                    <div
                      class="text-lg font-semibold"
                      :class="day.isToday ? 'text-primary' : 'text-gray-800'"
                    >
                      {{ day.dayNum }}
                    </div>
                    <!-- Indicator bar - warna #41a6c2 jika ada siswa yang booking -->
                    <div
                      class="h-1 mt-2 rounded-full transition-colors"
                      :class="day.hasBookings ? 'bg-[#41a6c2]' : 'bg-gray-200'"
                    ></div>
                  </div>
                </div>

                <!-- Button View Full Schedule -->
                <div class="flex justify-center mb-4">
                  <button
                    @click="showFullSchedule = !showFullSchedule"
                    class="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:border-primary hover:text-primary transition-colors"
                  >
                    {{
                      showFullSchedule ? "Hide schedule" : "View full schedule"
                    }}
                  </button>
                </div>

                <!-- Time Slots Grid - hanya tampil jika showFullSchedule = true -->
                <div v-if="showFullSchedule" class="grid grid-cols-7 gap-2">
                  <div
                    v-for="day in weekDays"
                    :key="'slots-' + day.date"
                    class="space-y-2"
                  >
                    <!-- Tampilkan "No available slots" jika tidak ada jam available -->
                    <div
                      v-if="day.availableSlots.length === 0"
                      class="text-xs text-gray-400 text-center py-2"
                    >
                      No available slots
                    </div>

                    <!-- Tampilkan time slots yang available (belum dibooking) -->
                    <button
                      v-for="slot in day.availableSlots"
                      :key="slot.time"
                      @click="selectTimeSlot(day, slot)"
                      class="w-full py-2 px-2 text-sm border border-gray-300 rounded-lg transition hover:border-primary hover:bg-primary/5 text-gray-700 hover:shadow-sm"
                    >
                      {{ slot.time }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Testimoni -->
        <section>
          <h2 class="text-lg font-semibold mb-3 text-gray-800">Testimoni</h2>
          <div
            v-for="t in testimonials"
            :key="t.id"
            class="py-3 border-b last:border-0"
          >
            <div class="flex items-start gap-3">
              <img :src="t.photo" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <div class="flex justify-between items-center">
                  <b class="text-sm">{{ t.name }}</b>
                  <span class="text-yellow-500 text-xs font-semibold"
                    >★ {{ t.rating }}</span
                  >
                </div>
                <p class="text-xs text-gray-500">{{ t.date }}</p>
                <p class="text-sm mt-1 text-gray-700">{{ t.comment }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CV -->
        <section>
          <h2 class="text-lg font-semibold mb-3 text-gray-800">
            Pendidikan & Pengalaman
          </h2>
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
      <div
        class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4"
      >
        <div class="max-w-4xl mx-auto flex justify-between gap-4">
          <button
            @click="goBack"
            class="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:text-white transition w-full md:w-auto"
          >
            Kembali
          </button>
          <button
            @click="showConfirm = true"
            class="bg-primary hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition w-full md:w-auto"
          >
            Booking Sesi
          </button>
        </div>
      </div>

      <!-- Modal Konfirmasi Jadwal -->
      <div
        v-if="showConfirm"
        class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4"
      >
        <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 text-center">
            Konfirmasi Jadwal
          </h2>

          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-3 mb-3">
              <img
                :src="tutor.photo"
                class="w-12 h-12 rounded-full object-cover"
                @error="
                  (e) =>
                    (e.target.src =
                      'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(tutor.name))
                "
              />
              <div>
                <div class="font-semibold text-gray-800">{{ tutor.name }}</div>
                <div class="text-sm text-gray-600">{{ tutor.subject }}</div>
              </div>
            </div>

            <div class="border-t pt-3 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Tanggal:</span>
                <span class="font-medium text-gray-800">{{
                  selectedSlot?.fullDate
                }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Waktu:</span>
                <span class="font-medium text-gray-800">{{
                  selectedSlot?.time
                }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Durasi:</span>
                <span class="font-medium text-gray-800">60 menit</span>
              </div>
              <div class="flex justify-between text-sm border-t pt-2 mt-2">
                <span class="text-gray-600">Harga:</span>
                <span class="font-semibold text-primary">{{
                  formatPrice(tutor.price)
                }}</span>
              </div>
            </div>
          </div>

          <p class="text-sm text-gray-600 mb-6 text-center">
            Anda akan diarahkan ke halaman pembayaran untuk menyelesaikan
            booking.
          </p>

          <div class="flex gap-3">
            <button
              @click="showConfirm = false"
              :disabled="isProcessingBooking"
              class="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              @click="processBooking"
              :disabled="isProcessingBooking"
              class="flex-1 px-4 py-3 rounded-lg bg-primary text-white hover:bg-teal-700 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span
                v-if="isProcessingBooking"
                class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
              ></span>
              <span>{{
                isProcessingBooking ? "Memproses..." : "Lanjut ke Pembayaran"
              }}</span>
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

    <!-- Error/Not Found State -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <p class="text-gray-600">Tutor tidak ditemukan.</p>
        <button
          @click="router.push('/tutors')"
          class="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-teal-700"
        >
          Kembali ke Daftar Tutor
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import {
  getTutorDetail,
  getAvailableSlots,
} from "@/services/tutorDetailService";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();

// State
const isLoading = ref(true);
const tutorData = ref(null);
const showConfirm = ref(false);
const showToast = ref(false);
const selectedSlot = ref(null);
const showFullSchedule = ref(false); // Toggle untuk melihat jadwal lengkap
const isProcessingBooking = ref(false); // Loading state untuk proses booking
const hasActivePackage = ref(null); // Paket aktif siswa (untuk validasi booking)

// Calendar state
const currentWeekStart = ref(new Date());

// Computed: Tutor info
const tutor = computed(() => {
  if (!tutorData.value) return null;

  const data = tutorData.value;
  console.log("========== COMPUTING TUTOR INFO ==========");
  console.log("Full tutorData.value:", data);

  // Get keahlian & market from subjects
  const subjects = data.subjects || [];
  console.log("Subjects array:", subjects);

  let keahlian = subjects.map((s) => s.name).join(", ");
  // Fallback ke query params jika kosong
  if (!keahlian && route.query.keahlian) {
    keahlian = route.query.keahlian;
    console.log("Using keahlian from query params:", keahlian);
  } else if (!keahlian && route.query.subject) {
    keahlian = route.query.subject;
    console.log("Using subject from query params:", keahlian);
  } else if (!keahlian) {
    keahlian = "-";
  }
  console.log("Final keahlian:", keahlian);

  // Get market from market_siswa field (primary source)
  let market = data.market_siswa || "";
  console.log("Market from market_siswa field:", market);

  // Fallback: Get unique class names from subjects if market_siswa is empty
  if (!market) {
    const classNames = subjects.map((s) => s.class?.name).filter(Boolean);
    console.log("Class names from subjects (fallback):", classNames);
    market = [...new Set(classNames)].join(", ");
  }

  // Jika masih kosong, tampilkan "-"
  if (!market) {
    market = "-";
  }
  console.log("Final market:", market);

  // Parse course_mode
  const courseMode =
    data.teaching_method?.course_mode || route.query.courseMode || "both";
  const teachingMode = [];
  if (courseMode === "online" || courseMode === "both")
    teachingMode.push("online");
  if (courseMode === "offline" || courseMode === "both")
    teachingMode.push("offline");

  // Get profile photo - backend now returns full URL
  let photoUrl = data.profile_photo_url;

  // Jika photoUrl kosong atau N/A, coba ambil dari query params
  if ((!photoUrl || photoUrl === "N/A") && route.query.photo) {
    photoUrl = route.query.photo;
    console.log("Using photo from query params:", photoUrl);
  }

  console.log("Photo URL from backend:", photoUrl);

  let photo;
  if (!photoUrl || photoUrl === "N/A") {
    photo =
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(data.name || "User");
    console.log("Using avatar fallback:", photo);
  } else {
    // Backend sudah mengembalikan full URL, gunakan langsung
    photo = photoUrl;
    console.log("Using photo URL:", photo);
  }

  const result = {
    id: data.user_id,
    name: data.name || "N/A",
    photo: photo,
    subject: keahlian,
    level: market,
    teachingMode,
    bio:
      data.tutor_info?.description ||
      data.teaching_method?.description ||
      route.query.bio ||
      "-",
    price: data.tutor_info?.price || parseInt(route.query.price) || 0,
    rating: data.rating?.average || parseFloat(route.query.rating) || 0,
    reviews: data.rating?.count || parseInt(route.query.totalReviews) || 0,
    whatsapp: data.telephone_number || route.query.whatsapp || "-",
  };

  console.log("Final tutor object:", result);
  console.log("==========================================");

  return result;
});

// Computed: Ratings breakdown
const ratings = computed(() => {
  if (!tutorData.value?.reviews?.data) {
    return { dukungan: 0, kejelasan: 0, progres: 0, persiapan: 0 };
  }

  const reviews = tutorData.value.reviews.data;
  if (reviews.length === 0) {
    return { dukungan: 0, kejelasan: 0, progres: 0, persiapan: 0 };
  }

  // Calculate average for each rating category
  const totals = { benefit: 0, quality: 0, delivery: 0, attitude: 0 };

  reviews.forEach((review) => {
    if (review.rating) {
      totals.benefit += review.rating.benefit || 0;
      totals.quality += review.rating.quality || 0;
      totals.delivery += review.rating.delivery || 0;
      totals.attitude += review.rating.attitude || 0;
    }
  });

  const count = reviews.length;

  return {
    persiapan: (totals.benefit / count).toFixed(1),
    kejelasan: (totals.quality / count).toFixed(1),
    dukungan: (totals.delivery / count).toFixed(1),
    progres: (totals.attitude / count).toFixed(1),
  };
});

// Computed: Testimonials
const testimonials = computed(() => {
  if (!tutorData.value?.reviews?.data) return [];

  return tutorData.value.reviews.data.map((review) => {
    // Handle photo URL - backend should return full URL
    const photoUrl = review.reviewer?.photo_url;
    let photo;
    if (!photoUrl || photoUrl === "N/A") {
      photo =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(review.reviewer?.name || "A");
    } else {
      // Gunakan URL dari backend (sudah full URL)
      photo = photoUrl;
    }

    return {
      id: review.id || Math.random(),
      name: review.reviewer?.name || "Anonymous",
      photo: photo,
      date: formatDate(review.date),
      rating: review.rating?.stars || 0,
      comment: review.review_text || "-",
    };
  });
});

// Computed: Education & Experience
const cvList = computed(() => {
  const education = tutorData.value?.qualification?.education;
  console.log("Education data:", education);

  if (!education || education.length === 0) return [];

  // Education bisa dalam format array atau object
  // ProfilePage menggunakan format: { type, title/degree, org/institution, period/year, detail/description }
  return education.map((edu) => {
    // Handle different formats
    if (edu.type) {
      // Format dari ProfilePage
      return {
        title: edu.title || edu.degree || "-",
        org: edu.org || edu.institution || "-",
        period:
          edu.period ||
          edu.year ||
          `${edu.start_year || "-"} - ${edu.end_year || "Sekarang"}`,
        detail: edu.detail || edu.description || edu.field_of_study || "-",
      };
    } else {
      // Format standar
      return {
        title: edu.degree || edu.title || "-",
        org: edu.institution || edu.org || "-",
        period: `${edu.start_year || "-"} - ${edu.end_year || "Sekarang"}`,
        detail: edu.field_of_study || edu.description || edu.detail || "-",
      };
    }
  });
});

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

// Format date
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Available schedules from backend
const tutorAvailability = ref({});

// Computed: Week range display
const currentWeekRange = computed(() => {
  const start = new Date(currentWeekStart.value);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${
    months[start.getMonth()]
  } ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`;
});

// Computed: Week days with available slots
const weekDays = computed(() => {
  const days = [];
  const dayNames = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get current time untuk filter past time
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Generate semua jam dari 07:00 - 20:00
  const generateAllTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 20; hour++) {
      const timeStr = `${hour.toString().padStart(2, "0")}:00`;
      slots.push(timeStr);
    }
    return slots;
  };

  const allPossibleTimes = generateAllTimeSlots();

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekStart.value);
    date.setDate(date.getDate() + i);

    // Generate dateStr menggunakan local time (bukan UTC)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    // Get day of week (1 = Monday, 7 = Sunday)
    let dayOfWeek = date.getDay();
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    // Cek apakah hari ini
    const isToday = date.getTime() === today.getTime();

    // Get tutor's schedule slots for this day of week from backend
    const tutorScheduleSlots = tutorAvailability.value[dayOfWeek] || [];

    // Generate available slots
    const availableSlots = [];
    let hasBookings = false;

    allPossibleTimes.forEach((timeStr) => {
      // Parse jam dari timeStr (format: "HH:00")
      const slotHour = parseInt(timeStr.split(":")[0]);

      // Filter past time untuk hari ini
      if (isToday) {
        // Jika jam slot sudah lewat, skip
        if (slotHour < currentHour) {
          return; // Skip jam yang sudah lewat
        }
        // Jika jam sama tapi menit sudah lewat, skip juga
        if (slotHour === currentHour && currentMinute > 0) {
          return; // Skip jam sekarang jika sudah lewat beberapa menit
        }
      }

      // Cek apakah jam ini ada di backend schedule
      const tutorSlot = tutorScheduleSlots.find(
        (slot) => slot.time === timeStr
      );

      if (tutorSlot) {
        // Ada di backend
        if (tutorSlot.is_available === false) {
          // Sudah dibooking siswa lain -> HIDE + tandai hasBookings
          hasBookings = true;
          return; // Jangan tampilkan jam ini
        } else {
          // Masih available -> TAMPILKAN
          availableSlots.push({
            time: timeStr,
            schedule_id: tutorSlot.schedule_id,
          });
        }
      } else {
        // TIDAK ada di backend -> TAMPILKAN sebagai slot kosong (user bisa request)
        availableSlots.push({
          time: timeStr,
          schedule_id: null, // Null berarti belum ada di schedule tutor
        });
      }
    });

    console.log(
      `Date ${dateStr}, Day ${dayNames[i]}, DayOfWeek ${dayOfWeek}, Available: ${availableSlots.length}, Has Bookings: ${hasBookings}, Is Today: ${isToday}`
    );

    days.push({
      dayName: dayNames[i],
      dayNum: date.getDate(),
      date: dateStr,
      fullDate: date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      isToday: isToday,
      hasBookings: hasBookings, // Bar warna #41a6c2 jika ada booking
      availableSlots: availableSlots, // Semua jam 07:00-20:00 (kecuali booked/past)
    });
  }

  return days;
});

// Load tutor detail from backend
async function loadTutorDetail() {
  try {
    isLoading.value = true;
    const tutorId = route.query.id;

    console.log("Route query params:", route.query);
    console.log("Tutor ID from route:", tutorId);

    if (!tutorId) {
      console.error("Tutor ID not found in route query");
      alert("ID Tutor tidak ditemukan");
      router.push("/tutors");
      return;
    }

    // Validate ID is a number
    if (isNaN(tutorId)) {
      console.error("Invalid tutor ID:", tutorId);
      alert("ID Tutor tidak valid");
      router.push("/tutors");
      return;
    }

    console.log("Fetching tutor detail for ID:", tutorId);
    const data = await getTutorDetail(tutorId);

    console.log("========== TUTOR DATA RECEIVED ==========");
    console.log("Full data:", data);
    console.log("Profile photo URL:", data.profile_photo_url);
    console.log("Subjects:", data.subjects);
    console.log("Education:", data.qualification?.education);
    console.log("Teaching method:", data.teaching_method);
    console.log("Tutor info:", data.tutor_info);
    console.log("========================================");

    tutorData.value = data;

    // Parse available schedules from backend
    // Backend returns schedules grouped by day of week (1-7)
    // We need to map them to actual dates in the current week
    if (data.available_schedules?.schedules) {
      console.log(
        "Available schedules from backend:",
        data.available_schedules.schedules
      );

      const availability = {};

      data.available_schedules.schedules.forEach((schedule) => {
        // schedule.day is day of week (1 = Monday, 7 = Sunday)
        const dayOfWeek = parseInt(schedule.day);

        console.log(
          `Processing day ${dayOfWeek} (${schedule.day_name}) with ${schedule.time_slots.length} slots`
        );

        // Store by day of week, frontend will map to actual dates
        if (!availability[dayOfWeek]) {
          availability[dayOfWeek] = [];
        }

        // Add all time slots for this day
        schedule.time_slots.forEach((slot) => {
          availability[dayOfWeek].push({
            time: slot.time,
            is_available: slot.is_available,
            schedule_id: slot.schedule_id,
          });
        });
      });

      console.log("Processed availability by day of week:", availability);
      tutorAvailability.value = availability;
    }
  } catch (error) {
    console.error("Error loading tutor detail:", error);
    console.error("Error response:", error.response);

    // Jika 404, coba gunakan data dari query params sebagai fallback
    if (error.response?.status === 404 || error.message?.includes("404")) {
      console.warn(
        "Tutor not found in backend, using query params as fallback"
      );

      // Construct minimal data from query params
      tutorData.value = {
        user_id: parseInt(route.query.id),
        name: route.query.name || "N/A",
        profile_photo_url: route.query.photo || null,
        telephone_number: route.query.whatsapp || null,
        gender: null,
        rating: {
          average: parseFloat(route.query.rating) || 0,
          count: parseInt(route.query.totalReviews) || 0,
        },
        location: {},
        subjects: route.query.subject
          ? route.query.subject.split(",").map((s) => ({
              name: s.trim(),
              class: { name: route.query.keahlian || "N/A" },
            }))
          : [],
        qualification: {
          education: route.query.education
            ? [
                {
                  degree: route.query.education,
                  institution: "N/A",
                  start_year: "",
                  end_year: "",
                  field_of_study: "",
                },
              ]
            : [],
        },
        teaching_method: {
          description: route.query.bio || "",
          course_mode: route.query.courseMode || "both",
        },
        tutor_info: {
          description: route.query.bio || "",
          price: parseInt(route.query.price) || 0,
        },
        available_schedules: { schedules: [] },
        reviews: { data: [] },
      };

      console.log("Using fallback data:", tutorData.value);
    } else {
      alert(
        `Gagal memuat data tutor: ${
          error.response?.data?.message || error.message
        }`
      );
      router.push("/dashboard");
    }
  } finally {
    isLoading.value = false;
  }
}

// Navigation
function previousWeek() {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() - 7);
  currentWeekStart.value = newDate;
}

function nextWeek() {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() + 7);
  currentWeekStart.value = newDate;
}

function selectTimeSlot(day, slot) {
  if (!tutor.value) return;

  selectedSlot.value = {
    date: day.date,
    fullDate: day.fullDate,
    time: slot.time,
    schedule_id: slot.schedule_id,
    tutorId: tutor.value.id,
    tutorName: tutor.value.name,
    subject: tutor.value.subject,
    price: tutor.value.price,
  };

  showConfirm.value = true;
}

// Fungsi check active package (untuk validasi booking)
async function checkActivePackage() {
  try {
    const response = await api.get("/dashboard/student");
    const data = response.data || response;

    // Check if student has approved & non-expired package
    const packages = data.packages || [];
    hasActivePackage.value = packages.length > 0;

    console.log("Active package check:", hasActivePackage.value);
  } catch (error) {
    console.error("Error checking active package:", error);
    hasActivePackage.value = false;
  }
}

async function processBooking() {
  if (!selectedSlot.value) return;

  // VALIDASI: Cek apakah siswa punya paket aktif
  if (hasActivePackage.value === false) {
    alert(
      "⚠️ Anda belum membeli paket belajar!\n\nSilakan beli paket terlebih dahulu untuk dapat booking jadwal tutor."
    );

    // Redirect ke halaman paket
    router.push("/packages");
    return;
  }

  // Definisikan payload di luar try-catch agar bisa diakses di catch block
  const payload = {
    tutor_id: selectedSlot.value.tutorId,
    // Pastikan format YYYY-MM-DD HH:mm:ss
    schedule_time: `${selectedSlot.value.date} ${selectedSlot.value.time}:00`,
    price: selectedSlot.value.price,
  };

  console.log("Sending payload:", payload);
  console.log("Selected slot:", selectedSlot.value);

  try {
    isProcessingBooking.value = true;

    // Kirim request ke backend API
    const response = await api.post("/bookings", payload);

    console.log("Booking response:", response.data);

    // Jika success, redirect ke payment gateway
    if (response.data && response.data.payment_url) {
      console.log("Redirecting to payment URL:", response.data.payment_url);

      // Redirect otomatis ke halaman pembayaran
      window.location.href = response.data.payment_url;
    } else {
      throw new Error("Payment URL not found in response");
    }
  } catch (error) {
    console.error("Error processing booking:", error);
    console.error("Failed payload:", payload);

    // Handle error dan tampilkan pesan ke user
    let errorMessage = "Gagal membuat booking. Silakan coba lagi.";

    if (error.response?.data) {
      // Log detailed validation errors
      console.error("Validation errors:", error.response.data.errors);

      // Build detailed error message
      if (error.response.data.errors) {
        const validationErrors = Object.entries(error.response.data.errors)
          .map(
            ([field, messages]) =>
              `${field}: ${
                Array.isArray(messages) ? messages.join(", ") : messages
              }`
          )
          .join("\n");
        errorMessage = `Validation failed:\n${validationErrors}`;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    alert(errorMessage);

    // Reset state
    isProcessingBooking.value = false;
    showConfirm.value = false;
  }
  // Note: Tidak perlu set isProcessingBooking = false di akhir
  // Karena user akan di-redirect ke payment gateway
}

function goBack() {
  router.back();
}

// Set initial week to current week
onMounted(async () => {
  const today = new Date();
  // Set to Friday of current week
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -2 : 5 - dayOfWeek; // Friday is day 5
  const friday = new Date(today);
  friday.setDate(today.getDate() + diff);
  friday.setHours(0, 0, 0, 0);
  currentWeekStart.value = friday;

  // Load tutor detail
  await loadTutorDetail();

  // Check active package untuk validasi booking
  await checkActivePackage();
});
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
