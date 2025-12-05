<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Success Icon -->
        <div
          class="bg-gradient-to-r from-green-500 to-teal-500 p-8 text-center"
        >
          <div
            class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"
          >
            <svg
              class="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">
            Pembayaran Berhasil!
          </h1>
          <p class="text-white/90 text-lg">Jadwal Tutor Sudah Dikonfirmasi</p>
        </div>

        <!-- Details -->
        <div class="p-8 space-y-6">
          <div class="text-center">
            <div
              class="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Status: Lunas</span>
            </div>

            <p class="text-gray-600 leading-relaxed">
              Terima kasih! Pembayaran Anda telah berhasil diproses. Tutor akan
              segera menghubungi Anda untuk konfirmasi jadwal belajar.
            </p>
          </div>

          <!-- Info Box -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div class="text-sm text-blue-800">
                <p class="font-medium mb-1">Langkah Selanjutnya:</p>
                <ul class="space-y-1 list-disc list-inside">
                  <li>Cek email untuk konfirmasi booking</li>
                  <li>Tutor akan menghubungi Anda via WhatsApp</li>
                  <li>Lihat jadwal di Dashboard Anda</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-3">
            <button
              @click="router.push('/student/dashboard')"
              class="w-full px-6 py-4 bg-primary text-white rounded-lg hover:bg-teal-700 font-semibold text-lg transition shadow-lg hover:shadow-xl"
            >
              Kembali ke Dashboard
            </button>
            <button
              @click="router.push('/tutors')"
              class="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Booking Tutor Lain
            </button>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="bg-gray-50 px-8 py-4 text-center">
          <p class="text-xs text-gray-500">
            Butuh bantuan? Hubungi
            <a href="#" class="text-primary hover:underline font-medium"
              >Customer Service</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
.bg-primary {
  background-color: #2ba9b2;
}
.text-primary {
  color: #2ba9b2;
}
.border-primary {
  border-color: #2ba9b2;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}
</style>
