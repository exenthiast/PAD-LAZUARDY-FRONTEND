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
              <option value="1">Kelas 1 SD</option>
              <option value="2">Kelas 2 SD</option>
              <option value="3">Kelas 3 SD</option>
              <option value="4">Kelas 4 SD</option>
              <option value="5">Kelas 5 SD</option>
              <option value="6">Kelas 6 SD</option>
              <option value="7">Kelas 7 SMP</option>
              <option value="8">Kelas 8 SMP</option>
              <option value="9">Kelas 9 SMP</option>
              <option value="10">Kelas 10 SMA</option>
              <option value="11">Kelas 11 SMA</option>
              <option value="12">Kelas 12 SMA</option>
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

  loading.value = true;
  err.value = "";
  try {
    // Transform data dari format frontend ke format backend
    const dateOfBirth = `${baseForm.value.tanggalLahir.tahun}-${String(
      baseForm.value.tanggalLahir.bulan
    ).padStart(2, "0")}-${String(baseForm.value.tanggalLahir.hari).padStart(
      2,
      "0"
    )}`;

    const payload = {
      // Data dari form pertama (baseForm)
      email: baseForm.value.email,
      password: baseForm.value.password,
      name: baseForm.value.namaLengkap,
      gender: baseForm.value.jenisKelamin,
      date_of_birth: dateOfBirth,
      telephone_number: baseForm.value.nomorTelepon,
      religion: baseForm.value.agama,

      // Alamat dari form pertama
      province: baseForm.value.provinsi || "",
      regency: baseForm.value.kabupaten || "",
      district: baseForm.value.kecamatan || "",
      subdistrict: baseForm.value.kelurahan || "",
      street: baseForm.value.alamat || "",

      // Location dari form pertama (jika ada)
      latitude: baseForm.value.location?.lat || -7.3297,
      longitude: baseForm.value.location?.lng || 112.7814,

      // Data dari form lanjutan
      school: form.value.asalSekolah,
      class_id: parseInt(form.value.kelas) || null,
      curriculum_id: null, // Belum ada di form, set null dulu
      parent: form.value.namaOrangtua,
      parent_telephone_number: form.value.nomorTeleponOrangtua,
    };

    console.log("Sending student registration payload:", payload);

    const result = await updateStudentRole(payload);
    console.log("Registration result:", result);

    // Simpan token dari response
    if (result.token) {
      localStorage.setItem("auth_token", result.token);
      localStorage.setItem(
        "auth_user",
        JSON.stringify(result.user || { email: baseForm.value.email })
      );
    }

    // Clear register data dari store
    if (regStore.reset) regStore.reset();
    localStorage.removeItem("register:email");
    localStorage.removeItem("register:temp_token");
    localStorage.removeItem("register:form");

    alert("Registrasi berhasil! Selamat datang.");
    router.push(props.nextPath);
  } catch (e) {
    console.error("Registration error:", e);
    err.value =
      e?.response?.data?.message ||
      e.message ||
      "Gagal menyimpan data lanjutan.";
  } finally {
    loading.value = false;
  }
};
</script>
