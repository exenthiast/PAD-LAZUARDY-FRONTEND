<template>
  <div
    class="min-h-screen bg-gray-50 text-gray-800 pb-24 relative px-4 md:px-8"
  >
    <!-- 🌟 Splash / Popup -->
    <transition name="fade-scale">
      <div
        v-if="showSplash && tutor.status === 'verify'"
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
    <header class="bg-white border-b py-8 rounded-b-2xl shadow-sm relative">
      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
        title="Logout"
      >
        <LogOut :size="18" />
        <span class="hidden md:inline">Logout</span>
      </button>

      <div
        class="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        <!-- Photo with Edit Button -->
        <div class="relative">
          <img
            :src="tutor.photo || defaultPhoto"
            alt="profile"
            class="w-28 h-28 rounded-full object-cover shadow"
          />
          <button
            @click="triggerPhotoUpload"
            class="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition"
            title="Edit Foto Profil"
          >
            <Pencil :size="16" />
          </button>
          <input
            ref="photoInput"
            type="file"
            class="hidden"
            accept="image/*"
            @change="handlePhotoChange"
          />
        </div>

        <div class="flex-1">
          <!-- Name with Edit Button -->
          <div class="flex items-center gap-2 mb-1">
            <h1 class="text-2xl font-semibold text-gray-800">
              {{ tutor.name }}
            </h1>
            <button
              @click="editName"
              :disabled="!canEditName"
              :title="
                canEditName
                  ? 'Edit Nama'
                  : `Nama dapat diedit kembali pada ${nextEditDate}`
              "
              class="text-gray-500 hover:text-primary transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Pencil :size="18" />
            </button>
          </div>
          <p class="text-sm text-gray-500">
            {{ tutor.role || "Tutor Baru Bimbel Lazuardy" }}
          </p>
          <p v-if="!canEditName" class="text-xs text-gray-400 mt-1">
            Nama dapat diedit kembali pada {{ nextEditDate }}
          </p>

          <!-- 🟢 Status Badge -->
          <div class="mt-2">
            <span
              class="px-3 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-yellow-100 text-yellow-800': tutor.status === 'verify',
                'bg-green-100 text-green-800': tutor.status === 'active',
                'bg-red-100 text-red-600': tutor.status === 'rejected',
              }"
            >
              {{
                tutor.status === "verify"
                  ? "Menunggu Verifikasi Admin"
                  : tutor.status === "active"
                  ? "Aktif"
                  : tutor.status === "rejected"
                  ? "Ditolak"
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
      <!-- Data Pribadi -->
      <section class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">Data Pribadi</h2>
          <button
            class="text-sm text-primary hover:underline"
            @click="editSection('personal')"
          >
            Edit
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-xs text-gray-500">Jenis Kelamin</label>
            <p class="text-sm font-medium text-gray-800">
              {{ tutor.gender || "Belum diisi" }}
            </p>
          </div>
          <div>
            <label class="text-xs text-gray-500">Tanggal Lahir</label>
            <p class="text-sm font-medium text-gray-800">
              {{ tutor.dateOfBirth || "Belum diisi" }}
            </p>
          </div>
          <div>
            <label class="text-xs text-gray-500">No. Telepon</label>
            <p class="text-sm font-medium text-gray-800">
              {{ tutor.telephone || "Belum diisi" }}
            </p>
          </div>
          <div>
            <label class="text-xs text-gray-500">Agama</label>
            <p class="text-sm font-medium text-gray-800">
              {{ tutor.religion || "Belum diisi" }}
            </p>
          </div>
        </div>
      </section>

      <!-- Lokasi & Alamat -->
      <section class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">Lokasi & Alamat</h2>
          <button
            class="text-sm text-primary hover:underline"
            @click="editSection('location')"
          >
            Edit
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-xs text-gray-500">Alamat Lengkap</label>
            <p class="text-sm font-medium text-gray-800">
              {{ tutor.address || "Belum diisi" }}
            </p>
          </div>
          <div v-if="tutor.latitude && tutor.longitude" class="mt-4">
            <label class="text-xs text-gray-500 block mb-2"
              >Lokasi di Peta</label
            >
            <div class="rounded-lg overflow-hidden shadow-md">
              <iframe
                :src="`https://maps.google.com/maps?q=${tutor.latitude},${tutor.longitude}&z=15&output=embed`"
                width="100%"
                height="250"
                frameborder="0"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- Harga & Data Bank -->
      <section class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">Harga & Data Bank</h2>
          <button
            class="text-sm text-primary hover:underline"
            @click="editSection('bank')"
          >
            Edit
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="text-xs text-gray-500">Harga Per Pertemuan</label>
            <p class="text-sm font-semibold text-gray-800">
              Rp {{ tutor.price ? tutor.price.toLocaleString("id-ID") : "0" }}
            </p>
          </div>
          <div>
            <label class="text-xs text-gray-500">Nama Bank</label>
            <p class="text-sm font-medium text-gray-800">
              {{ tutor.bankName || "Belum diisi" }}
            </p>
          </div>
          <div>
            <label class="text-xs text-gray-500">Nomor Rekening</label>
            <p class="text-sm font-medium text-gray-800">
              {{ tutor.bankAccountNumber || "Belum diisi" }}
            </p>
          </div>
          <div class="md:col-span-2">
            <label class="text-xs text-gray-500">Nama Pemilik Rekening</label>
            <p class="text-sm font-medium text-gray-800">
              {{ tutor.bankAccountName || "Belum diisi" }}
            </p>
          </div>
        </div>
      </section>

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

        <!-- Pengalaman -->
        <div
          v-for="(cv, i) in tutor.cvList.filter((c) => c.type === 'pengalaman')"
          :key="'pengalaman-' + i"
          class="mb-4 pb-4 border-b"
        >
          <div class="flex items-start gap-2 mb-1">
            <span
              class="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded"
            >
              Pengalaman
            </span>
          </div>
          <div class="flex justify-between text-sm mt-2">
            <div>
              <b>{{ cv.title }}</b>
              <div class="text-xs text-gray-500">{{ cv.org }}</div>
            </div>
            <div class="text-xs text-gray-500">{{ cv.period }}</div>
          </div>
          <p class="text-sm mt-1 text-gray-600">{{ cv.detail }}</p>
        </div>

        <!-- Organisasi -->
        <div
          v-for="(cv, i) in tutor.cvList.filter((c) => c.type === 'organisasi')"
          :key="'organisasi-' + i"
          class="mb-4 pb-4 border-b"
        >
          <div class="flex items-start gap-2 mb-1">
            <span
              class="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded"
            >
              Organisasi
            </span>
          </div>
          <div class="flex justify-between text-sm mt-2">
            <div>
              <b>{{ cv.title }}</b>
              <div class="text-xs text-gray-500">{{ cv.org }}</div>
            </div>
            <div class="text-xs text-gray-500">{{ cv.period }}</div>
          </div>
          <p class="text-sm mt-1 text-gray-600">{{ cv.detail }}</p>
        </div>

        <!-- Pendidikan lainnya -->
        <div
          v-for="(cv, i) in tutor.cvList.filter(
            (c) => c.type !== 'pengalaman' && c.type !== 'organisasi'
          )"
          :key="'other-' + i"
          class="mb-4 pb-4 border-b last:border-0"
        >
          <div class="flex items-start gap-2 mb-1">
            <span
              class="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded"
            >
              Pendidikan
            </span>
          </div>
          <div class="flex justify-between text-sm mt-2">
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

      <!-- Data File (CV, KTP, Ijazah) -->
      <section class="bg-white p-6 rounded-xl shadow-sm">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-gray-800">Dokumen</h2>
        </div>

        <div class="space-y-3">
          <!-- CV -->
          <div
            class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-red-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">
                  Curriculum Vitae (CV)
                </p>
                <p class="text-xs text-gray-500">
                  {{
                    tutor.files.cv ? "File telah diunggah" : "Belum ada file"
                  }}
                </p>
              </div>
            </div>
            <a
              v-if="tutor.files.cv"
              :href="`http://localhost:8000/storage/${tutor.files.cv}`"
              target="_blank"
              class="text-sm text-primary hover:underline"
            >
              Lihat File
            </a>
            <span v-else class="text-xs text-gray-400">Tidak tersedia</span>
          </div>

          <!-- KTP -->
          <div
            class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">
                  Kartu Tanda Penduduk (KTP)
                </p>
                <p class="text-xs text-gray-500">
                  {{
                    tutor.files.ktp ? "File telah diunggah" : "Belum ada file"
                  }}
                </p>
              </div>
            </div>
            <a
              v-if="tutor.files.ktp"
              :href="`http://localhost:8000/storage/${tutor.files.ktp}`"
              target="_blank"
              class="text-sm text-primary hover:underline"
            >
              Lihat File
            </a>
            <span v-else class="text-xs text-gray-400">Tidak tersedia</span>
          </div>

          <!-- Ijazah -->
          <div
            class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">Ijazah Terakhir</p>
                <p class="text-xs text-gray-500">
                  {{
                    tutor.files.ijazah
                      ? "File telah diunggah"
                      : "Belum ada file"
                  }}
                </p>
              </div>
            </div>
            <a
              v-if="tutor.files.ijazah"
              :href="`http://localhost:8000/storage/${tutor.files.ijazah}`"
              target="_blank"
              class="text-sm text-primary hover:underline"
            >
              Lihat File
            </a>
            <span v-else class="text-xs text-gray-400">Tidak tersedia</span>
          </div>
        </div>
      </section>
    </main>

    <!-- Edit Modal -->
    <transition name="fade-scale">
      <div
        v-if="showEditModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="closeEditModal"
      >
        <div
          class="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div
            class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center"
          >
            <h3 class="text-xl font-semibold text-gray-800">
              {{ editModalTitle }}
            </h3>
            <button
              @click="closeEditModal"
              class="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div class="p-6">
            <!-- Edit Name -->
            <div v-if="editingSection === 'name'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                v-model="editForm.name"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Masukkan nama lengkap"
              />
              <p class="text-xs text-amber-600 mt-2">
                ⚠️ Perhatian: Nama hanya dapat diubah sekali dalam 7 hari.
              </p>
            </div>

            <!-- Edit About -->
            <div v-if="editingSection === 'about'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tentang Saya
              </label>
              <textarea
                v-model="editForm.about"
                rows="6"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ceritakan tentang diri Anda, pengalaman mengajar, dan keahlian Anda..."
              ></textarea>
            </div>

            <!-- Edit Skills -->
            <div v-if="editingSection === 'skills'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Keahlian & Mata Pelajaran
              </label>
              <div class="space-y-2 mb-3">
                <div
                  v-for="(skill, idx) in editForm.skills"
                  :key="idx"
                  class="flex gap-2"
                >
                  <input
                    v-model="editForm.skills[idx]"
                    type="text"
                    class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                    placeholder="Contoh: Matematika SMA"
                  />
                  <button
                    @click="removeSkill(idx)"
                    class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <button
                @click="addSkill"
                class="text-sm text-primary hover:underline"
              >
                + Tambah Keahlian
              </button>
            </div>

            <!-- Edit Schedule -->
            <div v-if="editingSection === 'schedule'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Jadwal Mengajar
              </label>
              <div class="space-y-3 mb-3">
                <div
                  v-for="(schedule, idx) in editForm.schedule"
                  :key="idx"
                  class="border rounded-lg p-3"
                >
                  <div class="grid grid-cols-3 gap-2 mb-2">
                    <input
                      v-model="schedule.day"
                      type="text"
                      class="border border-gray-300 rounded px-3 py-2"
                      placeholder="Hari"
                    />
                    <input
                      v-model="schedule.subject"
                      type="text"
                      class="border border-gray-300 rounded px-3 py-2"
                      placeholder="Mata Pelajaran"
                    />
                    <input
                      v-model="schedule.time"
                      type="text"
                      class="border border-gray-300 rounded px-3 py-2"
                      placeholder="Waktu"
                    />
                  </div>
                  <button
                    @click="removeSchedule(idx)"
                    class="text-sm text-red-600 hover:underline"
                  >
                    Hapus Jadwal
                  </button>
                </div>
              </div>
              <button
                @click="addSchedule"
                class="text-sm text-primary hover:underline"
              >
                + Tambah Jadwal
              </button>
            </div>

            <!-- Edit CV -->
            <div v-if="editingSection === 'cv'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Pendidikan & Pengalaman
              </label>
              <div class="space-y-3 mb-3">
                <div
                  v-for="(cv, idx) in editForm.cvList"
                  :key="idx"
                  class="border rounded-lg p-3"
                >
                  <div class="space-y-2">
                    <!-- Type Selection -->
                    <select
                      v-model="cv.type"
                      class="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="pengalaman">Pengalaman</option>
                      <option value="organisasi">Organisasi</option>
                      <option value="pendidikan">Pendidikan</option>
                    </select>
                    <input
                      v-model="cv.title"
                      type="text"
                      class="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Judul (contoh: S1 Pendidikan Matematika)"
                    />
                    <input
                      v-model="cv.org"
                      type="text"
                      class="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Institusi/Organisasi"
                    />
                    <input
                      v-model="cv.period"
                      type="text"
                      class="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Periode (contoh: 2018-2022)"
                    />
                    <textarea
                      v-model="cv.detail"
                      rows="2"
                      class="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Detail/deskripsi"
                    ></textarea>
                  </div>
                  <button
                    @click="removeCv(idx)"
                    class="text-sm text-red-600 hover:underline mt-2"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <button
                @click="addCv"
                class="text-sm text-primary hover:underline"
              >
                + Tambah Pendidikan/Pengalaman
              </button>
            </div>

            <!-- Edit Personal Data -->
            <div v-if="editingSection === 'personal'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin
                  </label>
                  <select
                    v-model="editForm.gender"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="pria">Pria</option>
                    <option value="wanita">Wanita</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Lahir
                  </label>
                  <input
                    v-model="editForm.dateOfBirth"
                    type="date"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    No. Telepon
                  </label>
                  <input
                    v-model="editForm.telephone"
                    type="tel"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Agama
                  </label>
                  <select
                    v-model="editForm.religion"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Pilih agama</option>
                    <option value="islam">Islam</option>
                    <option value="kristen">Kristen</option>
                    <option value="katolik">Katolik</option>
                    <option value="hindu">Hindu</option>
                    <option value="buddha">Buddha</option>
                    <option value="konghucu">Konghucu</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Edit Location -->
            <div v-if="editingSection === 'location'">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap
                  </label>
                  <textarea
                    v-model="editForm.address"
                    rows="3"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                    placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota, Provinsi"
                  ></textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Latitude
                    </label>
                    <input
                      v-model="editForm.latitude"
                      type="text"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                      placeholder="Contoh: -6.200000"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Longitude
                    </label>
                    <input
                      v-model="editForm.longitude"
                      type="text"
                      class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                      placeholder="Contoh: 106.816666"
                    />
                  </div>
                </div>
                <p class="text-xs text-gray-500">
                  💡 Tips: Anda bisa mendapatkan koordinat dari Google Maps
                  dengan klik kanan pada lokasi Anda
                </p>
              </div>
            </div>

            <!-- Edit Bank & Price -->
            <div v-if="editingSection === 'bank'">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Harga Per Pertemuan (Rp)
                  </label>
                  <input
                    v-model.number="editForm.price"
                    type="number"
                    min="0"
                    step="1000"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                    placeholder="Contoh: 75000"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nama Bank
                  </label>
                  <select
                    v-model="editForm.bankName"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Pilih Bank</option>
                    <option value="BCA">Bank BCA</option>
                    <option value="Mandiri">Bank Mandiri</option>
                    <option value="BNI">Bank BNI</option>
                    <option value="BRI">Bank BRI</option>
                    <option value="CIMB Niaga">CIMB Niaga</option>
                    <option value="BSI">Bank Syariah Indonesia (BSI)</option>
                    <option value="Permata">Bank Permata</option>
                    <option value="Danamon">Bank Danamon</option>
                    <option value="BTPN">Bank BTPN</option>
                    <option value="Lainnya">Bank Lainnya</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Rekening
                  </label>
                  <input
                    v-model="editForm.bankAccountNumber"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                    placeholder="Contoh: 1234567890"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pemilik Rekening
                  </label>
                  <input
                    v-model="editForm.bankAccountName"
                    type="text"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
                    placeholder="Sesuai dengan nama di buku rekening"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            class="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t"
          >
            <button
              @click="closeEditModal"
              class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              @click="saveEdit"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Pencil, LogOut } from "lucide-vue-next";

const router = useRouter();
const defaultPhoto = "https://i.pravatar.cc/150?img=64";
const photoInput = ref(null);

const tutor = ref({
  name: "Loading...",
  photo: "",
  role: "Tutor Privat",
  status: "verify", // bisa 'verify', 'active', atau 'rejected'
  about: "",
  tags: [],
  skills: [],
  schedule: [],
  cvList: [],
  lastNameEdit: null, // Timestamp terakhir edit nama
  files: {
    cv: null,
    ktp: null,
    ijazah: null,
  },
  // Personal data
  gender: "",
  dateOfBirth: "",
  telephone: "",
  religion: "",
  // Location
  address: "",
  latitude: "",
  longitude: "",
  // Bank & Price
  price: 0,
  bankName: "",
  bankAccountNumber: "",
  bankAccountName: "",
});

const showSplash = ref(false);
const loading = ref(true);
const showEditModal = ref(false);
const editingSection = ref("");
const editForm = ref({
  name: "",
  about: "",
  skills: [],
  schedule: [],
  cvList: [],
  // Personal data
  gender: "",
  dateOfBirth: "",
  telephone: "",
  religion: "",
  // Location
  address: "",
  latitude: "",
  longitude: "",
  // Bank & Price
  price: 0,
  bankName: "",
  bankAccountNumber: "",
  bankAccountName: "",
});

const canEditName = computed(() => {
  if (!tutor.value.lastNameEdit) return true;

  const lastEdit = new Date(tutor.value.lastNameEdit);
  const now = new Date();
  const diffDays = Math.floor((now - lastEdit) / (1000 * 60 * 60 * 24));

  return diffDays >= 7;
});

const nextEditDate = computed(() => {
  if (!tutor.value.lastNameEdit) return "";

  const lastEdit = new Date(tutor.value.lastNameEdit);
  const nextEdit = new Date(lastEdit);
  nextEdit.setDate(nextEdit.getDate() + 7);

  return nextEdit.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

const editModalTitle = computed(() => {
  const titles = {
    name: "Edit Nama",
    about: "Edit Tentang Saya",
    skills: "Edit Keahlian & Mata Pelajaran",
    schedule: "Edit Jadwal Mengajar",
    cv: "Edit Pendidikan & Pengalaman",
    personal: "Edit Data Pribadi",
    location: "Edit Lokasi & Alamat",
    bank: "Edit Harga & Data Bank",
  };
  return titles[editingSection.value] || "Edit Profil";
});

// Fetch data tutor dari backend
onMounted(async () => {
  await fetchTutorProfile();

  // Check status and redirect accordingly
  const status = tutor.value.status?.toLowerCase();
  if (status === "active" || status === "approved") {
    console.log("Tutor approved, redirecting to dashboard");
    router.push("/tutor/dashboard");
    return;
  } else if (status === "rejected") {
    console.log("Tutor rejected, redirecting to rejected page");
    router.push("/tutor/rejected");
    return;
  }

  // Splash muncul otomatis kalau status verify/pending
  if (tutor.value.status === "verify") {
    setTimeout(() => {
      showSplash.value = true;
    }, 800);
  }

  // Auto-check status setiap 30 detik untuk mendeteksi perubahan dari admin
  const statusCheckInterval = setInterval(async () => {
    await fetchTutorProfile();
    const currentStatus = tutor.value.status?.toLowerCase();

    if (currentStatus === "active" || currentStatus === "approved") {
      clearInterval(statusCheckInterval);
      console.log("Status changed to approved, redirecting...");
      router.push("/tutor/dashboard");
    } else if (currentStatus === "rejected") {
      clearInterval(statusCheckInterval);
      console.log("Status changed to rejected, redirecting...");
      router.push("/tutor/rejected");
    }
  }, 30000); // Check every 30 seconds

  // Clear interval when component unmounts
  onBeforeUnmount(() => {
    clearInterval(statusCheckInterval);
  });
});

async function fetchTutorProfile() {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Ambil data user dan tutor dari API
    const response = await axios.get("http://localhost:8000/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data.user || response.data;
    console.log("User data:", userData);
    console.log("Tutor data:", userData.tutor);

    // Update tutor profile
    tutor.value.name = userData.name || "Tutor";

    // Handle photo URL - jika path saja, tambahkan base URL
    let photoUrl = userData.profile_photo_url || userData.photo || "";
    if (photoUrl && !photoUrl.startsWith("http")) {
      // Jika hanya path (misalnya: tutor/photos/xxx.jpg), buat full URL
      photoUrl = `http://localhost:8000/storage/${photoUrl}`;
    }
    tutor.value.photo = photoUrl;

    tutor.value.role = "Tutor Privat Bimbel Lazuardy";
    tutor.value.lastNameEdit = userData.last_name_edit || null;

    // Jika ada data tutor
    if (userData.tutor) {
      const tutorData = userData.tutor;

      // Status tutor
      const status = tutorData.status?.value || tutorData.status || "verify";
      tutor.value.status = status;

      // Keahlian sebagai tag utama
      if (tutorData.keahlian) {
        tutor.value.tags = [tutorData.keahlian];
        tutor.value.skills = [tutorData.keahlian];
      }

      // Market siswa
      if (tutorData.market_siswa) {
        tutor.value.tags.push(tutorData.market_siswa.toUpperCase());

        // Tambahkan market siswa ke skills juga
        if (!tutor.value.skills.includes(tutorData.market_siswa)) {
          tutor.value.skills.push(tutorData.market_siswa);
        }
      }

      // Skill bahasa
      if (tutorData.skil_bahasa) {
        if (!tutor.value.skills.includes(tutorData.skil_bahasa)) {
          tutor.value.skills.push(tutorData.skil_bahasa);
        }
      }

      // Description
      tutor.value.about = tutorData.description || tutorData.pengalaman || "";

      // Schedule dari learning_method (JSON string)
      tutor.value.schedule = [];
      if (tutorData.learning_method) {
        try {
          const scheduleData =
            typeof tutorData.learning_method === "string"
              ? JSON.parse(tutorData.learning_method)
              : tutorData.learning_method;

          if (Array.isArray(scheduleData)) {
            tutor.value.schedule = scheduleData;
          }
        } catch (e) {
          console.error("Failed to parse schedule:", e);
        }
      }

      // CV List dari experience, education, dll
      tutor.value.cvList = [];

      // Pengalaman dari register lanjutan
      if (tutorData.pengalaman) {
        tutor.value.cvList.push({
          type: "pengalaman",
          title: "Pengalaman Mengajar",
          org: tutorData.keahlian || "Mengajar",
          period: "-",
          detail: tutorData.pengalaman,
        });
      }

      // Organisasi dari register lanjutan
      if (tutorData.organisasi) {
        tutor.value.cvList.push({
          type: "organisasi",
          title: "Organisasi",
          org: tutorData.organisasi,
          period: "-",
          detail: tutorData.skil_bahasa
            ? `Bahasa: ${tutorData.skil_bahasa}`
            : "",
        });
      }

      // Education jika ada (dari update profil)
      if (tutorData.education && Array.isArray(tutorData.education)) {
        tutorData.education.forEach((edu) => {
          tutor.value.cvList.push({
            type: edu.type || "pendidikan",
            title: edu.title || edu.degree || "Pendidikan",
            org: edu.org || edu.institution || "",
            period: edu.period || edu.year || "",
            detail: edu.detail || edu.description || "",
          });
        });
      }

      // File paths dari register lanjutan
      tutor.value.files = {
        cv: tutorData.cv_path || null,
        ktp: tutorData.ktp_path || null,
        ijazah: tutorData.ijazah_path || null,
      };

      // Personal data
      tutor.value.price = tutorData.price || 0;
      tutor.value.bankName = tutorData.bank_name || "";
      tutor.value.bankAccountNumber = tutorData.bank_account_number || "";
      tutor.value.bankAccountName = tutorData.bank_account_name || "";
    }

    // Personal data dari user
    tutor.value.gender = userData.gender || "";
    tutor.value.dateOfBirth = userData.date_of_birth || "";
    tutor.value.telephone = userData.telephone_number || "";
    tutor.value.religion = userData.religion || "";
    tutor.value.latitude = userData.latitude || "";
    tutor.value.longitude = userData.longitude || "";

    // Address dari home_address JSON
    if (userData.home_address) {
      try {
        const addressData =
          typeof userData.home_address === "string"
            ? JSON.parse(userData.home_address)
            : userData.home_address;

        tutor.value.address = addressData.address || "";
      } catch (e) {
        console.error("Failed to parse home_address:", e);
        tutor.value.address = "";
      }
    }

    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch tutor profile:", error);
    loading.value = false;

    // Jika unauthorized, redirect ke login
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      router.push("/login");
    }
  }
}

function closeSplash() {
  showSplash.value = false;
}

function triggerPhotoUpload() {
  photoInput.value?.click();
}

async function handlePhotoChange(event) {
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

  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      alert("Sesi login tidak ditemukan. Silakan login ulang.");
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    const response = await axios.post(
      "http://localhost:8000/api/tutor/upload-photo",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload photo response:", response.data);

    // Update photo URL - gunakan photo_url dari response
    if (response.data.photo_url) {
      tutor.value.photo = response.data.photo_url;

      // Update localStorage juga
      const authUser = JSON.parse(localStorage.getItem("auth_user") || "{}");
      authUser.profile_photo_url = response.data.photo_url;
      localStorage.setItem("auth_user", JSON.stringify(authUser));

      alert("Foto profil berhasil diperbarui!");
    } else if (response.data.photo_path) {
      // Fallback: buat URL dari photo_path
      const photoUrl = `http://localhost:8000/storage/${response.data.photo_path}`;
      tutor.value.photo = photoUrl;

      const authUser = JSON.parse(localStorage.getItem("auth_user") || "{}");
      authUser.profile_photo_url = photoUrl;
      localStorage.setItem("auth_user", JSON.stringify(authUser));

      alert("Foto profil berhasil diperbarui!");
    }
  } catch (error) {
    console.error("Failed to upload photo:", error);
    alert(
      error.response?.data?.message ||
        "Gagal mengunggah foto. Silakan coba lagi."
    );
  }
}

function editName() {
  if (!canEditName.value) {
    alert(
      `Nama hanya dapat diubah sekali dalam 7 hari. Anda dapat mengubah nama kembali pada ${nextEditDate.value}`
    );
    return;
  }

  editingSection.value = "name";
  editForm.value.name = tutor.value.name;
  showEditModal.value = true;
}

function editSection(section) {
  editingSection.value = section;

  // Copy current data to edit form
  if (section === "about") {
    editForm.value.about = tutor.value.about || "";
  } else if (section === "skills") {
    editForm.value.skills = [...tutor.value.skills];
    if (editForm.value.skills.length === 0) {
      editForm.value.skills.push("");
    }
  } else if (section === "schedule") {
    editForm.value.schedule =
      tutor.value.schedule.length > 0
        ? JSON.parse(JSON.stringify(tutor.value.schedule))
        : [{ day: "", subject: "", time: "" }];
  } else if (section === "cv") {
    editForm.value.cvList =
      tutor.value.cvList.length > 0
        ? JSON.parse(JSON.stringify(tutor.value.cvList))
        : [{ title: "", org: "", period: "", detail: "" }];
  } else if (section === "personal") {
    editForm.value.gender = tutor.value.gender || "";
    editForm.value.dateOfBirth = tutor.value.dateOfBirth || "";
    editForm.value.telephone = tutor.value.telephone || "";
    editForm.value.religion = tutor.value.religion || "";
  } else if (section === "location") {
    editForm.value.address = tutor.value.address || "";
    editForm.value.latitude = tutor.value.latitude || "";
    editForm.value.longitude = tutor.value.longitude || "";
  } else if (section === "bank") {
    editForm.value.price = tutor.value.price || 0;
    editForm.value.bankName = tutor.value.bankName || "";
    editForm.value.bankAccountNumber = tutor.value.bankAccountNumber || "";
    editForm.value.bankAccountName = tutor.value.bankAccountName || "";
  }

  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
  editingSection.value = "";
}

// Skills functions
function addSkill() {
  editForm.value.skills.push("");
}

function removeSkill(index) {
  editForm.value.skills.splice(index, 1);
}

// Schedule functions
function addSchedule() {
  editForm.value.schedule.push({ day: "", subject: "", time: "" });
}

function removeSchedule(index) {
  editForm.value.schedule.splice(index, 1);
}

// CV functions
function addCv() {
  editForm.value.cvList.push({
    type: "pendidikan",
    title: "",
    org: "",
    period: "",
    detail: "",
  });
}

function removeCv(index) {
  editForm.value.cvList.splice(index, 1);
}

async function handleLogout() {
  try {
    const token = localStorage.getItem("auth_token");

    if (token) {
      // Call logout endpoint
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Tetap lanjutkan logout meskipun ada error dari server
  } finally {
    // Hanya hapus token, jangan hapus auth_user agar data tidak hilang
    localStorage.removeItem("auth_token");

    // Redirect ke login
    router.push("/login");
  }
}

async function saveEdit() {
  try {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      alert("Sesi login tidak ditemukan. Silakan login ulang.");
      router.push("/login");
      return;
    }

    let updateData = {};

    if (editingSection.value === "name") {
      if (!editForm.value.name.trim()) {
        alert("Nama tidak boleh kosong.");
        return;
      }

      if (!canEditName.value) {
        alert(`Nama hanya dapat diubah sekali dalam 7 hari.`);
        return;
      }

      updateData.name = editForm.value.name.trim();
    } else if (editingSection.value === "about") {
      updateData.description = editForm.value.about;
    } else if (editingSection.value === "skills") {
      // Filter empty skills
      const validSkills = editForm.value.skills.filter((s) => s.trim() !== "");
      updateData.skills = validSkills;
      // Update keahlian dengan skill pertama
      if (validSkills.length > 0) {
        updateData.keahlian = validSkills[0];
      }
    } else if (editingSection.value === "schedule") {
      // Filter empty schedules
      const validSchedules = editForm.value.schedule.filter(
        (s) => s.day && s.subject && s.time
      );
      updateData.schedule = validSchedules;
    } else if (editingSection.value === "cv") {
      // Filter empty cv entries
      const validCvList = editForm.value.cvList.filter(
        (cv) => cv.title || cv.org || cv.detail
      );
      updateData.education = validCvList;
    } else if (editingSection.value === "personal") {
      updateData.gender = editForm.value.gender;
      updateData.date_of_birth = editForm.value.dateOfBirth;
      updateData.telephone_number = editForm.value.telephone;
      updateData.religion = editForm.value.religion;
    } else if (editingSection.value === "location") {
      updateData.address = editForm.value.address;
      updateData.latitude = editForm.value.latitude;
      updateData.longitude = editForm.value.longitude;
    } else if (editingSection.value === "bank") {
      updateData.price = editForm.value.price;
      updateData.bank_name = editForm.value.bankName;
      updateData.bank_account_number = editForm.value.bankAccountNumber;
      updateData.bank_account_name = editForm.value.bankAccountName;
    }

    console.log("Sending update data:", updateData);

    // Send update to backend
    const response = await axios.patch(
      "http://localhost:8000/api/tutor/profile",
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Update response:", response.data);

    // Tutup modal dulu
    closeEditModal();

    // Alert berhasil
    alert("Profil berhasil diperbarui!");

    // Refetch data dari backend untuk memastikan UI sinkron dengan database
    await fetchTutorProfile();
  } catch (error) {
    console.error("Failed to update profile:", error);
    console.error("Error details:", error.response?.data);
    alert(
      error.response?.data?.message ||
        "Gagal memperbarui profil. Silakan coba lagi."
    );
  }
}

const progress = computed(() => {
  let filled = 0;
  const sections = 5; // Total 5 sections

  if (tutor.value.about) filled += 1;
  if (tutor.value.skills.length) filled += 1;
  if (tutor.value.schedule.length) filled += 1;
  if (tutor.value.cvList.length) filled += 1;

  // Check if at least one file is uploaded
  const hasFiles =
    tutor.value.files.cv || tutor.value.files.ktp || tutor.value.files.ijazah;
  if (hasFiles) filled += 1;

  return Math.round((filled / sections) * 100);
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
