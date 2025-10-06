<template>
  <location-permission
    v-model="showLocationmodal"
    @granted="handleGranted"
    @denied="handleDenied"
    />
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img src="@/assets/logo.svg" alt="Bimbel Lazuardy"/>
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

          <div class="relative mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
            >
              <svg
                v-if="!showPassword"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
            </button>
          </div>
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
              placeholder="+62..."
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
              <option value="siswa">Student</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="flex justify-between">
        <button
          @click="handleBack"
          class="border border-teal-500 text-teal-500 hover:bg-teal-50 px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Kembali
        </button>
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
import LocationPermission from "@/components/LocationPermission.vue";

const router = useRouter();
const showPassword = ref(false);
const showLocationmodal = ref(true);
const userLocation = ref(null);
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

function handleGranted(loc) {
  userLocation.value = loc
  // simpan ke store, atau panggil API tutor-terdekat
  // contoh: fetch(`/api/tutors/nearby?lat=${loc.lat}&lng=${loc.lng}`)
}

function handleDenied() {
  // opsional: simpan preferensi user agar modal tidak muncul lagi
  // localStorage.setItem('loc-permission', 'denied')
}

const handleBack = () => {
  router.push("/login");
};

const handleNext = () => {
  // Validasi form bisa ditambahkan di sini
  console.log("Form data:", form.value);

  // Navigate ke halaman berikutnya (Data Lanjutan)
  router.push("/register-otp");
};
</script>

<style>
.password-group {
  position: relative;
}
.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.eye-icon {
  width: 24px;
  height: 24px;
  fill: #999;
  transition: fill 0.2s;
}

.password-toggle:hover .eye-icon {
  fill: #666;
}
</style>
