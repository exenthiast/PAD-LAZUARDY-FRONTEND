<template>
  <!-- LEFT SIDEBAR -->
  <transition name="slide-left">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 flex pt-20"
      @click.self="close"
    >
      <!-- Sidebar Content -->
      <div class="relative w-64 bg-white h-full shadow-xl flex flex-col">
        <!-- Header with Close Button -->
        <div class="p-4 border-b flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Menu</h2>
        </div>

        <!-- Menu Items -->
        <nav class="flex-1 overflow-y-auto p-4">
          <ul class="space-y-2">
            <!-- Dahboard -->
            <li>
              <RouterLink
                to="/student/dashboard"
                @click="close"
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
                  <LayoutDashboard
                    :class="
                      props.active === 'dashboard'
                        ? 'w-5 h-5 text-white'
                        : 'w-5 h-5 text-gray-600 group-hover:text-[#41a6c2]'
                    "
                  />
                </div>
                <span
                  :class="
                    props.active === 'dashboard'
                      ? 'font-medium'
                      : 'font-medium text-gray-700'
                  "
                  >Dashboard</span
                >
              </RouterLink>
            </li>
            <!-- Paket Belajar -->
            <li>
              <RouterLink
                to="/student/packages"
                @click="close"
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
                  <BookText
                    :class="
                      props.active === 'paket'
                        ? 'w-5 h-5 text-white'
                        : 'w-5 h-5 text-gray-600 group-hover:text-[#41a6c2]'
                    "
                  />
                </div>
                <span
                  :class="
                    props.active === 'paket'
                      ? 'font-medium'
                      : 'font-medium text-gray-700'
                  "
                  >Paket Belajar</span
                >
              </RouterLink>
            </li>

            <!-- Jadwal Belajar -->
            <li>
              <RouterLink
                to="/student/schedule"
                @click="close"
                :class="[
                  'flex items-center gap-3 p-3 rounded-lg transition-colors group',
                  props.active === 'jadwal'
                    ? 'bg-[#41a6c2] text-white'
                    : 'hover:bg-[#41a6c2]/10',
                ]"
              >
                <div
                  :class="[
                    'w-10 h-10 flex items-center justify-center rounded-lg transition-colors',
                    props.active === 'jadwal'
                      ? 'bg-white/0 border-transparent'
                      : 'bg-white border-2 border-gray-300 group-hover:border-[#41a6c2]',
                  ]"
                >
                  <CalendarDays
                    :class="
                      props.active === 'jadwal'
                        ? 'w-5 h-5 text-white'
                        : 'w-5 h-5 text-gray-600 group-hover:text-[#41a6c2]'
                    "
                  />
                </div>
                <span
                  :class="
                    props.active === 'jadwal'
                      ? 'font-medium'
                      : 'font-medium text-gray-700'
                  "
                  >Jadwal Belajar</span
                >
              </RouterLink>
            </li>

            <!-- Hubungi Kami -->
            <li>
              <RouterLink
                to="/contact"
                @click="close"
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
                  <MessageSquare
                    :class="
                      props.active === 'hubungi'
                        ? 'w-5 h-5 text-white'
                        : 'w-5 h-5 text-gray-600 group-hover:text-[#41a6c2]'
                    "
                  />
                </div>
                <span
                  :class="
                    props.active === 'hubungi'
                      ? 'font-medium'
                      : 'font-medium text-gray-700'
                  "
                  >Hubungi Kami</span
                >
              </RouterLink>
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
              <LogOut
                class="w-5 h-5 text-red-600 group-hover:text-red-500 transition-colors"
              />
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
import { RouterLink } from "vue-router";
import { LayoutDashboard } from "lucide-vue-next";
import { BookText } from "lucide-vue-next";
import { MessageSquare } from "lucide-vue-next";
import { CalendarDays } from 'lucide-vue-next';
import { LogOut } from "lucide-vue-next";

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  // active menu: 'dashboard' |'paket' | 'hubungi' | 'tentang'
  active: {
    type: String,
    default: "",
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
