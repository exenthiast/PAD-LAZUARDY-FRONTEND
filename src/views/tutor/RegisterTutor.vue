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
        <img src="@/assets/logo.svg" alt="Bimbel Lazuardy" />
      </div>

      <!-- Detail Pribadi Section -->
      <div class="mb-8">
        <h2 class="flex justify-center text-xl font-bold mb-6">
          Detail Pribadi
        </h2>

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
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                aria-label="Toggle password visibility"
              >
                <EyeClosed v-if="showPassword" class="eye-icon" />
                <Eye v-else class="eye-icon" />
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="relative mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Konfirmasi Password</label
            >
            <div class="relative">
              <input
                v-model="form.passwordConfirm"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <p
              v-if="
                form.passwordConfirm && form.password !== form.passwordConfirm
              "
              class="text-red-600 text-sm mt-1"
            >
              Password tidak cocok.
            </p>
          </div>

          <div>
            <label class="text-sm mb-2">Jenis Kelamin</label>
            <select
              v-model="form.jenisKelamin"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
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
            <select
              v-model="form.agama"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            >
              <option value="">Pilih Agama</option>
              <option value="islam">Islam</option>
              <option value="kristen">Kristen</option>
              <option value="katolik">Katolik</option>
              <option value="hindu">Hindu</option>
              <option value="buddha">Buddha</option>
              <option value="konghucu">Konghucu</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Detail Alamat Section -->
      <div class="mb-8">
        <h2 class="flex justify-center text-xl font-bold mb-6">
          Detail Alamat
        </h2>

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
import { computed, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Eye } from "lucide-vue-next";
import { EyeClosed } from "lucide-vue-next";
import WilayahDropdown from "@/components/WilayahDropdown.vue";
import LocationPermission from "@/components/LocationPermission.vue";
import { useRegisterTutorStore } from "@/stores/registerStoreTutor";
import { storeToRefs } from "pinia";

const router = useRouter();
const showPassword = ref(false);
const showLocationmodal = ref(true);
const userLocation = ref(null);

// Use Pinia store so data persists across pages and refresh
const tutorStore = useRegisterTutorStore();
const { form } = storeToRefs(tutorStore);

onMounted(() => {
  tutorStore.loadFromStorage();
});
watch(form, () => tutorStore.saveToStorage(), { deep: true });

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
  userLocation.value = loc;
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
  // Basic validation: password match and length
  if ((form.value.password || "").length < 8) {
    alert("Password minimal 8 karakter");
    return;
  }

  if (form.value.password !== form.value.passwordConfirm) {
    alert("Password dan konfirmasi password tidak cocok");
    return;
  }

  // Validasi lain bisa ditambahkan di sini
  console.log("Form data:", form.value);

  // Navigate ke halaman berikutnya (Data Lanjutan)
  tutorStore.saveToStorage();
  router.push("/tutor/otp-tutor");
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
