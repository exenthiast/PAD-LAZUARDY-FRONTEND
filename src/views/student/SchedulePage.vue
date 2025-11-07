<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Jadwal Belajar</h1>
        <p class="text-gray-600">
          Kelola dan lihat jadwal pertemuan dengan tutor kamu
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6 flex gap-2 border-b border-gray-200">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-4 py-2 font-medium text-sm transition-colors',
            activeTab === tab.value
              ? 'text-[#41a6c2] border-b-2 border-[#41a6c2]'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Calendar View (Mendatang) -->
      <div v-if="activeTab === 'upcoming'" class="space-y-4">
        <div
          v-for="schedule in upcomingSchedules"
          :key="schedule.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div class="flex items-start gap-4">
              <div class="bg-[#41a6c2]/10 p-3 rounded-lg">
                <Calendar class="w-6 h-6 text-[#41a6c2]" />
              </div>
              <div>
                <h3 class="font-semibold text-lg text-gray-800 mb-1">
                  {{ schedule.subject }}
                </h3>
                <p class="text-sm text-gray-600 mb-2">
                  Tutor: {{ schedule.tutor }}
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ schedule.date }} • {{ schedule.time }}
                  </span>
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      schedule.mode === 'online'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700',
                    ]"
                  >
                    {{ schedule.mode === "online" ? "Online" : "Offline" }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <button
                @click="handleJoinClass(schedule)"
                v-if="schedule.mode === 'online'"
                class="bg-[#41a6c2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2e8694] transition"
              >
                Gabung Kelas
              </button>
              <button
                class="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                Detail
              </button>
            </div>
          </div>
        </div>

        <div v-if="upcomingSchedules.length === 0" class="text-center py-12">
          <Calendar class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500">Belum ada jadwal mendatang</p>
        </div>
      </div>

      <!-- History -->
      <div v-if="activeTab === 'history'" class="space-y-4">
        <div
          v-for="schedule in historySchedules"
          :key="schedule.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div class="flex items-start gap-4">
              <div class="bg-gray-100 p-3 rounded-lg">
                <CheckCircle class="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 class="font-semibold text-lg text-gray-800 mb-1">
                  {{ schedule.subject }}
                </h3>
                <p class="text-sm text-gray-600 mb-2">
                  Tutor: {{ schedule.tutor }}
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {{ schedule.date }} • {{ schedule.time }}
                  </span>
                  <span
                    class="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700"
                  >
                    Selesai
                  </span>
                </div>
              </div>
            </div>
            <button
              class="border-2 border-[#41a6c2] text-[#41a6c2] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#41a6c2] hover:text-white transition"
            >
              Lihat Rekaman
            </button>
          </div>
        </div>

        <div v-if="historySchedules.length === 0" class="text-center py-12">
          <CheckCircle class="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p class="text-gray-500">Belum ada riwayat pertemuan</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/layout/navbar.vue";
import { Calendar, Clock, CheckCircle } from "lucide-vue-next";

const activeTab = ref("upcoming");

const tabs = [
  { label: "Mendatang", value: "upcoming" },
  { label: "Riwayat", value: "history" },
];

// Dummy data jadwal mendatang
const upcomingSchedules = ref([
  {
    id: 1,
    subject: "Matematika - Aljabar",
    tutor: "Budi Santoso",
    date: "Senin, 11 Nov 2025",
    time: "14:00 - 15:30",
    mode: "online",
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    subject: "Fisika - Gerak Lurus",
    tutor: "Siti Nurhaliza",
    date: "Rabu, 13 Nov 2025",
    time: "10:00 - 11:30",
    mode: "online",
    meetLink: "https://meet.google.com/xyz-abcd-efg",
  },
  {
    id: 3,
    subject: "Kimia - Reaksi Kimia",
    tutor: "Ahmad Fauzi",
    date: "Jumat, 15 Nov 2025",
    time: "16:00 - 17:30",
    mode: "offline",
    location: "Ruang 202, Gedung A",
  },
  {
    id: 4,
    subject: "Bahasa Inggris - Grammar",
    tutor: "Dedi Kurniawan",
    date: "Sabtu, 16 Nov 2025",
    time: "09:00 - 10:30",
    mode: "online",
    meetLink: "https://meet.google.com/aaa-bbbb-ccc",
  },
]);

// Dummy data riwayat jadwal
const historySchedules = ref([
  {
    id: 101,
    subject: "Matematika - Trigonometri",
    tutor: "Budi Santoso",
    date: "Senin, 4 Nov 2025",
    time: "14:00 - 15:30",
    mode: "online",
    recordingLink: "https://drive.google.com/recording-1",
  },
  {
    id: 102,
    subject: "Fisika - Hukum Newton",
    tutor: "Siti Nurhaliza",
    date: "Rabu, 6 Nov 2025",
    time: "10:00 - 11:30",
    mode: "online",
    recordingLink: "https://drive.google.com/recording-2",
  },
  {
    id: 103,
    subject: "Kimia - Tabel Periodik",
    tutor: "Ahmad Fauzi",
    date: "Kamis, 7 Nov 2025",
    time: "15:00 - 16:30",
    mode: "offline",
    location: "Ruang 201, Gedung A",
  },
]);

const handleJoinClass = (schedule) => {
  if (schedule.mode === "online" && schedule.meetLink) {
    window.open(schedule.meetLink, "_blank");
  }
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
