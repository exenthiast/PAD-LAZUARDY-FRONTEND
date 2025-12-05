<template>
  <div class="auth-wrap">
    <div class="login-card">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="Bimbel Lazuardy" />
      </div>

      <h2 class="title">Verifikasi OTP</h2>
      <p class="subtitle">
        Masukkan kode OTP yang telah dikirim ke email Anda
      </p>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <form @submit.prevent="handleVerify" class="otp-form">
        <div class="otp-inputs">
          <input
            v-for="(digit, index) in OTP_LENGTH"
            :key="index"
            :ref="(el) => (otpRefs[index] = el)"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="1"
            v-model="otpDigits[index]"
            @input="onInput(index)"
            @keydown.backspace.prevent="onBackspace(index)"
            @paste.prevent="onPaste"
            class="otp-input"
            :class="{ error: error && !isValidOtp }"
            :aria-label="`Digit ${index + 1}`"
          />
        </div>

        <button
          type="submit"
          :disabled="submitting || !canVerify"
          class="submit-btn"
        >
          {{ submitting ? "Memverifikasi..." : "Verifikasi" }}
        </button>

        <div class="resend-section">
          <button
            type="button"
            @click="handleResendOtp"
            :disabled="submitting || countdown > 0"
            class="resend-btn"
          >
            <span v-if="countdown > 0">Kirim Lagi ({{ countdown }}s)</span>
            <span v-else>Kirim Lagi</span>
          </button>
        </div>

        <button
          type="button"
          @click="handleCancel"
          class="cancel-btn"
          :disabled="submitting"
        >
          Batal
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const OTP_LENGTH = 4;

const route = useRoute();
const router = useRouter();

const otpDigits = ref(Array.from({ length: OTP_LENGTH }, () => ""));
const otpRefs = ref([]);
const submitting = ref(false);
const error = ref("");
const successMessage = ref("");
const onboardingToken = ref("");
const userRole = ref("");
const verified = ref(false);

// Countdown untuk resend OTP
const countdown = ref(0);
let countdownInterval = null;

const otpCode = computed(() => {
  return otpDigits.value.join("").replace(/\D/g, "");
});

const isValidOtp = computed(() => {
  return otpDigits.value.every((digit) => /^\d$/.test(digit));
});

const canVerify = computed(() => {
  return otpCode.value.length === OTP_LENGTH;
});

onMounted(() => {
  // Token dari query parameter
  onboardingToken.value = route.query.t || "";
  userRole.value = route.query.role || "";

  if (!onboardingToken.value) {
    error.value = "Token tidak valid. Silakan login ulang.";
  }

  // Auto focus input pertama
  focusBox(0);
});

onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

function focusBox(i) {
  nextTick(() => {
    const el = otpRefs.value[i];
    if (el && typeof el.focus === "function") el.focus();
  });
}

function startCountdown(sec = 30) {
  countdown.value = sec;
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }, 1000);
}

function onInput(i) {
  error.value = "";
  successMessage.value = "";
  verified.value = false;
  otpDigits.value[i] = (otpDigits.value[i] || "")
    .replace(/\D/g, "")
    .slice(0, 1);
  if (otpDigits.value[i] && i < OTP_LENGTH - 1) focusBox(i + 1);
}

function onBackspace(i) {
  if (otpDigits.value[i]) {
    otpDigits.value[i] = "";
    return;
  }
  if (i > 0) {
    otpDigits.value[i - 1] = "";
    focusBox(i - 1);
  }
}

function onPaste(e) {
  const text = (e.clipboardData?.getData("text") ?? "").replace(/\D/g, "");
  if (!text) return;
  for (let i = 0; i < OTP_LENGTH; i++) otpDigits.value[i] = text[i] ?? "";
  const last = Math.min(text.length, OTP_LENGTH) - 1;
  focusBox(last >= 0 ? last : 0);
}

async function handleVerify() {
  if (!canVerify.value) {
    error.value = `Masukkan ${OTP_LENGTH} digit OTP`;
    return;
  }

  if (!onboardingToken.value) {
    error.value = "Token tidak valid. Silakan login ulang.";
    return;
  }

  submitting.value = true;
  error.value = "";
  successMessage.value = "";

  try {
    // Kirim OTP ke backend
    const response = await axios.post(
      "http://localhost:8000/api/auth/social/verify-otp",
      {
        otp: otpCode.value,
      },
      {
        headers: {
          Authorization: `Bearer ${onboardingToken.value}`,
        },
      }
    );

    const data = response.data;

    successMessage.value = data?.message || "OTP valid";
    verified.value = true;

    // Simpan auth token
    const authToken = data.token || data.access_token;
    if (authToken) {
      localStorage.setItem("auth_token", authToken);
    }

    if (data.user) {
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    }

    // Redirect sesuai role
    setTimeout(() => {
      const redirectPath =
        userRole.value === "tutor" || data.user?.role === "tutor"
          ? "/tutor/register-lanjutan"
          : "/student/dashboard";

      router.replace(redirectPath);
    }, 1500);
  } catch (e) {
    console.error(e);
    verified.value = false;
    error.value =
      e.response?.data?.message ||
      e.response?.data?.error ||
      "Kode OTP salah atau sudah kadaluarsa. Silakan coba lagi.";

    // Reset OTP inputs
    otpDigits.value = Array.from({ length: OTP_LENGTH }, () => "");
    focusBox(0);
  } finally {
    submitting.value = false;
  }
}

async function handleResendOtp() {
  if (submitting.value || countdown.value > 0) {
    return;
  }

  submitting.value = true;
  error.value = "";
  successMessage.value = "";

  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/social/resend-otp",
      {},
      {
        headers: {
          Authorization: `Bearer ${onboardingToken.value}`,
        },
      }
    );

    successMessage.value =
      response?.data?.message || "Kode OTP berhasil dikirim ulang!";
    startCountdown(30);

    // Reset OTP inputs
    otpDigits.value = Array.from({ length: OTP_LENGTH }, () => "");
    focusBox(0);

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (e) {
    console.error(e);
    error.value =
      e.response?.data?.message ||
      e.response?.data?.error ||
      "Gagal mengirim ulang OTP. Silakan coba lagi.";
  } finally {
    submitting.value = false;
  }
}

function handleCancel() {
  router.push("/login");
}
</script>

<style scoped>
.auth-wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #ffffff;
  padding: 24px;
}

.login-card {
  width: min(600px, 90vw);
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  text-align: center;
  width: 100%;
}

.logo img {
  width: 180px;
  height: auto;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  text-align: center;
}

.subtitle {
  font-size: 14px;
  color: #718096;
  margin-bottom: 32px;
  text-align: center;
  line-height: 1.5;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.success-message {
  background: #d1fae5;
  color: #065f46;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.otp-form {
  width: 100%;
}

.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
}

.otp-input {
  width: 48px;
  height: 56px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: #f8f9fa;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.otp-input:focus {
  outline: none;
  border-color: #41a6c2;
  background: white;
  box-shadow: 0 0 0 3px rgba(65, 166, 194, 0.1);
}

.otp-input.error {
  border-color: #ef4444;
  background: #fee;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #358a9f 0%, #41a6c2 100%);
  box-shadow: 0 8px 16px rgba(65, 166, 194, 0.3);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.resend-section {
  text-align: center;
  margin-bottom: 16px;
}

.resend-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #41a6c2;
  border: 1px solid #41a6c2;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.resend-btn:hover:not(:disabled) {
  background: rgba(65, 166, 194, 0.1);
}

.resend-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #718096;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #cbd5e0;
}

.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .login-card {
    padding: 32px 24px;
  }

  .otp-inputs {
    gap: 8px;
  }

  .otp-input {
    width: 40px;
    height: 48px;
    font-size: 20px;
  }
}
</style>
