<template>
  <div
    class="min-h-screen bg-gray-50 text-gray-800 pb-24 relative px-4 md:px-8"
  >
    <!-- 🌟 Splash / Popup -->
    <transition name="fade-scale">
      <div
        v-if="showSplash && tutor.status === 'pending'"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      >
        <div
          class="bg-white p-6 rounded-2xl shadow-lg max-w-md text-center relative animate-fadeIn"
        >
          <button
            @click="closeSplash"
            class="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>

          <img
            src="https://cdn-icons-png.flaticon.com/512/992/992700.png"
            class="w-16 h-16 mx-auto mb-3"
            alt="verification"
          />

          <h2 class="text-lg font-semibold text-gray-800 mb-2">
            Akun Kamu Sedang Dalam Proses Verifikasi
          </h2>
          <p class="text-sm text-gray-600 leading-relaxed">
            Sambil menunggu proses verifikasi oleh admin, yuk lengkapi dan
            percantik
            <b>profil publikmu</b>. Profil yang menarik akan membantu calon
            siswa memilih kamu sebagai tutor mereka.
          </p>

          <button
            @click="closeSplash"
            class="mt-5 bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/90"
          >
            Oke, Saya Mengerti
          </button>
        </div>
      </div>
    </transition>

    <!-- 🧠 Header -->
    <header class="bg-white border-b py-8 rounded-b-2xl shadow-sm">
      <div
        class="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        <img
          :src="tutor.photo || defaultPhoto"
          alt="profile"
          class="w-28 h-28 rounded-full object-cover shadow"
        />
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">{{ tutor.name }}</h1>
          <p class="text-sm text-gray-500">
            {{ tutor.role || "Tutor Baru Bimbel Lazuardy" }}
          </p>

          <!-- 🟢 Status Badge -->
          <div class="mt-2">
            <span
              class="px-3 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-yellow-100 text-yellow-800': tutor.status === 'pending',
                'bg-green-100 text-green-800': tutor.status === 'active',
                'bg-gray-200 text-gray-600': tutor.status === 'inactive',
              }"
            >
              {{
                tutor.status === "pending"
                  ? "Menunggu Verifikasi Admin"
                  : tutor.status === "active"
                  ? "Aktif"
                  : "Libur / Tidak Aktif"
              }}
            </span>
          </div>

          <!-- Tags -->
          <div class="flex gap-2 mt-3 flex-wrap">
            <span
              v-for="(tag, i) in tutor.tags"
              :key="i"
              class="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- 📊 Progress bar -->
    <div class="max-w-6xl mx-auto mt-6">
      <div class="flex justify-between mb-1">
        <span class="text-sm font-medium text-gray-700"
          >Kelengkapan Profil</span
        >
        <span class="text-sm text-gray-600">{{ progress }}%</span>
      </div>
      <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div class="h-2 bg-primary" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <!-- 🧩 Body -->
    <main class="max-w-6xl mx-auto py-8 space-y-10">
      <!-- Tentang Saya -->
      <section class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">Tentang Saya</h2>
          <button
            class="text-sm text-primary hover:underline"
            @click="editSection('about')"
          >
            Edit
          </button>
        </div>
        <p class="text-sm leading-relaxed text-gray-600">
          {{
            tutor.about ||
            "Belum ada deskripsi diri, tambahkan informasi tentang dirimu di sini."
          }}
        </p>
      </section>

      <!-- Keahlian -->
      <section class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">
            Keahlian & Mata Pelajaran
          </h2>
          <button
            class="text-sm text-primary hover:underline"
            @click="editSection('skills')"
          >
            Edit
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(skill, i) in tutor.skills"
            :key="i"
            class="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
          >
            {{ skill }}
          </span>
          <p v-if="!tutor.skills.length" class="text-sm text-gray-500">
            Belum ada keahlian yang ditambahkan.
          </p>
        </div>
      </section>

      <!-- Jadwal -->
      <section class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">Jadwal Mengajar</h2>
          <button
            class="text-sm text-primary hover:underline"
            @click="editSection('schedule')"
          >
            Edit
          </button>
        </div>
        <div class="divide-y divide-gray-100 border rounded-lg overflow-hidden">
          <div
            v-for="(item, i) in tutor.schedule"
            :key="i"
            class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
          >
            <div>
              <div class="text-sm font-medium text-gray-800">
                {{ item.day }}
              </div>
              <div class="text-xs text-gray-500">{{ item.subject }}</div>
            </div>
            <div class="text-sm text-gray-600">{{ item.time }}</div>
          </div>
          <p
            v-if="!tutor.schedule.length"
            class="text-sm text-gray-500 px-4 py-3"
          >
            Belum ada jadwal mengajar.
          </p>
        </div>
      </section>

      <!-- Pendidikan -->
      <section class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">
            Pendidikan & Pengalaman
          </h2>
          <button
            class="text-sm text-primary hover:underline"
            @click="editSection('cv')"
          >
            Edit
          </button>
        </div>
        <div
          v-for="(cv, i) in tutor.cvList"
          :key="i"
          class="py-2 border-b last:border-0"
        >
          <div class="flex justify-between text-sm">
            <div>
              <b>{{ cv.title }}</b>
              <div class="text-xs text-gray-500">{{ cv.org }}</div>
            </div>
            <div class="text-xs text-gray-500">{{ cv.period }}</div>
          </div>
          <p class="text-sm mt-1 text-gray-600">{{ cv.detail }}</p>
        </div>
        <p v-if="!tutor.cvList.length" class="text-sm text-gray-500">
          Belum ada data pendidikan atau pengalaman.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const defaultPhoto = "https://i.pravatar.cc/150?img=64";

const tutor = ref({
  name: "Tutor Baru",
  photo: "",
  role: "Tutor Privat",
  status: "pending", // bisa 'pending', 'active', atau 'inactive'
  about: "",
  tags: ["Matematika", "Fisika"],
  skills: [],
  schedule: [],
  cvList: [],
});

const showSplash = ref(false);

// Splash muncul otomatis kalau status pending
onMounted(() => {
  if (tutor.value.status === "pending") {
    setTimeout(() => {
      showSplash.value = true;
    }, 800);
  }
});

function closeSplash() {
  showSplash.value = false;
}

function editSection(section) {
  alert(`Edit section: ${section}`);
}

const progress = computed(() => {
  let filled = 0;
  if (tutor.value.about) filled += 25;
  if (tutor.value.skills.length) filled += 25;
  if (tutor.value.schedule.length) filled += 25;
  if (tutor.value.cvList.length) filled += 25;
  return filled;
});
</script>

<style scoped>
.bg-primary {
  background-color: #2ba9b2;
}
.text-primary {
  color: #2ba9b2;
}

/* Fade + Scale Animasi */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
