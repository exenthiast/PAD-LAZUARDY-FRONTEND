<template>
  <div class="min-h-screen bg-white pb-20">
    <NavbarTutor/>
    <!-- Header -->
    <div class="bg-[#41a6c2] text-white py-12 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center space-x-4">
          <button
            @click="goBack"
            class="hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <ArrowLeft class="w-6 h-6 text-white" />
          </button>
          <h1 class="text-xl font-semibold">Profil Siswa</h1>
        </div>
      </div>
    </div>

    <!-- Profile Photo -->
    <div class="flex justify-center -mt-12 mb-6">
      <div
        class="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200"
      >
        <img
          v-if="student"
          :src="student.photo"
          :alt="student.nama"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Detail Card -->
    <div v-if="student" class="max-w-4xl mx-auto px-6">
      <div class="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <!-- Detail Pribadi -->
        <div>
          <h2 class="text-[#41a6c2] text-lg font-semibold mb-4">
            Detail Pribadi
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">Nama Lengkap</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.nama }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Jenis Kelamin</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.jenisKelamin }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Tanggal Lahir</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.tanggalLahir }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">No. Telepon</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.telepon }}
              </p>
            </div>
          </div>
        </div>

        <!-- Detail Alamat -->
        <div>
          <h2 class="text-[#41a6c2] text-lg font-semibold mb-4">
            Detail Alamat
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <p class="text-xs text-gray-500 mb-1">Alamat Lengkap</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.alamat.detail }}
              </p>
            </div>
          </div>

          <!-- Map -->
          <div class="mt-4 w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              :src="`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${student.alamat.detail}`"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              class="w-full h-full"
            >
            </iframe>
            <!-- Fallback jika tidak ada API key -->
            <div class="flex items-center justify-center h-full bg-gray-100">
              <div class="text-center text-gray-500">
                <svg
                  class="w-12 h-12 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p class="text-sm">{{ student.alamat.detail }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Detail Sekolah -->
        <div>
          <h2 class="text-[#41a6c2] text-lg font-semibold mb-4">
            Detail Sekolah
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">Asal Sekolah</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.sekolah.nama }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Kelas</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.sekolah.kelas }}
              </p>
            </div>
          </div>
        </div>

        <!-- Kontak Orang Tua/Wali -->
        <div>
          <h2 class="text-[#41a6c2] text-lg font-semibold mb-4">
            Kontak Orang tua/Wali
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500 mb-1">Nama Orang tua/Wali</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.namaOrangTua }}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Nomor Handphone</p>
              <p class="text-sm font-medium text-gray-800">
                {{ student.teleponOrangTua }}
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
          <button
            @click="acceptStudent"
            class="flex-1 bg-[#41a6c2] hover:bg-[#358a9f] text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Terima
          </button>
          <button
            @click="rejectStudent"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Tolak
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavbarTutor from "../../components/layout/navbar-tutor.vue";

const router = useRouter();
const route = useRoute();

// All students data - in real app, this would come from API
const allStudents = [
  {
    id: 1,
    nama: "Muhammad Alief",
    email: "alief@example.com",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "12-5-2006",
    telepon: "08225552334",
    agama: "Islam",
    photo: "https://i.pravatar.cc/300?img=15",
    alamat: {
      provinsi: "Jawa Barat",
      kota: "Bekasi",
      kecamatan: "Tambun",
      detail: "Grand Wisata",
    },
    sekolah: {
      nama: "Sman 12",
      kelas: "12",
    },
    namaOrangTua: "Muhammad Alief",
    teleponOrangTua: "088733325539",
  },
  // Add more students as needed
];

const student = ref(null);

onMounted(() => {
  const studentId = parseInt(route.query.id);
  const foundStudent = allStudents.find((s) => s.id === studentId);

  if (foundStudent) {
    student.value = foundStudent;
  } else {
    // Default to first student if ID not found
    student.value = allStudents[0];
  }
});

const goBack = () => {
  router.push("/tutor/dashboard");
};

const acceptStudent = () => {
  if (confirm(`Terima siswa ${student.value.nama}?`)) {
    alert("Siswa berhasil diterima!");
    router.push("/tutor/dashboard");
  }
};

const rejectStudent = () => {
  if (confirm(`Tolak siswa ${student.value.nama}?`)) {
    alert("Siswa ditolak!");
    router.push("/tutor/dashboard");
  }
};
</script>
