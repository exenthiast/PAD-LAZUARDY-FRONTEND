<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />

    <div class="max-w-3xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#41a6c2] border-t-transparent"
        ></div>
        <p class="mt-4 text-gray-600">Memuat data tutor...</p>
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Header -->
        <div class="mb-8">
          <button
            @click="goBack"
            class="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft class="w-5 h-5 mr-2" />
            Kembali
          </button>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Beri Review</h1>
          <p class="text-gray-600">
            Bagikan pengalaman belajar Anda dengan tutor ini
          </p>
        </div>

        <!-- Tutor Info Card -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div class="flex items-center gap-4">
            <img
              :src="tutorInfo.photo"
              :alt="tutorInfo.name"
              class="w-16 h-16 rounded-full object-cover border-2 border-[#41a6c2]"
            />
            <div>
              <h2 class="text-xl font-semibold text-gray-800">
                {{ tutorInfo.name }}
              </h2>
              <p class="text-sm text-gray-600">{{ tutorInfo.subject }}</p>
            </div>
          </div>
        </div>

        <!-- Review Form -->
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <!-- Rating -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Rating <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-2">
              <button
                v-for="star in 5"
                :key="star"
                @click="formData.rating = star"
                type="button"
                class="transition-transform hover:scale-110"
              >
                <Star
                  :class="[
                    'w-10 h-10',
                    star <= formData.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300',
                  ]"
                />
              </button>
            </div>
            <p class="mt-2 text-sm text-gray-500" v-if="formData.rating > 0">
              {{ ratingText }}
            </p>
          </div>

          <!-- Comment -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Ulasan <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.comment"
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41a6c2] focus:border-transparent"
              placeholder="Ceritakan pengalaman belajar Anda dengan tutor ini..."
              maxlength="1000"
            ></textarea>
            <p class="mt-1 text-xs text-gray-400 text-right">
              {{ formData.comment.length }}/1000 karakter
            </p>
          </div>

          <!-- Photo Upload (Optional) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Foto Testimoni
              <span class="text-gray-400 font-normal">(Opsional)</span>
            </label>

            <div
              v-if="!previewUrl"
              @click="$refs.fileInput.click()"
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#41a6c2] transition-colors cursor-pointer"
            >
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                @change="handleFileSelect"
                accept="image/*"
              />
              <ImageIcon class="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p class="text-sm text-gray-600 mb-1">Upload foto (opsional)</p>
              <p class="text-xs text-gray-400">Format: JPG, PNG (Maks. 2MB)</p>
            </div>

            <!-- Preview -->
            <div
              v-else
              class="border-2 border-[#41a6c2] rounded-lg p-4 relative"
            >
              <button
                @click="removeFile"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition z-10"
              >
                <X class="w-4 h-4" />
              </button>
              <img
                :src="previewUrl"
                alt="Preview"
                class="w-full max-h-64 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end gap-3">
          <button
            @click="goBack"
            class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            @click="submitReview"
            :disabled="isSubmitting || !isFormValid"
            class="px-6 py-3 bg-[#41a6c2] text-white rounded-lg font-semibold hover:bg-[#2e8694] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span v-if="isSubmitting">Mengirim...</span>
            <span v-else>Kirim Review</span>
            <Send class="w-4 h-4" v-if="!isSubmitting" />
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Navbar from "@/components/layout/navbar.vue";
import { ArrowLeft, Star, ImageIcon, X, Send } from "lucide-vue-next";
import { submitReview as submitReviewAPI } from "@/services/studentService";

const router = useRouter();
const route = useRoute();
const fileInput = ref(null);

const isLoading = ref(false);
const isSubmitting = ref(false);
const hasExistingReview = ref(false); // Flag untuk cek existing review

const tutorInfo = ref({
  id: null,
  name: "",
  photo: "",
  subject: "",
});

const formData = ref({
  rating: 0,
  comment: "",
  photo: null,
});

const previewUrl = ref(null);

const ratingText = computed(() => {
  const texts = {
    1: "Sangat Kurang",
    2: "Kurang",
    3: "Cukup",
    4: "Baik",
    5: "Sangat Baik",
  };
  return texts[formData.value.rating] || "";
});

const isFormValid = computed(() => {
  return formData.value.rating > 0 && formData.value.comment.trim().length > 0;
});

const loadTutorInfo = () => {
  const tutorId = parseInt(route.params.tutorId);

  if (!tutorId) {
    alert("ID tutor tidak valid");
    router.push("/student/schedule");
    return;
  }

  tutorInfo.value.id = tutorId;
  // In real scenario, fetch tutor info from API
  // For now, use dummy data or get from route params
  tutorInfo.value.name = route.query.name || "Tutor";
  tutorInfo.value.photo =
    route.query.photo ||
    "https://ui-avatars.com/api/?name=Tutor&size=80&background=41a6c2&color=fff";
  tutorInfo.value.subject = route.query.subject || "Mata Pelajaran";
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert("Ukuran file maksimal 2MB");
    return;
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("File harus berupa gambar (JPG, PNG)");
    return;
  }

  formData.value.photo = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const removeFile = () => {
  formData.value.photo = null;
  previewUrl.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const submitReview = async () => {
  if (!isFormValid.value) {
    alert("Mohon isi rating dan ulasan terlebih dahulu");
    return;
  }

  // Warning jika user sudah pernah review
  if (hasExistingReview.value && !route.query.fromAttendance) {
    const confirmUpdate = confirm(
      "Anda sudah pernah memberikan review untuk tutor ini.\n\nApakah Anda ingin memperbarui review Anda?"
    );
    if (!confirmUpdate) return;
  }

  try {
    isSubmitting.value = true;

    const data = new FormData();
    data.append("rating", formData.value.rating);
    data.append("comment", formData.value.comment);

    if (formData.value.photo) {
      data.append("photo", formData.value.photo);
    }

    await submitReviewAPI(tutorInfo.value.id, data);

    const message = hasExistingReview.value
      ? "Review berhasil diperbarui! Terima kasih atas feedback Anda."
      : "Review berhasil dikirim! Terima kasih atas feedback Anda.";

    alert(message);
    router.push("/student/schedule");
  } catch (error) {
    console.error("Error submitting review:", error);

    if (error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert("Gagal mengirim review. Silakan coba lagi.");
    }
  } finally {
    isSubmitting.value = false;
  }
};

const goBack = () => {
  router.push("/student/schedule");
};

onMounted(() => {
  loadTutorInfo();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
