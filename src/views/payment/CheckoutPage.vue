<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-primary">Pembayaran Paket Belajar</h1>
      <p class="text-gray-600 text-sm mt-2">
        Selesaikan pembayaranmu untuk mulai belajar bersama Lazuardy
      </p>
    </div>

    <!-- Konten utama -->
    <div
      class="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-10"
    >
      <!-- Paket -->
      <section v-if="selectedPaket">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          {{ selectedPaket.nama }}
        </h2>
        <div class="flex items-baseline gap-3 mb-2">
          <p class="text-sm line-through text-gray-400">
            {{ formatPrice(selectedPaket.hargaAsli) }}
          </p>
          <p class="text-2xl font-bold text-primary">
            {{ formatPrice(selectedPaket.hargaDiskon) }}
          </p>
          <span
            v-if="selectedPaket.diskon"
            class="text-xs bg-pink-500 text-white px-2 py-1 rounded-full"
          >
            Diskon {{ selectedPaket.diskon }}%
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-4">{{ selectedPaket.deskripsi }}</p>
        <ul class="text-gray-700 text-sm space-y-2 list-disc pl-5">
          <li v-for="(fitur, index) in selectedPaket.fitur" :key="index">
            {{ fitur }}
          </li>
        </ul>
      </section>

      <!-- Pilih Bank -->
      <section>
        <h2 class="text-lg font-semibold text-gray-800 mb-3">
          Pilih Bank untuk Pembayaran
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            v-for="bank in banks"
            :key="bank.name"
            class="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:border-primary transition"
            :class="
              selectedBank === bank.name
                ? 'border-primary bg-primary/5'
                : 'border-gray-200'
            "
          >
            <input
              type="radio"
              name="bank"
              :value="bank.name"
              v-model="selectedBank"
              class="text-primary focus:ring-primary"
            />
            <img
              :src="bank.logo"
              alt="bank logo"
              class="w-10 h-10 object-contain"
            />
            <div>
              <p class="font-semibold text-gray-700">{{ bank.name }}</p>
              <p class="text-xs text-gray-500">{{ bank.account }}</p>
            </div>
          </label>
        </div>
      </section>

      <!-- Ringkasan -->
      <section v-if="selectedPaket">
        <h2 class="text-lg font-semibold text-gray-800 mb-3">
          Ringkasan Transaksi
        </h2>
        <div class="bg-gray-50 rounded-xl p-4 border text-sm text-gray-700">
          <div class="flex justify-between py-1">
            <span>Harga Paket</span>
            <span>{{ formatPrice(selectedPaket.hargaDiskon) }}</span>
          </div>
          <div
            class="flex justify-between py-1 font-semibold border-t mt-2 pt-2"
          >
            <span>Total Tagihan</span>
            <span class="text-primary">{{
              formatPrice(selectedPaket.hargaDiskon)
            }}</span>
          </div>
        </div>
      </section>

      <!-- Upload Bukti -->
      <section>
        <h2 class="text-lg font-semibold text-gray-800 mb-3">
          Unggah Bukti Transfer
        </h2>
        <div
          :class="[
            'border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary',
          ]"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleFileDrop"
          @click="$refs.fileInput.click()"
        >
          <p class="text-gray-600 text-sm mb-3">
            {{
              isDragging
                ? "📁 Lepaskan file di sini"
                : "Drag & drop atau klik untuk upload bukti pembayaran"
            }}
          </p>
          <input
            type="file"
            @change="handleUpload"
            class="hidden"
            ref="fileInput"
            accept=".jpg,.png,.pdf"
          />
          <button
            @click.stop="$refs.fileInput.click()"
            class="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg text-sm"
          >
            Pilih File
          </button>
          <p v-if="fileName" class="text-sm text-gray-700 mt-3">
            <span class="font-medium">File:</span> {{ fileName }}
          </p>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          Format diterima: JPG, PNG, atau PDF • Maksimal ukuran file 5 MB
        </p>
      </section>

      <!-- Tombol Kirim -->
      <div class="flex justify-center gap-4 pt-4">
        <button
          @click="handleBatal"
          :disabled="isSubmitting"
          class="border-2 border-primary text-primary hover:bg-primary/10 font-semibold py-3 px-8 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          @click="handleSubmit"
          :disabled="isSubmitting || !selectedBank || !uploadedFile"
          class="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? "Mengirim..." : "Kirim Bukti Pembayaran" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import LogoBCA from "@/assets/Bank_Central_Asia.svg";
import LogoBRI from "@/assets/Bank_BRI_2000.svg";
import LogoBNI from "@/assets/Bank_Negara_Indonesia_logo_(2004).svg";
import LogoMandiri from "@/assets/Bank_Mandiri_logo_2016.svg";
import { createOrder, uploadPaymentProof } from "@/services/paymentService";

const route = useRoute();
const router = useRouter();
const selectedBank = ref("");
const fileName = ref("");
const uploadedFile = ref(null);
const isSubmitting = ref(false);
const orderId = ref(null);
const isDragging = ref(false);

// Data paket dari PackageListPage
const paketList = [
  {
    id: 1,
    nama: "Prime 6 Bulan",
    hargaAsli: 930000,
    hargaDiskon: 325000,
    diskon: 65,
    image: "https://cdn-icons-png.flaticon.com/512/6213/6213907.png",
    deskripsi:
      "Belajar seru dan mudah paham bareng Lazuardy! Dapatkan akses video, rangkuman, dan bank soal selama 6 bulan.",
    fitur: [
      "Langganan Materi Belajar Premium 6 bulan",
      "Video Belajar, Rangkuman, Flash card, Kuis, Bank soal",
      "Akses tanpa batas ke semua materi",
      "Download video untuk ditonton tanpa kuota",
      "Latihan soal dengan pembahasan lengkap",
    ],
  },
  {
    id: 2,
    nama: "Prime 1 Tahun",
    hargaAsli: 1440000,
    hargaDiskon: 504000,
    diskon: 65,
    image: "https://cdn-icons-png.flaticon.com/512/6213/6213907.png",
    deskripsi:
      "Nikmati pembelajaran selama 12 bulan dengan akses penuh ke semua fitur belajar Lazuardy.",
    fitur: [
      "Langganan Materi Belajar Premium 12 bulan",
      "Materi lengkap dengan video dan kuis interaktif",
      "Akses Pegasus sepuasnya",
      "Download video untuk ditonton offline",
      "Lebih dari 100rb soal dengan pembahasan",
    ],
  },
];

// Get selected paket from query params
const selectedPaket = computed(() => {
  const id = route.query.id;
  return paketList.find((p) => p.id === Number(id)) || paketList[0];
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const banks = [
  {
    name: "Bank BCA",
    code: "bca", // ✅ Now matches backend enum
    account: "1234567890 - a.n Bimbel Lazuardy",
    logo: LogoBCA,
  },
  {
    name: "Bank BRI",
    code: "bri", // Matches backend enum
    account: "9876543210 - a.n Bimbel Lazuardy",
    logo: LogoBRI,
  },
  {
    name: "Bank BNI",
    code: "bni", // Matches backend enum
    account: "1239876540 - a.n Bimbel Lazuardy",
    logo: LogoBNI,
  },
  {
    name: "Bank Mandiri",
    code: "mandiri", // Matches backend enum
    account: "4321567890 - a.n Bimbel Lazuardy",
    logo: LogoMandiri,
  },
];

const processFile = (file) => {
  if (!file) return;

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    alert("Ukuran file terlalu besar. Maksimal 5MB");
    return;
  }

  // Validate file type
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];
  if (!validTypes.includes(file.type)) {
    alert("Format file tidak didukung. Gunakan JPG, PNG, atau PDF");
    return;
  }

  fileName.value = file.name;
  uploadedFile.value = file;
};

const handleUpload = (event) => {
  const file = event.target.files[0];
  processFile(file);
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  processFile(file);
};

const handleBatal = () => {
  router.push("/packages");
};

const handleSubmit = async () => {
  // Check authentication first
  const token = localStorage.getItem("auth_token");
  if (!token) {
    alert("Anda harus login terlebih dahulu untuk melakukan pembayaran.");
    router.push("/login");
    return;
  }

  // Validation
  if (!selectedBank.value) {
    alert("Silakan pilih bank terlebih dahulu");
    return;
  }

  if (!uploadedFile.value) {
    alert("Silakan upload bukti transfer terlebih dahulu");
    return;
  }

  try {
    isSubmitting.value = true;

    // Step 1: Create order if not exists
    if (!orderId.value) {
      console.log("Creating order...");

      // Get selected bank code from banks array
      const selectedBankObj = banks.find((b) => b.name === selectedBank.value);
      const paymentMethod = selectedBankObj ? selectedBankObj.code : "bri"; // Default to BRI if not found

      console.log("[CHECKOUT] Selected bank:", selectedBank.value);
      console.log("[CHECKOUT] Payment method:", paymentMethod);

      const orderResponse = await createOrder(
        selectedPaket.value.id,
        selectedPaket.value.hargaDiskon,
        paymentMethod // Send bank code (bri, bni, mandiri, etc)
      );

      if (orderResponse.status === "success" && orderResponse.order_id) {
        orderId.value = orderResponse.order_id;
        console.log("Order created successfully with ID:", orderId.value);
      } else {
        throw new Error("Gagal membuat order");
      }
    }

    // Step 2: Upload payment proof
    console.log("Uploading payment proof for order ID:", orderId.value);
    const uploadResponse = await uploadPaymentProof(
      orderId.value,
      uploadedFile.value
    );

    if (uploadResponse.status === "success") {
      alert(
        "Bukti pembayaran berhasil dikirim! Silakan tunggu verifikasi dari admin."
      );
      router.push("/student/dashboard");
    } else {
      throw new Error(
        uploadResponse.message || "Gagal mengirim bukti pembayaran"
      );
    }
  } catch (error) {
    console.error("Error submitting payment:", error);

    // Handle authentication errors
    if (error.status === 401) {
      alert(
        "Token tidak valid. Silakan logout dan login ulang untuk mendapatkan token baru."
      );
      // Clear invalid token
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      // Redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    // Handle other errors
    const errorMessage =
      error.message || "Gagal mengirim bukti pembayaran. Silakan coba lagi.";
    alert(errorMessage);
  } finally {
    isSubmitting.value = false;
  }
};

// Check authentication on page load
onMounted(() => {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    alert(
      "Anda harus login terlebih dahulu untuk mengakses halaman pembayaran."
    );
    router.push("/login");
  }
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
