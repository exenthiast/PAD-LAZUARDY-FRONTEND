<template>
  <div class="min-h-screen bg-white">
    <NavbarTutor />

    <!-- Header Section -->
    <div class="bg-[#41a6c2] py-8 px-6">
      <div class="max-w-6xl mx-auto">
        <button
          @click="goBack"
          class="mb-4 flex items-center text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft class="w-5 h-5 mr-2" />
          Kembali
        </button>

        <!-- Student Info -->
        <div class="flex items-center space-x-4 text-white">
          <div
            class="w-20 h-20 rounded-full overflow-hidden bg-white border-4 border-white"
          >
            <img
              :src="student.photo"
              :alt="student.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 class="text-2xl font-bold">{{ student.name }}</h1>
            <p class="text-white/90">{{ student.subject }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Progress Section -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-800">
            {{ student.subject }} - {{ student.sessions }} Pertemuan
          </h2>
          <p class="text-sm text-gray-500">
            Sesi selesai: {{ student.completedSessions }} dari
            {{ student.sessions }}
          </p>
        </div>

        <!-- Progress Bar -->
        <div
          class="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden"
        >
          <div
            class="absolute top-0 left-0 h-full bg-[#41a6c2] transition-all duration-300"
            :style="{ width: `${student.progress}%` }"
          ></div>
          <div
            class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700"
          >
            {{ student.progress }}%
          </div>
        </div>
      </div>

      <!-- Schedule Calendar -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 class="text-lg font-semibold text-[#41a6c2] mb-4">Jadwal Tutor</h2>

        <!-- Date Navigation -->
        <div class="flex items-center justify-center space-x-4 mb-6">
          <button
            @click="previousWeek"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft class="w-5 h-5 text-gray-600" />
          </button>

          <div class="flex items-center space-x-2">
            <Calendar class="w-5 h-5 text-[#41a6c2]" />
            <span class="text-sm font-medium text-gray-700">{{
              currentWeekRange
            }}</span>
          </div>

          <button
            @click="nextWeek"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight class="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <!-- Days Grid -->
        <div class="grid grid-cols-7 gap-2 mb-6">
          <div v-for="day in weekDays" :key="day.date" class="text-center">
            <div class="text-xs text-gray-500 mb-2">{{ day.name }}</div>
            <div
              :class="[
                'p-2 rounded-lg text-sm font-medium transition-colors',
                day.hasSession
                  ? 'bg-[#41a6c2] text-white'
                  : 'bg-gray-100 text-gray-600',
              ]"
            >
              {{ day.date }}
            </div>
          </div>
        </div>
      </div>

      <!-- Review Pembelajaran -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 class="text-lg font-semibold text-[#41a6c2] mb-4">
          Review Pembelajaran
        </h2>

        <div class="flex space-x-2 mb-4">
          <button
            v-for="n in 4"
            :key="n"
            @click="selectedSession = n"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              selectedSession === n
                ? 'bg-[#41a6c2] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            Pertemuan {{ n }}
          </button>
        </div>

        <!-- Session Content -->
        <div v-if="currentSessionData" class="space-y-4">
          <!-- Materi yang di pelajari -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Materi yang di pelajari</label
            >
            <input
              v-model="currentSessionData.material"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]"
              placeholder="Masukkan materi yang dipelajari"
            />
          </div>

          <!-- Nilai tugas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Nilai tugas</label
            >
            <input
              v-model="currentSessionData.score"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]"
              placeholder="Masukkan nilai tugas"
            />
          </div>

          <!-- Review dari tutor -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Review dari tutor</label
            >
            <textarea
              v-model="currentSessionData.review"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2]"
              placeholder="Masukkan review pembelajaran"
            ></textarea>
          </div>

          <!-- Dokumen tasi pertemuan -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Dokumen tasi pertemuan</label
            >
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#41a6c2] transition-colors cursor-pointer"
              @click="$refs.fileInput.click()"
            >
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                @change="handleFileUpload"
                accept="image/*,.pdf"
              />
              <Upload class="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p class="text-sm text-gray-500">
                Drag & Drop atau klik<br />Upload foto pertemuan
              </p>
              <button
                class="mt-4 px-6 py-2 bg-[#41a6c2] text-white rounded-lg text-sm font-medium hover:bg-[#358a9f] transition-colors"
              >
                Pilih File
              </button>
            </div>
            <p
              v-if="currentSessionData.fileName"
              class="mt-2 text-sm text-gray-600"
            >
              File: {{ currentSessionData.fileName }}
            </p>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          @click="saveAttendance"
          class="px-8 py-3 bg-[#41a6c2] hover:bg-[#358a9f] text-white rounded-lg font-semibold transition-colors"
        >
          Simpan Absensi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-vue-next";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";

const router = useRouter();
const route = useRoute();
const fileInput = ref(null);

// Student data
const student = ref({
  id: 1,
  name: "Muhammad Alief",
  subject: "Matematika",
  sessions: 8,
  completedSessions: 7,
  progress: 75,
  photo: "https://i.pravatar.cc/150?img=15",
});

// Session data
const selectedSession = ref(1);
const sessionData = ref([
  { id: 1, material: "", score: "", review: "", fileName: "" },
  { id: 2, material: "", score: "", review: "", fileName: "" },
  { id: 3, material: "", score: "", review: "", fileName: "" },
  { id: 4, material: "", score: "", review: "", fileName: "" },
]);

const currentSessionData = computed(() => {
  return sessionData.value.find((s) => s.id === selectedSession.value);
});

// Calendar data
const currentWeekStart = ref(new Date());

const currentWeekRange = computed(() => {
  const start = new Date(currentWeekStart.value);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return `${formatDate(start)} - ${formatDate(end)}`;
});

const weekDays = computed(() => {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const result = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekStart.value);
    date.setDate(date.getDate() + i);

    result.push({
      name: days[i],
      date: date.getDate(),
      hasSession: i === 1 || i === 3, // Selasa dan Kamis punya sesi (contoh)
    });
  }

  return result;
});

const previousWeek = () => {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() - 7);
  currentWeekStart.value = newDate;
};

const nextWeek = () => {
  const newDate = new Date(currentWeekStart.value);
  newDate.setDate(newDate.getDate() + 7);
  currentWeekStart.value = newDate;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && currentSessionData.value) {
    currentSessionData.value.fileName = file.name;
  }
};

const saveAttendance = () => {
  // TODO: Save to API
  alert("Data absensi berhasil disimpan!");
};

const goBack = () => {
  router.push("/tutor/dashboard");
};

onMounted(() => {
  const studentId = parseInt(route.query.id);
  // TODO: Fetch student data by ID from API
  console.log("Loading attendance for student:", studentId);
});
</script>
