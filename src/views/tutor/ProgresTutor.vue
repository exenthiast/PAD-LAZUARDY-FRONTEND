<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 py-10">
    <!-- Header Tutor -->
    <header class="bg-white border-b py-6 mb-8 shadow-sm">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <div class="flex items-center gap-4">
          <img
            :src="tutor.photo"
            class="w-20 h-20 rounded-full object-cover shadow"
            alt="Tutor Photo"
          />
          <div>
            <h1 class="text-xl font-semibold text-gray-800">{{ tutor.name }}</h1>
            <p class="text-sm text-gray-500">{{ tutor.subject }} • {{ tutor.experience }}</p>
          </div>
        </div>

        <!-- Tombol WhatsApp -->
        <a
          :href="`https://wa.me/${tutor.phone}?text=${encodeURIComponent(`Halo ${tutor.name}, saya ingin berdiskusi mengenai pembelajaran di Lazuardy.`)}`"
          target="_blank"
          class="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M20.52 3.48A11.87 11.87 0 0 0 12 0a11.87 11.87 0 0 0-8.52 3.48A11.87 11.87 0 0 0 0 12a11.87 11.87 0 0 0 3.48 8.52A11.87 11.87 0 0 0 12 24a11.87 11.87 0 0 0 8.52-3.48A11.87 11.87 0 0 0 24 12a11.87 11.87 0 0 0-3.48-8.52ZM12 22.2A10.2 10.2 0 0 1 5.13 19L4.76 18.7l-2.15.7.7-2.13L3 17.86A10.2 10.2 0 1 1 12 22.2Zm5.67-7.78c-.31-.15-1.84-.9-2.12-1s-.49-.15-.7.15-.8 1-.98 1.2-.36.23-.67.08a8.35 8.35 0 0 1-2.46-1.52A9.27 9.27 0 0 1 8.3 11a.76.76 0 0 1 .22-.67c.22-.22.47-.57.68-.86a.63.63 0 0 0 .14-.64c-.05-.15-.69-1.67-.94-2.3s-.5-.53-.69-.54H7.2a1.41 1.41 0 0 0-1 .46 4.13 4.13 0 0 0-1.28 3.06 7.16 7.16 0 0 0 1.57 3.77 16.4 16.4 0 0 0 5.7 5 19.13 19.13 0 0 0 1.9.88 4.55 4.55 0 0 0 2.08.13 3.46 3.46 0 0 0 2.29-1.62 2.86 2.86 0 0 0 .2-1.62c-.06-.09-.25-.16-.47-.27Z"
            />
          </svg>
          WhatsApp
        </a>
      </div>
    </header>

    <!-- Progress Ringkasan -->
    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-8">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">{{ progress.paket }}</h2>
          <p class="text-sm text-gray-600">Siswa: <span class="font-medium">{{ progress.siswa }}</span></p>
          <p class="text-sm text-gray-600">Jadwal berikutnya: <span class="font-medium">{{ progress.jadwal }}</span></p>
        </div>
        <div class="text-center sm:text-right">
          <p class="text-sm text-gray-600 mb-1">
            Sesi selesai: {{ progress.selesai }} dari {{ progress.total }}
          </p>
          <div class="w-full sm:w-56 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" :style="{ width: progressPersen + '%' }"></div>
          </div>
          <p class="text-xs text-gray-500 mt-1">{{ progressPersen.toFixed(0) }}%</p>
        </div>
      </div>
    </div>

    <!-- Tombol Tambah Pertemuan -->
    <div class="max-w-4xl mx-auto mb-6 text-right px-4">
      <button
        @click="showModal = true"
        class="bg-primary text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition font-medium"
      >
        + Tambah Pertemuan
      </button>
    </div>

    <!-- Detail Pertemuan -->
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-wrap gap-2 mb-6 px-4">
        <button
          v-for="(p, index) in progress.pertemuan"
          :key="p.id"
          @click="activeTab = index"
          class="px-4 py-2 text-sm font-medium rounded-lg border transition"
          :class="activeTab === index
            ? 'bg-primary text-white border-primary'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'"
        >
          Pertemuan {{ index + 1 }}
        </button>
      </div>

      <div
        v-if="progress.pertemuan[activeTab]"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4"
      >
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Materi yang Diajarkan</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ progress.pertemuan[activeTab].materi }}
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Catatan Tutor</h3>
          <p class="text-gray-700 text-sm leading-relaxed italic">
            "{{ progress.pertemuan[activeTab].tanggapan }}"
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-3">Dokumentasi Pertemuan</h3>
          <div
            v-if="progress.pertemuan[activeTab].foto.length"
            class="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            <img
              v-for="(img, i) in progress.pertemuan[activeTab].foto"
              :key="i"
              :src="img"
              alt="Dokumentasi"
              class="w-full h-40 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
          </div>
          <p
            v-else
            class="text-gray-500 text-sm italic bg-gray-50 border border-dashed border-gray-200 rounded-lg py-6 text-center"
          >
            Belum ada dokumentasi untuk pertemuan ini.
          </p>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Pertemuan -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div class="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 class="text-lg font-semibold mb-4">Tambah Pertemuan Baru</h2>

        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium">Materi</label>
            <textarea v-model="newMeeting.materi" rows="2" class="w-full border rounded-lg p-2 mt-1"></textarea>
          </div>

          <div>
            <label class="text-sm font-medium">Tanggapan Tutor</label>
            <textarea v-model="newMeeting.tanggapan" rows="2" class="w-full border rounded-lg p-2 mt-1"></textarea>
          </div>

          <div>
            <label class="text-sm font-medium">Upload Foto (opsional)</label>
            <input type="file" multiple accept="image/*" @change="handleUpload" class="mt-1" />
            <div v-if="newMeeting.foto.length" class="flex flex-wrap gap-2 mt-2">
              <img v-for="(img, i) in newMeeting.foto" :key="i" :src="img" class="w-20 h-20 object-cover rounded-lg border" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="showModal = false" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Batal</button>
          <button @click="addMeeting" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const showModal = ref(false);
const activeTab = ref(0);
const hoveredSlot = ref(null);

const tutor = {
  name: "Budi Santoso",
  subject: "Matematika",
  experience: "4 tahun pengalaman",
  phone: "6281234567890",
  photo: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&q=80",
};

const progress = ref({
  paket: "Matematika - 8 Pertemuan",
  siswa: "Siti Nurhaliza",
  jadwal: "Kamis, 08.00 - 09.00 (Online)",
  selesai: 6,
  total: 8,
  pertemuan: [
    {
      id: 1,
      materi: "Persamaan Linear Dua Variabel dan Grafiknya",
      tanggapan: "Siswa cepat memahami konsep dasar dan aktif bertanya.",
      foto: [],
    },
  ],
});

const newMeeting = ref({
  materi: "",
  tanggapan: "",
  foto: [],
});

const handleUpload = (e) => {
  const files = e.target.files;
  newMeeting.value.foto = [];
  for (let file of files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      newMeeting.value.foto.push(event.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const addMeeting = () => {
  if (!newMeeting.value.materi.trim()) return alert("Materi tidak boleh kosong!");
  const newData = {
    id: progress.value.pertemuan.length + 1,
    materi: newMeeting.value.materi,
    tanggapan: newMeeting.value.tanggapan,
    foto: [...newMeeting.value.foto],
  };
  progress.value.pertemuan.push(newData);
  newMeeting.value = { materi: "", tanggapan: "", foto: [] };
  showModal.value = false;
};

const progressPersen = computed(() => (progress.value.selesai / progress.value.total) * 100);
</script>

<style scoped>
.text-primary {
  color: #2ba9b2;
}
.bg-primary {
  background-color: #2ba9b2;
}
</style>
