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
          <!-- Loading State -->
          <div v-if="isLoading && currentPage === 1" class="p-8 text-center">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#41a6c2] mx-auto"
            ></div>
            <p class="mt-4 text-gray-500">Memuat notifikasi...</p>
          </div>

          <template v-else>
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
                  @click="handleNotificationClick(notif)"
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
                  @click="handleNotificationClick(notif)"
                />
              </div>
            </div>

            <!-- Load More Button -->
            <div v-if="currentPage < lastPage" class="p-4">
              <button
                @click="loadMore"
                :disabled="isLoading"
                class="w-full py-2 px-4 bg-[#41a6c2] text-white rounded-lg hover:bg-[#358a9f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ isLoading ? "Memuat..." : "Muat Lebih Banyak" }}
              </button>
            </div>

            <!-- Empty State -->
            <div
              v-if="allNotifications.length === 0 && !isLoading"
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
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import NotificationItem from "./NotificationItem.vue";
import { getNotifications, markAsRead } from "@/services/notificationService";

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
    if (newVal) {
      // Fetch notifications when sidebar opens
      fetchNotifications();
    }
  }
);

const emit = defineEmits(["close", "update-count"]);

const close = () => {
  console.log("Closing sidebar-right");
  emit("close");
};

// State
const allNotifications = ref([]);
const isLoading = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

// Fetch notifications from backend
const fetchNotifications = async (page = 1) => {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    const token = localStorage.getItem("auth_token");

    if (!token) {
      console.warn("No auth token found");
      allNotifications.value = [];
      isLoading.value = false;
      return;
    }

    console.log("Fetching notifications, page:", page);
    const res = await getNotifications(page);
    console.log("Notifications response:", res);

    if (page === 1) {
      // Replace all notifications on first page
      allNotifications.value = res.data || [];
    } else {
      // Append for pagination
      allNotifications.value = [...allNotifications.value, ...(res.data || [])];
    }

    currentPage.value = res.current_page || 1;
    lastPage.value = res.last_page || 1;

    console.log("Loaded notifications:", allNotifications.value.length);
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    console.error("Error details:", error.response?.data || error.message);
    // Set empty array on error to prevent undefined issues
    allNotifications.value = [];
    currentPage.value = 1;
    lastPage.value = 1;
  } finally {
    isLoading.value = false;
  }
};

// Handle notification click (mark as read)
const handleNotificationClick = async (notification) => {
  if (notification.read_at) return; // Already read

  try {
    await markAsRead(notification.id);
    // Update local state
    const index = allNotifications.value.findIndex(
      (n) => n.id === notification.id
    );
    if (index !== -1) {
      allNotifications.value[index].read_at = new Date().toISOString();
    }
    // Notify parent to update badge count
    emit("update-count");
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
  }
};

// Group notifications by date
const todayNotifications = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return allNotifications.value.filter((n) => {
    const notifDate = new Date(n.created_at).toISOString().split("T")[0];
    return notifDate === today;
  });
});

const groupedNotifications = computed(() => {
  const groups = {};
  const today = new Date().toISOString().split("T")[0];

  allNotifications.value.forEach((notif) => {
    const notifDate = new Date(notif.created_at).toISOString().split("T")[0];

    if (notifDate !== today) {
      if (!groups[notifDate]) {
        groups[notifDate] = [];
      }
      groups[notifDate].push(notif);
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

// Load more notifications
const loadMore = () => {
  if (currentPage.value < lastPage.value) {
    fetchNotifications(currentPage.value + 1);
  }
};

onMounted(() => {
  // Initial fetch if sidebar is already open
  if (props.isOpen) {
    fetchNotifications();
  }
});
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
