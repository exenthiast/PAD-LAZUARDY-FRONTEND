<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-teal-700">Daftar Tutor</h1>

        <div class="flex gap-2">
          <input
            v-model="q"
            type="text"
            placeholder="Cari tutor / mapel…"
            class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-64"
          />
          <select v-model="sortKey" class="px-3 py-2 border rounded-lg">
            <option value="rating">Urutkan: Rating</option>
            <option value="reviews">Urutkan: Ulasan</option>
            <option value="name">Urutkan: Nama</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="t in sortedFiltered"
          :key="t.id"
          class="rounded-xl border border-teal-600/40 bg-white p-5 shadow-sm"
        >
          <div class="flex gap-4">
            <img :src="t.photo" :alt="t.name" class="w-16 h-16 rounded-full bg-gray-200 object-cover" />
            <div class="flex-1">
              <h4 class="font-semibold text-gray-900">{{ t.name }}</h4>
              <p class="text-sm text-gray-600">{{ t.subject }} • {{ t.level }}</p>
              <div class="mt-1 flex items-center gap-1">
                <svg class="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span class="font-medium">{{ t.rating.toFixed(1) }}</span>
                <span class="text-gray-500 text-sm">({{ t.reviews }} ulasan)</span>
              </div>
            </div>
            <a
              :href="waLink(t.whatsapp)"
              target="_blank" rel="noopener"
              class="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50 text-green-700"
            >
              WhatsApp
            </a>
          </div>

          <p class="mt-3 text-sm text-gray-700 line-clamp-2">
            {{ t.bio }}
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

/* Dummy data — ganti ke fetch API nanti */
const tutors = ref([
  { id: 1, name: 'Budi Santoso', subject: 'Matematika', level: 'SMP & SMA', rating: 4.9, reviews: 225, photo: 'https://picsum.photos/seed/tutor1/80/80', whatsapp: '+628123456789', bio: 'Tutor Matematika bersertifikat, pengalaman >6 tahun.' },
  { id: 2, name: 'Siti Nurhaliza', subject: 'Fisika', level: 'SMA', rating: 4.8, reviews: 190, photo: 'https://picsum.photos/seed/tutor2/80/80', whatsapp: '081234567880', bio: 'Pendekatan praktis, fokus konsep dan latihan berjenjang.' },
  { id: 3, name: 'Ahmad Fauzi', subject: 'Kimia', level: 'SMA', rating: 4.8, reviews: 174, photo: 'https://picsum.photos/seed/tutor3/80/80', whatsapp: '628111223344', bio: 'Olimpiade Kimia, banyak siswa lolos PTN favorit.' },
  { id: 4, name: 'Rina Wijaya', subject: 'Biologi', level: 'SMP', rating: 4.7, reviews: 130, photo: 'https://picsum.photos/seed/tutor4/80/80', whatsapp: '+62 811-7777-999', bio: 'Metode interaktif dengan visual dan eksperimen sederhana.' }
])

const q = ref('')
const sortKey = ref('rating')

const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return tutors.value
  return tutors.value.filter(t =>
    [t.name, t.subject, t.level, t.bio].some(v => String(v).toLowerCase().includes(s))
  )
})

const sortedFiltered = computed(() => {
  const arr = [...filtered.value]
  if (sortKey.value === 'rating') arr.sort((a,b) => (b.rating - a.rating) || (b.reviews - a.reviews))
  else if (sortKey.value === 'reviews') arr.sort((a,b) => b.reviews - a.reviews)
  else if (sortKey.value === 'name') arr.sort((a,b) => a.name.localeCompare(b.name))
  return arr
})

function waLink(number) {
  const n = (number || '').replace(/[^\d+]/g, '')
  const msisdn = n.startsWith('+') ? n.slice(1) : n
  return `https://wa.me/${msisdn}`
}
</script>
