<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- White Card Container -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Data Lanjutan
        </h1>

        <!-- Detail Sekolah Card -->
        <div class="border border-gray-200 rounded-lg p-6 mb-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Data Tutor</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Keahlian -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Keahlian</label
              >
              <div class="relative">
                <select
                  v-model="form.keahlian"
                  class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                >
                  <option value="" disabled>Pilih keahlian</option>
                  <option v-for="skill in skills" :key="skill" :value="skill">
                    {{ skill }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Market Siswa -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Market Siswa</label
              >
              <div class="flex space-x-12">
                <div
                  v-for="level in levels"
                  :key="level.id"
                  class="flex flex-col items-center"
                >
                  <button
                    type="button"
                    @click="selectLevel(level.id)"
                    :class="[
                      'w-6 h-6 rounded-full flex items-center justify-center',
                      form.marketSiswa === level.id
                        ? 'bg-black text-white'
                        : 'bg-gray-200',
                    ]"
                  >
                    <svg
                      v-if="form.marketSiswa === level.id"
                      class="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <span class="mt-2 text-xs text-gray-600">{{
                    level.name
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Pengalaman -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Pengalaman</label
              >
              <input
                type="text"
                v-model="form.pengalaman"
                class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <!-- Skil Bahasa -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Skil Bahasa</label
              >
              <input
                type="text"
                v-model="form.skilBahasa"
                class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <!-- Organisasi -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Organisasi</label
              >
              <input
                type="text"
                v-model="form.organisasi"
                class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <!-- Bank -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Nama Bank <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                v-model="form.bank"
                placeholder="Contoh: BCA, Mandiri, BNI"
                class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <!-- Nomor Rekening -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Nomor Rekening <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                v-model="form.rekening"
                placeholder="Masukkan nomor rekening"
                class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <!-- CV -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >CV</label
              >
              <div class="flex">
                <label
                  class="flex-none w-28 bg-gray-200 text-xs font-medium uppercase tracking-wider py-2 px-4 rounded-l-md cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  Select file
                  <input
                    type="file"
                    class="hidden"
                    @change="handleFileChange('cv', $event)"
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                <div
                  class="flex-1 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 text-sm text-gray-500"
                >
                  {{ fileLabels.cv || "Belum ada file dipilih" }}
                </div>
              </div>
            </div>

            <!-- KTP -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >KTP</label
              >
              <div class="flex">
                <label
                  class="flex-none w-28 bg-gray-200 text-xs font-medium uppercase tracking-wider py-2 px-4 rounded-l-md cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  Select file
                  <input
                    type="file"
                    class="hidden"
                    @change="handleFileChange('ktp', $event)"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </label>
                <div
                  class="flex-1 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 text-sm text-gray-500"
                >
                  {{ fileLabels.ktp || "Belum ada file dipilih" }}
                </div>
              </div>
            </div>

            <!-- Ijazah -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Ijazah</label
              >
              <div class="flex">
                <label
                  class="flex-none w-28 bg-gray-200 text-xs font-medium uppercase tracking-wider py-2 px-4 rounded-l-md cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  Select file
                  <input
                    type="file"
                    class="hidden"
                    @change="handleFileChange('ijazah', $event)"
                    accept=".jpg,.jpeg,.png,.pdf"
                  />
                </label>
                <div
                  class="flex-1 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 text-sm text-gray-500"
                >
                  {{ fileLabels.ijazah || "Belum ada file dipilih" }}
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end mt-6">
              <button
                type="submit"
                class="bg-[#41a6c2] hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Selanjutnya
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRegisterTutorStore } from "@/stores/registerStoreTutor";
import { storeToRefs } from "pinia";
import { updateTutorRole } from "@/services/authRegister";

const router = useRouter();
const tutorStore = useRegisterTutorStore();
const { form: baseForm } = storeToRefs(tutorStore);

const skills = [
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Bahasa Inggris",
  "Bahasa Indonesia",
  "Ekonomi",
  "Sejarah",
  "Geografi",
];

const levels = [
  { id: "sd", name: "SD" },
  { id: "smp", name: "SMP" },
  { id: "sma", name: "SMA" },
  { id: "umum", name: "Umum" },
];

const form = reactive({
  keahlian: "",
  marketSiswa: "sma", // default to SMA
  pengalaman: "",
  skilBahasa: "",
  organisasi: "",
  bank: "",
  rekening: "",
  cv: null,
  ktp: null,
  ijazah: null,
});

const fileLabels = reactive({
  cv: "",
  ktp: "",
  ijazah: "",
});

function selectLevel(levelId) {
  form.marketSiswa = levelId;
}

function handleFileChange(type, event) {
  const file = event.target.files[0];
  if (file) {
    form[type] = file;
    fileLabels[type] = file.name;
  }
}

// Dipanggil saat form disubmit (tombol Selanjutnya)
async function handleSubmit() {
  // Validasi
  if (!form.keahlian) {
    alert("Pilih keahlian terlebih dahulu");
    return;
  }

  if (!form.marketSiswa) {
    alert("Pilih market siswa terlebih dahulu");
    return;
  }

  if (!form.bank) {
    alert("Nama bank harus diisi");
    return;
  }

  if (!form.rekening) {
    alert("Nomor rekening harus diisi");
    return;
  }

  try {
    // Transform tanggal lahir dari {hari, bulan, tahun} ke YYYY-MM-DD
    const dateOfBirth = `${baseForm.value.tanggalLahir.tahun}-${String(
      baseForm.value.tanggalLahir.bulan
    ).padStart(2, "0")}-${String(baseForm.value.tanggalLahir.hari).padStart(
      2,
      "0"
    )}`;

    // Siapkan FormData untuk backend (support file upload)
    const formData = new FormData();

    // Data dari RegisterTutor.vue (baseForm)
    formData.append("email", baseForm.value.email);
    formData.append("password", baseForm.value.password);
    formData.append("password_confirmation", baseForm.value.passwordConfirm);
    formData.append("name", baseForm.value.namaLengkap);
    formData.append("gender", baseForm.value.jenisKelamin);
    formData.append("date_of_birth", dateOfBirth);
    formData.append("telephone_number", baseForm.value.nomorTelepon);
    if (baseForm.value.agama) {
      formData.append("religion", baseForm.value.agama);
    }

    // Data alamat
    formData.append("province", baseForm.value.provinsi || "");
    formData.append("regency", baseForm.value.kabupaten || "");
    formData.append("district", baseForm.value.kecamatan || "");
    formData.append("subdistrict", baseForm.value.kelurahan || "");
    formData.append("street", baseForm.value.alamat || "");
    formData.append("latitude", baseForm.value.location?.lat || -7.3297);
    formData.append("longitude", baseForm.value.location?.lng || 112.7814);

    // Data tutor dari form ini
    formData.append("expertise", form.keahlian);
    formData.append("student_market", form.marketSiswa);
    formData.append("experience", form.pengalaman || "");
    formData.append("language_skills", form.skilBahasa || "");
    formData.append("organization", form.organisasi || "");
    formData.append("bank", form.bank);
    formData.append("rekening", form.rekening);

    // File uploads
    if (form.cv) {
      formData.append("cv", form.cv);
      console.log("CV file:", form.cv.name);
    }
    if (form.ktp) {
      formData.append("ktp", form.ktp);
      console.log("KTP file:", form.ktp.name);
    }
    if (form.ijazah) {
      formData.append("ijazah", form.ijazah);
      console.log("Ijazah file:", form.ijazah.name);
    }

    console.log("Bank data before sending:", {
      bank: form.bank,
      rekening: form.rekening,
    });
    console.log("Files to upload:", {
      cv: form.cv?.name || "none",
      ktp: form.ktp?.name || "none",
      ijazah: form.ijazah?.name || "none",
    });
    console.log("Submitting tutor registration with FormData");
    console.log(
      "FormData will be sent via POST with _method=PATCH for Laravel compatibility"
    );

    // Kirim ke backend (endpoint ini akan CREATE user dan return token)
    const result = await updateTutorRole(formData);

    console.log("Tutor registration response:", result);

    // Simpan token dari response
    if (result.token) {
      localStorage.setItem("auth_token", result.token);

      // Save complete user object if it exists
      if (result.user && typeof result.user === "object") {
        console.log("Saving complete user data to localStorage:", result.user);
        localStorage.setItem("auth_user", JSON.stringify(result.user));
      } else {
        console.warn("User object not found in response, storing minimal data");
        localStorage.setItem(
          "auth_user",
          JSON.stringify({
            email: baseForm.value.email,
            name: baseForm.value.namaLengkap,
            role: "tutor",
          })
        );
      }

      // Clear register data dari localStorage
      tutorStore.reset();
      localStorage.removeItem("register:email");

      console.log("Registration complete, redirecting to home-pending");

      alert("Registrasi berhasil! Menunggu verifikasi admin.");

      // Redirect ke halaman pending
      router.replace("/tutor/home-pending");
    } else {
      throw new Error("Token tidak ditemukan dalam response");
    }
  } catch (error) {
    console.error("Submit error:", error);
    alert(
      `Gagal menyimpan data: ${error?.response?.data?.message || error.message}`
    );
  }
}
</script>
