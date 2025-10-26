<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-[#41a6c2] py-12 px-4 text-center text-white mb-6">
      <img
        src="https://picsum.photos/200/300"
        class="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-lg gap-2"
        alt="Profile Photo"
      />
    </div>

    <!-- Card Data Lengkap -->
    <div
      class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8 -mt-10 relative z-10"
    >
      <!-- Detail Pribadi -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-4 border-b pb-2">
          <h3 class="text-xl font-semibold text-[#41a6c2]">Detail Pribadi</h3>
          <button
            @click="editProfile"
            type="button"
            class="bg-[#41a6c2] hover:bg-[#359299] text-white px-6 py-2 rounded-lg font-medium transition text-sm"
          >
            Edit Profil
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-500 text-sm">Nama Lengkap</p>
            <p class="font-medium text-gray-800">{{ student.namaLengkap }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Email</p>
            <p class="font-medium text-gray-800">{{ student.email }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Jenis Kelamin</p>
            <p class="font-medium text-gray-800">{{ student.jenisKelamin }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Tanggal Lahir</p>
            <p class="font-medium text-gray-800">{{ student.tanggalLahir }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">No. Telepon</p>
            <p class="font-medium text-gray-800">{{ student.phone }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Agama</p>
            <p class="font-medium text-gray-800">{{ student.agama }}</p>
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
            <p class="text-gray-500 text-sm">Provinsi</p>
            <p class="font-medium text-gray-800">
              {{ student.alamat.provinsi }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Kota / Kabupaten</p>
            <p class="font-medium text-gray-800">{{ student.alamat.kota }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Kecamatan</p>
            <p class="font-medium text-gray-800">
              {{ student.alamat.kecamatan }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Desa / Kelurahan</p>
            <p class="font-medium text-gray-800">{{ student.alamat.desa }}</p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-gray-500 text-sm">Alamat Lengkap</p>
            <p class="font-medium text-gray-800">{{ student.alamat.detail }}</p>
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
            <p class="text-gray-500 text-sm">Asal Sekolah</p>
            <p class="font-medium text-gray-800">
              {{ student.sekolah.asalSekolah }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Kelas</p>
            <p class="font-medium text-gray-800">{{ student.sekolah.kelas }}</p>
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
            <p class="text-gray-500 text-sm">Nama Orangtua/Wali</p>
            <p class="font-medium text-gray-800">{{ student.orangtua.nama }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Nomor Telepon Orangtua</p>
            <p class="font-medium text-gray-800">
              {{ student.orangtua.telepon }}
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t"
      >
        <button
          @click="handleBack"
          type="button"
          class="w-full sm:w-auto bg-[#41a6c2] hover:bg-[#359299] text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Kembali
        </button>
        <button
          @click="logout"
          type="button"
          class="w-full sm:w-auto border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- Card Progress Belajar -->
    <div
      class="max-w-3xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6 sm:p-8"
    >
      <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
        Progress Belajar
      </h3>
      <div class="flex justify-between text-gray-600 mb-3">
        <p>Kemajuan Belajar</p>
        <p class="font-semibold text-[#41a6c2]">{{ student.progress }}%</p>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="bg-[#41a6c2] h-3 rounded-full transition-all"
          :style="{ width: student.progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const student = ref({
  namaLengkap: "Alief Muhammad Latif",
  email: "alief@example.com",
  jenisKelamin: "Laki-laki",
  tanggalLahir: "15 Mei 2005",
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
  progress: 75,
});

const editProfile = () => {
  console.log("Edit profil diklik");
  router.push("/student/profile/edit");
};

const handleBack = () => {
  router.push("/student/dashboard");
};

const logout = () => {
  console.log("Logout diklik");
  localStorage.removeItem("auth_token");
  router.push("/login");
};
</script>

<style scoped>
/* Responsif tambahan */
@media (max-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}
</style>
