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
            ? 'max-w-6xl mx-auto backdrop-blur-md shadow-lg rounded-full h-16'
            : 'max-w-full bg-white shadow-sm h-[75px]',
        ]"
      >
        <!-- Left: Logo -->
        <div class="flex items-center gap-3">
          <img
            src="@/assets/logo2.svg"
            alt="Bimbel Lazuardy"
            :class="[
              'transition-all duration-300',
              isScrolled ? 'h-8' : 'h-10',
            ]"
          />
        </div>

        <!-- Right: Profile -->
        <div class="flex items-center gap-3">
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
              <CircleUser
                :class="[
                  'transition-colors',
                  isScrolled ? 'text-[#41a6c2]' : '',
                ]"
                class="w-6 h-6"
              />
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
                      v-if="student?.photo && student.photo !== 'default'"
                      :src="student.photo"
                      :alt="student?.name || 'User'"
                      class="w-full h-full object-cover"
                      @error="handlePhotoError"
                    />
                    <span v-else class="text-lg">{{
                      (student?.name || "U").charAt(0).toUpperCase()
                    }}</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">
                      {{ student?.name || "Loading..." }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ student?.email || "" }}
                    </p>
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
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { CircleUser } from "lucide-vue-next";
import { getTutorProfile } from "@/services/tutorProfileService";

const router = useRouter();
const route = useRoute();

// Scroll state
const isScrolled = ref(false);

const navHeight = "75px";
const showProfileTooltip = ref(false);

// Student data from API
const student = ref({
  name: "Loading...",
  email: "Loading...",
  photo: "default",
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

    // Ambil data user dari backend
    const user = await getTutorProfile();

    student.value = {
      name: user.namaLengkap || "User",
      email: user.email || "",
      photo: user.photo || "default",
      address: user.alamatLengkap || "",
      phone: user.noTelepon || "",
      class: user.marketSiswa || "",
      school: "",
      progress: 0,
    };
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    // Kalau mau, boleh tetap pakai fallback dummy
    student.value = {
      name: "User",
      email: "user@example.com",
      photo: "default",
      address: "",
      phone: "",
      class: "",
      school: "",
      progress: 0,
    };
  } finally {
    isLoadingProfile.value = false;
  }
};

const handleProfileClick = () => {
  showProfileTooltip.value = false;
  router.push("/tutor/profile-tutor");
};

// Handle photo error
const handlePhotoError = (event) => {
  console.log("Photo failed to load, using fallback");
  event.target.style.display = "none";
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
