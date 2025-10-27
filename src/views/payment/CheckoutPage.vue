<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <div class="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-lg">
      <h1 class="text-3xl font-bold text-center text-blue-700 mb-8">
        Checkout Paket Belajar
      </h1>

      <!-- Paket yang dipilih -->
      <div v-if="selectedPackage" class="mb-6 border border-blue-200 rounded-xl p-5 bg-white shadow-sm">
        <h2 class="text-xl font-semibold text-gray-800">{{ selectedPackage.name }}</h2>
        <p class="text-gray-600 mt-1">{{ selectedPackage.description }}</p>
        <p class="text-gray-900 font-medium mt-2">
          Total Harga:
          <span class="text-blue-600 font-semibold">
            Rp {{ selectedPackage.price.toLocaleString('id-ID') }}
          </span>
        </p>
      </div>

      <!-- Form data pembeli -->
      <form @submit.prevent="submitCheckout" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Nama Lengkap</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Masukkan nama kamu"
            class="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="contoh@email.com"
            class="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Nomor HP</label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            class="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Metode Pembayaran</label>
          <select
            v-model="form.paymentMethod"
            class="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
            required
          >
            <option disabled value="">Pilih metode</option>
            <option value="transfer">Transfer Bank</option>
            <option value="ewallet">E-Wallet (Dana, OVO, Gopay)</option>
            <option value="cod">Bayar di Tempat</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Lanjut Bayar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Data dummy sementara (nanti bisa diganti ambil dari API)
const packages = [
  { id: 1, name: 'Paket Belajar 1 Mata Pelajaran', description: 'Akses 1 mata pelajaran pilihanmu.', price: 100000 },
  { id: 2, name: 'Paket Belajar 3 Mata Pelajaran', description: 'Pilih hingga 3 mata pelajaran.', price: 250000 },
  { id: 3, name: 'Paket Belajar 5 Mata Pelajaran', description: 'Dapatkan akses ke 5 mata pelajaran sekaligus.', price: 400000 },
]

const selectedPackage = computed(() =>
  packages.find(p => p.id === Number(route.query.packageId))
)

const form = ref({
  name: '',
  email: '',
  phone: '',
  paymentMethod: '',
})

function submitCheckout() {
  alert(`Checkout berhasil!\nNama: ${form.value.name}\nPaket: ${selectedPackage.value?.name}\nTotal: Rp ${selectedPackage.value?.price.toLocaleString('id-ID')}`)
}
</script>
