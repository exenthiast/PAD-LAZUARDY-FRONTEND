<template>
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img src="../assets/logo.svg" alt="Bimbel Lazuardy"/>
      </div>

      <!-- Detail Pribadi Section -->
      <div class="mb-8">
        <h2 class="flex justify-center text-xl font-bold mb-6">Detail Pribadi</h2>

        <div class="space-y-4">
          <div>
            <label class="text-sm mb-2">Nama Lengkap</label>
            <input
              v-model="form.namaLengkap"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="text-sm mb-2">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="text-sm mb-2">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="text-sm mb-2">Jenis Kelamin</label>
            <input
              v-model="form.jenisKelamin"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="text-sm mb-2">Tanggal Lahir</label>
            <div class="grid grid-cols-3 gap-2">
              <select
                v-model.number="form.tanggalLahir.hari"
                class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              >
                <option :value="''">Hari</option>
                <option v-for="d in daysInmonth" :key="d" :value="d">
                  {{ d }}
                </option>
              </select>

              <select
                v-model.number="form.tanggalLahir.bulan"
                class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              >
                <option :value="''">Bulan</option>
                <option v-for="(m, i) in months" :key="i" :value="i + 1">
                  {{ m }}
                </option>
              </select>

              <select
                v-model.number="form.tanggalLahir.tahun"
                class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              >
                <option :value="''">Tahun</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-sm mb-2">Nomor Telepon</label>
            <input
              v-model="form.nomorTelepon"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="text-sm mb-2">Agama</label>
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
        <h2 class="flex justify-center text-xl font-bold mb-6">Detail Alamat</h2>

        <div class="space-y-4">
          <wilayah-dropdown />
          <div>
            <label class="text-sm mb-2">Alamat</label>
            <textarea
              v-model="form.alamat"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            ></textarea>
          </div>

          <div>
            <label class="text-sm mb-2">Pilih Role</label>
            <select
              v-model="form.role"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            >
              <option value=""></option>
              <option value="admin">Admin</option>
              <option value="siswa">Student</option>
              <option value="tutor">Teacher</option>
            </select>
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
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import WilayahDropdown from "@/components/WilayahDropdown.vue";

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

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

const daysInmonth = computed(() => {
  const b = Number(form.value.tanggalLahir?.bulan || 0);
  const t = Number(form.value.tanggalLahir?.tahun || 0);

  if (!b) return 31;
  if ([1, 3, 5, 7, 8, 10, 12].includes(b)) return 31;
  if ([4, 6, 9, 11].includes(b)) return 30;
  return isLeap(t) ? 29 : 28;
});

watch(
  () => [form.value.tanggalLahir?.bulan, form.value.tanggalLahir?.tahun],
  () => {
    const max = daysInmonth.value;
    if (Number(form.value.tanggalLahir.hari) > max) {
      form.value.tanggalLahir.hari = "";
    }
  },
  { immediate: true }
);

const handleNext = () => {
  // Validasi form bisa ditambahkan di sini
  console.log("Form data:", form.value);

  // Navigate ke halaman berikutnya (Data Lanjutan)
  router.push("/register-lanjutan");
};
</script>
