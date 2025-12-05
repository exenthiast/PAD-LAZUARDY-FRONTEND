<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <!-- Icon -->
      <div class="mb-6">
        <div
          class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto"
        >
          <svg
            class="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Pendaftaran Ditolak</h1>

      <!-- Message -->
      <p class="text-gray-600 mb-6">
        Maaf, pendaftaran Anda sebagai tutor telah ditolak oleh admin. Silakan
        cek email atau hubungi admin untuk informasi lebih lanjut atau coba daftar kembali.
      </p>

      <!-- Rejection Reason (if any) -->
      <div
        v-if="rejectionReason"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left"
      >
        <p class="text-sm font-semibold text-red-800 mb-2">Alasan Penolakan:</p>
        <p class="text-sm text-red-700">{{ rejectionReason }}</p>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <button
          @click="contactSupport"
          class="w-full bg-[#41a6c2] hover:bg-[#358a9f] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Hubungi Admin
        </button>

        <button
          @click="goToRegister"
          class="w-full border border-[#41a6c2] text-[#41a6c2] hover:bg-[#41a6c2]/10 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Daftar Ulang
        </button>

        <button
          @click="goToHome"
          class="w-full text-gray-600 hover:text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const rejectionReason = ref("");

onMounted(() => {
  // Ambil data user dari localStorage untuk cek alasan reject
  const userStr = localStorage.getItem("auth_user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      rejectionReason.value = user.rejection_reason || user.reject_reason || "";
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }
});

function contactSupport() {
  // Redirect ke WhatsApp atau email admin
  window.open(
    "https://wa.me/6281234567890?text=Halo, saya ingin bertanya tentang penolakan pendaftaran tutor saya",
    "_blank"
  );
}

function goToRegister() {
  // Clear localStorage dan arahkan ke register tutor
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  router.push("/tutor/register");
}

function goToHome() {
  // Clear localStorage dan arahkan ke home
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  router.push("/");
}
</script>
