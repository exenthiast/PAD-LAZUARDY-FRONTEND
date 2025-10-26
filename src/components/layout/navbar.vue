<template>
  <div :style="{ '--nav-h': navHeight }">
    <!-- NAVBAR -->
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'backdrop-blur-md shadow-lg' : 'bg-[#41a6c2] shadow-sm',
      ]"
      :style="{ height: 'var(--nav-h)' }"
    >
      <div
        class="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        :style="{ height: 'var(--nav-h)' }"
      >
        <!-- Left: Hamburger + Logo -->
        <div class="flex items-center gap-3">
          <button
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-black/10 transition-colors"
            aria-label="Menu"
          >
            <MenuIcon class="w-6 h-6 text-black" />
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
            <Bell class="w-6 h-6 text-black" />
            <!-- Notification Badge -->
            <span
              v-if="notificationCount > 0"
              class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
            ></span>
          </button>

          <!-- Profile Button -->
          <button
            @click="handleProfileClick"
            @mouseenter="showProfileTooltip = true"
            @mouseleave="showProfileTooltip = false"
            class="relative flex items-center gap-2 p-1 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Profile"
          >
            <div
              class="w-8 h-8 bg-black rounded-full flex items-center justify-center"
            >
              <CircleUserRound class="w-6 h-6 " />
            </div>

            <!-- Profile Tooltip on Hover -->
            <transition name="fade">
              <div
                v-if="showProfileTooltip"
                class="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-4 z-50"
              >
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
            </transition>
          </button>
        </div>
      </div>
    </header>
    <div
      class="h-16"
      aria-hidden="true"
      :style="{ height: 'var(--nav-h)' }"
    ></div>

    <!-- LEFT SIDEBAR Component -->
    <SidebarLeft :isOpen="sidebarOpen" @close="closeSidebar" />

    <!-- RIGHT SIDEBAR (Notifications) Component -->
    <SidebarRight :isOpen="notificationOpen" @close="closeNotification" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Menu as MenuIcon } from "lucide-vue-next";
import { Bell } from "lucide-vue-next";
import { CircleUserRound } from 'lucide-vue-next';
import SidebarLeft from "./sidebar-left.vue";
import SidebarRight from "./sidebar-right.vue";

const router = useRouter();

// Scroll state
const isScrolled = ref(false);

const navHeight = "75px";

// Sidebar states
const sidebarOpen = ref(false);
const notificationOpen = ref(false);
const profileMenuOpen = ref(false);
const showProfileTooltip = ref(false);

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

const handleProfileClick = () => {
  showProfileTooltip.value = false;
  router.push("/profile-student");
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
