P
<template>
  <div
    class="container-center bg-gray-100 min-h-screen flex items-center justify-center"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img src="@/assets/logo.svg" alt="Bimbel Lazuardy" class="h-12" />
      </div>

      <!-- Judul -->
      <h2 class="text-center text-xl font-bold mb-6 text-gray-800">
        Lupa Password
      </h2>
      <p class="text-center text-sm text-gray-500 mb-6">
        Masukkan email kamu untuk menerima kode OTP reset password.
      </p>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm"
      >
        <div class="flex items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 flex-shrink-0 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ successMessage }}</span>
        </div>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 text-sm"
      >
        <div class="flex items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 flex-shrink-0 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      </div>

      <!-- Form -->
      <div class="space-y-4">
        <div>
          <label class="text-sm mb-2 block text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="contoh@email.com"
            :disabled="loading"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            @keyup.enter="handleSend"
          />
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-between mt-8">
        <button
          @click="handleBack"
          :disabled="loading"
          class="border border-teal-500 text-teal-500 hover:bg-teal-50 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Kembali
        </button>
        <button
          @click="handleSend"
          :disabled="loading"
          class="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{{ loading ? "Mengirim..." : "Kirim Kode OTP" }}</span>
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
import axios from "axios";

const router = useRouter();
const email = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleBack = () => {
  router.push("/login");
};

const handleSend = async () => {
  // Reset messages
  errorMessage.value = "";
  successMessage.value = "";

  // Validasi email
  if (!email.value) {
    errorMessage.value = "Email tidak boleh kosong.";
    return;
  }

  // Validasi format email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    errorMessage.value = "Format email tidak valid.";
    return;
  }

  loading.value = true;

  try {
    const response = await axios.post(
      "http://localhost:8000/api/forgot-password",
      {
        email: email.value,
      }
    );

    console.log("Response:", response.data);

    // Simpan temp_token dan email untuk step berikutnya
    localStorage.setItem("reset_temp_token", response.data.temp_token);
    localStorage.setItem("reset_email", email.value);

    successMessage.value =
      "Link reset password telah dikirim ke email Anda. Silakan cek inbox atau spam folder.";

    // Redirect ke halaman verify OTP setelah 2 detik
    setTimeout(() => {
      router.push({
        name: "VerifyResetOTP",
        query: { email: email.value },
      });
    }, 2000);
  } catch (error) {
    console.error("Error sending reset password:", error);

    if (error.response) {
      // Error dari server
      if (error.response.status === 404) {
        errorMessage.value = "Email tidak terdaftar di sistem kami.";
      } else if (error.response.data?.message) {
        errorMessage.value = error.response.data.message;
      } else {
        errorMessage.value =
          "Gagal mengirim email reset password. Silakan coba lagi.";
      }
    } else if (error.request) {
      // Request dibuat tapi tidak ada response
      errorMessage.value =
        "Tidak dapat terhubung ke server. Pastikan koneksi internet Anda aktif.";
    } else {
      // Error lainnya
      errorMessage.value = "Terjadi kesalahan. Silakan coba lagi.";
    }
  } finally {
    loading.value = false;
  }
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
