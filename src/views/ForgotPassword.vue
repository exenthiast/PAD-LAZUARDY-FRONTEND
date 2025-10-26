P<template>
  <div class="container-center bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img src="@/assets/logo.svg" alt="Bimbel Lazuardy" class="h-12" />
      </div>

      <!-- Judul -->
      <h2 class="text-center text-xl font-bold mb-6 text-gray-800">Lupa Password</h2>
      <p class="text-center text-sm text-gray-500 mb-6">
        Masukkan email kamu untuk menerima tautan reset password.
      </p>

      <!-- Form -->
      <div class="space-y-4">
        <div>
          <label class="text-sm mb-2 block text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="contoh@email.com"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-between mt-8">
        <button
          @click="handleBack"
          class="border border-teal-500 text-teal-500 hover:bg-teal-50 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Kembali
        </button>
        <button
          @click="handleSend"
          class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Kirim Link Reset
        </button>
      </div>

      <!-- Link ke Login -->
      <p class="text-center text-sm mt-6 text-gray-600">
        Sudah ingat password?
        <router-link to="/login" class="text-teal-500 hover:underline">
          Masuk di sini
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");

const handleBack = () => {
  router.push("/login");
};

const handleSend = () => {
  console.log("Email untuk reset password:", email.value);
  // nanti di sini kita tambahkan logic untuk kirim email reset
};
</script>

<style scoped>
.container-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>