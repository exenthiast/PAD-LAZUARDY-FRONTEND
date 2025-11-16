<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- MAIN -->
    <main class="flex-1 py-8 px-6">
      <!-- Header with Back Button -->
      <div class="max-w-6xl mx-auto mb-6">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-[#41a6c2] hover:text-[#359299] font-medium mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali
        </button>

        <h1 class="text-3xl font-bold text-[#41a6c2]">Ajuan Belajar</h1>
      </div>

      <!-- Student Request Cards -->
      <div class="max-w-6xl mx-auto space-y-6">
        <div
          v-for="student in students"
          :key="student.id"
          class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
        >
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Student Photo -->
            <div class="flex-shrink-0">
              <img
                :src="student.photo"
                :alt="student.name"
                class="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
              />
            </div>

            <!-- Student Info -->
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                {{ student.name }}
              </h3>

              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-[#41a6c2]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span class="font-medium">{{ student.subject }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-[#41a6c2]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>{{ student.level }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-[#41a6c2]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{{ student.schedule }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-[#41a6c2]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>{{ student.phone }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-[#41a6c2]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <a
                    :href="student.mapsLink"
                    target="_blank"
                    rel="noopener"
                    class="text-[#41a6c2] hover:underline"
                  >
                    Link GMaps
                  </a>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex md:flex-col gap-3 justify-end items-end">
              <button
                @click="handleReject(student.id)"
                class="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition w-full md:w-auto"
              >
                Tolak
              </button>
              <button
                @click="handleAccept(student.id)"
                class="px-6 py-2 bg-[#41a6c2] text-white rounded-lg font-semibold hover:bg-[#359299] transition w-full md:w-auto"
              >
                Terima
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="students.length === 0"
          class="bg-white rounded-2xl shadow-md p-12 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p class="text-gray-500 text-lg">Belum ada ajuan belajar</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Dummy data siswa yang mengajukan belajar
const students = ref([
  {
    id: 1,
    name: "Alief",
    photo: "https://i.pravatar.cc/150?img=1",
    subject: "Matematika",
    level: "SMA Kelas 11",
    schedule: "Selasa, 30 September 2025",
    phone: "(+62) 8955086880",
    mapsLink: "https://maps.google.com/?q=-6.200000,106.816666",
  },
  {
    id: 2,
    name: "Siti Aisyah",
    photo: "https://i.pravatar.cc/150?img=5",
    subject: "Matematika",
    level: "SMA Kelas 11",
    schedule: "Selasa, 30 September 2025",
    phone: "(+62) 8955086880",
    mapsLink: "https://maps.google.com/?q=-6.200000,106.816666",
  },
  {
    id: 3,
    name: "Budi Santoso",
    photo: "https://i.pravatar.cc/150?img=12",
    subject: "Matematika",
    level: "SMA Kelas 11",
    schedule: "Selasa, 30 September 2025",
    phone: "(+62) 8955086880",
    mapsLink: "https://maps.google.com/?q=-6.200000,106.816666",
  },
]);

const goBack = () => {
  router.push("/tutor/dashboard");
};

const handleAccept = (studentId) => {
  if (confirm("Apakah Anda yakin ingin menerima ajuan belajar ini?")) {
    // TODO: Implement API call to accept request
    const student = students.value.find((s) => s.id === studentId);
    alert(`Ajuan dari ${student.name} telah diterima!`);

    // Remove from list after accepting
    students.value = students.value.filter((s) => s.id !== studentId);
  }
};

const handleReject = (studentId) => {
  if (confirm("Apakah Anda yakin ingin menolak ajuan belajar ini?")) {
    // TODO: Implement API call to reject request
    const student = students.value.find((s) => s.id === studentId);
    alert(`Ajuan dari ${student.name} telah ditolak.`);

    // Remove from list after rejecting
    students.value = students.value.filter((s) => s.id !== studentId);
  }
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
