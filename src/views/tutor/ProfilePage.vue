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
      <div
        class="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200"
      >
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
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#41a6c2]"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data profil...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="text-center py-12 text-red-600">
        <p>{{ errorMessage }}</p>
        <button
          @click="loadProfile"
          class="mt-4 bg-[#41a6c2] text-white px-6 py-2 rounded-lg"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Profile Content -->
      <template v-else>
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
              <p class="font-medium text-gray-800">{{ tutor.noTelepon }}</p>
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
              <p class="font-medium text-gray-800">{{ tutor.provinsi }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Kota / Kabupaten</p>
              <p class="font-medium text-gray-800">{{ tutor.kota }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Kecamatan</p>
              <p class="font-medium text-gray-800">{{ tutor.kecamatan }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Desa / Kelurahan</p>
              <p class="font-medium text-gray-800">{{ tutor.desa }}</p>
            </div>
            <div class="sm:col-span-2">
              <p class="text-gray-500 text-sm">Alamat Lengkap</p>
              <p class="font-medium text-gray-800">{{ tutor.alamatLengkap }}</p>
            </div>
          </div>

          <!-- Map -->
          <div
            class="mt-4 w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative"
          >
            <!-- Google Maps Iframe -->
            <iframe
              v-if="tutor.latitude && tutor.longitude"
              :src="`https://www.google.com/maps?q=${tutor.latitude},${tutor.longitude}&hl=id&z=15&output=embed`"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              class="w-full h-full"
            >
            </iframe>
            <!-- Fallback jika tidak ada koordinat -->
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
                  {{ tutor.alamatLengkap || "Alamat belum diisi" }}
                </p>
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
              <p class="font-medium text-gray-800">{{ tutor.keahlian }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Market Siswa</p>
              <p class="font-medium text-gray-800">{{ tutor.marketSiswa }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Pengalaman</p>
              <p class="font-medium text-gray-800">{{ tutor.pengalaman }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Skill Bahasa</p>
              <p class="font-medium text-gray-800">{{ tutor.skillBahasa }}</p>
            </div>
            <div class="sm:col-span-2">
              <p class="text-gray-500 text-sm">Organisasi</p>
              <p class="font-medium text-gray-800">
                {{ tutor.organisasi || "-" }}
              </p>
            </div>
          </div>
        </div>

        <!-- Tentang Saya -->
        <div
          v-if="tutor.tentangSaya && tutor.tentangSaya !== 'N/A'"
          class="mb-8"
        >
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Tentang Saya
          </h3>
          <p class="text-gray-700 whitespace-pre-wrap">
            {{ tutor.tentangSaya }}
          </p>
        </div>

        <!-- Riwayat Pendidikan -->
        <div
          v-if="tutor.pendidikan && tutor.pendidikan.length > 0"
          class="mb-8"
        >
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Riwayat Pendidikan
          </h3>
          <div class="space-y-4">
            <div
              v-for="(edu, index) in tutor.pendidikan"
              :key="index"
              class="bg-gray-50 rounded-lg p-4"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <span
                    :class="[
                      'inline-block px-2 py-0.5 text-xs font-medium rounded mb-2',
                      edu.type === 'pendidikan'
                        ? 'bg-blue-100 text-blue-800'
                        : edu.type === 'pengalaman'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800',
                    ]"
                  >
                    {{
                      edu.type === "pendidikan"
                        ? "Pendidikan"
                        : edu.type === "pengalaman"
                        ? "Pengalaman"
                        : "Organisasi"
                    }}
                  </span>
                  <h5 class="font-semibold text-gray-800">
                    {{ edu.title || edu.degree || "N/A" }}
                  </h5>
                  <p class="text-sm text-gray-600">
                    {{ edu.org || edu.institution || "N/A" }}
                  </p>
                </div>
                <span class="text-xs text-gray-500">{{
                  edu.period || edu.year || "N/A"
                }}</span>
              </div>
              <p
                v-if="edu.detail || edu.description"
                class="text-sm text-gray-700 mt-2"
              >
                {{ edu.detail || edu.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Harga & Data Bank -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Harga & Data Bank
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-gray-500 text-sm">Harga Per Pertemuan</p>
              <p class="font-semibold text-gray-800">
                Rp
                {{
                  tutor.hargaPerPertemuan
                    ? tutor.hargaPerPertemuan.toLocaleString("id-ID")
                    : "0"
                }}
              </p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Nama Bank</p>
              <p class="font-medium text-gray-800">{{ tutor.bankName }}</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Nomor Rekening</p>
              <p class="font-medium text-gray-800">
                {{ tutor.bankAccountNumber }}
              </p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Nama Pemilik Rekening</p>
              <p class="font-medium text-gray-800">
                {{ tutor.bankAccountName }}
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import NavbarTutor from "@/components/layout/navbar-tutor.vue";
import { getTutorProfile } from "@/services/tutorProfileService.js";

const router = useRouter();

const isLoading = ref(true);
const errorMessage = ref("");

const tutor = ref({
  namaLengkap: "",
  email: "",
  jenisKelamin: "",
  tanggalLahir: "",
  noTelepon: "",
  agama: "",
  photo: null,
  provinsi: "",
  kota: "",
  kecamatan: "",
  desa: "",
  alamatLengkap: "",
  latitude: null,
  longitude: null,
  keahlian: "",
  marketSiswa: "",
  pengalaman: "",
  skillBahasa: "",
  organisasi: "",
  tentangSaya: "",
  pendidikan: [],
  jadwalMengajar: [],
  hargaPerPertemuan: 0,
  bankName: "",
  bankAccountNumber: "",
  bankAccountName: "",
  documents: {
    cv: null,
    ktp: null,
    ijazah: null,
  },
  status: "",
  statusEnum: "",
});

// Format date to Indonesian locale
const formatDate = (dateString) => {
  if (!dateString || dateString === "N/A") return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

// Ambil data profile dari backend
const loadProfile = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    const data = await getTutorProfile();
    console.log("Tutor profile data:", data);

    tutor.value = {
      namaLengkap: data.namaLengkap || "",
      email: data.email || "",
      jenisKelamin: data.jenisKelamin || "",
      tanggalLahir: formatDate(data.tanggalLahir),
      noTelepon: data.noTelepon || "",
      agama: data.agama || "",
      photo: data.photo || "https://i.pravatar.cc/150?img=12",
      provinsi: data.provinsi || "",
      kota: data.kota || "",
      kecamatan: data.kecamatan || "",
      desa: data.desa || "",
      alamatLengkap: data.alamatLengkap || "",
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      keahlian: data.keahlian || "",
      marketSiswa: data.marketSiswa || "",
      pengalaman: data.pengalaman || "",
      skillBahasa: data.skillBahasa || "",
      organisasi: data.organisasi || "",
      tentangSaya: data.tentangSaya || "",
      pendidikan: data.pendidikan || [],
      jadwalMengajar: data.jadwalMengajar || [],
      hargaPerPertemuan: data.hargaPerPertemuan || 0,
      bankName: data.bankName || "",
      bankAccountNumber: data.bankAccountNumber || "",
      bankAccountName: data.bankAccountName || "",
      documents: data.documents || {
        cv: null,
        ktp: null,
        ijazah: null,
      },
      status: data.status || "",
      statusEnum: data.statusEnum || "",
    };
  } catch (err) {
    console.error("Gagal load profile:", err);
    errorMessage.value = err.message || "Gagal memuat profil tutor";

    if (
      err.message?.toLowerCase().includes("unauthenticated") ||
      err.response?.status === 401
    ) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      router.push("/login");
    }
  } finally {
    isLoading.value = false;
  }
};

const editProfile = () => {
  router.push("/tutor/edit-profile");
};

const handleBack = () => {
  router.push("/tutor/dashboard");
};

const logout = async () => {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
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
