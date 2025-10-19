<template>
  <div>
    <!-- NAVBAR -->
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'backdrop-blur-md shadow-lg'
          : 'bg-[#41a6c2] shadow-sm',
      ]"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <!-- Left: Hamburger + Logo -->
        <div class="flex items-center gap-3">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <img src="@/assets/logo.svg" alt="Bimbel Lazuardy" class="" />
        </div>

        <!-- Right: Notification + Profile -->
        <div class="flex items-center gap-3">
          <!-- Notification Button -->
          <button
            @click="toggleNotification"
            class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <!-- Notification Badge -->
            <span
              v-if="notificationCount > 0"
              class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
            ></span>
          </button>

          <!-- Profile Button -->
          <button
            @click="toggleProfileMenu"
            class="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Profile"
          >
            <div
              class="w-8 h-8 bg-white rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-teal-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
    <div class="h-16" aria-hidden="true"></div>

    <!-- LEFT SIDEBAR (Hamburger Menu) -->
    <transition name="slide-left">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 flex"
        @click.self="closeSidebar"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50" @click="closeSidebar"></div>

        <!-- Sidebar Content -->
        <div class="relative w-64 bg-white h-full shadow-xl flex flex-col">
          <!-- Header -->
          <div
            class="p-4 border-b flex items-center justify-between bg-teal-500 text-white"
          >
            <h2 class="text-lg font-semibold">Menu</h2>
            <button @click="closeSidebar" class="p-1 hover:bg-white/10 rounded">
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
          </div>

          <!-- Menu Items -->
          <nav class="flex-1 overflow-y-auto p-4">
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span class="font-medium text-gray-700">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span class="font-medium text-gray-700">Jadwal Belajar</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span class="font-medium text-gray-700">Tutor</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span class="font-medium text-gray-700">Paket Belajar</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <svg
                    class="w-5 h-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span class="font-medium text-gray-700"
                    >Riwayat Pembayaran</span
                  >
                </a>
              </li>
            </ul>
          </nav>

          <!-- Footer -->
          <div class="p-4 border-t">
            <button
              class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- RIGHT SIDEBAR (Notifications) -->
    <transition name="slide-right">
      <div
        v-if="notificationOpen"
        class="fixed inset-0 z-40 flex justify-end"
        @click.self="closeNotification"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/50" @click="closeNotification"></div>

        <!-- Notification Content -->
        <div class="relative w-80 bg-white h-full shadow-xl flex flex-col">
          <!-- Header -->
          <div
            class="p-4 border-b flex items-center justify-between bg-teal-500 text-white"
          >
            <h2 class="text-lg font-semibold">Notifikasi</h2>
            <button
              @click="closeNotification"
              class="p-1 hover:bg-white/10 rounded"
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
          </div>

          <!-- Notification List -->
          <div class="flex-1 overflow-y-auto">
            <div
              v-if="notifications.length === 0"
              class="p-8 text-center text-gray-400"
            >
              <svg
                class="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p>Tidak ada notifikasi</p>
            </div>

            <div v-else class="divide-y">
              <div
                v-for="notif in notifications"
                :key="notif.id"
                class="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div class="flex gap-3">
                  <div class="flex-shrink-0">
                    <div
                      class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">
                      {{ notif.title }}
                    </p>
                    <p class="text-sm text-gray-500 mt-1">
                      {{ notif.message }}
                    </p>
                    <p class="text-xs text-gray-400 mt-2">{{ notif.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- PROFILE DROPDOWN -->
    <transition name="fade">
      <div
        v-if="profileMenuOpen"
        class="fixed inset-0 z-30"
        @click="closeProfileMenu"
      >
        <div
          class="absolute top-16 right-4 w-64 bg-white rounded-lg shadow-xl border"
        >
          <!-- Profile Info -->
          <div class="p-4 border-b bg-teal-50">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold"
              >
                JD
              </div>
              <div>
                <p class="font-semibold text-gray-900">John Doe</p>
                <p class="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>
          </div>

          <!-- Menu Items -->
          <div class="py-2">
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span class="text-gray-700">Profil Saya</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="text-gray-700">Pengaturan</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-gray-700">Bantuan</span>
            </a>
          </div>

          <!-- Logout -->
          <div class="border-t py-2">
            <button
              class="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Scroll state
const isScrolled = ref(false);

// Sidebar states
const sidebarOpen = ref(false);
const notificationOpen = ref(false);
const profileMenuOpen = ref(false);

// Notification data
const notificationCount = ref(3);
const notifications = ref([
  {
    id: 1,
    title: "Jadwal Belajar Baru",
    message: "Anda memiliki jadwal belajar Matematika besok jam 14.00",
    time: "5 menit yang lalu",
  },
  {
    id: 2,
    title: "Pembayaran Berhasil",
    message: "Pembayaran paket Premium berhasil diproses",
    time: "1 jam yang lalu",
  },
  {
    id: 3,
    title: "Pesan dari Tutor",
    message: "Budi Santoso mengirim pesan kepada Anda",
    time: "2 jam yang lalu",
  },
]);

// Toggle functions
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  if (sidebarOpen.value) {
    notificationOpen.value = false;
    profileMenuOpen.value = false;
  }
};

const toggleNotification = () => {
  notificationOpen.value = !notificationOpen.value;
  if (notificationOpen.value) {
    sidebarOpen.value = false;
    profileMenuOpen.value = false;
    notificationCount.value = 0; // Mark as read
  }
};

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value;
  if (profileMenuOpen.value) {
    sidebarOpen.value = false;
    notificationOpen.value = false;
  }
};

// Close functions
const closeSidebar = () => {
  sidebarOpen.value = false;
};

const closeNotification = () => {
  notificationOpen.value = false;
};

const closeProfileMenu = () => {
  profileMenuOpen.value = false;
};

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Lifecycle
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Slide transitions for sidebars */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Fade transition for profile dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
