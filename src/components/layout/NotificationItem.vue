<template>
  <div
    class="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
    :class="{ 'bg-blue-50': !notification.read_at }"
  >
    <div class="flex gap-3">
      <!-- Icon -->
      <div class="flex-shrink-0">
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center',
            getIconBgClass(),
          ]"
        >
          <component
            :is="getIconComponent()"
            :class="getIconColorClass()"
            :size="24"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <p class="text-sm font-medium text-gray-900 flex-1">
            {{ notification.title }}
          </p>
          <!-- Unread indicator -->
          <span
            v-if="!notification.read_at"
            class="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-1"
          ></span>
        </div>

        <p class="text-sm text-gray-600 mt-1">
          {{ notification.body }}
        </p>

        <!-- Time -->
        <p class="text-xs text-gray-400 mt-2">
          {{ formatTime(notification.created_at) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  AlertTriangle,
  Calendar,
  CreditCard,
  FileText,
  Sparkles,
  Bell,
} from "lucide-vue-next";

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
});

// Determine notification type from title/body keywords
const notificationType = computed(() => {
  const title = props.notification.title?.toLowerCase() || "";
  const body = props.notification.body?.toLowerCase() || "";

  if (title.includes("jadwal") || title.includes("schedule")) return "schedule";
  if (title.includes("pembayaran") || title.includes("payment"))
    return "payment";
  if (title.includes("paket") || title.includes("berakhir")) return "deadline";
  if (title.includes("materi") || title.includes("modul")) return "module";
  if (title.includes("promo")) return "promo";

  return "default";
});

// Format created_at to relative time
const formatTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;

  // Format as date
  const day = date.getDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const month = months[date.getMonth()];
  return `${day} ${month}`;
};

// Get icon component based on notification type
const getIconComponent = () => {
  const iconMap = {
    schedule: Calendar,
    payment: CreditCard,
    deadline: AlertTriangle,
    module: FileText,
    promo: Sparkles,
    default: Bell,
  };
  return iconMap[notificationType.value] || Bell;
};

const getIconBgClass = () => {
  const bgMap = {
    deadline: "bg-yellow-100",
    schedule: "bg-blue-100",
    payment: "bg-green-100",
    module: "bg-purple-100",
    promo: "bg-pink-100",
    default: "bg-gray-100",
  };
  return bgMap[notificationType.value] || "bg-gray-100";
};

const getIconColorClass = () => {
  const colorMap = {
    deadline: "text-yellow-600",
    schedule: "text-blue-600",
    payment: "text-green-600",
    module: "text-purple-600",
    promo: "text-pink-600",
    default: "text-gray-600",
  };
  return colorMap[notificationType.value] || "text-gray-600";
};
</script>
