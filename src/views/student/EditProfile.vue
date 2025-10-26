<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <!-- Header -->
    <div class="max-w-3xl mx-auto mb-6">
      <div class="flex items-center gap-4 mb-4">
        <button
          @click="handleBack"
          type="button"
          class="p-2 hover:bg-gray-100 rounded-lg transition"
          aria-label="Kembali"
        >
          <svg
            class="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-gray-800">Edit Profil</h1>
      </div>
    </div>

    <!-- Form Card -->
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8">
      <form @submit.prevent="handleSubmit">
        <!-- Detail Pribadi -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Detail Pribadi
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Lengkap</label
              >
              <input
                v-model="form.namaLengkap"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Jenis Kelamin</label
              >
              <select
                v-model="form.jenisKelamin"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tanggal Lahir</label
              >
              <input
                v-model="form.tanggalLahir"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >No. Telepon</label
              >
              <input
                v-model="form.phone"
                type="tel"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Agama</label
              >
              <select
                v-model="form.agama"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              >
                <option value="">Pilih Agama</option>
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Detail Alamat -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Detail Alamat
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Provinsi</label
              >
              <input
                v-model="form.alamat.provinsi"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Kota / Kabupaten</label
              >
              <input
                v-model="form.alamat.kota"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Kecamatan</label
              >
              <input
                v-model="form.alamat.kecamatan"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Desa / Kelurahan</label
              >
              <input
                v-model="form.alamat.desa"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Alamat Lengkap</label
              >
              <textarea
                v-model="form.alamat.detail"
                required
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Detail Sekolah -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Detail Sekolah
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Asal Sekolah</label
              >
              <input
                v-model="form.sekolah.asalSekolah"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Kelas</label
              >
              <select
                v-model="form.sekolah.kelas"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              >
                <option value="">Pilih Kelas</option>
                <option value="Kelas 7">Kelas 7</option>
                <option value="Kelas 8">Kelas 8</option>
                <option value="Kelas 9">Kelas 9</option>
                <option value="Kelas 10">Kelas 10</option>
                <option value="Kelas 11">Kelas 11</option>
                <option value="Kelas 12">Kelas 12</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Kontak Orangtua/Wali -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Kontak Orangtua/Wali
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Orangtua/Wali</label
              >
              <input
                v-model="form.orangtua.nama"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nomor Telepon Orangtua</label
              >
              <input
                v-model="form.orangtua.telepon"
                type="tel"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t"
        >
          <button
            @click.prevent="handleBack"
            type="button"
            class="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            class="w-full sm:w-auto bg-[#41a6c2] hover:bg-[#359299] text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? "Menyimpan..." : "Simpan Perubahan" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isSubmitting = ref(false);

// Form state - initialize with current data (in real app, fetch from API)
const form = ref({
  namaLengkap: "Alief Muhammad Latif",
  email: "alief@example.com",
  jenisKelamin: "Laki-laki",
  tanggalLahir: "2005-05-15", // format YYYY-MM-DD for input type="date"
  phone: "081234567890",
  agama: "Islam",
  alamat: {
    provinsi: "Jawa Barat",
    kota: "Bandung",
    kecamatan: "Coblong",
    desa: "Dago",
    detail: "Jl. Merdeka No. 45, RT 02 RW 05",
  },
  sekolah: {
    asalSekolah: "SMAN 1 Bandung",
    kelas: "Kelas 12",
  },
  orangtua: {
    nama: "Budi Santoso",
    telepon: "081987654321",
  },
});

// Form validation
const isFormValid = computed(() => {
  return (
    form.value.namaLengkap.trim() !== "" &&
    form.value.email.trim() !== "" &&
    form.value.jenisKelamin !== "" &&
    form.value.tanggalLahir !== "" &&
    form.value.phone.trim() !== "" &&
    form.value.agama !== "" &&
    form.value.alamat.provinsi.trim() !== "" &&
    form.value.alamat.kota.trim() !== "" &&
    form.value.alamat.kecamatan.trim() !== "" &&
    form.value.alamat.desa.trim() !== "" &&
    form.value.alamat.detail.trim() !== "" &&
    form.value.sekolah.asalSekolah.trim() !== "" &&
    form.value.sekolah.kelas !== "" &&
    form.value.orangtua.nama.trim() !== "" &&
    form.value.orangtua.telepon.trim() !== ""
  );
});

// In real app, fetch current profile data from API
const fetchProfileData = async () => {
  // TODO: Replace with actual API call
  // const response = await api.get('/api/student/profile');
  // form.value = response.data;
};

const handleSubmit = async () => {
  if (!isFormValid.value) {
    alert("Mohon lengkapi semua field!");
    return;
  }

  isSubmitting.value = true;
  try {
    // TODO: Replace with actual API call
    // await api.put('/api/student/profile', form.value);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Profil berhasil diperbarui!");
    router.push("/student/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Gagal memperbarui profil. Silakan coba lagi.");
  } finally {
    isSubmitting.value = false;
  }
};

const handleBack = () => {
  router.push("/student/profile-student");
};

onMounted(() => {
  fetchProfileData();
});
</script>

<style scoped>
/* Additional responsive styles if needed */
@media (max-width: 640px) {
  .edit-profile-card {
    padding: 1.5rem;
  }
}
</style>
