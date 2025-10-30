<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-primary">Pembayaran Paket Belajar</h1>
      <p class="text-gray-600 text-sm mt-2">Selesaikan pembayaranmu untuk mulai belajar bersama tutor pilihanmu</p>
    </div>

    <!-- Konten utama -->
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-10">
      <!-- Paket -->
      <section>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Paket 4x Pertemuan</h2>
        <p class="text-2xl font-bold text-primary mb-2">Rp 200.000</p>
        <ul class="text-gray-700 text-sm space-y-2 list-disc pl-5">
          <li>Laporan perkembangan belajar rutin</li>
          <li>Pendampingan tugas dan PR sekolah</li>
          <li>Kuis interaktif untuk mengukur pemahaman</li>
          <li>Konsultasi via WhatsApp</li>
          <li>Soal-soal dan pembahasan</li>
          <li>4 sesi privat @90 menit</li>
          <li>Modul belajar eksklusif</li>
        </ul>
      </section>

      <!-- Pilih Bank -->
      <section>
        <h2 class="text-lg font-semibold text-gray-800 mb-3">Pilih Bank untuk Pembayaran</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label
            v-for="bank in banks"
            :key="bank.name"
            class="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:border-primary transition"
            :class="selectedBank === bank.name ? 'border-primary bg-primary/5' : 'border-gray-200'"
          >
            <input
              type="radio"
              name="bank"
              :value="bank.name"
              v-model="selectedBank"
              class="text-primary focus:ring-primary"
            />
            <img :src="bank.logo" alt="bank logo" class="w-10 h-10 object-contain" />
            <div>
              <p class="font-semibold text-gray-700">{{ bank.name }}</p>
              <p class="text-xs text-gray-500">{{ bank.account }}</p>
            </div>
          </label>
        </div>
      </section>

      <!-- Ringkasan -->
      <section>
        <h2 class="text-lg font-semibold text-gray-800 mb-3">Ringkasan Transaksi</h2>
        <div class="bg-gray-50 rounded-xl p-4 border text-sm text-gray-700">
          <div class="flex justify-between py-1">
            <span>Harga Paket</span>
            <span>Rp 200.000</span>
          </div>
          <div class="flex justify-between py-1 font-semibold border-t mt-2 pt-2">
            <span>Total Tagihan</span>
            <span class="text-primary">Rp 200.000</span>
          </div>
        </div>
      </section>

      <!-- Upload Bukti -->
      <section>
        <h2 class="text-lg font-semibold text-gray-800 mb-3">Unggah Bukti Transfer</h2>
        <div
          class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition"
        >
          <p class="text-gray-600 text-sm mb-3">Drag & drop atau klik untuk upload bukti pembayaran</p>
          <input type="file" @change="handleUpload" class="hidden" ref="fileInput" accept=".jpg,.png,.pdf" />
          <button
            @click="$refs.fileInput.click()"
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
      <div class="text-center pt-4">
        <button
          class="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Kirim Bukti Pembayaran
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedBank = ref("");
const fileName = ref("");

const banks = [
  {
    name: "Bank BCA",
    account: "1234567890 - a.n Bimbel Lazuardy",
    logo: "https://seeklogo.com/images/B/bca-bank-central-asia-logo-1C628FAD8A-seeklogo.com.png",
  },
  {
    name: "Bank BRI",
    account: "9876543210 - a.n Bimbel Lazuardy",
    logo: "https://seeklogo.com/images/B/bri-bank-rakyat-indonesia-logo-78D6CC05ED-seeklogo.com.png",
  },
  {
    name: "Bank BNI",
    account: "1239876540 - a.n Bimbel Lazuardy",
    logo: "https://seeklogo.com/images/B/bni-bank-negara-indonesia-logo-8FC6CF9B11-seeklogo.com.png",
  },
  {
    name: "Bank Mandiri",
    account: "4321567890 - a.n Bimbel Lazuardy",
    logo: "https://seeklogo.com/images/B/bank-mandiri-logo-7B60FEA6D3-seeklogo.com.png",
  },
];

const handleUpload = (event) => {
  const file = event.target.files[0];
  if (file) fileName.value = file.name;
};
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
