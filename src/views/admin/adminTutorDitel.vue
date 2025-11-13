<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- White Card -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">Detail Tutor</h1>
          <button
            @click="goBack"
            class="text-sm px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 transition"
          >
            ← Kembali
          </button>
        </div>

        <!-- 1️⃣ Informasi Pribadi -->
        <section class="mb-10">
          <h2 class="text-lg font-medium text-gray-800 mb-3 border-b pb-1">
            Informasi Pribadi
          </h2>
          <div class="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <div>
              <p class="text-sm text-gray-500">Nama Lengkap</p>
              <p class="font-semibold">{{ tutor.namaLengkap }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-semibold">{{ tutor.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Jenis Kelamin</p>
              <p class="font-semibold capitalize">{{ tutor.jenisKelamin }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Tanggal Lahir</p>
              <p class="font-semibold">{{ tutor.tanggalLahir }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Nomor Telepon</p>
              <p class="font-semibold">{{ tutor.nomorTelepon }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Agama</p>
              <p class="font-semibold">{{ tutor.agama }}</p>
            </div>
          </div>
        </section>

        <!-- 2️⃣ Informasi Alamat -->
        <section class="mb-10">
          <h2 class="text-lg font-medium text-gray-800 mb-3 border-b pb-1">
            Informasi Alamat
          </h2>
          <div class="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <div>
              <p class="text-sm text-gray-500">Provinsi</p>
              <p class="font-semibold">{{ tutor.provinsi }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Kota / Kabupaten</p>
              <p class="font-semibold">{{ tutor.kota }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Kecamatan</p>
              <p class="font-semibold">{{ tutor.kecamatan }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Desa / Kelurahan</p>
              <p class="font-semibold">{{ tutor.desa }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-sm text-gray-500">Alamat Lengkap</p>
              <p class="font-semibold">{{ tutor.alamat }}</p>
            </div>
          </div>
        </section>

        <!-- 3️⃣ Data Akademik & Pengalaman -->
        <section class="mb-10">
          <h2 class="text-lg font-medium text-gray-800 mb-3 border-b pb-1">
            Data Akademik & Pengalaman
          </h2>
          <div class="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <div>
              <p class="text-sm text-gray-500">Keahlian</p>
              <p class="font-semibold">{{ tutor.keahlian }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Market Siswa</p>
              <p class="font-semibold uppercase">{{ tutor.marketSiswa }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Pengalaman</p>
              <p class="font-semibold">{{ tutor.pengalaman }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Skil Bahasa</p>
              <p class="font-semibold">{{ tutor.skilBahasa }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Organisasi</p>
              <p class="font-semibold">{{ tutor.organisasi }}</p>
            </div>
          </div>
        </section>

        <!-- 4️⃣ Dokumen -->
        <section class="mb-10">
          <h2 class="text-lg font-medium text-gray-800 mb-3 border-b pb-1">
            Dokumen Pendukung
          </h2>
          <div class="space-y-3">
            <div
              v-for="(link, label) in tutor.documents"
              :key="label"
              class="flex items-center justify-between border p-3 rounded-md"
            >
              <span class="font-medium capitalize text-gray-700">{{ label }}</span>
              <a
                :href="link"
                target="_blank"
                class="text-teal-600 text-sm hover:underline"
                >Lihat Dokumen</a
              >
            </div>
          </div>
        </section>

        <!-- 5️⃣ Status & Aksi -->
        <section class="flex justify-between items-center mt-10">
          <p class="text-sm text-gray-600">
            Status:
            <span
              :class="{
                'text-yellow-600 font-medium': tutor.status === 'menunggu',
                'text-green-600 font-medium': tutor.status === 'disetujui',
                'text-red-600 font-medium': tutor.status === 'ditolak',
              }"
            >
              {{ tutor.status }}
            </span>
          </p>
          <div class="space-x-3">
            <button
              @click="approveTutor"
              class="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition"
            >
              Setujui
            </button>
            <button
              @click="rejectTutor"
              class="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            >
              Tolak
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Simulasi data dari hasil gabungan form tahap 3 & 4
const tutor = reactive({
  namaLengkap: "Budi Santoso",
  email: "budi.tutor@example.com",
  jenisKelamin: "Laki-laki",
  tanggalLahir: "12 Mei 1998",
  nomorTelepon: "+6281234567890",
  agama: "Islam",
  provinsi: "DIY",
  kota: "Yogyakarta",
  kecamatan: "Depok",
  desa: "Caturtunggal",
  alamat: "Jl. Kaliurang KM 5, Sleman",
  keahlian: "Matematika",
  marketSiswa: "SMA",
  pengalaman: "3 Tahun Mengajar Les Privat SMA",
  skilBahasa: "Bahasa Inggris, Indonesia",
  organisasi: "Tutor SMA Indonesia",
  documents: {
    cv: "#",
    ktp: "#",
    ijazah: "#",
  },
  status: "menunggu",
});

function approveTutor() {
  tutor.status = "disetujui";
  alert("Tutor disetujui!");
}

function rejectTutor() {
  tutor.status = "ditolak";
  alert("Tutor ditolak!");
}

function goBack() {
  router.push("/admin/dashboard");
}
</script>
