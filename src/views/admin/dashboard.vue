<template>
  <div class="dashboard-container">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="logo">Lazuardy Admin</h2>
      <nav>
        <ul>
          <li class="active">📊 Dashboard</li>
          <li>👨‍🏫 Tutor</li>
          <li>👩‍🎓 Siswa</li>
          <li>💰 Transaksi</li>
          <li>⚙️ Pengaturan</li>
        </ul>
      </nav>
      <button class="logout-btn">Keluar</button>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <header class="header">
        <h1>Dashboard Admin</h1>
        <button class="check-btn">🔍 Cek Data</button>
      </header>

      <!-- STATS -->
      <section class="stats-grid">
        <div class="stat-card">
          <h3>Total Siswa</h3>
          <p class="number">120</p>
        </div>
        <div class="stat-card">
          <h3>Total Tutor</h3>
          <p class="number">45</p>
        </div>
        <div class="stat-card">
          <h3>Transaksi Bulan Ini</h3>
          <p class="number">32</p>
        </div>
        <div class="stat-card">
          <h3>Rating Rata-rata</h3>
          <p class="number">4.8 ⭐</p>
        </div>
      </section>

      <!-- CHART SECTION -->
      <!-- <section class="chart-section">
        <div class="chart-card">
          <h2>Statistik Transaksi Mingguan</h2>
          <Bar :data="chartData" :options="chartOptions" />
        </div>
      </section> -->

      <!-- TABLE SECTION -->
      <section class="table-section">
        <!-- VERIFIKASI TUTOR -->
        <div class="table-card">
          <h2>Verifikasi Tutor</h2>
          <table>
            <thead>
              <tr>
                <th>Nama Tutor</th>
                <th>Mata Pelajaran</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Budi Santoso</td>
                <td>Matematika</td>
                <td>Menunggu</td>
                <td>
                  <button class="btn-approve">Setujui</button>
                  <button class="btn-reject">Tolak</button>
                </td>
              </tr>
              <tr>
                <td>Intan Puspita</td>
                <td>Bahasa Inggris</td>
                <td>Menunggu</td>
                <td>
                  <button class="btn-approve">Setujui</button>
                  <button class="btn-reject">Tolak</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- VERIFIKASI PEMBAYARAN -->
        <div class="table-card">
          <h2>Verifikasi Pembayaran</h2>
          <table>
            <thead>
              <tr>
                <th>Nama Siswa</th>
                <th>Paket</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rizky Ramadhan</td>
                <td>Paket Matematika 4x</td>
                <td>Menunggu</td>
                <td>
                  <button class="btn-approve">Verifikasi</button>
                  <button class="btn-reject">Tolak</button>
                </td>
              </tr>
              <tr>
                <td>Aulia Rani</td>
                <td>Paket Fisika 4x</td>
                <td>Menunggu</td>
                <td>
                  <button class="btn-approve">Verifikasi</button>
                  <button class="btn-reject">Tolak</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "AdminDashboard",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
        datasets: [
          {
            label: "Transaksi",
            backgroundColor: "#1F7A8C",
            data: [5, 8, 6, 10, 7, 3, 9],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    };
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background: #f5f8fa;
  font-family: "Poppins", sans-serif;
}

/* Sidebar */
.sidebar {
  width: 230px;
  background: #1f7a8c;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.sidebar .logo {
  font-weight: 600;
  font-size: 18px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 30px;
}

.sidebar li {
  margin: 12px 0;
  cursor: pointer;
  opacity: 0.9;
}

.sidebar li.active {
  font-weight: bold;
  background: #fff;
  color: #1f7a8c;
  padding: 8px 10px;
  border-radius: 6px;
}

.logout-btn {
  background: #e63946;
  border: none;
  padding: 8px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 25px 40px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  color: #1f7a8c;
}

.check-btn {
  background: #1f7a8c;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 25px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 20px;
  text-align: center;
}

.stat-card h3 {
  color: #1f7a8c;
  margin-bottom: 5px;
}

.stat-card .number {
  font-size: 22px;
  font-weight: bold;
}

/* Chart Section */
.chart-section {
  margin-top: 25px;
}

.chart-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center; /* biar canvas di tengah */
  width: fit-content; /* lebar otomatis sesuai isi */
  margin: 0 auto; /* posisi tengah */
}

.chart-card canvas {
  height: 300px !important; /* tinggi chart */
  width: 600px !important;
}


/* Table Section */
.table-section {
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.table-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.table-card h2 {
  color: #1f7a8c;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.btn-approve, .btn-reject {
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
}

.btn-approve {
  background-color: #1f7a8c;
  color: white;
}

.btn-reject {
  background-color: #e63946;
  color: white;
  margin-left: 5px;
}
</style>
