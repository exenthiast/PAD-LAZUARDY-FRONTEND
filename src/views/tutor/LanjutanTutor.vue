<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- White Card Container -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <h1 class="text-2xl font-semibold text-gray-900 mb-8 text-center">Data Lanjutan</h1>

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
              <span class="mt-2 text-xs text-gray-600">{{ level.name }}</span>
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

        <!-- CV -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">CV</label>
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
          <div class="flex justify-between mt-6">
            <button
              type="button"
              @click="handleBack"
              class="border border-teal-500 text-teal-500 hover:bg-teal-50 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              class="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
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

const router = useRouter();

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
function handleSubmit() {
  // Validasi ringan (optional, bisa ditambah sesuai kebutuhan)
  // Contoh: pastikan keahlian terisi
  // if (!form.keahlian) return alert('Pilih keahlian terlebih dahulu');
  handleNext();
}

const handleBack = () => {
  router.push("/otp-tutor");
};   

const handleNext = () => {
//   if (!verified.value) {
//     err.value = "Harap Diisikan Semua Field!";
//     return;
//   }

    alert("Berhasil Registrasi!");

  // Redirect ke halaman berikutnya
  router.push("/login");
};
</script>
