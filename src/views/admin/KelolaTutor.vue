<template>
  <div class="kelola-tutor-page">
    <NavbarAdmin />

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Back Button -->
      <button @click="goToDashboard" class="btn-back">
        <ArrowLeft :size="20" />
        <span>Kembali</span>
      </button>

      <h1 class="page-title">Kelola Tutor</h1>

      <!-- Search Bars -->
      <div class="search-container">
        <div class="search-box">
          <Search :size="20" class="search-icon" />
          <input
            type="text"
            v-model="searchName"
            placeholder="Cari Nama Tutor"
            class="search-input"
          />
        </div>
        <div class="search-box">
          <Filter :size="20" class="search-icon" />
          <select v-model="searchSubject" class="search-select">
            <option value="">Cari Tutor Berdasarkan Mata Pelajaran</option>
            <option
              v-for="subject in subjects"
              :key="subject.id"
              :value="subject.id"
            >
              {{ subject.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat data tutor...</p>
      </div>

      <!-- Tutor Cards Grid -->
      <div v-else class="tutor-grid">
        <div
          v-for="tutor in tutors"
          :key="tutor.id"
          class="tutor-card"
          @click="viewTutorDetail(tutor.id)"
        >
          <div class="tutor-header">
            <img
              :src="
                tutor.photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  tutor.name
                )}&background=41a6c2&color=fff&size=128&bold=true`
              "
              :alt="tutor.name"
              class="tutor-photo"
              @error="handleImageError"
            />
            <div class="tutor-info">
              <h3 class="tutor-name">{{ tutor.name }}</h3>
              <p class="tutor-subject">{{ tutor.subject }}</p>
              <p class="tutor-level">{{ tutor.level }}</p>
            </div>
          </div>

          <div class="tutor-stats">
            <div class="stat-item">
              <Users :size="16" />
              <span>{{ tutor.totalStudents || 0 }} Siswa</span>
            </div>
            <div class="stat-item">
              <BookOpen :size="16" />
              <span>{{ tutor.totalSessions || 0 }} Sesi</span>
            </div>
          </div>

          <div class="tutor-rating">
            <Star :size="16" fill="#FFD700" color="#FFD700" />
            <span class="rating-value">{{ tutor.rating || 0 }}</span>
            <span class="rating-count">({{ tutor.reviews || 0 }} Ulasan)</span>
          </div>

          <p class="tutor-description">{{ tutor.description }}</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && tutors.length === 0" class="empty-state">
        <p>Tidak ada tutor yang ditemukan</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import NavbarAdmin from "@/components/layout/navbar-admin.vue";
import {
  Search,
  Filter,
  Users,
  BookOpen,
  Star,
  ArrowLeft,
} from "lucide-vue-next";
import { getAllTutors, getSubjects } from "@/services/adminDashboardService";

const router = useRouter();

const searchName = ref("");
const searchSubject = ref("");
const loading = ref(false);
const tutors = ref([]);
const subjects = ref([]);

// Load data on mount
onMounted(async () => {
  await loadSubjects();
  await loadTutors();
});

// Watch for search changes and reload tutors
watch([searchName, searchSubject], async () => {
  await loadTutors();
});

// Load subjects from database
const loadSubjects = async () => {
  try {
    const data = await getSubjects();
    subjects.value = data;
  } catch (error) {
    console.error("Error loading subjects:", error);
  }
};

// Load tutors from database
const loadTutors = async () => {
  loading.value = true;
  try {
    const params = {};
    if (searchName.value) params.search = searchName.value;
    if (searchSubject.value) params.subject = searchSubject.value;

    const data = await getAllTutors(params);
    tutors.value = data;
  } catch (error) {
    console.error("Error loading tutors:", error);
    tutors.value = [];
  } finally {
    loading.value = false;
  }
};

// Navigate to tutor detail
const viewTutorDetail = (tutorId) => {
  router.push(`/admin/kelola-tutor/${tutorId}`);
};

// Navigate back to dashboard
const goToDashboard = () => {
  router.push("/admin/dashboard");
};

// Get tutor photo with fallback to UI Avatars
const getTutorPhoto = (photo) => {
  if (photo && photo.startsWith("http")) {
    return photo;
  }
  // Return a colorful avatar placeholder with initials
  return null; // Will be handled by @error event
};

// Handle image error - show avatar with initials
const handleImageError = (event) => {
  const tutorName = event.target.alt || "User";
  event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    tutorName
  )}&background=41a6c2&color=fff&size=128&bold=true`;
};
</script>

<style scoped>
.kelola-tutor-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2f7 0%, #f0f9fc 100%);
}

/* Back Button */
.btn-back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #41a6c2;
  border: 2px solid #41a6c2;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.btn-back:hover {
  background: #41a6c2;
  color: white;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #41a6c2;
  margin-bottom: 2rem;
  text-align: center;
}

/* Search Container */
.search-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-icon {
  color: #718096;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.search-input,
.search-select {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  color: #2d3748;
  background: transparent;
}

.search-select {
  cursor: pointer;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  color: #718096;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top-color: #41a6c2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Tutor Grid */
.tutor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.tutor-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.tutor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(65, 166, 194, 0.2);
}

.tutor-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tutor-photo {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
}

.tutor-info {
  flex: 1;
}

.tutor-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
}

.tutor-subject {
  font-size: 0.9rem;
  color: #41a6c2;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.tutor-level {
  font-size: 0.85rem;
  color: #718096;
  margin: 0;
}

.tutor-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.85rem;
}

.stat-item svg {
  color: #41a6c2;
}

.tutor-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.rating-value {
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
}

.rating-count {
  font-size: 0.85rem;
  color: #718096;
}

.tutor-description {
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.5;
  margin: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #a0aec0;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }

  .search-container {
    grid-template-columns: 1fr;
  }

  .tutor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
