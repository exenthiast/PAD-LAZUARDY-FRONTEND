<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
<section class="bg-teal-600 text-white py-12 text-center shadow-inner">
  <h1 class="text-3xl font-bold tracking-wide mb-2">Paket Belajar Lazuardy</h1>
  <div class="w-24 h-1 bg-white mx-auto rounded-full mb-3"></div>
  <p class="text-white/80 max-w-xl mx-auto">
    Tingkatkan kemampuanmu dengan pilihan paket belajar sesuai durasi dan kebutuhan.
  </p>
</section>





    <!-- Paket Section -->
    <section class="max-w-3xl mx-auto py-12 px-4">
      <h2 class="text-2xl font-semibold mb-8 text-center text-primary">
        Paket Belajar
      </h2>

      <div
        v-for="paket in paketList"
        :key="paket.id"
        class="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100 relative overflow-hidden"
      >
        <!-- Label Diskon -->
        <div
          v-if="paket.diskon"
          class="absolute top-4 right-4 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow"
        >
          Diskon {{ paket.diskon }}%
        </div>

        <!-- Header Paket -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <img
            :src="paket.image"
            alt="icon paket"
            class="w-16 h-16 object-contain"
          />
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-800">{{ paket.nama }}</h3>
            <p class="text-sm line-through text-gray-400">{{ formatPrice(paket.hargaAsli) }}</p>
            <p class="text-xl font-bold text-primary">{{ formatPrice(paket.hargaDiskon) }}</p>
          </div>
        </div>

        <!-- Deskripsi -->
        <p class="text-gray-700 text-sm mb-4">
          {{ paket.deskripsi }}
        </p>

        <!-- Fitur -->
        <ul class="text-sm text-gray-700 space-y-2 mb-6">
          <li v-for="(fitur, index) in paket.fitur" :key="index" class="flex items-start gap-2">
            <span class="text-green-500 mt-0.5">✔</span>
            <span>{{ fitur }}</span>
          </li>
        </ul>

        <!-- Tombol -->
        <div class="flex flex-col sm:flex-row justify-end gap-3">
          <button
            class="border border-primary text-primary px-5 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition"
          >
            Selengkapnya
          </button>
          <button
            class="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-dark transition"
          >
            Beli
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
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

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};
</script>

<style scoped>
:root {
  --primary: #2ba9b2;
  --primary-dark: #228c92;
  --secondary: #66d6c3;
}

.bg-primary {
  background-color: var(--primary);
}
.text-primary {
  color: var(--primary);
}
.bg-primary-dark {
  background-color: var(--primary-dark);
}
</style>
