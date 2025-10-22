<template>
  <!-- LEFT SIDEBAR -->
  <transition name="slide-left">
    <div v-if="isOpen" class="fixed inset-0 z-40 flex" @click.self="close">
      <!-- Sidebar Content -->
      <div class="relative w-64 bg-white h-full shadow-xl flex flex-col">
        <!-- Header with Close Button -->
        <div class="p-4 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            @click="close"
            class="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="Close sidebar"
          >
            <svg
              class="w-5 h-5 text-gray-600"
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
            <!-- Dahboard -->
            <li>
              <a
                href="#"
                :class="[
                  'flex items-center gap-3 p-3 rounded-lg transition-colors group',
                  props.active === 'dashboard'
                    ? 'bg-[#41a6c2] text-white'
                    : 'hover:bg-[#41a6c2]/10',
                ]"
              >
                <div
                  :class="[
                    'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                    props.active === 'dashboard'
                      ? 'bg-white/0'
                      : 'bg-white border-2 border-gray-300 group-hover:border-[#41a6c2]',
                  ]"
                >
                  <svg
                    :class="
                      props.active === 'dashboard'
                        ? 'w-5 h-5 text-white'
                        : 'w-5 h-5 text-gray-600 group-hover:text-[#41a6c2]'
                    "
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
                </div>
                <span
                  :class="
                    props.active === 'dashboard'
                      ? 'font-medium'
                      : 'font-medium text-gray-700'
                  "
                  >Dashboard</span
                >
              </a>
            </li>
            <!-- Paket Belajar -->
            <li>
              <a
                href="#"
                :class="[
                  'flex items-center gap-3 p-3 rounded-lg transition-colors group',
                  props.active === 'paket'
                    ? 'bg-[#41a6c2] text-white'
                    : 'hover:bg-[#41a6c2]/10',
                ]"
              >
                <div
                  :class="[
                    'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                    props.active === 'paket'
                      ? 'bg-white/0 border-transparent'
                      : 'bg-white border-2 border-gray-300 group-hover:border-[#41a6c2]',
                  ]"
                >
                  <svg
                    :class="
                      props.active === 'paket'
                        ? 'w-5 h-5 text-white'
                        : 'w-5 h-5 text-gray-600 group-hover:text-[#41a6c2]'
                    "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span
                  :class="
                    props.active === 'paket'
                      ? 'font-medium'
                      : 'font-medium text-gray-700'
                  "
                  >Paket Belajar</span
                >
              </a>
            </li>

            <!-- Hubungi Kami -->
            <li>
              <a
                href="#"
                :class="[
                  'flex items-center gap-3 p-3 rounded-lg transition-colors group',
                  props.active === 'hubungi'
                    ? 'bg-[#41a6c2] text-white'
                    : 'hover:bg-[#41a6c2]/10',
                ]"
              >
                <div
                  :class="[
                    'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                    props.active === 'hubungi'
                      ? 'bg-white/0 border-transparent'
                      : 'bg-white border-2 border-gray-300 group-hover:border-[#41a6c2]',
                  ]"
                >
                  <svg
                    :class="
                      props.active === 'hubungi'
                        ? 'w-5 h-5 text-white'
                        : 'w-5 h-5 text-gray-600 group-hover:text-[#41a6c2]'
                    "
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
                </div>
                <span
                  :class="
                    props.active === 'hubungi'
                      ? 'font-medium'
                      : 'font-medium text-gray-700'
                  "
                  >Hubungi Kami</span
                >
              </a>
            </li>

            <!-- Tentang Kami -->
            <li>
              <a
                href="#"
                :class="[
                  'flex items-center gap-3 p-3 rounded-lg transition-colors group',
                  props.active === 'tentang'
                    ? 'bg-[#41a6c2] text-white'
                    : 'hover:bg-[#41a6c2]/10',
                ]"
              >
                <div
                  :class="[
                    'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                    props.active === 'tentang'
                      ? 'bg-white/0 border-transparent'
                      : 'bg-white border-2 border-gray-300 group-hover:border-[#41a6c2]',
                  ]"
                >
                  <svg
                    :class="
                      props.active === 'tentang'
                        ? 'w-5 h-5 text-white'
                        : 'w-5 h-5 text-gray-600 group-hover:text-[#41a6c2]'
                    "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <span
                  :class="
                    props.active === 'tentang'
                      ? 'font-medium'
                      : 'font-medium text-gray-700'
                  "
                  >Tentang Kami</span
                >
              </a>
            </li>
          </ul>
        </nav>

        <!-- Logout Button (at bottom) -->
        <div class="p-4 border-t">
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors group"
          >
            <div
              class="w-10 h-10 flex items-center justify-center bg-white border-2 border-red-300 rounded-lg group-hover:border-red-500 transition-colors"
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
            </div>
            <span class="font-medium">Keluar</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  // active menu: 'dashboard' |'paket' | 'hubungi' | 'tentang'
  active: {
    type: String,
    default: "dashboard",
  },
});

// Emits
const emit = defineEmits(["close"]);

// Functions
const close = () => {
  emit("close");
};

const handleLogout = () => {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    // Clear auth data
    localStorage.removeItem("auth_token");
    // Redirect to login
    window.location.href = "/login";
  }
};
</script>

<style scoped>
/* Slide transitions for sidebar */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
}

.slide-left-enter-from > div:last-child,
.slide-left-leave-to > div:last-child {
  transform: translateX(-100%);
}
</style>
