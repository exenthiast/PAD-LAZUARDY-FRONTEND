<template>
  <div :style="{ '--nav-h': navHeight }">
    <!-- NAVBAR -->
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'pt-4' : '',
      ]"
    >
      <div
        :class="[
          'transition-all duration-300 flex items-center justify-between px-6',
          isScrolled
            ? 'max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-full h-16'
            : 'max-w-full bg-white shadow-sm',
        ]"
        :style="isScrolled ? '' : { height: 'var(--nav-h)' }"
      >
        <!-- Left: Hamburger + Logo -->
        <div class="flex items-center gap-3">
          <button
            @click="toggleSidebar"
            :class="[
              'p-2 rounded-lg hover:bg-black/10 transition-all duration-300 flex flex-col justify-center',
            ]"
            aria-label="Menu"
          >
            <span
              :class="[
                'hamburger-line block w-7 h-[3px] rounded transition-all duration-300',
                isScrolled ? 'bg-[#41a6c2]' : 'bg-black',
                sidebarOpen ? 'translate-y-[8px] rotate-45' : '',
              ]"
            ></span>

            <span
              :class="[
                'hamburger-line block w-7 h-[3px] rounded my-[5px] transition-all duration-300',
                isScrolled ? 'bg-[#41a6c2]' : 'bg-black',
                sidebarOpen ? 'opacity-0' : 'opacity-100',
              ]"
            ></span>

            <span
              :class="[
                'hamburger-line block w-7 h-[3px] rounded transition-all duration-300',
                isScrolled ? 'bg-[#41a6c2]' : 'bg-black',
                sidebarOpen ? '-translate-y-[8px] -rotate-45' : '',
              ]"
            ></span>
          </button>
          <img
            src="@/assets/logo2.svg"
            alt="Bimbel Lazuardy"
            :class="[
              'transition-all duration-300',
              isScrolled ? 'h-8' : 'h-10',
            ]"
            @error="handleLogoError"
          />
        </div>

        <!-- Right: Notification + Profile -->
        <div class="flex items-center gap-3">
          <!-- Notification Button -->
          <button
            @click.stop="toggleNotification"
            class="relative p-2 rounded-lg hover:bg-black/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell
              :class="[
                'w-6 h-6 transition-colors',
                isScrolled ? 'text-[#41a6c2]' : 'text-black',
              ]"
            />
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
            class="relative p-2 rounded-lg hover:bg-black/10 transition-colors"
            aria-label="Profile"
          >
            <!-- Always show CircleUser icon -->
            <CircleUser
              :class="[
                'w-6 h-6 transition-colors',
                isScrolled ? 'text-[#41a6c2]' : 'text-black',
              ]"
            />

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
                    class="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden"
                    :class="
                      student.photo && student.photo !== 'default'
                        ? ''
                        : 'bg-teal-500'
                    "
                  >
                    <img
                      v-if="student.photo && student.photo !== 'default'"
                      :src="student.photo"
                      :alt="student.name"
                      class="w-full h-full object-cover"
                      @error="handlePhotoError"
                    />
                    <span v-else class="text-lg">{{
                      student.name.charAt(0).toUpperCase()
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
      class="transition-all duration-300"
      aria-hidden="true"
      :style="{ height: isScrolled ? '80px' : 'var(--nav-h)' }"
    ></div>

    <!-- LEFT SIDEBAR Component -->
    <SidebarLeft
      :isOpen="sidebarOpen"
      :active="activeMenu"
      @close="closeSidebar"
    />

    <!-- RIGHT SIDEBAR (Notifications) Component -->
    <SidebarRight
      :isOpen="notificationOpen"
      @close="closeNotification"
      @update-count="fetchNotificationCount"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Bell } from "lucide-vue-next";
import { CircleUser } from "lucide-vue-next";
import SidebarLeft from "./sidebar-left.vue";
import SidebarRight from "./sidebar-right.vue";
import { getMe } from "@/services/authService";
import { getUnreadCount } from "@/services/notificationService";

const router = useRouter();
const route = useRoute();

// Detect active menu based on current route
const activeMenu = computed(() => {
  const path = route.path;
  if (path.includes("/student/dashboard")) return "dashboard";
  if (path.includes("/package") || path.includes("/packages")) return "paket";
  if (path.includes("/student/schedule")) return "jadwal";
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

// Notification count dari backend
const notificationCount = ref(0);
const isLoadingNotifications = ref(false);

// Student data from API
const student = ref({
  name: "User", // Changed from "Loading..." to avoid initial fetch
  email: "",
  photo: "default",
  address: "",
  phone: "",
  class: "",
  school: "",
  progress: 0,
});

const isLoadingProfile = ref(false);
const profileFetched = ref(false); // Track jika sudah pernah fetch

// Fetch profile data from API
const fetchProfileData = async () => {
  // Jangan fetch jika sudah pernah fetch atau sedang loading
  if (profileFetched.value || isLoadingProfile.value) {
    return;
  }

  try {
    isLoadingProfile.value = true;

    // Cek token dulu
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.warn("No auth token found, skipping profile fetch");
      profileFetched.value = true; // Mark sebagai sudah fetch agar tidak coba lagi
      return;
    }

    // Coba ambil dari localStorage dulu
    const cachedUser = localStorage.getItem("auth_user");
    if (cachedUser) {
      try {
        const user = JSON.parse(cachedUser);
        console.log("Cached user data:", user);
        console.log("Photo URL:", user.photo || user.profile_photo_url);

        // Build full photo URL
        let photoUrl = "default";
        if (user.profile_photo_url) {
          photoUrl = `http://localhost:8000/storage/${user.profile_photo_url}`;
        } else if (user.photo && user.photo !== "default") {
          photoUrl = user.photo.startsWith("http")
            ? user.photo
            : `http://localhost:8000/storage/${user.photo}`;
        }

        student.value = {
          name: user.name || "User",
          email: user.email || "",
          photo: photoUrl,
          address: user.address || "",
          phone: user.phone || "",
          class: user.class || user.class_name || "",
          school: user.school || user.school_name || "",
          progress: user.progress || 0,
        };
        profileFetched.value = true;
        isLoadingProfile.value = false;
        return; // Jika ada di localStorage, tidak perlu fetch API
      } catch (e) {
        console.error("Failed to parse cached user:", e);
      }
    }

    // Ambil data user dari backend jika tidak ada di localStorage
    const res = await getMe();
    const user = res.user || res.data || res;

    console.log("API response:", res);
    console.log("User data from API:", user);
    console.log("Photo from API:", user.photo || user.profile_photo_url);

    // Build full photo URL
    let photoUrl = "default";
    if (user.profile_photo_url) {
      photoUrl = `http://localhost:8000/storage/${user.profile_photo_url}`;
    } else if (user.photo && user.photo !== "default") {
      photoUrl = user.photo.startsWith("http")
        ? user.photo
        : `http://localhost:8000/storage/${user.photo}`;
    }

    student.value = {
      name: user.name || "User",
      email: user.email || "",
      photo: photoUrl,
      address: user.address || "",
      phone: user.phone || "",
      class: user.class || user.class_name || "",
      school: user.school || user.school_name || "",
      progress: user.progress || 0,
    };

    profileFetched.value = true;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    // Set data default dan mark sebagai sudah fetch
    student.value = {
      name: "User",
      email: "",
      photo: "default",
      address: "",
      phone: "",
      class: "",
      school: "",
      progress: 0,
    };
    profileFetched.value = true;
  } finally {
    isLoadingProfile.value = false;
  }
};

// Fetch unread notification count
const fetchNotificationCount = async () => {
  if (isLoadingNotifications.value) return;

  try {
    isLoadingNotifications.value = true;
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.warn("No auth token found, skipping notification fetch");
      return;
    }

    const res = await getUnreadCount();
    notificationCount.value = res.unread_count || res.count || 0;
  } catch (error) {
    console.error("Failed to fetch notification count:", error);
    notificationCount.value = 0;
  } finally {
    isLoadingNotifications.value = false;
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

// Handle logo error
const handleLogoError = (event) => {
  console.error("Logo failed to load");
  event.target.style.display = "none";
};

// Handle photo error - fallback to icon
const handlePhotoError = (event) => {
  console.warn("Profile photo failed to load");
  event.target.style.display = "none";
  student.value.photo = "default";
};

// Scroll handler dengan throttle dengan throttle
let scrollTimeout;
const handleScroll = () => {
  if (scrollTimeout) return;
  scrollTimeout = setTimeout(() => {
    isScrolled.value = window.scrollY > 20;
    scrollTimeout = null;
  }, 100);
};

// Lifecycle
onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  // Fetch profile data saat component mounted (hanya sekali)
  fetchProfileData();
  // Fetch notification count
  fetchNotificationCount();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
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
