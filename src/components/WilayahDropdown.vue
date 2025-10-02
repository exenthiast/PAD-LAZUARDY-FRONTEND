<template>
          <div>
            <select
              v-model="selected.provinceId"
              @change="onProvinceChange"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            >
              <option value="">Pilih Provinsi</option>
              <option
                v-for="p in (provinces || [])"
                :key="p.id"
                :value="p.id"
              >
                {{ p.name }}
              </option>
            </select>
          </div>

          <div>
            <select
              v-model="selected.regencyId"
              @change="onRegencyChange"
              :disabled="!selected.provinceId || loading.regencies"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              >
              <option value="">Pilih Kota/Kabupaten</option>
              <option
                v-for="r in (regencies || [])"
                :key="r.id"
                :value="r.id"
              >
                {{ r.name }}
              </option>
            </select>
          </div>

          <div>
            <select
              v-model="selected.districtId"
              @change="onDistrictChange"
              :disabled="!selected.regencyId || loading.districts"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            >
              <option value="">Pilih Kecamatan</option>
              <option
                v-for="d in (districts || [])"
                :key="d.id"
                :value="d.id"
              >
                {{ d.name }}
              </option>
            </select>
          </div>

          <div>
            <select
              v-model="selected.villageId"
              :disabled="!selected.districtId || loading.villages"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
            >
              <option value="">Pilih Desa/Kelurahan</option>
              <option
                v-for="v in (villages || [])"
                :key="v.id"
                :value="v.id"
              >
                {{ v.name }}
              </option>
            </select>
          </div>
</template>
<script setup>
import { ref } from 'vue'

// Pakai data Emsifa (JSON statis)
const API = '/_wilayah'

// state list
const provinces = ref([])
const regencies = ref([])
const districts = ref([])
const villages  = ref([])

// state loading (opsional)
const loading = ref({
  provinces: false,
  regencies: false,
  districts: false,
  villages: false,
})

// state pilihan user
const selected = ref({
  provinceId: '',
  regencyId: '',
  districtId: '',
  villageId: '',
})

// helper fetch JSON
async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return await res.json()
}

// Ambil daftar provinsi saat mount
const fetchProvinces = async () => {
  loading.value.provinces = true
  try {
    provinces.value = await getJSON(`${API}/provinces.json`)
  } finally {
    loading.value.provinces = false
  }
}

// Ambil kab/kota sesuai provinsi
const fetchRegencies = async (provinceId) => {
  if (!provinceId) return
  loading.value.regencies = true
  try {
    regencies.value = await getJSON(`${API}/regencies/${provinceId}.json`)
  } finally {
    loading.value.regencies = false
  }
}

// Ambil kecamatan sesuai kab/kota
const fetchDistricts = async (regencyId) => {
  if (!regencyId) return
  loading.value.districts = true
  try {
    districts.value = await getJSON(`${API}/districts/${regencyId}.json`)
  } finally {
    loading.value.districts = false
  }
}

// Ambil kelurahan sesuai kecamatan
const fetchVillages = async (districtId) => {
  if (!districtId) return
  loading.value.villages = true
  try {
    villages.value = await getJSON(`${API}/villages/${districtId}.json`)
  } finally {
    loading.value.villages = false
  }
}

// Handler perubahan (reset turunan)
const onProvinceChange = async () => {
  selected.value.regencyId  = ''
  selected.value.districtId = ''
  selected.value.villageId  = ''
  regencies.value = []
  districts.value = []
  villages.value  = []
  await fetchRegencies(selected.value.provinceId)
}

const onRegencyChange = async () => {
  selected.value.districtId = ''
  selected.value.villageId  = ''
  districts.value = []
  villages.value  = []
  await fetchDistricts(selected.value.regencyId)
}

const onDistrictChange = async () => {
  selected.value.villageId = ''
  villages.value  = []
  await fetchVillages(selected.value.districtId)
}

// init
fetchProvinces()
</script>
