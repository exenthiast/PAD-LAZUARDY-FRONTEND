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
            class="p-2 rounded-lg hover:bg-black/10 transition-colors flex flex-col justify-center"
            aria-label="Menu"
          >
            <span
              class="hamburger-line block w-7 h-[3px] bg-black rounded"
              :class="sidebarOpen ? 'translate-y-[8px] rotate-45' : ''"
            ></span>

            <span
              class="hamburger-line block w-7 h-[3px] bg-black rounded my-[5px]"
              :class="sidebarOpen ? 'opacity-0' : 'opacity-100'"
            ></span>

            <span
              class="hamburger-line block w-7 h-[3px] bg-black rounded"
              :class="sidebarOpen ? '-translate-y-[8px] -rotate-45' : ''"
            ></span>
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
              class="w-8 h-8 bg-gray rounded-full flex items-center justify-center"
            >
              <CircleUser class="w-6 h-6" />
            </div>

            <!-- Profile Tooltip on Hover -->
            <transition name="fade">
              <div
                v-if="showProfileTooltip"
                class="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-4 z-50"
              >
                <div
                  v-if="isLoadingProfile"
                  class="flex items-center justify-center py-4"
                >
                  <div
                    class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"
                  ></div>
                </div>
                <div v-else class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden"
                  >
                    <img
                      v-if="student.photo"
                      :src="student.photo"
                      :alt="student.name"
                      class="w-full h-full object-cover"
                      @error="
                        (e) => (e.target.src = 'https://via.placeholder.com/80')
                      "
                    />
                    <span v-else class="text-lg">{{
                      student.name.charAt(0)
                    }}</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">
                      {{ student.name }}
                    </p>
                    <p class="text-sm text-gray-500">{{ student.email }}</p>
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
    <SidebarLeft
      :isOpen="sidebarOpen"
      :active="activeMenu"
      @close="closeSidebar"
    />

    <!-- RIGHT SIDEBAR (Notifications) Component -->
    <SidebarRight :isOpen="notificationOpen" @close="closeNotification" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Bell } from "lucide-vue-next";
import { CircleUser } from "lucide-vue-next";
import SidebarLeft from "./sidebar-left.vue";
import SidebarRight from "./sidebar-right.vue";
// import api from "@/services/http"; // sesuaikan dengan path service Anda

const router = useRouter();
const route = useRoute();

// Detect active menu based on current route
const activeMenu = computed(() => {
  const path = route.path;
  if (path.includes("/student/dashboard")) return "dashboard";
  if (path.includes("/package") || path.includes("/packages")) return "paket";
  if (path.includes("/contact")) return "hubungi";
  if (path.includes("/about")) return "tentang";
  return "";
});

// Scroll state
const isScrolled = ref(false);

const navHeight = "75px";

// Sidebar states
const sidebarOpen = ref(false);
const notificationOpen = ref(false);
const showProfileTooltip = ref(false);

// Notification count
const notificationCount = ref(7);

// Student data from API
const student = ref({
  name: "Loading...",
  email: "Loading...",
  photo: "https://via.placeholder.com/80",
  address: "",
  phone: "",
  class: "",
  school: "",
  progress: 0,
});

const isLoadingProfile = ref(false);

// Fetch profile data from API
const fetchProfileData = async () => {
  try {
    isLoadingProfile.value = true;
    // Ganti endpoint sesuai API Anda
    const response = await api.get("/student/profile-student");

    // Update student data dengan response dari API
    student.value = {
      name: response.data.name || "User",
      email: response.data.email || "",
      photo: response.data.photo || "https://via.placeholder.com/80",
      address: response.data.address || "",
      phone: response.data.phone || "",
      class: response.data.class || "",
      school: response.data.school || "",
      progress: response.data.progress || 0,
    };
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    // Fallback ke data dummy jika API gagal
    student.value = {
      name: "Alief Muhammad Latif",
      email: "alief@example.com",
      photo: "https://via.placeholder.com/80",
      address: "Jl. Merdeka No. 45, Bandung",
      phone: "081234567890",
      class: "SMA Kelas 12",
      school: "Bimbel Lazuardy",
      progress: 75,
    };
  } finally {
    isLoadingProfile.value = false;
  }
};

// Toggle functions
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
  if (sidebarOpen.value) {
    notificationOpen.value = false;
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
  }
};

const handleProfileClick = () => {
  showProfileTooltip.value = false;
  router.push("/student/profile-student");
};

// Close functions
const closeSidebar = () => {
  sidebarOpen.value = false;
};

const closeNotification = () => {
  notificationOpen.value = false;
};

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Lifecycle
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // Fetch profile data saat component mounted
  fetchProfileData();
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

.hamburger-line {
  transition-property: transform, opacity;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
