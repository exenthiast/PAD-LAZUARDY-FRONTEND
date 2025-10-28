<template>
  <div class="p-6 text-center">
    <h1 class="text-2xl font-bold mb-4">🔍 API Connection Test</h1>

    <button
      @click="testApi"
      class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
    >
      Coba Hubungkan ke Backend
    </button>

    <div v-if="loading" class="mt-4 text-gray-600">⏳ Sedang menghubungkan...</div>
    <div v-if="result" class="mt-4 text-green-600 font-medium">
      ✅ {{ result }}
    </div>
    <div v-if="error" class="mt-4 text-red-600 font-medium">
      ❌ {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "@/services/api"; // pastikan path ini sesuai

const result = ref("");
const error = ref("");
const loading = ref(false);

const testApi = async () => {
  result.value = "";
  error.value = "";
  loading.value = true;

  try {
    const res = await api.get("/test"); // endpoint dummy di Laravel
    result.value = res.data.message || JSON.stringify(res.data);
  } catch (err) {
    error.value =
      err.response?.data?.message || err.message || "Gagal menghubungkan API";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
body {
  background: #f9fafb;
}
</style>
