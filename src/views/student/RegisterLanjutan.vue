<template>
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <h1 class="text-2xl font-bold text-center mb-8">Data Lanjutan</h1>

      <div class="space-y-6">
        <div>
          <label class="block text-sm mb-2">Asal Sekolah</label>
          <input v-model="form.asalSekolah" class="input" />
        </div>

        <div>
          <label class="block text-sm mb-2">Kelas</label>
          <select v-model="form.kelas" class="input">
            <option value="">Pilih Kelas</option>
            <option v-for="k in [7,8,9,10,11,12]" :key="k" :value="k">Kelas {{ k }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm mb-2">Nama Orang Tua/Wali</label>
          <input v-model="form.namaOrangtua" class="input" />
        </div>

        <div>
          <label class="block text-sm mb-2">Nomor Telepon Orang Tua/Wali</label>
          <input v-model="form.nomorTeleponOrangtua" class="input" />
        </div>
      </div>

      <div class="flex justify-between mt-8">
        <button @click="router.push('/student/register-otp')" class="btn-outline">Kembali</button>
        <button @click="handleSubmit" :disabled="busy" class="btn-primary">
          {{ busy ? "Menyimpan..." : "Selesai" }}
        </button>
      </div>

      <p v-if="msg" class="text-green-600 text-center mt-4">{{ msg }}</p>
      <p v-if="err" class="text-red-500 text-center mt-4">{{ err }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const router = useRouter();
const busy = ref(false);
const msg = ref("");
const err = ref("");

const form = ref({
  asalSekolah: "",
  kelas: "",
  namaOrangtua: "",
  nomorTeleponOrangtua: "",
});

const handleSubmit = async () => {
  try {
    busy.value = true;
    const token = localStorage.getItem("auth_token"); // dari verify OTP
    const res = await api.post(
      "/register/finalize",
      { ...form.value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    msg.value = res.data.message || "Data lanjutan berhasil disimpan!";
    setTimeout(() => router.push("/login"), 1500);
  } catch (e) {
    err.value = e.response?.data?.message || "Gagal menyimpan data.";
  } finally {
    busy.value = false;
  }
};
</script>

<style scoped>
.input { @apply w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500; }
.btn-primary { @apply bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors; }
.btn-outline { @apply border border-teal-500 text-teal-500 hover:bg-teal-50 px-8 py-3 rounded-lg font-medium transition-colors; }
</style>
