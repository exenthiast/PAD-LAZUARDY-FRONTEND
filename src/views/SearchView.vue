<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Hasil Pencarian
      </h1>
      <p class="text-lg text-gray-600">
        Menampilkan hasil untuk:
        <span class="font-semibold text-teal-600">{{ searchQuery }}</span>
      </p>

      <!-- TODO: Tampilkan hasil pencarian di sini -->
      <div class="mt-8 bg-white p-8 rounded-lg shadow">
        <p class="text-gray-500">
          (Konten hasil pencarian akan ditampilkan di sini)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Ambil query pencarian dari URL
const searchQuery = computed(() => route.query.q || "");
</script>