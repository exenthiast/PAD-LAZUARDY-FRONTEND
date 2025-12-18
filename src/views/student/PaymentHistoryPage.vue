<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <Navbar />

    <!-- Header -->
    <div class="text-center mb-10 mt-20">
      <h1 class="text-3xl font-bold text-primary">Riwayat Pembayaran</h1>
      <p class="text-gray-600 text-sm mt-2">
        Lihat daftar transaksi dan status pembayaran kamu di bawah ini
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
      ></div>
      <p class="mt-4 text-gray-600">Memuat riwayat pembayaran...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="paymentHistory.length === 0" class="max-w-3xl mx-auto px-4">
      <div class="bg-white rounded-2xl shadow-sm p-12 text-center">
        <div class="text-6xl mb-4">📦</div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">
          Belum ada riwayat pembayaran
        </h3>
        <p class="text-gray-600 mb-6">
          Anda belum melakukan pembelian paket belajar
        </p>
        <button
          @click="router.push('/packages')"
          class="bg-[#41a6c2] text-white px-6 py-3 rounded-lg hover:bg-[#3592ab] transition"
        >
          Lihat Paket Belajar
        </button>
      </div>
    </div>

    <!-- List Transaksi -->
    <div v-else class="max-w-3xl mx-auto space-y-6 px-4">
      <div
        v-for="payment in paymentHistory"
        :key="payment.id"
        class="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition p-6"
      >
        <!-- Header transaksi -->
        <div class="flex justify-between items-center mb-3">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">
              {{ payment.package_name }}
            </h2>
            <p class="text-sm text-gray-500">
              {{ formatDate(payment.created_at) }}
            </p>
          </div>
          <span
            class="text-xs font-semibold px-3 py-1 rounded-full"
            :class="getStatusClass(payment.status)"
          >
            {{ getStatusText(payment.status) }}
          </span>
        </div>

        <!-- Detail transaksi -->
        <div class="text-sm text-gray-700 space-y-1">
          <p v-if="payment.subject_name">
            <span class="font-medium">Mata Pelajaran:</span>
            {{ payment.subject_name }}
          </p>
          <p v-if="payment.tutor_name">
            <span class="font-medium">Tutor:</span>
            {{ payment.tutor_name }}
          </p>
          <p>
            <span class="font-medium">Total Sesi:</span>
            {{ payment.package_session }} pertemuan
          </p>
          <p>
            <span class="font-medium">Sisa Sesi:</span>
            {{ payment.remaining_session }} pertemuan
          </p>
          <p>
            <span class="font-medium">Metode:</span>
            {{ payment.payment_method || "Transfer Bank" }}
          </p>
          <p>
            <span class="font-medium">Order ID:</span> {{ payment.order_id }}
          </p>
          <p v-if="payment.payment_proof">
            <span class="font-medium">Bukti Transfer:</span>
            <a
              :href="getProofUrl(payment.payment_proof)"
              target="_blank"
              class="text-primary hover:underline"
              >Lihat</a
            >
          </p>
        </div>

        <!-- Status Paket -->
        <div
          v-if="payment.status === 'validated' && payment.package_status"
          class="mt-3 p-3 bg-blue-50 rounded-lg"
        >
          <p class="text-sm text-blue-800">
            <span class="font-semibold">Status Paket:</span>
            <span
              :class="{
                'text-green-600': payment.package_status === 'approved',
                'text-yellow-600': payment.package_status === 'pending',
                'text-red-600': payment.package_status === 'rejected',
              }"
            >
              {{ getPackageStatusText(payment.package_status) }}
            </span>
          </p>
          <p
            v-if="payment.package_status === 'approved' && payment.start_date"
            class="text-sm text-blue-700 mt-1"
          >
            ✅ Paket aktif sejak {{ formatDate(payment.start_date) }}
          </p>
          <p
            v-if="payment.package_status === 'approved' && payment.expired_at"
            class="text-sm text-blue-700"
          >
            📅 Berlaku sampai {{ formatDate(payment.expired_at) }}
          </p>
        </div>

        <div class="flex justify-between items-center mt-4 pt-3 border-t">
          <p class="font-semibold text-gray-800">
            Total:
            <span class="text-primary">{{ formatPrice(payment.amount) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import { getStudentDashboard } from "@/services/studentDashboardService";
import api from "@/services/api";

const router = useRouter();
const isLoading = ref(true);
const paymentHistory = ref([]);

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getStatusClass = (status) => {
  const statusMap = {
    validated: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
  };
  return statusMap[status] || "bg-gray-100 text-gray-700";
};

const getStatusText = (status) => {
  const statusMap = {
    validated: "Berhasil",
    pending: "Menunggu Verifikasi",
    rejected: "Ditolak",
  };
  return statusMap[status] || status;
};

const getPackageStatusText = (status) => {
  const statusMap = {
    approved: "Disetujui & Aktif",
    pending: "Menunggu Persetujuan Admin",
    rejected: "Ditolak",
    expired: "Kadaluarsa",
  };
  return statusMap[status] || status;
};

const getProofUrl = (proofPath) => {
  if (!proofPath) return "";
  return `http://localhost:8000/storage/${proofPath}`;
};

const loadPaymentHistory = async () => {
  try {
    isLoading.value = true;
    console.log("🔍 Loading payment history from dashboard...");

    // Gunakan endpoint dashboard yang sudah bekerja
    const dashRes = await getStudentDashboard();
    const data = dashRes.data || dashRes;

    console.log("📦 Dashboard data:", data);

    // Transform packages menjadi payment history format
    const packages = data.packages || [];
    console.log("📦 Packages:", packages);

    paymentHistory.value = packages.map((pkg) => {
      console.log("💰 Processing package:", pkg);
      console.log("💰 Available fields:", Object.keys(pkg));

      // Cari field harga dari berbagai kemungkinan
      let amount = 0;

      // Coba berbagai field yang mungkin berisi harga
      if (pkg.amount) amount = pkg.amount;
      else if (pkg.price) amount = pkg.price;
      else if (pkg.package_price) amount = pkg.package_price;
      else if (pkg.total_price) amount = pkg.total_price;
      else if (pkg.total) amount = pkg.total;

      // Fallback: Mapping berdasarkan nama paket
      if (amount === 0) {
        const packageName = (pkg.package_name || "").toLowerCase();
        if (packageName.includes("6 bulan") || packageName.includes("6bulan")) {
          amount = 325000; // Prime 6 Bulan
        } else if (
          packageName.includes("1 tahun") ||
          packageName.includes("12 bulan")
        ) {
          amount = 504000; // Prime 1 Tahun
        }
      }

      console.log("💰 Final amount:", amount);

      return {
        id: pkg.id || Math.random(),
        package_name: pkg.package_name || "Paket Belajar",
        created_at:
          pkg.start_date || pkg.created_at || new Date().toISOString(),
        status: "validated", // Paket yang muncul di dashboard sudah validated
        package_status: pkg.status || "approved", // Status paket (approved/pending/rejected)
        order_id: `PKG-${pkg.id || "XXXX"}`,
        payment_method: pkg.payment_method || "Transfer Bank",
        payment_proof: pkg.payment_proof || null,
        amount: amount,
        start_date: pkg.start_date,
        expired_at: pkg.end_date,
        package_session: pkg.package_session,
        remaining_session: pkg.remaining_session,
        subject_name: pkg.subject_name,
        tutor_name: pkg.tutor_name,
      };
    });

    console.log("✅ Payment history transformed:", paymentHistory.value);
  } catch (error) {
    console.error("❌ Error loading payment history:", error);
    console.error("Error response:", error.response?.data);
    paymentHistory.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadPaymentHistory();
});
</script>

<style scoped>
.text-primary {
  color: #2ba9b2;
}
.bg-primary {
  background-color: #2ba9b2;
}
.bg-primary-dark {
  background-color: #228c92;
}
</style>
