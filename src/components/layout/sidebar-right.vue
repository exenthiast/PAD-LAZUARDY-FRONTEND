<template>
  <transition name="slide-right">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[60] flex justify-end"
      @click.self="close"
    >
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/50" @click="close"></div>

      <!-- Notification Sidebar Content -->
      <div
        class="relative w-full sm:w-96 bg-white h-full shadow-xl flex flex-col z-[70]"
      >
        <!-- Header -->
        <div
          class="p-4 border-b flex items-center justify-between bg-[#41a6c2] text-white"
        >
          <div class="flex items-center gap-2">
            <button @click="close" class="p-1 hover:bg-white/10 rounded">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h2 class="text-lg font-semibold">Notifikasi</h2>
          </div>
        </div>

        <!-- Date Sections -->
        <div class="flex-1 overflow-y-auto">
          <!-- Hari Ini -->
          <div v-if="todayNotifications.length > 0" class="mb-6">
            <div class="sticky top-0 bg-gray-50 px-4 py-2 border-b">
              <h3 class="text-sm font-semibold text-gray-600">Hari ini</h3>
            </div>
            <div class="divide-y">
              <NotificationItem
                v-for="notif in todayNotifications"
                :key="notif.id"
                :notification="notif"
              />
            </div>
          </div>

          <!-- Previous Dates -->
          <div
            v-for="dateGroup in groupedNotifications"
            :key="dateGroup.date"
            class="mb-6"
          >
            <div class="sticky top-0 bg-gray-50 px-4 py-2 border-b">
              <h3 class="text-sm font-semibold text-gray-600">
                {{ dateGroup.date }}
              </h3>
            </div>
            <div class="divide-y">
              <NotificationItem
                v-for="notif in dateGroup.items"
                :key="notif.id"
                :notification="notif"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="allNotifications.length === 0"
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
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import NotificationItem from "./NotificationItem.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

// Debug: Watch isOpen changes
watch(
  () => props.isOpen,
  (newVal) => {
    console.log("SidebarRight isOpen changed to:", newVal);
  }
);

const emit = defineEmits(["close"]);

const close = () => {
  console.log("Closing sidebar-right");
  emit("close");
};

// DUMMY DATA - Replace with real API data later
const allNotifications = ref([
  // Hari ini
  {
    id: 1,
    type: "deadline",
    icon: "warning",
    title: "Paket belajar akan berakhir 3 hari lagi",
    subtitle: "Perpanjang paket",
    date: "2025-10-22",
    time: null,
  },
  {
    id: 2,
    type: "schedule",
    icon: "calendar",
    title: "Jadwal Fisika, Hari ini 16:00 WIB",
    subtitle: "Tutor: Budi",
    link: "/classes/detail/123",
    linkText: "Lihat Detail",
    date: "2025-10-22",
    time: "16:00 WIB",
  },
  // 10 September 2025
  {
    id: 3,
    type: "payment",
    icon: "payment",
    title: "Pembayaran paket bulanan berhasil!",
    subtitle: "Lihat Riwayat",
    link: "/student/payment-history",
    date: "2025-09-10",
    time: null,
  },
  {
    id: 4,
    type: "module",
    icon: "document",
    title: "Tutor Budi unggah materi Fisika [PDF]",
    subtitle: "Lihat Materi",
    link: "/materials/physics-101.pdf",
    date: "2025-09-10",
    time: null,
  },
  // 9 September 2025
  {
    id: 5,
    type: "promo",
    icon: "promo",
    title: "Promo paket belajar tambahan tersedia",
    subtitle: "Cek Promo",
    link: "/packages",
    date: "2025-09-09",
    time: null,
  },
  {
    id: 6,
    type: "schedule",
    icon: "calendar",
    title: "Jadwal Matematika, Hari ini 14:00 WIB",
    subtitle: "Tutor: Siti",
    link: "/classes/detail/124",
    linkText: "Lihat Detail",
    date: "2025-09-09",
    time: "14:00 WIB",
  },
  {
    id: 7,
    type: "payment",
    icon: "payment",
    title: "Pembayaran paket premium berhasil!",
    subtitle: "Lihat Riwayat",
    link: "/student/payment-history",
    date: "2025-09-09",
    time: null,
  },
]);

// Group notifications by date
const todayNotifications = computed(() => {
  return allNotifications.value.filter((n) => n.date === "2025-10-22");
});

const groupedNotifications = computed(() => {
  const groups = {};

  allNotifications.value.forEach((notif) => {
    if (notif.date !== "2025-10-22") {
      if (!groups[notif.date]) {
        groups[notif.date] = [];
      }
      groups[notif.date].push(notif);
    }
  });

  return Object.keys(groups)
    .sort((a, b) => new Date(b) - new Date(a))
    .map((date) => ({
      date: formatDate(date),
      items: groups[date],
    }));
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
</script>

<style scoped>
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
</style>
