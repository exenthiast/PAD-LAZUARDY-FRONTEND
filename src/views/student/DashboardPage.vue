<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- NAVBAR -->
    <Navbar />

    <!-- MAIN -->
    <main class="flex-1">
      <!-- HERO -->
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gray-300 rounded-lg p-12 text-center">
            <h1 class="text-2xl font-semibold text-gray-800">
              Gambar atau iklan mengenai lazuardy
            </h1>
          </div>
        </div>
      </section>
    </main>

      

    <!-- FOOTER -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between gap-8">
          <div class="flex-1">
            <h3 class="text-xl font-bold mb-4">ABOUT US</h3>
            <p class="text-gray-300 mb-4">
              Bimbel Lazuardy adalah platform bimbingan belajar online
              terpercaya yang menghubungkan siswa dengan tutor berkualitas.
            </p>
            <p class="text-gray-400 text-sm">
              © 2025 Bimbel Lazuardy. All rights reserved.
            </p>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold mb-4">GET IN TOUCH</h3>
            <div class="space-y-2 text-gray-300">
              <p>Email: info@lazuardy.com</p>
              <p>Phone: +62 812-3456-7890</p>
              <p>Address: Yogyakarta, Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";

const router = useRouter();

// Scroll state untuk navbar
const isScrolled = ref(false);

// Handle scroll event
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const faqBlock = ref(null);
const faqVisible = ref(false);
let observer;

onMounted(() => {
  // Scroll listener untuk navbar
  window.addEventListener("scroll", handleScroll);

  // Intersection observer untuk FAQ
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          faqVisible.value = true;
          observer?.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  if (faqBlock.value) observer.observe(faqBlock.value);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  observer?.disconnect();
});

const handleNext = () => {
  router.push("/login");
};
</script>
