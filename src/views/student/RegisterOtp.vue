<template>
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6">Verifikasi OTP</h1>
      <p class="text-center text-gray-600 mb-6">Masukkan kode OTP yang dikirim ke email Anda</p>

      <input
        v-model="otp"
        maxlength="4"
        inputmode="numeric"
        class="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-xl tracking-widest mb-6"
      />

      <button @click="verifyOtp" :disabled="busy" class="btn-primary w-full mb-3">
        {{ busy ? "Memverifikasi..." : "Verifikasi" }}
      </button>
      <button @click="resendOtp" :disabled="cooldown > 0" class="btn-outline w-full">
        <span v-if="cooldown > 0">Kirim Ulang ({{ cooldown }}s)</span>
        <span v-else>Kirim Ulang OTP</span>
      </button>

      <p v-if="msg" class="text-green-600 text-center mt-4">{{ msg }}</p>
      <p v-if="err" class="text-red-500 text-center mt-4">{{ err }}</p>

      <div class="flex justify-between mt-6">
        <button @click="router.push('/student/register')" class="btn-outline">Kembali</button>
        <button
          @click="router.push('/student/register-lanjutan')"
          :disabled="!verified"
          class="btn-primary"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const router = useRouter();
const otp = ref("");
const msg = ref("");
const err = ref("");
const verified = ref(false);
const busy = ref(false);
const cooldown = ref(0);

const startCooldown = (sec = 30) => {
  cooldown.value = sec;
  const timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) clearInterval(timer);
  }, 1000);
};

const verifyOtp = async () => {
  try {
    busy.value = true;
    const temp_token = localStorage.getItem("temp_token");
    const res = await api.patch("/register/verify", {
      temp_token,
      otp_code: otp.value,
    });
    verified.value = true;
    msg.value = res.data.message || "OTP valid!";
  } catch (e) {
    err.value = e.response?.data?.message || "Kode OTP salah atau kadaluarsa.";
  } finally {
    busy.value = false;
  }
};

const resendOtp = async () => {
  try {
    busy.value = true;
    const temp_token = localStorage.getItem("temp_token");
    const res = await api.patch("/register/resend-otp", { temp_token });
    msg.value = res.data.message || "OTP baru telah dikirim.";
    startCooldown(30);
  } catch (e) {
    err.value = e.response?.data?.message || "Gagal mengirim ulang OTP.";
  } finally {
    busy.value = false;
  }
};
</script>

<style scoped>
.btn-primary { @apply bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-colors; }
.btn-outline { @apply border border-teal-500 text-teal-500 hover:bg-teal-50 px-6 py-3 rounded-lg font-medium transition-colors; }
</style>
