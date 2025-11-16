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
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data profil...</p>
      </div>

      <!-- Error Message -->
      <div
        v-else-if="errorMessage"
        class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <p class="text-red-600">{{ errorMessage }}</p>
        <button
          @click="loadProfile"
          class="mt-2 text-sm text-red-600 hover:text-red-700 underline"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit">
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
import { getMe, updateProfile } from "@/services/authService.js";

const router = useRouter();
const isSubmitting = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

// Form state - initialize with current data (in real app, fetch from API)
const form = ref({
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
  sekolah: {
    asalSekolah: "",
    kelas: "",
  },
  orangtua: {
    nama: "",
    telepon: "",
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

// Load profile data from backend
const loadProfile = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    const res = await getMe();
    const user = res.user || res.data || res;

    // Map backend fields to form structure
    form.value = {
      namaLengkap: user.name || "",
      email: user.email || "",
      jenisKelamin: user.gender || user.jenis_kelamin || "",
      tanggalLahir: user.birth_date || user.tanggal_lahir || "",
      phone: user.phone || user.telepon || "",
      agama: user.religion || user.agama || "",
      alamat: {
        provinsi: user.address_province || user.provinsi || "",
        kota: user.address_city || user.kota || "",
        kecamatan: user.address_district || user.kecamatan || "",
        desa: user.address_village || user.desa || "",
        detail: user.address_detail || user.alamat || "",
      },
      sekolah: {
        asalSekolah: user.school_name || user.asal_sekolah || "",
        kelas: user.grade || user.kelas || "",
      },
      orangtua: {
        nama: user.parent_name || user.nama_orangtua || "",
        telepon: user.parent_phone || user.telepon_orangtua || "",
      },
    };
  } catch (err) {
    console.error("Gagal load profile:", err);
    errorMessage.value = err.message || "Gagal memuat profil siswa";

    // If unauthenticated, redirect to login
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

const handleSubmit = async () => {
  if (!isFormValid.value) {
    alert("Mohon lengkapi semua field!");
    return;
  }

  isSubmitting.value = true;
  try {
    // Prepare payload untuk backend (sesuaikan dengan format yang diharapkan backend)
    const payload = {
      name: form.value.namaLengkap,
      email: form.value.email,
      gender: form.value.jenisKelamin,
      birth_date: form.value.tanggalLahir,
      phone: form.value.phone,
      religion: form.value.agama,
      address_province: form.value.alamat.provinsi,
      address_city: form.value.alamat.kota,
      address_district: form.value.alamat.kecamatan,
      address_village: form.value.alamat.desa,
      address_detail: form.value.alamat.detail,
      school_name: form.value.sekolah.asalSekolah,
      grade: form.value.sekolah.kelas,
      parent_name: form.value.orangtua.nama,
      parent_phone: form.value.orangtua.telepon,
    };

    await updateProfile(payload);

    alert("Profil berhasil diperbarui!");
    router.push("/student/profile-student");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert(error.message || "Gagal memperbarui profil. Silakan coba lagi.");
  } finally {
    isSubmitting.value = false;
  }
};

const handleBack = () => {
  router.push("/student/profile-student");
};

onMounted(() => {
  loadProfile();
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
