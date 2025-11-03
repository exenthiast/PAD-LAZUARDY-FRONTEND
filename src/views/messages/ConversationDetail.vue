<template>
  <div class="flex flex-col h-screen bg-white">
    <!-- HEADER CHAT -->
    <header
      class="p-4 border-b flex items-center gap-3 bg-[#41a6c2] text-white"
    >
      <button
        @click="goBack"
        class="p-2 hover:bg-white/10 rounded-lg transition"
        aria-label="Kembali"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      <img
        :src="tutorData.photo"
        :alt="tutorData.name"
        class="w-10 h-10 rounded-full bg-white object-cover border border-white/50"
      />
      <div class="flex-1">
        <p class="font-semibold leading-tight">{{ tutorData.name }}</p>
        <p class="text-xs opacity-90 leading-tight">
          {{ tutorData.subject }} • {{ tutorData.level }}
        </p>
      </div>

      <!-- status online dummy -->
      <div
        class="text-[10px] text-white bg-emerald-500/30 border border-emerald-400/50 px-2 py-0.5 rounded-lg"
      >
        Online
      </div>
    </header>

    <!-- AREA PESAN -->
    <main
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
    >
      <div
        v-for="m in messages"
        :key="m.id"
        class="flex flex-col"
        :class="m.sender === 'me' ? 'items-end' : 'items-start'"
      >
        <div
          class="max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow"
          :class="
            m.sender === 'me'
              ? 'bg-[#2ba9b2] text-white rounded-br-sm'
              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
          "
        >
          <p class="whitespace-pre-line">{{ m.text }}</p>
        </div>

        <span class="mt-1 text-[10px] text-gray-400">
          {{ formatTime(m.time) }}
          <template v-if="m.sender === 'me' && m.status === 'sent'">
            · ✓</template
          >
          <template v-if="m.sender === 'me' && m.status === 'read'">
            · ✓✓ dibaca</template
          >
        </span>
      </div>
    </main>

    <!-- INPUT BOX -->
    <form
      @submit.prevent="sendMessage"
      class="p-4 border-t bg-white flex gap-2"
    >
      <input
        v-model="draft"
        type="text"
        placeholder="Tulis pesan ke tutor..."
        class="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2ba9b2]"
      />
      <button
        class="bg-[#2ba9b2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 disabled:opacity-50"
        :disabled="!draft.trim()"
      >
        Kirim
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeft } from "lucide-vue-next";

// =========================
// 1. Ambil tutorId dari route
// =========================
const route = useRoute();
const router = useRouter();
const tutorId = route.params.tutorId;

// =========================
// 2. Dummy data tutor (sementara)
//    nanti ini diganti fetch dari API tutor detail / conversation
// =========================
const tutorsDummy = [
  {
    id: 1,
    name: "Budi Santoso",
    subject: "Matematika",
    level: "SMP & SMA",
    photo: "https://picsum.photos/seed/tutor1/80/80",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    subject: "Fisika",
    level: "SMA",
    photo: "https://picsum.photos/seed/tutor2/80/80",
  },
  {
    id: 3,
    name: "Ahmad Fauzi",
    subject: "Kimia",
    level: "SMA",
    photo: "https://picsum.photos/seed/tutor3/80/80",
  },
  {
    id: 4,
    name: "Rina Wijaya",
    subject: "Biologi",
    level: "SMP",
    photo: "https://picsum.photos/seed/tutor4/80/80",
  },
  {
    id: 5,
    name: "Dedi Kurniawan",
    subject: "Bahasa Inggris",
    level: "SD, SMP & SMA",
    photo: "https://picsum.photos/seed/t5/80/80",
  },
  {
    id: 6,
    name: "Maya Kartika",
    subject: "Ekonomi",
    level: "SMA",
    photo: "https://picsum.photos/seed/t6/80/80",
  },
];

const tutorData = computed(() => {
  const found = tutorsDummy.find((t) => String(t.id) === String(tutorId));
  return (
    found || {
      id: tutorId,
      name: "Tutor Tidak Diketahui",
      subject: "Mata pelajaran",
      level: "Level",
      photo: "https://via.placeholder.com/80",
    }
  );
});

// =========================
// 3. Dummy messages awal
//    nanti diganti GET /api/conversations/{id}/messages
// =========================
const messages = ref([
  {
    id: 1,
    sender: "tutor",
    text: "Halo, ada bagian mana dari materi hari ini yang masih bingung?",
    time: "2025-11-03T21:50:00+07:00",
  },
  {
    id: 2,
    sender: "me",
    text: "Halo Kak 🙌\nAku bingung di rumus luas segitiga pas ketemu sudut tumpul.",
    time: "2025-11-03T21:52:00+07:00",
    status: "read", // "sent" | "read"
  },
  {
    id: 3,
    sender: "tutor",
    text: "Oke, nanti kita coba latihan satu soal. Kirim fotonya boleh?",
    time: "2025-11-03T21:53:00+07:00",
  },
]);

// draft input
const draft = ref("");

// =========================
// 4. Kirim pesan baru (frontend only for now)
//    nanti ini akan POST /api/messages
// =========================
function sendMessage() {
  if (!draft.value.trim()) return;

  const now = new Date().toISOString();
  messages.value.push({
    id: Date.now(),
    sender: "me",
    text: draft.value,
    time: now,
    status: "sent",
  });

  draft.value = "";

  scrollToBottom();
}

// =========================
// 5. Helper tampilkan waktu simple
// =========================
function formatTime(iso) {
  const d = new Date(iso);
  const jam = d.getHours().toString().padStart(2, "0");
  const menit = d.getMinutes().toString().padStart(2, "0");
  return `${jam}:${menit}`;
}

// auto scroll ke bawah setiap nambah pesan
const messagesContainer = ref(null);

async function scrollToBottom() {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

// scroll to bottom saat komponen pertama kali mount
onMounted(() => {
  scrollToBottom();
});

// Handle back button
function goBack() {
  router.push("/tutors");
}
</script>

<style scoped>
/* bisa ditambah styling bubble kalau mau responsive banget */
</style>
