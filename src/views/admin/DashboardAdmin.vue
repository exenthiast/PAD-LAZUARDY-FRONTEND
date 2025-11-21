<template>
  <div class="dashboard-admin">
    <!-- Header -->
    <NavbarAdmin />
    <div class="max-w-6xl mx-auto">
      <div class="header">
        <h1 class="title">Dashboard Admin</h1>
      </div>

      <!-- Statistics Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon students">
            <Users />
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Siswa</p>
            <p class="stat-value">{{ stats.totalStudents }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon tutors">
            <Users />
          </div>
          <div class="stat-content">
            <p class="stat-label">Total Tutor</p>
            <p class="stat-value">{{ stats.totalTutors }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon transactions">
            <DollarSign />
          </div>
          <div class="stat-content">
            <p class="stat-label">Transaksi Bulan Ini</p>
            <p class="stat-value">{{ stats.monthlyTransactions }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon rating">
            <Star />
          </div>
          <div class="stat-content">
            <p class="stat-label">Rating Rata-rata</p>
            <p class="stat-value">{{ stats.averageRating }} <Star /></p>
          </div>
        </div>
      </div>

      <!-- Verifikasi Tutor -->
      <div class="table-section">
        <h2 class="section-title">Verifikasi Tutor</h2>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Nama Tutor</th>
                <th>Mata Pelajaran</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="tutorVerifications.length === 0">
                <td colspan="4" class="empty-state">
                  Tidak ada data verifikasi tutor
                </td>
              </tr>
              <tr v-for="tutor in tutorVerifications" :key="tutor.id">
                <td>{{ tutor.name }}</td>
                <td>{{ tutor.subject }}</td>
                <td>
                  <span :class="['status-badge', tutor.status.toLowerCase()]">
                    {{ tutor.status }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button
                      @click="viewTutorDetail(tutor.id)"
                      class="btn-action btn-detail"
                    >
                      Cek Data
                    </button>
                    <button
                      v-if="tutor.status === 'Menunggu'"
                      @click="approveTutor(tutor.id)"
                      class="btn-action btn-approve"
                    >
                      Setujui
                    </button>
                    <button
                      v-if="tutor.status === 'Menunggu'"
                      @click="rejectTutor(tutor.id)"
                      class="btn-action btn-reject"
                    >
                      Tolak
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Verifikasi Pembayaran -->
      <div class="table-section">
        <h2 class="section-title">Verifikasi Pembayaran</h2>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Paket</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="paymentVerifications.length === 0">
                <td colspan="4" class="empty-state">
                  Tidak ada data verifikasi pembayaran
                </td>
              </tr>
              <tr v-for="payment in paymentVerifications" :key="payment.id">
                <td>{{ payment.studentName }}</td>
                <td>{{ payment.package }}</td>
                <td>
                  <span :class="['status-badge', payment.status.toLowerCase()]">
                    {{ payment.status }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button
                      @click="viewPaymentDetail(payment.id)"
                      class="btn-action btn-detail"
                    >
                      Cek Data
                    </button>
                    <button
                      v-if="payment.status === 'Menunggu'"
                      @click="verifyPayment(payment.id)"
                      class="btn-action btn-approve"
                    >
                      Verifikasi
                    </button>
                    <button
                      v-if="payment.status === 'Menunggu'"
                      @click="rejectPayment(payment.id)"
                      class="btn-action btn-reject"
                    >
                      Tolak
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NavbarAdmin from "@/components/layout/navbar-admin.vue";
import { Users } from "lucide-vue-next";
import { DollarSign } from "lucide-vue-next";
import { Star } from "lucide-vue-next";

const router = useRouter();

// Statistics data
const stats = ref({
  totalStudents: 120,
  totalTutors: 45,
  monthlyTransactions: 32,
  averageRating: 4.8,
});

// Tutor verification data (dummy data)
const tutorVerifications = ref([
  {
    id: 1,
    name: "Budi Santoso",
    subject: "Matematika",
    status: "Menunggu",
  },
  {
    id: 2,
    name: "Intan Puspita",
    subject: "Bahasa Inggris",
    status: "Menunggu",
  },
]);

// Payment verification data (dummy data)
const paymentVerifications = ref([
  {
    id: 1,
    studentName: "Rizky Ramadhan",
    package: "Paket Matematika 4x",
    status: "Menunggu",
  },
  {
    id: 2,
    studentName: "Aulia Rani",
    package: "Paket Fisika 4x",
    status: "Menunggu",
  },
]);

// Load dashboard data
onMounted(() => {
  loadDashboardData();
});

const loadDashboardData = async () => {
  // TODO: Replace with actual API calls
  console.log("Loading dashboard data...");
};

// Tutor verification actions
const viewTutorDetail = (tutorId) => {
  router.push(`/admin/data-tutor?id=${tutorId}`);
};

const approveTutor = async (tutorId) => {
  if (confirm("Apakah Anda yakin ingin menyetujui tutor ini?")) {
    try {
      // TODO: Call API to approve tutor
      const index = tutorVerifications.value.findIndex((t) => t.id === tutorId);
      if (index !== -1) {
        tutorVerifications.value[index].status = "Disetujui";
      }
      alert("Tutor berhasil disetujui!");
    } catch (error) {
      console.error("Error approving tutor:", error);
      alert("Gagal menyetujui tutor. Silakan coba lagi.");
    }
  }
};

const rejectTutor = async (tutorId) => {
  if (confirm("Apakah Anda yakin ingin menolak tutor ini?")) {
    try {
      // TODO: Call API to reject tutor
      const index = tutorVerifications.value.findIndex((t) => t.id === tutorId);
      if (index !== -1) {
        tutorVerifications.value[index].status = "Ditolak";
      }
      alert("Tutor berhasil ditolak!");
    } catch (error) {
      console.error("Error rejecting tutor:", error);
      alert("Gagal menolak tutor. Silakan coba lagi.");
    }
  }
};

// Payment verification actions
const viewPaymentDetail = (paymentId) => {
  router.push(`/admin/data-siswa?id=${paymentId}`);
};

const verifyPayment = async (paymentId) => {
  if (confirm("Apakah Anda yakin ingin memverifikasi pembayaran ini?")) {
    try {
      // TODO: Call API to verify payment
      const index = paymentVerifications.value.findIndex(
        (p) => p.id === paymentId
      );
      if (index !== -1) {
        paymentVerifications.value[index].status = "Terverifikasi";
      }
      alert("Pembayaran berhasil diverifikasi!");
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("Gagal memverifikasi pembayaran. Silakan coba lagi.");
    }
  }
};

const rejectPayment = async (paymentId) => {
  if (confirm("Apakah Anda yakin ingin menolak pembayaran ini?")) {
    try {
      // TODO: Call API to reject payment
      const index = paymentVerifications.value.findIndex(
        (p) => p.id === paymentId
      );
      if (index !== -1) {
        paymentVerifications.value[index].status = "Ditolak";
      }
      alert("Pembayaran berhasil ditolak!");
    } catch (error) {
      console.error("Error rejecting payment:", error);
      alert("Gagal menolak pembayaran. Silakan coba lagi.");
    }
  }
};

const handleLogout = () => {
  if (confirm("Apakah Anda yakin ingin keluar?")) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    router.push("/auth/login");
  }
};
</script>

<style scoped>
.dashboard-admin {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2f7 0%, #f0f9fc 100%);
  padding: 2rem;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
}

.btn-logout {
  background: #41a6c2;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout:hover {
  background: #358a9f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(65, 166, 194, 0.3);
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(65, 166, 194, 0.2);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.students {
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
}

.stat-icon.tutors {
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
}

.stat-icon.transactions {
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
}

.stat-icon.rating {
  background: linear-gradient(135deg, #ffd700 0%, #ffb700 100%);
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #2c3e50;
}

/* Table Section */
.table-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #41a6c2;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: #41a6c2;
  color: white;
}

.data-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.data-table tbody tr {
  transition: background-color 0.2s ease;
}

.data-table tbody tr:hover {
  background-color: #f7fafc;
}

.empty-state {
  text-align: center;
  color: #a0aec0;
  padding: 2rem !important;
  font-style: italic;
}

/* Status Badge */
.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge.menunggu {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.disetujui,
.status-badge.terverifikasi {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.ditolak {
  background: #fee2e2;
  color: #991b1b;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-action {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-detail {
  background: #41a6c2;
  color: white;
}

.btn-detail:hover {
  background: #358a9f;
}

.btn-approve {
  background: #10b981;
  color: white;
}

.btn-approve:hover {
  background: #059669;
}

.btn-reject {
  background: #ef4444;
  color: white;
}

.btn-reject:hover {
  background: #dc2626;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-admin {
    padding: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 1rem;
  }

  .stat-icon {
    width: 48px;
    height: 48px;
  }

  .stat-icon svg {
    width: 24px;
    height: 24px;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .table-section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .data-table th,
  .data-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn-action {
    width: 100%;
  }
}
</style>
