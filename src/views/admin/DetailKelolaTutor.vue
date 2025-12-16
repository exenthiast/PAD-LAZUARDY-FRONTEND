<template>
  <div class="detail-kelola-tutor">
    <NavbarAdmin />

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Back Button -->
      <button @click="goBack" class="btn-back">
        <ArrowLeft :size="20" />
        <span>Kembali</span>
      </button>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat data tutor...</p>
      </div>

      <template v-else>
        <!-- Main Content Card -->
        <div class="main-card">
          <!-- Header with Profile -->
          <div class="card-header">
            <img
              :src="
                tutor.photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  tutor.name || 'User'
                )}&background=41a6c2&color=fff&size=128&bold=true`
              "
              :alt="tutor.name"
              class="header-photo"
              @error="handleImageError"
            />
            <h1 class="header-title">Pengelolaan Gaji Tutor</h1>
          </div>

          <!-- Cards Grid -->
          <div class="cards-grid">
            <!-- Detail Tutor Card -->
            <div class="info-card">
              <h2 class="card-title">Detail Tutor</h2>
              <div class="info-grid">
                <div class="info-row">
                  <div class="info-item">
                    <span class="info-label">Nama Lengkap</span>
                    <span class="info-value">{{ tutor.fullName }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Tanggal Lahir</span>
                    <span class="info-value">{{ tutor.birthDate }}</span>
                  </div>
                </div>
                <div class="info-row">
                  <div class="info-item">
                    <span class="info-label">Email</span>
                    <span class="info-value">{{ tutor.email }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Mata Pelajaran</span>
                    <span class="info-value">{{ tutor.subject }}</span>
                  </div>
                </div>
                <div class="info-row">
                  <div class="info-item">
                    <span class="info-label">No. Telepon</span>
                    <span class="info-value">{{ tutor.phone }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label"></span>
                    <span class="info-value"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Detail Pembelajaran Card -->
            <div class="info-card">
              <h2 class="card-title">Detail Pembelajaran</h2>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Pendapatan Bulan Ini</span>
                  <span class="info-value highlight"
                    >{{ formatCurrency(tutor.monthlyEarnings) }} /
                    {{ formatCurrency(tutor.totalEarnings) }}</span
                  >
                </div>
                <div class="info-item">
                  <span class="info-label">Pertemuan Bulan Ini</span>
                  <span class="info-value highlight"
                    >{{ tutor.completedMeetings }} /
                    {{ tutor.totalMeetings }}</span
                  >
                </div>
              </div>
              <div class="button-group">
                <button @click="showHistoryModal = true" class="btn-secondary">
                  <History :size="20" />
                  Riwayat Penerimaan Gaji
                </button>
                <button @click="showInvoiceModal = true" class="btn-primary">
                  <FileText :size="20" />
                  Masukkan Invoice Gaji
                </button>
              </div>
            </div>
          </div>

          <!-- Pembayaran Siswa Section -->
          <div class="students-section">
            <h2 class="section-title">Pembayaran Siswa</h2>
            <div
              v-if="tutor.students && tutor.students.length > 0"
              class="students-list"
            >
              <div
                v-for="student in tutor.students"
                :key="student.id"
                class="student-row"
              >
                <div class="student-left">
                  <img
                    :src="
                      student.photo ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        student.name || 'User'
                      )}&background=41a6c2&color=fff&size=128&bold=true`
                    "
                    :alt="student.name"
                    class="student-photo"
                    @error="handleImageError"
                  />
                  <div class="student-name-section">
                    <h3 class="student-name">{{ student.name }}</h3>
                    <p class="student-subject">{{ student.subject }}</p>
                    <div class="student-progress">
                      <span class="progress-text"
                        >{{ student.completedMeetings }} /
                        {{ student.totalMeetings }} Pertemuan</span
                      >
                      <div class="progress-bar">
                        <div
                          class="progress-fill"
                          :style="{
                            width:
                              (student.completedMeetings /
                                student.totalMeetings) *
                                100 +
                              '%',
                          }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="student-right">
                  <span
                    :class="[
                      'status-badge',
                      student.status.toLowerCase().replace(' ', '-'),
                    ]"
                  >
                    {{ student.status }}
                  </span>
                  <span class="student-earnings"
                    >{{ formatCurrency(student.earnings) }} /
                    {{ formatCurrency(student.totalEarnings) }}</span
                  >
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <p>Belum ada data pembayaran siswa</p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- History Modal -->
    <div v-if="showHistoryModal" class="modal-overlay" @click="closeHistory">
      <div class="modal-content" @click.stop>
        <h2 class="modal-title">History Pengiriman Gaji</h2>

        <div class="history-list">
          <div
            v-for="(history, index) in salaryHistory"
            :key="index"
            class="history-item"
          >
            <p class="history-date">Invoice {{ history.date }}</p>
            <a :href="history.link" target="_blank" class="history-link">
              {{ history.link }}
            </a>
          </div>
        </div>

        <button @click="closeHistory" class="btn-close">Tutup</button>
      </div>
    </div>

    <!-- Invoice Modal -->
    <div v-if="showInvoiceModal" class="modal-overlay" @click="closeInvoice">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Masukkan Invoice Gaji</h2>
          <FileText :size="24" class="modal-icon" />
        </div>

        <div class="form-group">
          <label class="form-label">Nominal Gaji</label>
          <input
            type="text"
            v-model="invoice.amount"
            placeholder="Rp. 150.000"
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Bukti Transfer</label>
          <div class="file-upload">
            <input
              type="file"
              ref="fileInput"
              @change="handleFileUpload"
              accept=".pdf,.jpg,.jpeg,.png"
              class="file-input"
            />
            <div class="file-upload-area" @click="$refs.fileInput.click()">
              <FileText :size="32" class="upload-icon" />
              <p v-if="!invoice.fileName">Masukkan File Anda</p>
              <p v-else class="file-name">{{ invoice.fileName }}</p>
              <span class="file-hint">PDF / File Images</span>
            </div>
          </div>
        </div>

        <button @click="submitInvoice" class="btn-submit">
          Simpan Invoice
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavbarAdmin from "@/components/layout/navbar-admin.vue";
import { ArrowLeft, History, FileText } from "lucide-vue-next";
import {
  getTutorDetail,
  getTutorSalaryHistory,
  submitSalaryInvoice,
} from "@/services/adminDashboardService";

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const showHistoryModal = ref(false);
const showInvoiceModal = ref(false);
const tutor = ref({
  name: "",
  fullName: "",
  photo: null,
  email: "",
  birthDate: "",
  phone: "",
  subject: "",
  monthlyEarnings: 0,
  totalEarnings: 0,
  completedMeetings: 0,
  totalMeetings: 0,
  students: [],
});
const salaryHistory = ref([]);
const invoice = ref({
  amount: "",
  file: null,
  fileName: "",
});
const fileInput = ref(null);

// Load tutor detail on mount
onMounted(async () => {
  const tutorId = route.params.id;
  if (tutorId) {
    await loadTutorDetail(tutorId);
    await loadSalaryHistory(tutorId);
  }
});

// Load tutor detail from database
const loadTutorDetail = async (tutorId) => {
  loading.value = true;
  try {
    const data = await getTutorDetail(tutorId);
    console.log("Tutor detail loaded:", data);

    // Map backend data to component structure
    tutor.value = {
      id: data.id,
      name: data.name,
      fullName: data.fullName || data.name,
      photo: data.photo,
      email: data.email,
      birthDate: formatDate(data.birthDate) || "N/A",
      phone: data.phone || "N/A",
      subject: data.subject || "N/A",
      monthlyEarnings: data.monthlyEarnings || 0,
      totalEarnings: data.totalEarnings || 0,
      completedMeetings: data.completedMeetings || 0,
      totalMeetings: data.totalMeetings || 0,
      students: data.students || [],
    };
  } catch (error) {
    console.error("Error loading tutor detail:", error);
    alert("Gagal memuat data tutor");
  } finally {
    loading.value = false;
  }
};

// Load salary history
const loadSalaryHistory = async (tutorId) => {
  try {
    const data = await getTutorSalaryHistory(tutorId);
    salaryHistory.value = data.map((item) => ({
      id: item.id,
      date: item.date,
      link: item.link,
      amount: item.amount,
      notes: item.notes,
    }));
  } catch (error) {
    console.error("Error loading salary history:", error);
    salaryHistory.value = [];
  }
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date from ISO to Indonesian format
const formatDate = (dateString) => {
  if (!dateString || dateString === "N/A") return "N/A";

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "N/A";

    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    invoice.value.file = file;
    invoice.value.fileName = file.name;
  }
};

// Submit invoice
const submitInvoice = async () => {
  if (!invoice.value.amount || !invoice.value.file) {
    alert("Harap lengkapi semua field");
    return;
  }

  // Remove non-numeric characters from amount
  const numericAmount = invoice.value.amount.replace(/[^0-9]/g, "");

  if (!numericAmount || parseInt(numericAmount) <= 0) {
    alert("Nominal gaji harus valid");
    return;
  }

  try {
    await submitSalaryInvoice({
      tutor_id: tutor.value.id,
      amount: parseInt(numericAmount),
      paid_at: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
      file: invoice.value.file,
      notes: `Pembayaran gaji bulan ${new Date().toLocaleString("id-ID", {
        month: "long",
        year: "numeric",
      })}`,
    });

    alert("Invoice berhasil disimpan!");
    closeInvoice();
    // Reload salary history
    await loadSalaryHistory(tutor.value.id);
  } catch (error) {
    console.error("Error submitting invoice:", error);
    const errorMessage =
      error?.response?.data?.message || "Gagal menyimpan invoice";
    alert(errorMessage);
  }
};

// Modal handlers
const closeHistory = () => {
  showHistoryModal.value = false;
};

const closeInvoice = () => {
  showInvoiceModal.value = false;
  invoice.value = { amount: "", file: null, fileName: "" };
};

// Navigation
const goBack = () => {
  router.push("/admin/kelola-tutor");
};

// Handle image error - show avatar with initials
const handleImageError = (event) => {
  const name = event.target.alt || "User";
  event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=41a6c2&color=fff&size=128&bold=true`;
};
</script>

<style scoped>
.detail-kelola-tutor {
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

/* Main Card */
.main-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.header-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  text-align: center;
}

/* Profile Section */
.profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
}

.profile-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
}

.profile-subject {
  font-size: 1.1rem;
  color: #41a6c2;
  font-weight: 600;
  margin: 0;
}

/* Cards Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #41a6c2;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.85rem;
  color: #718096;
  font-weight: 600;
}

.info-value {
  font-size: 1rem;
  color: #2d3748;
  font-weight: 600;
}

.info-value.highlight {
  font-size: 1.5rem;
  color: #41a6c2;
}

/* Button Group */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #41a6c2;
  color: white;
}

.btn-primary:hover {
  background: #358a9f;
}

.btn-secondary {
  background: white;
  color: #41a6c2;
  border: 2px solid #41a6c2;
}

.btn-secondary:hover {
  background: #f7fafc;
}

/* Students Section */
.students-section {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #41a6c2;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.students-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.student-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.student-row:hover {
  border-color: #41a6c2;
  box-shadow: 0 4px 8px rgba(65, 166, 194, 0.1);
}

.student-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.student-photo {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
  flex-shrink: 0;
}

.student-name-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.student-name {
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.student-subject {
  font-size: 0.85rem;
  color: #718096;
  margin: 0 0 0.5rem 0;
}

.student-progress {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.progress-text {
  font-size: 0.75rem;
  color: #718096;
  font-weight: 600;
}

.progress-bar {
  width: 200px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #41a6c2 0%, #5cb3cc 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.student-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.in-progress {
  background: #fef3c7;
  color: #92400e;
}

.student-earnings {
  font-size: 1rem;
  font-weight: 700;
  color: #41a6c2;
  min-width: 120px;
  text-align: right;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #41a6c2;
  margin: 0;
}

.modal-icon {
  color: #41a6c2;
}

/* History List */
.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.history-item {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.history-date {
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
}

.history-link {
  color: #41a6c2;
  text-decoration: none;
  font-size: 0.9rem;
}

.history-link:hover {
  text-decoration: underline;
}

/* Form */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.875rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #41a6c2;
}

.file-upload {
  position: relative;
}

.file-input {
  display: none;
}

.file-upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-upload-area:hover {
  border-color: #41a6c2;
  background: #f7fafc;
}

.upload-icon {
  color: #718096;
  margin: 0 auto 1rem;
}

.file-name {
  color: #41a6c2;
  font-weight: 600;
}

.file-hint {
  display: block;
  font-size: 0.85rem;
  color: #a0aec0;
  margin-top: 0.5rem;
}

.btn-submit,
.btn-close {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit {
  background: #41a6c2;
  color: white;
}

.btn-submit:hover {
  background: #358a9f;
}

.btn-close {
  background: #e2e8f0;
  color: #2d3748;
  margin-top: 1rem;
}

.btn-close:hover {
  background: #cbd5e0;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-section {
    flex-direction: column;
    text-align: center;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .info-row {
    grid-template-columns: 1fr;
  }

  .student-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .student-right {
    width: 100%;
    justify-content: space-between;
  }

  .student-earnings {
    text-align: left;
    min-width: auto;
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #a0aec0;
  font-size: 1rem;
}
</style>
