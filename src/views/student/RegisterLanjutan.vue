<template>
  <div class="container-center bg-gray-100">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <h1 class="text-2xl font-bold text-center mb-8">Data Lanjutan</h1>

      <!-- Detail Sekolah Section -->
      <div class="border border-gray-300 rounded-lg p-6 mb-6">
        <h2 class="text-lg font-bold mb-4">Detail Sekolah</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm mb-2">Asal Sekolah</label>
            <input
              v-model="form.asalSekolah"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Kelas</label>
            <select
              v-model="form.kelas"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
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
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm mb-2">Nomo Telepon Orangtua</label>
            <input
              v-model="form.nomorTeleponOrangtua"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            />
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
          @click="handleSubmit"
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
  asalSekolah: "",
  kelas: "",
  namaOrangtua: "",
  nomorTeleponOrangtua: "",
});

const handleBack = () => {
  router.push("/register");
};

const handleSubmit = () => {
  if (!verified.value) {
    err.value = "Harap Diisikan Semua Field!";
    return;
  }

    alert("Berhasil Registrasi!");

  // Redirect ke halaman berikutnya
  router.push(props.nextPath || "/login");
};
</script>
