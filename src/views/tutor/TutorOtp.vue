<template>
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
      <!-- Header -->
      <div class="text-center space-y-3 mb-8">
        <h1 class="text-2xl md:text-3xl font-semibold text-teal-600">
          Verifikasi Kode OTP
        </h1>
        <p class="text-gray-600">
          Masukkan kode OTP yang telah kami kirim ke email Anda untuk
          melanjutkan
        </p>
      </div>

      <!-- OTP Boxes -->
      <div class="mt-8">
        <div class="flex items-center justify-center gap-6">
          <input
            v-for="(d, i) in digits"
            :key="i"
            ref="boxes"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="1"
            class="h-14 w-14 md:h-16 md:w-16 rounded-lg border border-gray-300 text-center text-2xl outline-none focus:border-teal-500"
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
            class="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 rounded-lg disabled:opacity-60"
            :disabled="busy || code.length !== 4"
            @click="verifyOtp"
          >
            Verifikasi
          </button>

          <button
            class="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 rounded-lg disabled:opacity-60"
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
          class="border border-teal-500 text-teal-500 hover:bg-teal-50 px-8 py-3 rounded-lg font-medium transition-colors"
          >
          Kembali
          </button>
          <button
            @click="handleSubmit"
            :disabled="!verified || busy"
            class="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

/**
 * Dummy service: ganti nanti ke API-mu sendiri
 * Kode valid: 123456
 */
async function sendOtpDummy(email) {
  await new Promise((r) => setTimeout(r, 800));
  return { ok: true, message: "OTP terkirim. Kode: 1234" };
}
async function verifyOtpDummy(email, code) {
  await new Promise((r) => setTimeout(r, 600));
  if (code === "1234") return { ok: true, message: "OTP valid." };
  return { ok: false, message: "Kode OTP salah." };
}

/**
 * Props opsional:
 * - email: alamat email tujuan OTP
 * - nextPath: route tujuan setelah verifikasi
 */
const props = defineProps({
  email: { type: String, default: "" },
  nextPath: { type: String, default: "/lanjutan-tutor" },
});

const router = useRouter();
const boxes = ref([]); // refs ke 4/6 input
const digits = ref(["", "", "", ""]);
const busy = ref(false);
const msg = ref("");
const err = ref("");
const verified = ref(false);

const cooldown = ref(0);
let timer = null;

const code = computed(() => digits.value.join("").replace(/\D/g, ""));

function focusBox(i) {
  nextTick(() => {
    const el = boxes.value[i];
    if (el && typeof el.focus === "function") el.focus();
  });
}

function onInput(i) {
  // hanya angka
  digits.value[i] = digits.value[i].replace(/\D/g, "").slice(0, 1);
  if (digits.value[i] && i < digits.value.length - 1) {
    focusBox(i + 1);
  }
}

function onBackspace(i) {
  if (digits.value[i]) {
    digits.value[i] = "";
    return;
  }
  if (i > 0) {
    focusBox(i - 1);
    digits.value[i - 1] = "";
  }
}

function onPaste(e) {
  const text = (e.clipboardData?.getData("text") ?? "").replace(/\D/g, "");
  if (!text) return;
  const limit = digits.value.length;
  for (let i = 0; i < limit; i++) {
    digits.value[i] = text[i] ?? "";
  }
  // fokus ke akhir
  const last = Math.min(text.length, limit) - 1;
  focusBox(last >= 0 ? last : 0);
}

function startCooldown(sec = 30) {
  cooldown.value = sec;
  clearInterval(timer);
  timer = setInterval(() => {
    cooldown.value--;
    if (cooldown.value <= 0) clearInterval(timer);
  }, 1000);
}

async function sendOtp() {
  try {
    busy.value = true;
    err.value = "";
    msg.value = "";
    const res = await sendOtpDummy(props.email || "user@example.com");
    if (!res.ok) throw new Error(res.message || "Gagal kirim OTP");
    msg.value = res.message;
    startCooldown(30);
  } catch (e) {
    err.value = e.message || "Gagal kirim OTP";
  } finally {
    busy.value = false;
  }
}

async function verifyOtp() {
  try {
    busy.value = true;
    err.value = "";
    msg.value = "";
    const res = await verifyOtpDummy(
      props.email || "user@example.com",
      code.value
    );
    if (!res.ok) throw new Error(res.message || "OTP salah");
    msg.value = res.message;
    verified.value = true;
  } catch (e) {
    verified.value = false;
    err.value = e.message || "OTP salah";
  } finally {
    busy.value = false;
  }
}

const handleBack = () => {
  router.push("/register-tutor");
};

const handleSubmit = () => {
  if (!verified.value) {
    err.value = "Harap verifikasi OTP terlebih dahulu";
    return;
  }

    alert("Berhasil verifikasi OTP!");

  // Redirect ke halaman berikutnya
  router.push(props.nextPath || "/lanjutan-tutor");
};

onMounted(() => {
  // auto fokus input pertama
  focusBox(0);
});
</script>
