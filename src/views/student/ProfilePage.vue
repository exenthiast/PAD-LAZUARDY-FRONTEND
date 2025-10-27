<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-[#1eb2a6] py-12 px-4 text-center text-white">
      <img
        src="https://via.placeholder.com/120"
        alt="Foto Profil"
        class="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-lg"
      />
      <h2 class="text-2xl sm:text-3xl font-semibold mt-4">{{ student.name }}</h2>
      <p class="text-sm sm:text-base text-white/90">{{ student.school }}</p>
    </div>

    <!-- Profil Info -->
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8 -mt-10 relative z-10">
      <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Informasi Siswa</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p class="text-gray-500 text-sm">Email</p>
          <p class="font-medium text-gray-800">{{ student.email }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Alamat</p>
          <p class="font-medium text-gray-800">{{ student.address }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">No. Telepon</p>
          <p class="font-medium text-gray-800">{{ student.phone }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Kelas</p>
          <p class="font-medium text-gray-800">{{ student.class }}</p>
        </div>
      </div>

      <div class="flex justify-between items-center mt-8">
        <button
          @click="editProfile"
          class="bg-[#1eb2a6] hover:bg-[#17a094] text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Edit Profil
        </button>
        <button
          @click="logout"
          class="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Progress Belajar (opsional) -->
    <div class="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6 sm:p-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Progress Belajar</h3>
      <div class="flex justify-between text-gray-600 mb-3">
        <p>Kemajuan Belajar</p>
        <p>{{ student.progress }}%</p>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="bg-[#1eb2a6] h-3 rounded-full transition-all"
          :style="{ width: student.progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const student = ref({
  name: 'Alief Muhammad Latif',
  email: 'alief@example.com',
  address: 'Jl. Merdeka No. 45, Bandung',
  phone: '081234567890',
  class: 'SMA Kelas 12',
  school: 'Bimbel Lazuardy',
  progress: 75,
})

const editProfile = () => {
  console.log('Edit profil diklik')
}

const logout = () => {
  console.log('Logout diklik')
}
</script>

<style scoped>
/* Responsif tambahan */
@media (max-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}
</style>
