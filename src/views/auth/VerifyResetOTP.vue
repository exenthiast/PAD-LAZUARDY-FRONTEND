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
        Verifikasi Kode OTP
      </h2>
      <p class="text-center text-sm text-gray-500 mb-6">
        Masukkan kode OTP 4 digit yang telah dikirim ke email<br />
        <span class="font-semibold text-gray-700">{{ email }}</span>
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

      <!-- OTP Input -->
      <div class="mb-6">
        <label class="text-sm mb-2 block text-gray-700">Kode OTP</label>
        <input
          v-model="otpCode"
          type="text"
          maxlength="4"
          placeholder="1234"
          :disabled="loading"
          class="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded focus:outline-none focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          @keyup.enter="handleVerify"
          @input="otpCode = otpCode.replace(/\D/g, '')"
        />
        <p class="text-xs text-gray-500 mt-2 text-center">
          Kode OTP terdiri dari 4 digit angka
        </p>
      </div>

      <!-- Resend OTP -->
      <div class="text-center mb-6">
        <p class="text-sm text-gray-600">
          Tidak menerima kode?
          <button
            @click="handleResend"
            :disabled="loading || countdown > 0"
            class="text-teal-500 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{
              countdown > 0 ? `Kirim ulang (${countdown}s)` : "Kirim ulang kode"
            }}
          </button>
        </p>
      </div>

      <!-- Tombol -->
      <div class="flex justify-between">
        <button
          @click="handleBack"
          :disabled="loading"
          class="border border-teal-500 text-teal-500 hover:bg-teal-50 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Kembali
        </button>
        <button
          @click="handleVerify"
          :disabled="loading || otpCode.length !== 4"
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
          <span>{{ loading ? "Memverifikasi..." : "Verifikasi" }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const email = ref("");
const otpCode = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const countdown = ref(0);
let countdownInterval = null;

onMounted(() => {
  // Get email from query params or localStorage
  email.value = route.query.email || localStorage.getItem("reset_email") || "";

  if (!email.value) {
    errorMessage.value =
      "Email tidak ditemukan. Silakan ulangi proses reset password.";
    setTimeout(() => {
      router.push("/forgot-password");
    }, 2000);
  }

  // Start countdown for resend
  startCountdown(60);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

const startCountdown = (seconds) => {
  countdown.value = seconds;
  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
};

const handleBack = () => {
  router.push("/forgot-password");
};

const handleVerify = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (otpCode.value.length !== 4) {
    errorMessage.value = "Kode OTP harus 4 digit.";
    return;
  }

  const tempToken = localStorage.getItem("reset_temp_token");
  if (!tempToken) {
    errorMessage.value =
      "Token tidak ditemukan. Silakan ulangi proses reset password.";
    setTimeout(() => {
      router.push("/forgot-password");
    }, 2000);
    return;
  }

  loading.value = true;

  try {
    const response = await axios.patch(
      "http://localhost:8000/api/forgot-password/verify",
      {
        otp_code: otpCode.value,
        temp_token: tempToken,
      }
    );

    console.log("Verify response:", response.data);

    // Simpan reset token untuk step berikutnya
    localStorage.setItem("reset_token", response.data.token);

    successMessage.value = "Kode OTP berhasil diverifikasi!";

    // Redirect ke halaman reset password
    setTimeout(() => {
      router.push("/reset-password");
    }, 1500);
  } catch (error) {
    console.error("Error verifying OTP:", error);

    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else if (error.response?.status === 400) {
      errorMessage.value = "Kode OTP tidak valid atau sudah kadaluarsa.";
    } else {
      errorMessage.value = "Gagal memverifikasi kode OTP. Silakan coba lagi.";
    }
  } finally {
    loading.value = false;
  }
};

const handleResend = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  loading.value = true;

  try {
    const response = await axios.post(
      "http://localhost:8000/api/forgot-password",
      {
        email: email.value,
      }
    );

    console.log("Resend response:", response.data);

    // Update temp_token
    localStorage.setItem("reset_temp_token", response.data.temp_token);

    successMessage.value = "Kode OTP baru telah dikirim ke email Anda.";

    // Restart countdown
    startCountdown(60);

    // Clear OTP input
    otpCode.value = "";
  } catch (error) {
    console.error("Error resending OTP:", error);
    errorMessage.value =
      error.response?.data?.message || "Gagal mengirim ulang kode OTP.";
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
