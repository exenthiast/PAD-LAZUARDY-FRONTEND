<template>
  <div class="min-h-screen bg-white pb-20">
    <NavbarTutor />
    <!-- Back Button - Pojok Kiri Atas -->
    <div class="bg-[#41a6c2] text-white py-12 px-6">
        <div class="max-w-4x1 mx-auto">
            <div class="flex items-center space-x-4">
                <button
                    @click="handleBack"
                    class="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                    <ArrowLeft class="w-6 h-6 text-white" />
                </button>
                <h1 class="text xl font-semibold">Kembali</h1>
            </div>
        </div>
    </div>

    <!-- Header -->
    <div class="flex justify-center -mt-12 mb-6">
        <div class="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
            <img
                v-if="tutor"
                :src="tutor.photo"
                :alt="tutor.nama"
                class="w-full h-full object-cover"
            />
        </div>
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
            class="w-full sm:w-auto bg-[#41a6c2] hover:bg-[#358a9f] text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Edit Profil
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-500 text-sm">Nama Lengkap</p>
            <p class="font-medium text-gray-800">{{ tutor.namaLengkap }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Email</p>
            <p class="font-medium text-gray-800">{{ tutor.email }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Jenis Kelamin</p>
            <p class="font-medium text-gray-800">{{ tutor.jenisKelamin }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Tanggal Lahir</p>
            <p class="font-medium text-gray-800">{{ tutor.tanggalLahir }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">No. Telepon</p>
            <p class="font-medium text-gray-800">{{ tutor.phone }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Agama</p>
            <p class="font-medium text-gray-800">{{ tutor.agama }}</p>
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
              {{ tutor.alamat.provinsi }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Kota / Kabupaten</p>
            <p class="font-medium text-gray-800">{{ tutor.alamat.kota }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Kecamatan</p>
            <p class="font-medium text-gray-800">
              {{ tutor.alamat.kecamatan }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Desa / Kelurahan</p>
            <p class="font-medium text-gray-800">{{ tutor.alamat.desa }}</p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-gray-500 text-sm">Alamat Lengkap</p>
            <p class="font-medium text-gray-800">{{ tutor.alamat.detail }}</p>
          </div>
        </div>

        <!-- Map -->
        <div class="mt-4 w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            :src="`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${tutor.alamat.detail}`"
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
              <p class="text-sm">{{ tutor.alamat.detail }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Tutor -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
          Detail Tutor
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-500 text-sm">Keahlian</p>
            <p class="font-medium text-gray-800">
              {{ tutor.keahlian.join(", ") }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Market Siswa</p>
            <p class="font-medium text-gray-800">
              {{ tutor.marketSiswa.join(", ") }}
            </p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Pengalaman</p>
            <p class="font-medium text-gray-800">{{ tutor.pengalaman }}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm">Skill Bahasa</p>
            <p class="font-medium text-gray-800">
              {{ tutor.skillBahasa.join(", ") }}
            </p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-gray-500 text-sm">Organisasi</p>
            <p class="font-medium text-gray-800">
              {{ tutor.organisasi || "-" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4 border-t"
      >
        <button
          @click="logout"
          type="button"
          class="w-full sm:w-auto border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";
// import { getMe, logout as apiLogout } from "@/services/authService.js";

const router = useRouter();

const isLoading = ref(false);
const errorMessage = ref("");

const tutor = ref({
  namaLengkap: "Rafi Ahmad",
  email: "rafi.ahmad@example.com",
  jenisKelamin: "Laki-laki",
  tanggalLahir: "15 Januari 1995",
  phone: "081234567890",
  agama: "Islam",
  photo: "https://i.pravatar.cc/150?img=12",
  alamat: {
    provinsi: "DKI Jakarta",
    kota: "Jakarta Selatan",
    kecamatan: "Kebayoran Baru",
    desa: "Senayan",
    detail: "Jl. Senayan No. 45, Jakarta Selatan",
  },
  keahlian: ["Matematika", "Fisika"],
  marketSiswa: ["SMA", "SMP"],
  pengalaman: "5 Tahun",
  skillBahasa: ["Indonesia", "Inggris"],
  organisasi: "Ikatan Guru Indonesia (IGI)",
});

// Ambil data profile dari backend
const loadProfile = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    // TODO: Uncomment when API ready
    // const res = await getMe();
    // const user = res.user || res.data || res;

    // tutor.value = {
    //   namaLengkap: user.name || "",
    //   email: user.email || "",
    //   jenisKelamin: user.gender || "",
    //   tanggalLahir: user.birth_date || "",
    //   phone: user.phone || "",
    //   agama: user.religion || "",
    //   photo: user.photo || "https://i.pravatar.cc/150?img=12",
    //   alamat: {
    //     provinsi: user.address_province || "",
    //     kota: user.address_city || "",
    //     kecamatan: user.address_district || "",
    //     desa: user.address_village || "",
    //     detail: user.address_detail || "",
    //   },
    //   keahlian: user.subjects || [],
    //   marketSiswa: user.target_students || [],
    //   pengalaman: user.experience || "",
    //   skillBahasa: user.languages || [],
    //   organisasi: user.organization || "",
    // };
  } catch (err) {
    console.error("Gagal load profile:", err);
    errorMessage.value = err.message || "Gagal memuat profil tutor";

    if (
      err.message?.toLowerCase().includes("unauthenticated") ||
      err.message?.includes("401")
    ) {
      router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};

const editProfile = () => {
  console.log("Edit profil diklik");
  // TODO: Create edit profile page for tutor
  // router.push("/tutor/edit-profile");
  alert("Fitur edit profil tutor akan segera hadir!");
};

const handleBack = () => {
  router.push("/tutor/dashboard");
};

const logout = async () => {
  try {
    // TODO: Uncomment when API ready
    // await apiLogout();
  } catch (e) {
    console.error("Logout error:", e);
  } finally {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    router.push("/login");
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
/* Responsif tambahan */
@media (max-width: 640px) {
  .profile-card {
    padding: 1.5rem;
  }
}
</style>
