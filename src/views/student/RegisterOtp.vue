<template>
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
      <!-- Header -->
      <div class="text-center space-y-3 mb-8">
        <h1 class="text-2xl md:text-3xl font-semibold text-[#41a6c2]">
          Verifikasi Kode OTP
        </h1>
        <p class="text-gray-600">
          Kode dikirim ke
          <span class="font-medium text-gray-800">{{
            targetEmail || "email Anda"
          }}</span
          >. Masukkan {{ OTP_LENGTH }} digit untuk melanjutkan.
        </p>
      </div>

      <!-- OTP Boxes -->
      <div class="mt-8">
        <div class="flex items-center justify-center gap-6">
          <input
            v-for="(d, i) in OTP_LENGTH"
            :key="i"
            ref="boxes"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="1"
            class="h-14 w-14 md:h-16 md:w-16 rounded-lg border border-gray-300 text-center text-2xl outline-none focus:border-[#41a6c2]"
            :aria-label="`Digit ${i + 1}`"
            v-model="digits[i]"
            @input="onInput(i)"
            @keydown.backspace.prevent="onBackspace(i)"
            @paste.prevent="onPaste"
          />
        </div>

        <p class="text-center text-xs text-gray-500 mt-6">Waktu 1–2 menit</p>

        <!-- Actions -->
        <div class="mt-6 space-y-3">
          <button
            class="w-full bg-[#eaeff1] hover:bg-[#dfe7ea] text-gray-900 font-medium py-3 rounded-lg disabled:opacity-60"
            :disabled="busy || !canVerify"
            @click="verifyOtp"
          >
            {{ busy ? "Memverifikasi..." : "Verifikasi" }}
          </button>

          <button
            class="w-full border border-[#41a6c2] text-[#41a6c2] hover:bg-[#41a6c2]/10 font-medium py-3 rounded-lg disabled:opacity-60"
            :disabled="busy || cooldown > 0"
            @click="sendOtp"
          >
            <span v-if="cooldown > 0">Kirim Lagi ({{ cooldown }}s)</span>
            <span v-else>Kirim Lagi</span>
          </button>

          <p v-if="msg" class="text-center text-green-600 text-sm">{{ msg }}</p>
          <p v-if="err" class="text-center text-red-600 text-sm">{{ err }}</p>
        </div>

        <!-- Next Button -->
        <div class="mt-8 flex justify-between">
          <button
            @click="handleBack"
            class="border border-[#41a6c2] text-[#41a6c2] hover:bg-[#41a6c2]/10 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Kembali
          </button>
          <button
            @click="handleSubmit"
            :disabled="!verified || busy"
            class="bg-[#41a6c2] hover:bg-[#2e8694] text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { resendOtp, verifyEmail } from "@/services/authRegister";

const props = defineProps({
  email: { type: String, default: "" },
  nextPath: { type: String, default: "/student/register-lanjutan" },
});

const OTP_LENGTH = 4;

const router = useRouter();
const boxes = ref([]);
const digits = ref(Array.from({ length: OTP_LENGTH }, () => ""));
const busy = ref(false);
const msg = ref("");
const err = ref("");
const verified = ref(false);
const cooldown = ref(0);
let timer = null;

const targetEmail = computed(() => {
  const email = props.email || localStorage.getItem("register:email") || "";
  console.log("Target email in OTP:", email);
  return email;
});

const code = computed(() => digits.value.join("").replace(/\D/g, ""));
const canVerify = computed(() => code.value.length === OTP_LENGTH);

function focusBox(i) {
  nextTick(() => {
    const el = boxes.value[i];
    if (el && typeof el.focus === "function") el.focus();
  });
}

function onInput(i) {
  err.value = "";
  msg.value = "";
  verified.value = false;
  digits.value[i] = (digits.value[i] || "").replace(/\D/g, "").slice(0, 1);
  if (digits.value[i] && i < OTP_LENGTH - 1) focusBox(i + 1);
}

function onBackspace(i) {
  if (digits.value[i]) {
    digits.value[i] = "";
    return;
  }
  if (i > 0) {
    digits.value[i - 1] = "";
    focusBox(i - 1);
  }
}

function onPaste(e) {
  const text = (e.clipboardData?.getData("text") ?? "").replace(/\D/g, "");
  if (!text) return;
  for (let i = 0; i < OTP_LENGTH; i++) digits.value[i] = text[i] ?? "";
  const last = Math.min(text.length, OTP_LENGTH) - 1;
  focusBox(last >= 0 ? last : 0);
}

function startCooldown(sec = 30) {
  cooldown.value = sec;
  clearInterval(timer);
  timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

async function sendOtp() {
  try {
    busy.value = true;
    err.value = "";
    msg.value = "";
    const email = targetEmail.value;
    if (!email) throw new Error("Email tidak ditemukan");

    const res = await resendOtp({ email });
    msg.value = res?.message || "OTP terkirim";
    startCooldown(30);
  } catch (e) {
    err.value = e?.response?.data?.message || e.message || "Gagal kirim OTP";
  } finally {
    busy.value = false;
  }
}

async function verifyOtp() {
  try {
    busy.value = true;
    err.value = "";
    msg.value = "";

    const email = targetEmail.value;
    if (!email) throw new Error("Email tidak ditemukan");
    if (!canVerify.value) throw new Error(`Masukkan ${OTP_LENGTH} digit OTP`);

    const res = await verifyEmail({
      email,
      otp: code.value,
    });

    msg.value = res?.message || "OTP valid";
    verified.value = true;
  } catch (e) {
    verified.value = false;
    err.value = e?.response?.data?.message || e.message || "OTP salah";
  } finally {
    busy.value = false;
  }
}

function handleBack() {
  router.push("/student/register");
}

function handleSubmit() {
  if (!verified.value) {
    err.value = "Harap verifikasi OTP terlebih dahulu";
    return;
  }
  router.push(props.nextPath || "/student/register-lanjutan");
}

onMounted(() => focusBox(0));
onUnmounted(() => clearInterval(timer));
</script>
