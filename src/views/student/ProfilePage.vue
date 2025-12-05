<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Back Button - Pojok Kiri Atas -->
    <div class="absolute top-6 left-6 z-20">
      <button
        @click="handleBack"
        type="button"
        class="flex items-center gap-2 bg-white border-2 border-[#41a6c2] text-[#41a6c2] px-4 py-2 rounded-lg font-medium transition shadow-md"
      >
        <ArrowLeft class="w-5 h-5" />
        <span>Kembali</span>
      </button>
    </div>

    <!-- Header -->
    <div class="bg-[#41a6c2] py-12 px-4 text-center text-white mb-6">
      <img
        :src="student.photoUrl || 'https://picsum.photos/200/300'"
        class="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-lg gap-2 object-cover"
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
            class="w-full sm:w-auto bg-[#41a6c2] hover:bg-[#41a6c2] text-white px-6 py-2 rounded-lg font-medium transition"
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

        <!-- Map -->
        <div
          class="mt-4 w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative"
        >
          <!-- Google Maps Iframe -->
          <iframe
            v-if="student.latitude && student.longitude"
            :src="`https://www.google.com/maps?q=${student.latitude},${student.longitude}&hl=id&z=15&output=embed`"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            class="w-full h-full"
          >
          </iframe>
          <!-- Fallback: Tampilkan map berdasarkan alamat text jika tidak ada koordinat -->
          <iframe
            v-else-if="student.alamat.detail"
            :src="`https://www.google.com/maps?q=${encodeURIComponent(
              student.alamat.detail +
                ', ' +
                student.alamat.kota +
                ', ' +
                student.alamat.provinsi
            )}&hl=id&z=13&output=embed`"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            class="w-full h-full"
          >
          </iframe>
          <!-- Fallback jika tidak ada koordinat dan alamat -->
          <div
            v-else
            class="flex items-center justify-center h-full bg-gray-100"
          >
            <div class="text-center text-gray-500 p-4">
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
              <p class="text-sm font-medium">Lokasi belum tersedia</p>
              <p class="text-xs mt-1">
                {{ student.alamat.detail || "Alamat belum diisi" }}
              </p>
            </div>
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
import { getMe, logout as apiLogout } from "@/services/authService.js";

const router = useRouter();

const isLoading = ref(false);
const errorMessage = ref("");

const student = ref({
  photoUrl: "",
  namaLengkap: "",
  email: "",
  jenisKelamin: "",
  tanggalLahir: "",
  phone: "",
  agama: "",
  alamat: {
    provinsi: "",
    kota: "",
    kecamatan: "",
    desa: "",
    detail: "",
  },
  latitude: null,
  longitude: null,
  sekolah: {
    asalSekolah: "",
    kelas: "",
  },
  orangtua: {
    nama: "",
    telepon: "",
  },
  progress: 0,
});

// Ambil data profile dari backend
const loadProfile = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Panggil endpoint student profile yang lengkap
    const token = localStorage.getItem("auth_token");
    const response = await fetch("http://localhost:8000/api/student/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Gagal memuat profil");
    }

    const res = await response.json();
    // Response dari showStudentProfile sudah flat (merged user + student data)
    const user = res;

    console.log("Profile data loaded:", user);
    console.log("home_address:", user.home_address);
    console.log("school:", user.school);
    console.log("class:", user.class);
    console.log("parent:", user.parent);

    // Map gender dari enum backend (pria/wanita) ke display
    const genderDisplay = {
      pria: "Laki-laki",
      wanita: "Perempuan",
    };

    // Map religion dari enum backend ke display (capitalize first letter)
    const religionDisplay = (religion) => {
      if (!religion) return "";
      return religion.charAt(0).toUpperCase() + religion.slice(1);
    };

    // Format tanggal dari ISO ke readable format
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original jika invalid
      return date.toISOString().split("T")[0]; // Return YYYY-MM-DD
    };

    // --- mapping field dari backend ke struktur student ---
    student.value = {
      photoUrl: user.profile_photo_url
        ? `http://localhost:8000/storage/${user.profile_photo_url}`
        : user.photo || "https://picsum.photos/200/300",
      namaLengkap: user.name || "",
      email: user.email || "",
      jenisKelamin:
        genderDisplay[user.gender] || user.gender || user.jenis_kelamin || "",
      tanggalLahir: formatDate(
        user.date_of_birth || user.birth_date || user.tanggal_lahir
      ),
      phone: user.telephone_number || user.phone || user.telepon || "",
      agama: religionDisplay(user.religion) || user.agama || "",
      alamat: {
        // PERBAIKAN: Backend mengirim home_address sebagai object nested
        provinsi:
          user.home_address?.province ||
          user.province ||
          user.address_province ||
          user.provinsi ||
          "",
        kota:
          user.home_address?.regency ||
          user.regency ||
          user.city ||
          user.address_city ||
          user.kota ||
          "",
        kecamatan:
          user.home_address?.district ||
          user.district ||
          user.address_district ||
          user.kecamatan ||
          "",
        desa:
          user.home_address?.subdistrict ||
          user.subdistrict ||
          user.address_village ||
          user.desa ||
          "",
        detail:
          user.home_address?.street ||
          user.street ||
          user.address_detail ||
          user.alamat ||
          "",
      },
      latitude: user.latitude || null,
      longitude: user.longitude || null,
      sekolah: {
        asalSekolah: user.school || user.school_name || user.asal_sekolah || "",
        kelas: user.class || user.grade || user.kelas || "",
      },
      orangtua: {
        nama: user.parent || user.parent_name || user.nama_orangtua || "",
        telepon:
          user.parent_telephone_number ||
          user.parent_phone ||
          user.telepon_orangtua ||
          "",
      },
      progress: user.progress || 0,
    };

    console.log("Mapped student data:", student.value);
  } catch (err) {
    console.error("Gagal load profile:", err);
    errorMessage.value = err.message || "Gagal memuat profil siswa";

    // optional: kalau unauthenticated, balik ke login
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
  router.push("/student/edit-profile");
};

const handleBack = () => {
  router.push("/student/dashboard");
};

const logout = async () => {
  try {
    await apiLogout(); // panggil API logout backend
  } catch (e) {
    console.error("Logout error:", e);
  } finally {
    localStorage.removeItem("auth_token");
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
