<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-primary">Riwayat Pembayaran</h1>
      <p class="text-gray-600 text-sm mt-2">
        Lihat daftar transaksi dan status pembayaran kamu di bawah ini
      </p>
    </div>

    <!-- List Transaksi -->
    <div class="max-w-3xl mx-auto space-y-6 px-4">
      <div
        v-for="(trx, index) in transaksi"
        :key="index"
        class="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition p-6"
      >
        <!-- Header transaksi -->
        <div class="flex justify-between items-center mb-3">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">{{ trx.namaPaket }}</h2>
            <p class="text-sm text-gray-500">{{ trx.tanggal }}</p>
          </div>
          <span
            class="text-xs font-semibold px-3 py-1 rounded-full"
            :class="{
              'bg-green-100 text-green-700': trx.status === 'Berhasil',
              'bg-yellow-100 text-yellow-700': trx.status === 'Menunggu',
              'bg-red-100 text-red-700': trx.status === 'Gagal',
            }"
          >
            {{ trx.status }}
          </span>
        </div>

        <!-- Detail transaksi -->
        <div class="text-sm text-gray-700 space-y-1">
          <p><span class="font-medium">Metode:</span> {{ trx.metode }}</p>
          <p><span class="font-medium">Kode Transaksi:</span> {{ trx.kode }}</p>
        </div>

        <div class="flex justify-between items-center mt-4 pt-3 border-t">
          <p class="font-semibold text-gray-800">Total: <span class="text-primary">Rp {{ trx.total }}</span></p>
          <button
            class="text-sm bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const transaksi = [
  {
    namaPaket: "Paket 4x Pertemuan",
    tanggal: "28 Oktober 2025",
    metode: "Transfer Bank BCA",
    kode: "TRX20251028-001",
    total: "200.000",
    status: "Berhasil",
  },
  {
    namaPaket: "Paket 8x Pertemuan",
    tanggal: "15 Oktober 2025",
    metode: "Transfer Bank Mandiri",
    kode: "TRX20251015-002",
    total: "385.000",
    status: "Menunggu",
  },
  {
    namaPaket: "Paket 1 Bulan Intensif",
    tanggal: "30 September 2025",
    metode: "Transfer Bank BNI",
    kode: "TRX20250930-003",
    total: "480.000",
    status: "Gagal",
  },
];
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
