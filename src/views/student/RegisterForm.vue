<template>
  <location-permission
    v-model="showLocationmodal"
    @granted="handleGranted"
    @denied="handleDenied"
  />
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <div class="flex justify-center mb-8">
        <img src="@/assets/logo.svg" alt="Bimbel Lazuardy" />
      </div>

      <h2 class="flex justify-center text-xl font-bold mb-6">Detail Pribadi</h2>
      <!-- Form Inputs -->
      <div class="space-y-4">
        <input v-model="form.namaLengkap" placeholder="Nama Lengkap" class="input" />
        <input v-model="form.email" type="email" placeholder="Email" class="input" />
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          class="input"
        />
        <button type="button" @click="showPassword = !showPassword" class="text-sm text-teal-600">
          {{ showPassword ? "Sembunyikan" : "Tampilkan" }} Password
        </button>

        <input v-model="form.jenisKelamin" placeholder="Jenis Kelamin" class="input" />
        <div class="flex gap-2">
          <select v-model.number="form.tanggalLahir.hari" class="input w-1/3">
            <option value="">Hari</option>
            <option v-for="d in daysInmonth" :key="d" :value="d">{{ d }}</option>
          </select>
          <select v-model.number="form.tanggalLahir.bulan" class="input w-1/3">
            <option value="">Bulan</option>
            <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
          </select>
          <select v-model.number="form.tanggalLahir.tahun" class="input w-1/3">
            <option value="">Tahun</option>
            <option v-for="y in years" :key="y">{{ y }}</option>
          </select>
        </div>

        <input v-model="form.nomorTelepon" type="tel" placeholder="Nomor Telepon" class="input" />
        <input v-model="form.agama" placeholder="Agama" class="input" />
        <wilayah-dropdown />
        <textarea v-model="form.alamat" rows="3" placeholder="Alamat" class="input"></textarea>

        <select v-model="form.role" class="input">
          <option value="student">Student</option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="flex justify-between items-center mt-8">
        <button @click="router.push('/login')" class="btn-outline">Kembali</button>
        <button @click="handleNext" :disabled="loading" class="btn-primary">
          {{ loading ? "Mengirim..." : "Selanjutnya" }}
        </button>
      </div>

      <p v-if="errorMsg" class="text-red-500 text-center mt-4">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-600 text-center mt-4">{{ successMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import WilayahDropdown from "@/components/WilayahDropdown.vue";
import LocationPermission from "@/components/LocationPermission.vue";

const router = useRouter();
const showPassword = ref(false);
const showLocationmodal = ref(true);
const userLocation = ref(null);
const loading = ref(false);
const successMsg = ref("");
const errorMsg = ref("");

const form = ref({
  namaLengkap: "",
  email: "",
  password: "",
  jenisKelamin: "",
  tanggalLahir: { hari: "", bulan: "", tahun: "" },
  nomorTelepon: "",
  agama: "",
  alamat: "",
  role: "student",
});

const months = [
  "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

const daysInmonth = computed(() => {
  const b = form.value.tanggalLahir.bulan;
  const t = form.value.tanggalLahir.tahun;
  if (!b) return 31;
  if ([1,3,5,7,8,10,12].includes(b)) return 31;
  if ([4,6,9,11].includes(b)) return 30;
  return isLeap(t) ? 29 : 28;
});

function handleGranted(loc) {
  userLocation.value = loc;
}
function handleDenied() {}

const handleNext = async () => {
  loading.value = true;
  errorMsg.value = "";
  successMsg.value = "";

  try {
    const payload = {
      name: form.value.namaLengkap,
      email: form.value.email,
      password: form.value.password,
      gender: form.value.jenisKelamin,
      phone: form.value.nomorTelepon,
      religion: form.value.agama,
      address: form.value.alamat,
      role: form.value.role,
      birth_date: `${form.value.tanggalLahir.tahun}-${String(form.value.tanggalLahir.bulan).padStart(2, "0")}-${String(form.value.tanggalLahir.hari).padStart(2, "0")}`,
    };

    const res = await api.post("/register", payload);

    localStorage.setItem("temp_token", res.data.temp_token);
    successMsg.value = "Registrasi berhasil! Silakan verifikasi OTP di email Anda.";
    setTimeout(() => router.push("/student/register-otp"), 1500);
  } catch (err) {
    console.error(err);
    errorMsg.value = err.response?.data?.message || "Gagal melakukan registrasi.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.input { @apply w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500; }
.btn-primary { @apply bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors; }
.btn-outline { @apply border border-teal-500 text-teal-500 hover:bg-teal-50 px-8 py-3 rounded-lg font-medium transition-colors; }
</style>
