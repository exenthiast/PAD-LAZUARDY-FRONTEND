<template>
  <div class="min-h-screen bg-gray-50 px-6 py-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-3">
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="Profile"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 class="text-lg font-semibold text-gray-800">
            Selamat datang, Kak Rafi Ahmad 👋
          </h2>
          <p class="text-sm text-gray-500">Tutor Matematika</p>
        </div>
      </div>
    </div>

    <!-- Statistik -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-white shadow rounded-2xl p-4">
        <h3 class="text-sm text-gray-500">Total Siswa</h3>
        <p class="text-2xl font-bold text-green-600">12</p>
      </div>
      <div class="bg-white shadow rounded-2xl p-4">
        <h3 class="text-sm text-gray-500">Sesi Bulan Ini</h3>
        <p class="text-2xl font-bold text-green-600">26</p>
      </div>
      <div class="bg-white shadow rounded-2xl p-4">
        <h3 class="text-sm text-gray-500">Laporan Terkirim</h3>
        <p class="text-2xl font-bold text-green-600">18</p>
      </div>
    </div>

    <!-- Jadwal Harian -->
    <div class="bg-white shadow rounded-2xl p-4 mb-8">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-700">
          Jadwal Hari Ini
        </h2>

        <div class="flex items-center space-x-2">
          <button
            @click="prevDay"
            class="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <i class="fas fa-chevron-left"></i>
          </button>

          <input
            type="date"
            v-model="selectedDate"
            class="border rounded-lg px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-400"
          />

          <button
            @click="nextDay"
            class="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="h-[400px] overflow-y-auto border-t border-gray-200 pt-2">
        <div
          v-for="(slot, index) in schedule"
          :key="index"
          class="flex items-center py-2 border-b border-gray-100 last:border-none"
        >
          <div class="w-20 text-sm font-medium text-gray-600">
            {{ slot.time }}
          </div>

          <div v-if="slot.session" class="flex-1">
            <div
              class="p-3 rounded-xl shadow-sm border flex justify-between items-center"
              :class="{
                'bg-green-100 border-green-400': slot.session.status === 'berjalan',
                'bg-blue-100 border-blue-400': slot.session.status === 'selesai',
                'bg-red-100 border-red-400': slot.session.status === 'belum',
              }"
            >
              <div>
                <p class="text-gray-800 font-semibold text-sm">
                  {{ slot.session.student }}
                </p>
                <p class="text-gray-600 text-xs">
                  {{ slot.session.subject }}
                </p>
              </div>
              <span
                class="text-xs px-2 py-1 rounded-full font-medium"
                :class="{
                  'bg-green-500 text-white': slot.session.status === 'berjalan',
                  'bg-blue-500 text-white': slot.session.status === 'selesai',
                  'bg-red-500 text-white': slot.session.status === 'belum',
                }"
              >
                {{ slot.session.status }}
              </span>
            </div>
          </div>

          <div v-else class="flex-1 text-gray-400 text-sm italic">
            — kosong —
          </div>
        </div>
      </div>
    </div>

    <!-- Daftar Siswa -->
    <div class="bg-white shadow rounded-2xl p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Daftar Siswa</h3>
      <div class="overflow-y-auto max-h-[300px]">
        <table class="min-w-full text-sm text-left">
          <thead class="text-gray-600 border-b">
            <tr>
              <th class="pb-2">Nama</th>
              <th class="pb-2">Mapel</th>
              <th class="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in students"
              :key="student.name"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-2 flex items-center space-x-2">
                <img
                  :src="student.image"
                  alt="avatar"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span class="font-medium text-gray-700">{{ student.name }}</span>
              </td>
              <td>{{ student.subject }}</td>
              <td>
                <span
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                  :class="student.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'"
                >
                  {{ student.active ? 'Aktif' : 'Tidak Aktif' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const selectedDate = ref(new Date().toISOString().substr(0, 10))

const prevDay = () => {
  const d = new Date(selectedDate.value)
  d.setDate(d.getDate() - 1)
  selectedDate.value = d.toISOString().substr(0, 10)
}

const nextDay = () => {
  const d = new Date(selectedDate.value)
  d.setDate(d.getDate() + 1)
  selectedDate.value = d.toISOString().substr(0, 10)
}

const schedule = ref([
  { time: "06:00", session: null },
  { time: "07:00", session: null },
  { time: "08:00", session: { student: "Nadia", subject: "Matematika", status: "berjalan" } },
  { time: "09:00", session: null },
  { time: "10:00", session: { student: "Rafi", subject: "Fisika", status: "belum" } },
  { time: "11:00", session: null },
  { time: "12:00", session: null },
  { time: "13:00", session: { student: "Lina", subject: "Kimia", status: "selesai" } },
  { time: "14:00", session: null },
  { time: "15:00", session: null },
  { time: "16:00", session: null },
  { time: "17:00", session: null },
  { time: "18:00", session: null },
  { time: "19:00", session: null },
  { time: "20:00", session: null },
  { time: "21:00", session: null },
  { time: "22:00", session: null },
]);




const students = ref([
  { name: "Alya Rahma", subject: "Matematika", active: true, image: "https://i.pravatar.cc/80?img=32" },
  { name: "Rizky Darma", subject: "Fisika", active: true, image: "https://i.pravatar.cc/80?img=45" },
  { name: "Dinda Putri", subject: "Kimia", active: false, image: "https://i.pravatar.cc/80?img=67" },
])
</script>
