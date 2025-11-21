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

        <!-- Right: Logout Button -->
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-[#41a6c2] hover:bg-[#358a9f] text-white rounded-lg font-medium transition text-sm shadow-md hover:shadow-lg"
        >
          Keluar
        </button>
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
// import { getMe } from "@/services/authService";

const router = useRouter();
const route = useRoute();

// Scroll state
const isScrolled = ref(false);

const navHeight = "75px";

// Scroll handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Logout handler
const handleLogout = () => {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    // Clear session data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    sessionStorage.clear();

    // Redirect to login
    router.push("/login");
  }
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
