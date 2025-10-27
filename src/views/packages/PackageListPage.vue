<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-3xl">
      <h1 class="text-3xl font-bold text-center text-blue-700 mb-8">
        Pilih Paket Belajar
      </h1>

      <div class="flex flex-col gap-5">
        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="border border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
        >
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">{{ pkg.name }}</h2>
              <p class="text-gray-600 mt-1">{{ pkg.description }}</p>
              <p class="text-gray-900 font-medium mt-2">
                Harga: <span class="text-blue-600 font-semibold">Rp {{ pkg.price.toLocaleString('id-ID') }}</span>
              </p>
            </div>

            <router-link
              :to="{ name: 'CheckoutPage', query: { packageId: pkg.id } }"
              class="mt-4 md:mt-0 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Beli Sekarang
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const packages = ref([
  {
    id: 1,
    name: 'Paket Belajar 1 Mata Pelajaran',
    description: 'Akses pembelajaran untuk 1 mata pelajaran pilihanmu.',
    price: 100000,
  },
  {
    id: 2,
    name: 'Paket Belajar 3 Mata Pelajaran',
    description: 'Pilih hingga 3 mata pelajaran yang kamu ingin kuasai.',
    price: 250000,
  },
  {
    id: 3,
    name: 'Paket Belajar 5 Mata Pelajaran',
    description: 'Dapatkan akses ke 5 mata pelajaran sekaligus.',
    price: 400000,
  },
])
</script>
