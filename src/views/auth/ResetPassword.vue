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
        Reset Password
      </h2>
      <p class="text-center text-sm text-gray-500 mb-6">
        Masukkan password baru Anda
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
          <label class="text-sm mb-2 block text-gray-700">Password Baru</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Minimal 8 karakter"
              :disabled="loading"
              class="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label class="text-sm mb-2 block text-gray-700"
            >Konfirmasi Password Baru</label
          >
          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Ulangi password baru"
              :disabled="loading"
              class="w-full px-4 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:border-teal-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              @keyup.enter="handleReset"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg
                v-if="!showConfirmPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Password Requirements -->
        <div class="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
          <p class="font-medium mb-1">Password harus memenuhi:</p>
          <ul class="space-y-1">
            <li class="flex items-center gap-2">
              <span
                :class="
                  password.length >= 8 ? 'text-green-600' : 'text-gray-400'
                "
                >●</span
              >
              Minimal 8 karakter
            </li>
            <li class="flex items-center gap-2">
              <span
                :class="
                  password === confirmPassword && password
                    ? 'text-green-600'
                    : 'text-gray-400'
                "
                >●</span
              >
              Password dan konfirmasi harus sama
            </li>
          </ul>
        </div>
      </div>

      <!-- Tombol -->
      <div class="mt-8">
        <button
          @click="handleReset"
          :disabled="loading || !isFormValid"
          class="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          <span>{{ loading ? "Mereset Password..." : "Reset Password" }}</span>
        </button>
      </div>

      <!-- Link ke Login -->
      <p class="text-center text-sm mt-6 text-gray-600">
        Kembali ke
        <router-link to="/login" class="text-teal-500 hover:underline">
          halaman login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const isFormValid = computed(() => {
  return (
    password.value.length >= 8 &&
    confirmPassword.value.length >= 8 &&
    password.value === confirmPassword.value
  );
});

onMounted(() => {
  // Check if reset token exists
  const resetToken = localStorage.getItem("reset_token");
  if (!resetToken) {
    errorMessage.value =
      "Token reset tidak ditemukan. Silakan ulangi proses reset password.";
    setTimeout(() => {
      router.push("/forgot-password");
    }, 2000);
  }
});

const handleReset = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  // Validasi
  if (password.value.length < 8) {
    errorMessage.value = "Password minimal 8 karakter.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Password dan konfirmasi password tidak sama.";
    return;
  }

  const resetToken = localStorage.getItem("reset_token");
  if (!resetToken) {
    errorMessage.value = "Token reset tidak ditemukan. Silakan ulangi proses.";
    return;
  }

  loading.value = true;

  try {
    const response = await axios.patch(
      "http://localhost:8000/api/reset-password",
      {
        token: resetToken,
        password: password.value,
        password_confirmation: confirmPassword.value,
      }
    );

    console.log("Reset password response:", response.data);

    successMessage.value =
      "Password berhasil direset! Anda akan diarahkan ke halaman login.";

    // Clear localStorage
    localStorage.removeItem("reset_token");
    localStorage.removeItem("reset_temp_token");
    localStorage.removeItem("reset_email");

    // Redirect ke login setelah 2 detik
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    console.error("Error resetting password:", error);

    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else if (error.response?.status === 400) {
      errorMessage.value =
        "Token tidak valid atau sudah kadaluarsa. Silakan ulangi proses reset password.";
    } else if (error.response?.data?.errors) {
      // Laravel validation errors
      const errors = Object.values(error.response.data.errors).flat();
      errorMessage.value = errors.join(", ");
    } else {
      errorMessage.value = "Gagal mereset password. Silakan coba lagi.";
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
