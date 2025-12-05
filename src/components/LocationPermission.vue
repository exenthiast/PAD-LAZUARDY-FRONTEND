<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- backdrop -->
    <div class="absolute inset-0 bg-black/50" @click="onClose(false)" />

    <!-- card -->
    <div class="relative mx-4 w-full max-w-md rounded-2xl bg-white shadow-xl">
      <div class="px-7 pt-8 pb-6 text-center">
        <!-- icon -->
        <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-teal-50 flex items-center justify-center">
          <!-- icon lokasi -->
          <svg class="h-9 w-9 text-teal-600" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor"
              d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5Z"/>
          </svg>
        </div>

        <h2 class="text-lg md:text-xl font-semibold text-[#41a6c2]">
          Bimbel Lazuardi Membutuhkan Akses Lokasi Anda
        </h2>

        <p class="mt-3 text-gray-500 text-sm leading-relaxed">
          Untuk menjaga keamanan dan kenyamanan Anda, kami memerlukan izin akses lokasi.
          Dengan izin ini, layanan dapat disesuaikan, seperti menampilkan tutor terdekat.
        </p>

        <p v-if="errorMsg" class="mt-3 text-red-600 text-sm">{{ errorMsg }}</p>

        <!-- actions -->
        <div class="mt-8 grid grid-cols-2 gap-4">
          <button
            class="rounded-xl border-2 border-[#41a6c2] px-4 py-3 text-[#41a6c2] font-semibold hover:bg-teal-50"
            @click="onClose(false)"
          >
            Tolak
          </button>

          <button
            class="rounded-xl bg-[#41a6c2] px-4 py-3 text-white font-semibold hover:bg-teal-700 disabled:opacity-60"
            :disabled="loading"
            @click="requestLocation"
          >
            {{ loading ? 'Meminta izin…' : 'Izinkan' }}
          </button>
        </div>

        <p v-if="hint" class="mt-4 text-[12px] text-gray-400">
          {{ hint }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false } // v-model:show
})
const emit = defineEmits(['update:modelValue', 'granted', 'denied'])

const loading = ref(false)
const errorMsg = ref('')
const hint = ref('')

// Tutup modal
function onClose(denied) {
  emit('update:modelValue', false)
  if (denied) emit('denied')
}

// Minta akses lokasi
async function requestLocation() {
  errorMsg.value = ''
  hint.value = ''
  loading.value = true

  // Geolocation hanya jalan di HTTPS atau http://localhost
  const isSecure = location.protocol === 'https:' || location.hostname === 'localhost'
  if (!isSecure) {
    loading.value = false
    errorMsg.value = 'Izin lokasi membutuhkan HTTPS atau localhost.'
    hint.value = 'Jalankan di https:// atau aktifkan HTTPS pada hosting Anda.'
    return
  }

  // Gunakan Permissions API (jika ada) untuk cek status awal
  try {
    if (navigator.permissions?.query) {
      const status = await navigator.permissions.query({ name: 'geolocation' })
      if (status.state === 'denied') {
        hint.value = 'Izin sebelumnya ditolak. Buka pengaturan situs di browser untuk mengubahnya.'
      }
    }
  } catch {}

  // Minta posisi → ini yang memicu prompt sistem
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      loading.value = false
      emit('update:modelValue', false)
      emit('granted', {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy
      })
    },
    (err) => {
      loading.value = false
      errorMsg.value =
        err.code === err.PERMISSION_DENIED
          ? 'Akses lokasi ditolak oleh pengguna.'
          : err.code === err.POSITION_UNAVAILABLE
          ? 'Lokasi tidak tersedia. Periksa GPS/Internet.'
          : 'Permintaan lokasi kedaluwarsa. Coba lagi.'
      if (err.code === err.PERMISSION_DENIED) {
        emit('denied')
        hint.value = 'Jika ingin mengaktifkan lagi, ubah izin lokasi di pengaturan situs browser.'
      }
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  )
}

// Reset pesan setiap kali modal dibuka
watchEffect(() => {
  if (props.modelValue) {
    errorMsg.value = ''
    hint.value = ''
  }
})
</script>
