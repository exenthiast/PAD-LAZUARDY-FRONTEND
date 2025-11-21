<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 pb-24 relative">
    <Navbar />

    <!-- Header -->
    <header class="bg-white border-b py-8">
      <div
        class="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 px-4"
      >
        <img
          :src="tutor.photo"
          alt="profile"
          class="w-28 h-28 rounded-full object-cover shadow"
        />
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">{{ tutor.name }}</h1>
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
        <h2 class="text-lg font-semibold mb-2 text-gray-800">Tentang Tutor</h2>
        <p class="text-sm leading-relaxed text-gray-600">
          {{ tutor.bio }}
        </p>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg border">
            <p class="text-sm text-gray-500">Tarif per Jam</p>
            <p class="text-xl font-bold text-primary">
              {{ formatPrice(tutor.price) }}
            </p>
          </div>
          <div class="bg-white p-4 rounded-lg border">
            <p class="text-sm text-gray-500">Rating</p>
            <p class="text-xl font-bold text-yellow-500">
              ★ {{ tutor.rating }}
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
            <div class="text-4xl font-bold text-primary">4.8</div>
            <div class="text-xs text-gray-500">34 ulasan</div>
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
            Choose the time for your first lesson. The timings are displayed in
            your local timezone.
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
            <div class="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
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
                  <!-- Indicator bar -->
                  <div
                    class="h-1 mt-2 rounded-full"
                    :class="day.hasSlots ? 'bg-pink-400' : 'bg-gray-200'"
                  ></div>
                </div>
              </div>

              <!-- Time Slots Grid -->
              <div class="grid grid-cols-7 gap-2">
                <div
                  v-for="day in weekDays"
                  :key="'slots-' + day.date"
                  class="space-y-2"
                >
                  <button
                    v-for="slot in day.timeSlots"
                    :key="slot.time"
                    @click="selectTimeSlot(day, slot)"
                    class="w-full py-2 px-2 text-sm border rounded-lg transition hover:border-primary hover:bg-primary/5"
                    :class="
                      slot.available
                        ? 'border-gray-300 text-gray-700 hover:shadow-sm'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50'
                    "
                    :disabled="!slot.available"
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
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
      <div class="max-w-4xl mx-auto flex justify-between gap-4">
        <button
          @click="goBack"
          class="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:text-white transition w-full md:w-auto"
        >
          Kembali
        </button>
        <button
          @click="openModal = true"
          class="bg-primary hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition w-full md:w-auto"
        >
          Pilih Tutor Ini
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
          Pengajuan akan dikirim ke tutor dan menunggu persetujuan.
        </p>

        <div class="flex gap-3">
          <button
            @click="showConfirm = false"
            class="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium transition"
          >
            Batal
          </button>
          <button
            @click="ajukanTutor"
            class="flex-1 px-4 py-3 rounded-lg bg-primary text-white hover:bg-teal-700 font-medium transition"
          >
            Kirim Pengajuan
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";

const route = useRoute();
const router = useRouter();

// Data tutors - sama dengan TutorListPage
const tutorsData = [
  {
    id: 1,
    name: "Budi Santoso",
    subject: "Matematika",
    level: "SMP & SMA",
    rating: 4.9,
    reviews: 225,
    photo: "https://picsum.photos/seed/tutor1/80/80",
    whatsapp: "+628123456789",
    bio: "Tutor Matematika bersertifikat, berpengalaman lebih dari 6 tahun mengajar siswa SMP & SMA. Metode mengajar interaktif dengan fokus pada pemahaman konsep dan latihan soal.",
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
];

const tutor = computed(() => {
  const id = route.query.id;
  return tutorsData.find((t) => t.id === Number(id)) || tutorsData[0];
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const ratings = { dukungan: 5.0, kejelasan: 4.9, progres: 4.8, persiapan: 4.7 };
const testimonials = [
  {
    id: 1,
    name: "Yeva",
    photo: "https://i.pravatar.cc/100?img=12",
    date: "9 Okt 2025",
    rating: 5,
    comment:
      "Saya baru 1 bulan belajar dengan Alief, tetapi sudah terlihat hasilnya!",
  },
  {
    id: 2,
    name: "Fahad",
    photo: "https://i.pravatar.cc/100?img=5",
    date: "30 Sep 2025",
    rating: 5,
    comment: "Belajarnya seru dan terstruktur. Sangat membantu persiapan UTBK.",
  },
];
const cvList = [
  {
    title: "Siswa SMA Negeri 1 Yogyakarta",
    org: "Jurusan IPA",
    period: "2021 - Sekarang",
    detail: "Aktif di klub matematika dan olimpiade sains.",
  },
  {
    title: "Kursus Bahasa Inggris",
    org: "Lazuardy English Class",
    period: "2022 - 2023",
    detail: "Mendalami TOEFL dasar dan speaking.",
  },
];

const showConfirm = ref(false);
const showToast = ref(false);
const selectedSlot = ref(null);

// Calendar state
const currentWeekStart = ref(new Date());

// Sample tutor available time slots (ini nanti dari backend)
const tutorAvailability = ref({
  // Format: "YYYY-MM-DD": ["HH:MM", "HH:MM", ...]
  "2025-11-23": ["17:30", "18:00", "18:30", "19:00", "19:30"],
  "2025-11-24": [
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "15:00",
    "15:30",
    "16:00",
    "20:30",
  ],
  "2025-11-25": [
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "14:00",
    "14:30",
  ],
  "2025-11-26": [
    "02:30",
    "03:00",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "15:30",
    "17:00",
    "17:30",
  ],
  "2025-11-27": [
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ],
});

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

const weekDays = computed(() => {
  const days = [];
  const dayNames = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekStart.value);
    date.setDate(date.getDate() + i);

    const dateStr = date.toISOString().split("T")[0];
    const slots = tutorAvailability.value[dateStr] || [];

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
      isToday: date.getTime() === today.getTime(),
      hasSlots: slots.length > 0,
      timeSlots: slots.map((time) => ({
        time,
        available: true,
      })),
    });
  }

  return days;
});

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
  if (!slot.available) return;

  selectedSlot.value = {
    date: day.date,
    fullDate: day.fullDate,
    time: slot.time,
    tutorId: tutor.value.id,
    tutorName: tutor.value.name,
    subject: tutor.value.subject,
    price: tutor.value.price,
  };

  showConfirm.value = true;
}

function ajukanTutor() {
  if (!selectedSlot.value) return;

  // Simpan ke localStorage
  const existingRequests = JSON.parse(
    localStorage.getItem("learningRequests") || "[]"
  );

  const newRequest = {
    id: Date.now(),
    tutorId: selectedSlot.value.tutorId,
    tutorName: selectedSlot.value.tutorName,
    subject: selectedSlot.value.subject,
    date: selectedSlot.value.fullDate,
    time: selectedSlot.value.time,
    price: selectedSlot.value.price,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  existingRequests.push(newRequest);
  localStorage.setItem("learningRequests", JSON.stringify(existingRequests));

  // TODO: Kirim ke backend API
  // await submitLearningRequest(newRequest);

  showConfirm.value = false;
  showToast.value = true;

  // setTimeout(() => {
  //   showToast.value = false;
  //   // Redirect ke halaman tutor dashboard untuk melihat pengajuan
  //   router.push("/tutor/dashboard");
  // }, 2500);
}

function goBack() {
  router.push("/tutors");
}

// Set initial week to current week
onMounted(() => {
  const today = new Date();
  // Set to Friday of current week
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -2 : 5 - dayOfWeek; // Friday is day 5
  const friday = new Date(today);
  friday.setDate(today.getDate() + diff);
  friday.setHours(0, 0, 0, 0);
  currentWeekStart.value = friday;
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
