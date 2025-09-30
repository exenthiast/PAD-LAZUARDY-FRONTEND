<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center px-4 md:px-0 container mx-auto"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto md:mx-auto"
    >
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img src="../assets/logo.svg" alt="Bimbel Lazuardy" class="h-20" />
      </div>

      <!-- Detail Pribadi Section -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-6">Detail Pribadi</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm mb-2">Nama Lengkap</label>
            <input
              v-model="form.namaLengkap"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Jenis Kelamin</label>
            <input
              v-model="form.jenisKelamin"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Tanggal Lahir</label>
            <div class="grid grid-cols-3 gap-2">
              <select
                v-model="form.tanggalLahir.hari"
                class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              >
                <option value="">Hari</option>
                <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
              </select>
              <select
                v-model="form.tanggalLahir.bulan"
                class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              >
                <option value="">Bulan</option>
                <option v-for="(m, i) in months" :key="i" :value="i + 1">
                  {{ m }}
                </option>
              </select>
              <input
                v-model="form.tanggalLahir.tahun"
                type="text"
                placeholder="Tahun"
                class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm mb-2">Nomor Telepon</label>
            <input
              v-model="form.nomorTelepon"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Agama</label>
            <input
              v-model="form.agama"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      <!-- Detail Alamat Section -->
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-6">Detail Alamat</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm mb-2">Provinsi</label>
            <input
              v-model="form.provinsi"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Kota / Kabupaten</label>
            <input
              v-model="form.kota"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Kecamatan</label>
            <input
              v-model="form.kecamatan"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Desa / Kelurahan</label>
            <input
              v-model="form.desa"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Alamat</label>
            <textarea
              v-model="form.alamat"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm mb-2">Pilih Role</label>
            <input
              v-model="form.role"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="flex justify-end">
        <button
          @click="handleNext"
          class="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  namaLengkap: "",
  email: "",
  password: "",
  jenisKelamin: "",
  tanggalLahir: {
    hari: "",
    bulan: "",
    tahun: "",
  },
  nomorTelepon: "",
  agama: "",
  provinsi: "",
  kota: "",
  kecamatan: "",
  desa: "",
  alamat: "",
  role: "",
});

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const handleNext = () => {
  // Validasi form bisa ditambahkan di sini
  console.log("Form data:", form.value);

  // Navigate ke halaman berikutnya (Data Lanjutan)
  router.push("/register-lanjutan");
};
</script>
