<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data booking...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-8 h-8 text-red-600"
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
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Error</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="router.push('/tutors')"
          class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-teal-700 transition"
        >
          Kembali ke Daftar Tutor
        </button>
      </div>

      <!-- Payment Simulation -->
      <div
        v-else-if="booking"
        class="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <!-- Header -->
        <div
          class="bg-gradient-to-r from-primary to-teal-600 text-white p-6 text-center"
        >
          <div
            class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold">Simulasi Pembayaran</h1>
          <p class="text-white/90 text-sm mt-1">Demo Mode - Instant Payment</p>
        </div>

        <!-- Booking Details -->
        <div class="p-6 space-y-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-800 mb-3">
              Detail Booking
            </h2>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Booking ID:</span>
                <span class="font-medium text-gray-800">#{{ booking.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tutor:</span>
                <span class="font-medium text-gray-800">{{
                  booking.tutor_name || "N/A"
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Jadwal:</span>
                <span class="font-medium text-gray-800">{{
                  formatSchedule(booking.schedule_time)
                }}</span>
              </div>
              <div class="flex justify-between border-t pt-3 mt-3">
                <span class="text-gray-600">Total Bayar:</span>
                <span class="text-xl font-bold text-primary">{{
                  formatPrice(booking.price)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <svg
                class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div>
                <p class="font-medium text-yellow-800">
                  Status:
                  {{
                    booking.status === "unpaid"
                      ? "Menunggu Pembayaran"
                      : "Lunas"
                  }}
                </p>
                <p class="text-sm text-yellow-700 mt-1">
                  Ini adalah simulasi pembayaran untuk demo. Klik tombol di
                  bawah untuk konfirmasi.
                </p>
              </div>
            </div>
          </div>

          <!-- Payment Method (Dummy) -->
          <div>
            <h3 class="font-semibold text-gray-800 mb-3">
              Metode Pembayaran (Simulasi)
            </h3>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                @click="selectedMethod = method.id"
                class="border-2 rounded-lg p-3 text-center transition"
                :class="
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                "
              >
                <div class="text-2xl mb-1">{{ method.icon }}</div>
                <div class="text-xs font-medium text-gray-700">
                  {{ method.name }}
                </div>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 pt-4">
            <button
              @click="router.push('/tutors')"
              :disabled="isProcessing"
              class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              @click="confirmPayment"
              :disabled="isProcessing || booking.status === 'paid'"
              class="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-teal-700 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span
                v-if="isProcessing"
                class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
              ></span>
              <span>{{
                isProcessing ? "Memproses..." : "Bayar Sekarang"
              }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <transition name="fade">
        <div
          v-if="showSuccess"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
        >
          <div
            class="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center"
          >
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              Pembayaran Berhasil!
            </h2>
            <p class="text-gray-600 mb-6">
              Booking Anda telah dikonfirmasi. Tutor akan segera menghubungi
              Anda.
            </p>
            <button
              @click="router.push('/payment/success')"
              class="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-teal-700 font-medium transition"
            >
              Lihat Konfirmasi
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();

// State
const isLoading = ref(true);
const isProcessing = ref(false);
const booking = ref(null);
const error = ref(null);
const showSuccess = ref(false);
const selectedMethod = ref("gopay");

// Payment methods (dummy)
const paymentMethods = [
  { id: "gopay", name: "GoPay", icon: "💳" },
  { id: "ovo", name: "OVO", icon: "💰" },
  { id: "dana", name: "DANA", icon: "💵" },
  { id: "bca", name: "BCA VA", icon: "🏦" },
  { id: "mandiri", name: "Mandiri", icon: "🏦" },
  { id: "bni", name: "BNI", icon: "🏦" },
];

// Format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

// Format schedule
const formatSchedule = (dateTime) => {
  if (!dateTime) return "-";
  const date = new Date(dateTime);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Load booking detail
async function loadBooking() {
  try {
    isLoading.value = true;
    const bookingId = route.params.id;

    if (!bookingId) {
      throw new Error("Booking ID tidak ditemukan");
    }

    console.log("Loading booking ID:", bookingId);

    const response = await api.get(`/bookings/${bookingId}`);

    console.log("Booking response:", response.data);

    if (response.data.status === "success") {
      booking.value = response.data.data;
    } else {
      throw new Error(response.data.message || "Gagal memuat data booking");
    }
  } catch (err) {
    console.error("Error loading booking:", err);
    error.value =
      err.response?.data?.message || err.message || "Gagal memuat data booking";
  } finally {
    isLoading.value = false;
  }
}

// Confirm payment (simulasi)
async function confirmPayment() {
  if (!booking.value) return;

  try {
    isProcessing.value = true;

    console.log("Confirming payment for booking:", booking.value.id);

    const response = await api.post(`/bookings/${booking.value.id}/confirm`);

    console.log("Confirm response:", response.data);

    if (response.data.status === "success") {
      // Update booking status
      booking.value.status = "paid";

      // Show success modal
      showSuccess.value = true;
    } else {
      throw new Error(response.data.message || "Gagal konfirmasi pembayaran");
    }
  } catch (err) {
    console.error("Error confirming payment:", err);
    alert(
      err.response?.data?.message ||
        err.message ||
        "Gagal konfirmasi pembayaran"
    );
  } finally {
    isProcessing.value = false;
  }
}

onMounted(() => {
  loadBooking();
});
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
