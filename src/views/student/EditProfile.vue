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
        <!-- Foto Profil -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Foto Profil
          </h3>
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <!-- Preview Foto -->
            <div class="relative">
              <img
                :src="photoPreview || 'https://picsum.photos/200/300'"
                alt="Profile Photo"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
              />
              <button
                @click="triggerPhotoUpload"
                type="button"
                class="absolute bottom-0 right-0 bg-[#41a6c2] hover:bg-[#359299] text-white p-2 rounded-full shadow-lg transition"
                title="Ubah Foto"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <input
                ref="photoInput"
                type="file"
                accept="image/*"
                @change="handlePhotoChange"
                class="hidden"
              />
            </div>
            <!-- Info -->
            <div class="flex-1 text-center sm:text-left">
              <p class="text-sm text-gray-600 mb-1">
                Klik tombol kamera untuk mengubah foto profil
              </p>
              <p class="text-xs text-gray-500">
                Format: JPG, PNG, GIF (Max. 2MB)
              </p>
            </div>
          </div>
        </div>

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

          <!-- Location Picker -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Pilih Lokasi di Peta
              <span class="text-xs text-gray-500 ml-2"
                >(Klik pada peta untuk memilih lokasi)</span
              >
            </label>
            <div
              class="w-full h-96 bg-gray-200 rounded-lg overflow-hidden relative border-2 border-gray-300"
            >
              <!-- Google Maps Iframe dengan mode pencarian -->
              <iframe
                :src="mapEmbedUrl"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                class="w-full h-full"
              >
              </iframe>

              <!-- Overlay untuk koordinat yang dipilih -->
              <div
                v-if="form.latitude && form.longitude"
                class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1">
                    <p class="text-xs font-medium text-gray-700 mb-1">
                      Koordinat Terpilih:
                    </p>
                    <p class="text-xs text-gray-600">
                      Lat: {{ Number(form.latitude).toFixed(6) }}, Lng:
                      {{ Number(form.longitude).toFixed(6) }}
                    </p>
                  </div>
                  <button
                    @click="clearLocation"
                    type="button"
                    class="text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>

            <!-- Manual coordinate input (optional) -->
            <div class="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1"
                  >Latitude</label
                >
                <input
                  v-model.number="form.latitude"
                  type="number"
                  step="0.000001"
                  placeholder="-6.200000"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1"
                  >Longitude</label
                >
                <input
                  v-model.number="form.longitude"
                  type="number"
                  step="0.000001"
                  placeholder="106.816666"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <!-- Search location helper -->
            <div class="mt-3">
              <p class="text-xs text-gray-500">
                💡 Tips: Ketik alamat lengkap di Google Maps, kemudian salin
                koordinat (klik kanan pada titik lokasi → pilih koordinat untuk
                menyalin)
              </p>
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
import axios from "axios";

const router = useRouter();
const isSubmitting = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const photoInput = ref(null);
const photoPreview = ref("");
const photoFile = ref(null);

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
});

// Computed URL untuk map embed
const mapEmbedUrl = computed(() => {
  try {
    if (form.value.latitude && form.value.longitude) {
      // Tampilkan map dengan marker di koordinat yang dipilih
      return `https://www.google.com/maps?q=${form.value.latitude},${form.value.longitude}&hl=id&z=15&output=embed`;
    } else if (form.value.alamat?.detail) {
      // Tampilkan map berdasarkan alamat text
      const address = encodeURIComponent(form.value.alamat.detail);
      return `https://www.google.com/maps?q=${address}&hl=id&z=13&output=embed`;
    } else {
      // Default Indonesia center
      return "https://www.google.com/maps?q=-6.2,106.816666&hl=id&z=5&output=embed";
    }
  } catch (error) {
    console.error("Error in mapEmbedUrl:", error);
    return "https://www.google.com/maps?q=-6.2,106.816666&hl=id&z=5&output=embed";
  }
});

// Form validation
const isFormValid = computed(() => {
  try {
    return (
      form.value.namaLengkap?.trim() !== "" &&
      form.value.email?.trim() !== "" &&
      form.value.jenisKelamin !== "" &&
      form.value.tanggalLahir !== "" &&
      form.value.phone?.trim() !== "" &&
      form.value.agama !== "" &&
      form.value.alamat?.provinsi?.trim() !== "" &&
      form.value.alamat?.kota?.trim() !== "" &&
      form.value.alamat?.kecamatan?.trim() !== "" &&
      form.value.alamat?.desa?.trim() !== "" &&
      form.value.alamat?.detail?.trim() !== "" &&
      form.value.sekolah?.asalSekolah?.trim() !== "" &&
      form.value.sekolah?.kelas !== "" &&
      form.value.orangtua?.nama?.trim() !== "" &&
      form.value.orangtua?.telepon?.trim() !== ""
    );
  } catch (error) {
    console.error("Error in isFormValid:", error);
    return false;
  }
});

// Load profile data from backend
const loadProfile = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = "";

    // Gunakan endpoint student profile yang lengkap
    const token = localStorage.getItem("auth_token");

    console.log("=== Loading profile ===");
    console.log("Token:", token ? "exists" : "missing");

    const response = await fetch("http://localhost:8000/api/student/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error:", errorText);
      throw new Error("Gagal memuat profil");
    }

    const user = await response.json();

    console.log("Edit - Profile data loaded:", user);

    // Set photo preview
    if (user.profile_photo_url) {
      photoPreview.value = `http://localhost:8000/storage/${user.profile_photo_url}`;
    } else {
      photoPreview.value = user.photo || "https://picsum.photos/200/300";
    }

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

    // Format date safely
    const formatDate = (dateString) => {
      if (!dateString) return "";
      if (typeof dateString === "string" && dateString.includes("T")) {
        return dateString.split("T")[0];
      }
      return dateString;
    };

    // Map backend fields to form structure
    form.value = {
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
        // PERBAIKAN: Backend mengirim home_address sebagai object nested ATAU field flat
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
        kelas: user.class || user.grade || user.kelas || "", // Backend mengirim field 'class'
      },
      orangtua: {
        nama: user.parent || user.parent_name || user.nama_orangtua || "",
        telepon:
          user.parent_telephone_number ||
          user.parent_phone ||
          user.telepon_orangtua ||
          "",
      },
    };

    console.log("Edit - Mapped form data:", form.value);
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

// Trigger photo upload input
const triggerPhotoUpload = () => {
  photoInput.value?.click();
};

// Handle photo file change
const handlePhotoChange = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Validasi ukuran file (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert("Ukuran file terlalu besar. Maksimal 2MB.");
    return;
  }

  // Validasi tipe file
  if (!file.type.startsWith("image/")) {
    alert("File harus berupa gambar.");
    return;
  }

  // Set photo file untuk diupload nanti
  photoFile.value = file;

  // Preview foto
  const reader = new FileReader();
  reader.onload = (e) => {
    photoPreview.value = e.target?.result;
  };
  reader.readAsDataURL(file);
};

// Clear location
const clearLocation = () => {
  form.value.latitude = null;
  form.value.longitude = null;
};

const handleSubmit = async () => {
  if (!isFormValid.value) {
    alert("Mohon lengkapi semua field!");
    return;
  }

  isSubmitting.value = true;
  try {
    const token = localStorage.getItem("auth_token");

    // Prepare FormData untuk support upload foto
    const formData = new FormData();

    // PENTING: Tambahkan _method untuk method spoofing (Laravel requirement)
    formData.append("_method", "PATCH");

    // Tambahkan foto jika ada
    if (photoFile.value) {
      formData.append("photo", photoFile.value);
      console.log("Photo added to FormData:", photoFile.value.name);
    }

    // Tambahkan data profil lainnya (sesuaikan dengan format backend)
    formData.append("name", form.value.namaLengkap);
    formData.append("telephone_number", form.value.phone);

    // Gender: kirim sebagai enum value (pria/wanita)
    const genderMap = {
      "Laki-laki": "pria",
      Perempuan: "wanita",
    };
    formData.append("gender", genderMap[form.value.jenisKelamin] || "pria");

    formData.append("date_of_birth", form.value.tanggalLahir);

    // Religion: kirim sebagai enum value (islam/kristen/katolik/hindu/buddha/konghucu)
    formData.append("religion", form.value.agama.toLowerCase());

    // Alamat (field datar yang akan di-map ke home_address di backend)
    formData.append("province", form.value.alamat.provinsi);
    formData.append("regency", form.value.alamat.kota);
    formData.append("district", form.value.alamat.kecamatan);
    formData.append("subdistrict", form.value.alamat.desa);
    formData.append("street", form.value.alamat.detail);

    // Koordinat
    if (form.value.latitude) {
      formData.append("latitude", form.value.latitude);
    }
    if (form.value.longitude) {
      formData.append("longitude", form.value.longitude);
    }

    // Data sekolah
    formData.append("school", form.value.sekolah.asalSekolah);
    // PERBAIKAN: Kirim field 'class' berisi nama kelas (bukan 'kelas')
    if (form.value.sekolah.kelas) {
      formData.append("class", form.value.sekolah.kelas);
    }

    // Data orangtua
    if (form.value.orangtua.nama) {
      formData.append("parent", form.value.orangtua.nama);
    }
    if (form.value.orangtua.telepon) {
      formData.append("parent_telephone_number", form.value.orangtua.telepon);
    }

    console.log("=== FormData yang akan dikirim ===");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    console.log("=== Nilai form.sekolah.kelas ===", form.value.sekolah.kelas);
    console.log("===================================");

    const response = await axios.post(
      "http://localhost:8000/api/student/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Profile updated:", response.data);

    // Update photo preview jika ada response photo_url
    if (response.data.photo_url) {
      photoPreview.value = response.data.photo_url;
    }

    alert("Profil berhasil diperbarui!");
    router.push("/student/profile-student");
  } catch (error) {
    console.error("Error updating profile:", error);
    console.error("Error details:", error.response?.data);
    alert(
      error.response?.data?.message ||
        error.message ||
        "Gagal memperbarui profil. Silakan coba lagi."
    );
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
