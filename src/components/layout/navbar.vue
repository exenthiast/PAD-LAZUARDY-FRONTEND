<template>
  <div>
    <!-- NAVBAR -->
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'backdrop-blur-md shadow-lg' : 'bg-[#41a6c2] shadow-sm',
      ]"
    >
      <div
        class="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <!-- Left: Hamburger + Logo -->
        <div class="flex items-center gap-3">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-black/10 transition-colors"
            aria-label="Menu"
          >
            <svg
              class="w-6 h-6 text-black"
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
            @click.stop="toggleNotification"
            class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <svg
              class="w-6 h-6 text-black"
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
            class="flex items-center gap-2 p-1 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Profile"
          >
            <div
              class="w-8 h-8 bg-white rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-teal-600"
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

    <!-- LEFT SIDEBAR Component -->
    <SidebarLeft :isOpen="sidebarOpen" @close="closeSidebar" />

    <!-- RIGHT SIDEBAR (Notifications) Component -->
    <SidebarRight :isOpen="notificationOpen" @close="closeNotification" />

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
import SidebarLeft from "./sidebar-left.vue";
import SidebarRight from "./sidebar-right.vue";

// Scroll state
const isScrolled = ref(false);

// Sidebar states
const sidebarOpen = ref(false);
const notificationOpen = ref(false);
const profileMenuOpen = ref(false);

// Notification count
const notificationCount = ref(7);

// Toggle functions
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  if (sidebarOpen.value) {
    notificationOpen.value = false;
    profileMenuOpen.value = false;
  }
};

const toggleNotification = () => {
  console.log(
    "Toggle notification clicked, current state:",
    notificationOpen.value
  );
  notificationOpen.value = !notificationOpen.value;
  console.log("New state:", notificationOpen.value);
  if (notificationOpen.value) {
    sidebarOpen.value = false;
    profileMenuOpen.value = false;
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
/* Slide transitions for left sidebar */
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
