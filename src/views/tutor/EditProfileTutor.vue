<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4">
    <!-- Header -->
    <div class="max-w-3xl mx-auto mb-6">
      <div class="flex items-center gap-4 mb-4">
        <button
          @click="goBack"
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
        <h1 class="text-2xl font-bold text-gray-800">Edit Profil Tutor</h1>
      </div>
    </div>

    <!-- Form Card -->
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data...</p>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Foto Profil -->
        <div class="mb-8">
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Foto Profil
          </h3>
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <!-- Preview Foto -->
            <div class="relative">
              <img
                :src="
                  photoPreview ||
                  'https://ui-avatars.com/api/?name=' +
                    encodeURIComponent(formData.name || 'Tutor') +
                    '&size=200&background=41a6c2&color=fff'
                "
                alt="Profile Photo"
                class="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
                @error="handlePhotoError"
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

        <!-- Data Pribadi -->
        <section>
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Data Pribadi
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Lengkap</label
              >
              <input
                v-model="formData.name"
                type="text"
                :disabled="!canEditName"
                :class="[
                  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent',
                  !canEditName
                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    : 'border-gray-300',
                ]"
                placeholder="Masukkan nama lengkap"
              />
              <p v-if="!canEditName" class="text-xs text-red-500 mt-1">
                {{ nameEditMessage }}
              </p>
              <p
                v-else-if="formData.name !== originalName"
                class="text-xs text-amber-600 mt-1"
              >
                ⚠️ Setelah mengubah nama, Anda tidak dapat mengubahnya lagi
                selama 7 hari.
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email</label
              >
              <input
                v-model="formData.email"
                type="email"
                disabled
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p class="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Jenis Kelamin</label
              >
              <select
                v-model="formData.gender"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="pria">Laki-laki</option>
                <option value="wanita">Perempuan</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tanggal Lahir</label
              >
              <input
                v-model="formData.date_of_birth"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >No. Telepon</label
              >
              <input
                v-model="formData.telephone_number"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Agama</label
              >
              <select
                v-model="formData.religion"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
              >
                <option value="">Pilih Agama</option>
                <option value="islam">Islam</option>
                <option value="kristen">Kristen</option>
                <option value="katolik">Katolik</option>
                <option value="hindu">Hindu</option>
                <option value="buddha">Buddha</option>
                <option value="konghucu">Konghucu</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Alamat -->
        <section>
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Alamat
          </h3>
          <div class="space-y-4">
            <!-- Dropdown Wilayah -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Provinsi</label
              >
              <select
                v-model="selectedWilayah.provinceId"
                @change="onProvinceChange"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
              >
                <option value="">Pilih Provinsi</option>
                <option v-for="p in provinces" :key="p.id" :value="p.id">
                  {{ p.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Kota/Kabupaten</label
              >
              <select
                v-model="selectedWilayah.regencyId"
                @change="onRegencyChange"
                :disabled="
                  !selectedWilayah.provinceId || wilayahLoading.regencies
                "
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                <option v-for="r in regencies" :key="r.id" :value="r.id">
                  {{ r.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Kecamatan</label
              >
              <select
                v-model="selectedWilayah.districtId"
                @change="onDistrictChange"
                :disabled="
                  !selectedWilayah.regencyId || wilayahLoading.districts
                "
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kecamatan</option>
                <option v-for="d in districts" :key="d.id" :value="d.id">
                  {{ d.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Desa/Kelurahan</label
              >
              <select
                v-model="selectedWilayah.villageId"
                @change="onVillageChange"
                :disabled="
                  !selectedWilayah.districtId || wilayahLoading.villages
                "
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Desa/Kelurahan</option>
                <option v-for="v in villages" :key="v.id" :value="v.id">
                  {{ v.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Alamat Lengkap</label
              >
              <textarea
                v-model="formData.street"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Masukkan alamat lengkap (Nama jalan, nomor rumah, RT/RW, dll)"
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
                v-if="formData.latitude && formData.longitude"
                class="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1">
                    <p class="text-xs font-medium text-gray-700 mb-1">
                      Koordinat Terpilih:
                    </p>
                    <p class="text-xs text-gray-600">
                      Lat: {{ Number(formData.latitude).toFixed(6) }}, Lng:
                      {{ Number(formData.longitude).toFixed(6) }}
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
                  v-model.number="formData.latitude"
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
                  v-model.number="formData.longitude"
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
        </section>

        <!-- Data Tutor -->
        <section>
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Data Tutor
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Keahlian</label
              >
              <input
                v-model="formData.keahlian"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Contoh: Matematika, Fisika"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Market Siswa</label
              >
              <input
                v-model="formData.marketSiswa"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Contoh: SD, SMP, SMA"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Pengalaman Mengajar</label
              >
              <input
                v-model="formData.pengalaman"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Contoh: 5 tahun mengajar Matematika"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Skill Bahasa</label
              >
              <input
                v-model="formData.skillBahasa"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Contoh: Indonesia, Inggris, Mandarin"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Organisasi</label
              >
              <input
                v-model="formData.organisasi"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Contoh: Himpunan Mahasiswa Matematika"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Deskripsi/Tentang Saya</label
              >
              <textarea
                v-model="formData.description"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Ceritakan tentang diri Anda sebagai tutor..."
              ></textarea>
            </div>
          </div>
        </section>

        <!-- Riwayat Pendidikan -->
        <section>
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Riwayat Pendidikan
          </h3>
          <div class="space-y-4">
            <div
              v-for="(edu, index) in formData.pendidikan"
              :key="index"
              class="bg-gray-50 rounded-lg p-4 relative"
            >
              <button
                @click="removeEducation(index)"
                type="button"
                class="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Hapus"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1"
                    >Tipe</label
                  >
                  <select
                    v-model="edu.type"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                  >
                    <option value="pendidikan">Pendidikan</option>
                    <option value="pengalaman">Pengalaman</option>
                    <option value="organisasi">Organisasi</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1"
                    >Periode/Tahun</label
                  >
                  <input
                    v-model="edu.period"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                    placeholder="Contoh: 2018-2022"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-gray-600 mb-1"
                    >Judul/Gelar/Posisi</label
                  >
                  <input
                    v-model="edu.title"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                    placeholder="Contoh: S1 Pendidikan Matematika"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-gray-600 mb-1"
                    >Institusi/Organisasi</label
                  >
                  <input
                    v-model="edu.org"
                    type="text"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                    placeholder="Contoh: Universitas Indonesia"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-xs font-medium text-gray-600 mb-1"
                    >Detail/Deskripsi (Opsional)</label
                  >
                  <textarea
                    v-model="edu.detail"
                    rows="2"
                    class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                    placeholder="Deskripsi singkat..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Add Education Button -->
            <button
              @click="addEducation"
              type="button"
              class="w-full py-3 border-2 border-dashed border-[#41a6c2] text-[#41a6c2] rounded-lg hover:bg-[#41a6c2]/5 transition flex items-center justify-center gap-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Riwayat Pendidikan/Pengalaman
            </button>
          </div>
        </section>

        <!-- Data Bank -->
        <section>
          <h3 class="text-xl font-semibold text-[#41a6c2] mb-4 border-b pb-2">
            Data Bank & Harga
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Harga Per Pertemuan</label
              >
              <div class="relative">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium"
                  >Rp</span
                >
                <input
                  v-model="formattedPrice"
                  @input="handlePriceInput"
                  type="text"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                  placeholder="100.000"
                />
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Harga yang akan dibayarkan siswa per pertemuan
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Bank</label
              >
              <input
                v-model="formData.bank_name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Contoh: BCA, Mandiri, BNI"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nomor Rekening</label
              >
              <input
                v-model="formData.bank_account_number"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="1234567890"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Pemilik Rekening</label
              >
              <input
                v-model="formData.bank_account_name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
                placeholder="Sesuai dengan nama di buku rekening"
              />
            </div>
          </div>
        </section>

        <!-- Action Buttons -->
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t"
        >
          <button
            type="button"
            @click="goBack"
            class="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="w-full sm:w-auto bg-[#41a6c2] hover:bg-[#359299] text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSaving ? "Menyimpan..." : "Simpan Perubahan" }}
          </button>
        </div>
      </form>
    </div>

    <!-- Success Toast -->
    <transition name="fade">
      <div
        v-if="showToast"
        class="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
        <span class="font-medium">{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import {
  getTutorProfile,
  updateTutorProfile,
} from "@/services/tutorProfileService";

const router = useRouter();

const isLoading = ref(true);
const isSaving = ref(false);
const showToast = ref(false);
const toastMessage = ref("");
const photoInput = ref(null);
const photoPreview = ref("");
const photoFile = ref(null);
const lastNameEdit = ref(null);
const originalName = ref("");
const canEditName = ref(true);
const nameEditMessage = ref("");
const formattedPrice = ref("");

// Wilayah dropdown states
const provinces = ref([]);
const regencies = ref([]);
const districts = ref([]);
const villages = ref([]);
const wilayahLoading = ref({
  provinces: false,
  regencies: false,
  districts: false,
  villages: false,
});
const selectedWilayah = ref({
  provinceId: "",
  regencyId: "",
  districtId: "",
  villageId: "",
});

// Helper function to fetch wilayah data
const getWilayahJSON = async (path) => {
  try {
    const response = await fetch(`/_wilayah/${path}`);
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return [];
  }
};

// Fetch functions
const fetchProvinces = async () => {
  wilayahLoading.value.provinces = true;
  try {
    provinces.value = await getWilayahJSON("provinces.json");
  } finally {
    wilayahLoading.value.provinces = false;
  }
};

const fetchRegencies = async (provinceId) => {
  if (!provinceId) {
    regencies.value = [];
    return;
  }
  wilayahLoading.value.regencies = true;
  try {
    regencies.value = await getWilayahJSON(`regencies/${provinceId}.json`);
  } finally {
    wilayahLoading.value.regencies = false;
  }
};

const fetchDistricts = async (regencyId) => {
  if (!regencyId) {
    districts.value = [];
    return;
  }
  wilayahLoading.value.districts = true;
  try {
    districts.value = await getWilayahJSON(`districts/${regencyId}.json`);
  } finally {
    wilayahLoading.value.districts = false;
  }
};

const fetchVillages = async (districtId) => {
  if (!districtId) {
    villages.value = [];
    return;
  }
  wilayahLoading.value.villages = true;
  try {
    villages.value = await getWilayahJSON(`villages/${districtId}.json`);
  } finally {
    wilayahLoading.value.villages = false;
  }
};

// Change handlers
const onProvinceChange = async () => {
  // Reset dependent selections
  selectedWilayah.value.regencyId = "";
  selectedWilayah.value.districtId = "";
  selectedWilayah.value.villageId = "";
  regencies.value = [];
  districts.value = [];
  villages.value = [];

  // Update formData with province name
  const province = provinces.value.find(
    (p) => p.id === selectedWilayah.value.provinceId
  );
  formData.value.province = province ? province.name : "";
  formData.value.regency = "";
  formData.value.district = "";
  formData.value.subdistrict = "";

  // Fetch regencies for selected province
  await fetchRegencies(selectedWilayah.value.provinceId);
};

const onRegencyChange = async () => {
  // Reset dependent selections
  selectedWilayah.value.districtId = "";
  selectedWilayah.value.villageId = "";
  districts.value = [];
  villages.value = [];

  // Update formData with regency name
  const regency = regencies.value.find(
    (r) => r.id === selectedWilayah.value.regencyId
  );
  formData.value.regency = regency ? regency.name : "";
  formData.value.district = "";
  formData.value.subdistrict = "";

  // Fetch districts for selected regency
  await fetchDistricts(selectedWilayah.value.regencyId);
};

const onDistrictChange = async () => {
  // Reset dependent selections
  selectedWilayah.value.villageId = "";
  villages.value = [];

  // Update formData with district name
  const district = districts.value.find(
    (d) => d.id === selectedWilayah.value.districtId
  );
  formData.value.district = district ? district.name : "";
  formData.value.subdistrict = "";

  // Fetch villages for selected district
  await fetchVillages(selectedWilayah.value.districtId);
};

const onVillageChange = () => {
  // Update formData with village name
  const village = villages.value.find(
    (v) => v.id === selectedWilayah.value.villageId
  );
  formData.value.subdistrict = village ? village.name : "";
};

const formData = ref({
  name: "",
  email: "",
  gender: "",
  date_of_birth: "",
  telephone_number: "",
  religion: "",
  province: "",
  regency: "",
  district: "",
  subdistrict: "",
  street: "",
  latitude: null,
  longitude: null,
  keahlian: "",
  marketSiswa: "",
  pengalaman: "",
  skillBahasa: "",
  organisasi: "",
  price: 0,
  description: "",
  pendidikan: [],
  bank_name: "",
  bank_account_number: "",
  bank_account_name: "",
});

// Computed URL untuk map embed
const mapEmbedUrl = computed(() => {
  try {
    if (formData.value.latitude && formData.value.longitude) {
      // Tampilkan map dengan marker di koordinat yang dipilih
      return `https://www.google.com/maps?q=${formData.value.latitude},${formData.value.longitude}&hl=id&z=15&output=embed`;
    } else if (formData.value.street) {
      // Tampilkan map berdasarkan alamat text
      const address = encodeURIComponent(formData.value.street);
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

// Initialize wilayah dropdowns from existing data
const initializeWilayah = async (data) => {
  try {
    // Fetch provinces first
    await fetchProvinces();

    // Find and select province by name
    if (data.provinsi) {
      const province = provinces.value.find((p) => p.name === data.provinsi);
      if (province) {
        selectedWilayah.value.provinceId = province.id;
        await fetchRegencies(province.id);

        // Find and select regency by name
        if (data.kota) {
          const regency = regencies.value.find((r) => r.name === data.kota);
          if (regency) {
            selectedWilayah.value.regencyId = regency.id;
            await fetchDistricts(regency.id);

            // Find and select district by name
            if (data.kecamatan) {
              const district = districts.value.find(
                (d) => d.name === data.kecamatan
              );
              if (district) {
                selectedWilayah.value.districtId = district.id;
                await fetchVillages(district.id);

                // Find and select village by name
                if (data.desa) {
                  const village = villages.value.find(
                    (v) => v.name === data.desa
                  );
                  if (village) {
                    selectedWilayah.value.villageId = village.id;
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error initializing wilayah:", error);
  }
};

const loadProfile = async () => {
  try {
    isLoading.value = true;
    const data = await getTutorProfile();

    console.log("Tutor profile data:", data);

    // Set photo preview - cek berbagai kemungkinan field foto
    if (data.photo) {
      // Jika photo sudah full URL, gunakan langsung
      if (data.photo.startsWith("http")) {
        photoPreview.value = data.photo;
      } else {
        // Jika relative path, tambahkan base URL
        photoPreview.value = `http://localhost:8000${
          data.photo.startsWith("/") ? data.photo : "/storage/" + data.photo
        }`;
      }
    } else if (data.profile_photo_url) {
      photoPreview.value = data.profile_photo_url.startsWith("http")
        ? data.profile_photo_url
        : `http://localhost:8000${
            data.profile_photo_url.startsWith("/")
              ? data.profile_photo_url
              : "/storage/" + data.profile_photo_url
          }`;
    }

    console.log("Photo preview URL:", photoPreview.value);

    // Set original name dan last_name_edit untuk validasi
    originalName.value = data.namaLengkap || "";
    lastNameEdit.value = data.lastNameEdit || null;

    // Cek apakah bisa edit nama (7 hari sejak last edit)
    if (lastNameEdit.value) {
      const lastEdit = new Date(lastNameEdit.value);
      const now = new Date();
      const daysDiff = Math.floor((now - lastEdit) / (1000 * 60 * 60 * 24));

      if (daysDiff < 7) {
        canEditName.value = false;
        const nextEditDate = new Date(lastEdit);
        nextEditDate.setDate(nextEditDate.getDate() + 7);
        nameEditMessage.value = `Nama hanya dapat diubah sekali dalam 7 hari. Anda dapat mengubah nama kembali pada ${nextEditDate.toLocaleDateString(
          "id-ID",
          { day: "numeric", month: "long", year: "numeric" }
        )}`;
      } else {
        canEditName.value = true;
        nameEditMessage.value = "";
      }
    }

    // Populate form with existing data
    // Convert display name to enum value for gender
    let genderValue = "";
    if (data.jenisKelamin) {
      const genderLower = data.jenisKelamin.toLowerCase();
      if (
        genderLower === "laki-laki" ||
        genderLower === "male" ||
        genderLower === "pria"
      ) {
        genderValue = "pria";
      } else if (
        genderLower === "perempuan" ||
        genderLower === "female" ||
        genderLower === "wanita"
      ) {
        genderValue = "wanita";
      }
    }

    // Convert date to Y-m-d format for input type="date"
    let dateOfBirth = "";
    if (data.tanggalLahir && data.tanggalLahir !== "N/A") {
      try {
        const date = new Date(data.tanggalLahir);
        // Format to YYYY-MM-DD
        dateOfBirth = date.toISOString().split("T")[0];
      } catch (error) {
        console.error("Error parsing date:", error);
        dateOfBirth = "";
      }
    }

    formData.value = {
      name: data.namaLengkap || "",
      email: data.email || "",
      gender: genderValue,
      date_of_birth: dateOfBirth,
      telephone_number: data.noTelepon || "",
      religion: data.agama?.toLowerCase() || "",
      province: data.provinsi || "",
      regency: data.kota || "",
      district: data.kecamatan || "",
      subdistrict: data.desa || "",
      street: data.alamatLengkap || "",
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      keahlian: data.keahlian || "",
      marketSiswa: data.marketSiswa || "",
      pengalaman: data.pengalaman || "",
      skillBahasa: data.skillBahasa || "",
      organisasi: data.organisasi || "",
      price: data.hargaPerPertemuan || 0,
      description: data.tentangSaya || "",
      pendidikan: data.pendidikan || [],
      bank_name: data.bankName || "",
      bank_account_number: data.bankAccountNumber || "",
      bank_account_name: data.bankAccountName || "",
    };

    // Initialize wilayah dropdowns if address exists
    if (data.provinsi || data.kota || data.kecamatan || data.desa) {
      await initializeWilayah(data);
    }

    // Initialize formatted price
    if (data.hargaPerPertemuan) {
      formattedPrice.value = formatPriceDisplay(data.hargaPerPertemuan);
    }
  } catch (error) {
    console.error("Error loading profile:", error);
    alert("Gagal memuat data profil");
    router.push("/tutor/profile-tutor");
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

// Handle photo error (fallback to UI Avatar)
const handlePhotoError = (event) => {
  event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    formData.value.name || "Tutor"
  )}&size=200&background=41a6c2&color=fff`;
};

// Clear location
const clearLocation = () => {
  formData.value.latitude = null;
  formData.value.longitude = null;
};

// Format price to Rupiah format (e.g., 100.000)
const formatPriceDisplay = (value) => {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Handle price input with formatting
const handlePriceInput = (event) => {
  const input = event.target.value;
  // Remove all non-digit characters
  const numericValue = input.replace(/\D/g, "");

  // Update the actual price value
  formData.value.price = numericValue ? parseInt(numericValue) : 0;

  // Update formatted display
  formattedPrice.value = formatPriceDisplay(numericValue);
};

const handleSubmit = async () => {
  try {
    isSaving.value = true;

    // Prepare FormData untuk support upload foto
    const submitData = new FormData();

    // PENTING: Tambahkan _method untuk method spoofing Laravel
    submitData.append("_method", "PATCH");

    // Tambahkan foto jika ada
    if (photoFile.value) {
      submitData.append("photo", photoFile.value);
      console.log("Photo added to FormData:", photoFile.value.name);
    }

    // Tambahkan data profil lainnya
    submitData.append("name", formData.value.name);
    submitData.append("gender", formData.value.gender);
    submitData.append("date_of_birth", formData.value.date_of_birth);
    submitData.append("telephone_number", formData.value.telephone_number);
    submitData.append("religion", formData.value.religion);
    submitData.append("province", formData.value.province);
    submitData.append("regency", formData.value.regency);
    submitData.append("district", formData.value.district);
    submitData.append("subdistrict", formData.value.subdistrict);
    submitData.append("street", formData.value.street);

    if (formData.value.latitude) {
      submitData.append("latitude", formData.value.latitude);
    }
    if (formData.value.longitude) {
      submitData.append("longitude", formData.value.longitude);
    }

    submitData.append("keahlian", formData.value.keahlian);
    submitData.append("marketSiswa", formData.value.marketSiswa);
    submitData.append("pengalaman", formData.value.pengalaman);
    submitData.append("skillBahasa", formData.value.skillBahasa);
    submitData.append("organisasi", formData.value.organisasi);
    submitData.append("price", formData.value.price);
    submitData.append("description", formData.value.description);
    submitData.append("pendidikan", JSON.stringify(formData.value.pendidikan));
    submitData.append("bank_name", formData.value.bank_name);
    submitData.append(
      "bank_account_number",
      formData.value.bank_account_number
    );
    submitData.append("bank_account_name", formData.value.bank_account_name);

    console.log("=== FormData yang akan dikirim ===");
    for (let pair of submitData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    console.log("===================================");

    await updateTutorProfile(submitData);

    toastMessage.value = "Profil berhasil diperbarui!";
    showToast.value = true;

    setTimeout(() => {
      showToast.value = false;
      router.push("/tutor/profile-tutor");
    }, 2000);
  } catch (error) {
    console.error("Error updating profile:", error);
    alert(
      error?.response?.data?.message ||
        "Gagal memperbarui profil. Silakan coba lagi."
    );
  } finally {
    isSaving.value = false;
  }
};

// Add/Remove Education functions
const addEducation = () => {
  formData.value.pendidikan.push({
    type: "pendidikan",
    title: "",
    org: "",
    period: "",
    detail: "",
  });
};

const removeEducation = (index) => {
  formData.value.pendidikan.splice(index, 1);
};

const goBack = () => {
  router.push("/tutor/profile-tutor");
};

onMounted(async () => {
  await fetchProvinces(); // Load provinces on component mount
  await loadProfile();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
