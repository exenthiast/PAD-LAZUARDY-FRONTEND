<template>
  <div class="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
    <div class="flex gap-3">
      <!-- Icon -->
      <div class="flex-shrink-0">
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center',
            getIconBgClass(),
          ]"
        >
          <component :is="getIconComponent()" :class="getIconColorClass()" />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900">
          {{ notification.title }}
        </p>

        <!-- Link Button -->
        <button
          v-if="notification.link"
          @click="handleLinkClick"
          :class="['text-sm mt-1 underline', getLinkColorClass()]"
        >
          {{ notification.subtitle }}
        </button>
        <p v-else class="text-sm text-gray-500 mt-1">
          {{ notification.subtitle }}
        </p>

        <!-- Time (for schedule type) -->
        <p v-if="notification.time" class="text-xs text-gray-400 mt-2">
          {{ notification.time }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const handleLinkClick = () => {
  if (props.notification.link) {
    // For PDF or external files
    if (props.notification.link.endsWith(".pdf")) {
      window.open(props.notification.link, "_blank");
    } else {
      // For internal routes
      router.push(props.notification.link);
    }
  }
};

// Icon components as SVG
const WarningIcon = {
  template: `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  `,
};

const CalendarIcon = {
  template: `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
    </svg>
  `,
};

const PaymentIcon = {
  template: `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
      <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
    </svg>
  `,
};

const DocumentIcon = {
  template: `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
    </svg>
  `,
};

const PromoIcon = {
  template: `
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" />
    </svg>
  `,
};

const getIconComponent = () => {
  const iconMap = {
    warning: WarningIcon,
    calendar: CalendarIcon,
    payment: PaymentIcon,
    document: DocumentIcon,
    promo: PromoIcon,
  };
  return iconMap[props.notification.icon] || DocumentIcon;
};

const getIconBgClass = () => {
  const bgMap = {
    deadline: "bg-yellow-100",
    schedule: "bg-blue-100",
    payment: "bg-green-100",
    module: "bg-purple-100",
    promo: "bg-pink-100",
  };
  return bgMap[props.notification.type] || "bg-gray-100";
};

const getIconColorClass = () => {
  const colorMap = {
    deadline: "text-yellow-600",
    schedule: "text-blue-600",
    payment: "text-green-600",
    module: "text-purple-600",
    promo: "text-pink-600",
  };
  return colorMap[props.notification.type] || "text-gray-600";
};

const getLinkColorClass = () => {
  const linkColorMap = {
    deadline: "text-yellow-600 hover:text-yellow-700",
    schedule: "text-blue-600 hover:text-blue-700",
    payment: "text-green-600 hover:text-green-700",
    module: "text-purple-600 hover:text-purple-700",
    promo: "text-pink-600 hover:text-pink-700",
  };
  return (
    linkColorMap[props.notification.type] || "text-gray-600 hover:text-gray-700"
  );
};
</script>
