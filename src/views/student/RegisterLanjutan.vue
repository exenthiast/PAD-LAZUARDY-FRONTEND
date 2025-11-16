<template>
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <h1 class="text-2xl font-bold text-center mb-8 text-[#41a6c2]">
        Data Lanjutan
      </h1>

      <!-- Detail Sekolah Section -->
      <div class="border border-gray-300 rounded-lg p-6 mb-6">
        <h2 class="text-lg font-bold mb-4">Detail Sekolah</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm mb-2">Asal Sekolah</label>
            <input
              v-model="form.asalSekolah"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#41a6c2]"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Kelas</label>
            <select
              v-model="form.kelas"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#41a6c2]"
            >
              <option value="">Pilih Kelas</option>
              <option value="7">Kelas 7</option>
              <option value="8">Kelas 8</option>
              <option value="9">Kelas 9</option>
              <option value="10">Kelas 10</option>
              <option value="11">Kelas 11</option>
              <option value="12">Kelas 12</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Kontak Orangtua/Wali Section -->
      <div class="border border-gray-300 rounded-lg p-6 mb-6">
        <h2 class="text-lg font-bold mb-4">Kontak Orangtua/Wali</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm mb-2">Nama Orangtua/Wali</label>
            <input
              v-model="form.namaOrangtua"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#41a6c2]"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Nomor Telepon Orangtua</label>
            <input
              v-model="form.nomorTeleponOrangtua"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#41a6c2]"
            />
          </div>
        </div>
      </div>

      <!-- Error Alert -->
      <div
        v-if="err"
        class="rounded-lg border border-red-300 bg-red-50 text-red-700 px-4 py-3 mb-6"
        role="alert"
        aria-live="polite"
      >
        {{ err }}
      </div>

      <!-- Buttons -->
      <div class="flex justify-between">
        <button
          @click="handleBack"
          class="border border-[#41a6c2] text-[#41a6c2] hover:bg-[#41a6c2]/10 px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Kembali
        </button>
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="bg-[#41a6c2] hover:bg-[#2e8694] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          {{ loading ? "Menyimpan..." : "Kirim" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { updateStudentRole } from "@/services/authRegister";
import { useRegisterStore } from "@/stores/registerStore";
import { storeToRefs } from "pinia";

const router = useRouter();

// Optional next path after submit (default to /login)
const props = defineProps({
  nextPath: { type: String, default: "/student/dashboard" },
});

// Simple error holder and verification flag
const err = ref("");
const loading = ref(false);

const form = ref({
  asalSekolah: "",
  kelas: "",
  namaOrangtua: "",
  nomorTeleponOrangtua: "",
});

const regStore = useRegisterStore();
const { form: baseForm } = storeToRefs(regStore);

// All fields must be non-empty
const verified = computed(() =>
  Object.values(form.value).every((v) => String(v ?? "").trim() !== "")
);

const handleBack = () => {
  router.push("/student/register-otp");
};

const handleSubmit = async () => {
  if (!verified.value) {
    err.value = "Harap Diisikan Semua Field!";
    return;
  }

  const token = localStorage.getItem("auth_token");
  if (!token) {
    err.value = "Sesi Berakhir, Silahkan login lalu lanjutkan.";
    router.push("/login");
    return;
  }
  loading.value = true;
  err.value = "";
  try {
    const payload = {
      ...baseForm.value,
      asal_sekolah: form.value.asalSekolah,
      kelas: form.value.kelas,
      nama_orangtua: form.value.namaOrangtua,
      nomor_telepon_orangtua: form.value.nomorTeleponOrangtua,
    };
    await updateStudentRole(payload);
    if (regStore.reset) regStore.reset();
    router.push(props.nextPath);
  } catch (e) {
    err.value = e?.response?.data?.message || "Gagal menyimpan data lanjutan.";
  } finally {
    loading.value = false;
  }
};
</script>
