<template>
  <div class="auth-wrap">
    <div class="login-card">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="Bimbel Lazuardy" />
      </div>

      <h2 class="title">Pilih Role Anda</h2>
      <p class="subtitle">
        Untuk melanjutkan, silakan pilih role yang sesuai dengan kebutuhan Anda
      </p>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="role-options">
        <button
          @click="selectRole('student')"
          :disabled="submitting"
          class="role-card"
          :class="{ active: selectedRole === 'student' }"
        >
          <div class="role-icon student-icon">
            <GraduationCap size="42" />
          </div>
          <h3>Siswa</h3>
          <p>Saya ingin belajar dengan tutor</p>
        </button>

        <button
          @click="selectRole('tutor')"
          :disabled="submitting"
          class="role-card"
          :class="{ active: selectedRole === 'tutor' }"
        >
          <div class="role-icon tutor-icon">
            <Users size="40" />
          </div>
          <h3>Tutor</h3>
          <p>Saya ingin mengajar dan berbagi ilmu</p>
        </button>
      </div>

      <button
        @click="handleSubmit"
        :disabled="!selectedRole || submitting"
        class="submit-btn"
      >
        {{ submitting ? "Memproses..." : "Lanjutkan" }}
      </button>

      <button @click="handleCancel" class="cancel-btn" :disabled="submitting">
        Batal
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GraduationCap } from "lucide-vue-next";
import { Users } from "lucide-vue-next";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const selectedRole = ref("");
const submitting = ref(false);
const error = ref("");
const onboardingToken = ref("");

onMounted(() => {
  // Token dari query parameter
  onboardingToken.value = route.query.t || "";

  if (!onboardingToken.value) {
    error.value = "Token tidak valid. Silakan login ulang.";
  }
});

function selectRole(role) {
  selectedRole.value = role;
  error.value = "";
}

async function handleSubmit() {
  if (!selectedRole.value) {
    error.value = "Pilih role terlebih dahulu";
    return;
  }

  if (!onboardingToken.value) {
    error.value = "Token tidak valid. Silakan login ulang.";
    return;
  }

  submitting.value = true;
  error.value = "";

  try {
    console.log("Setting role:", selectedRole.value);

    // Kirim role ke backend
    const response = await axios.post(
      "http://localhost:8000/api/auth/social/set-role",
      {
        role: selectedRole.value,
      },
      {
        headers: {
          Authorization: `Bearer ${onboardingToken.value}`,
        },
      }
    );

    const data = response.data;
    console.log("Set role response:", data);

    // Simpan token sebagai auth_token
    localStorage.setItem("auth_token", onboardingToken.value);

    // Update user data di localStorage dengan role baru
    if (data.user) {
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    }

    // Redirect berdasarkan role
    if (selectedRole.value === "student") {
      alert("Role Student berhasil disimpan!");
      router.replace("/student/dashboard");
    } else if (selectedRole.value === "tutor") {
      alert("Role Tutor berhasil disimpan! Silakan lengkapi profil Anda.");
      router.replace("/tutor/register-lanjutan");
    }
  } catch (e) {
    console.error("Set role error:", e);
    error.value =
      e.response?.data?.message ||
      e.response?.data?.error ||
      "Gagal menyimpan role. Silakan coba lagi.";
  } finally {
    submitting.value = false;
  }
}

function handleCancel() {
  router.push("/login");
}
</script>

<style scoped>
.auth-wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #ffffff;
  padding: 24px;
}

.login-card {
  width: min(600px, 90vw);
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  margin-bottom: 32px;
  display: flex;
  text-align: center;
  width: 100%;
  justify-content: center;
}

.logo img {
  width: 180px;
  height: auto;
  text-align: center;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  text-align: center;
}

.subtitle {
  font-size: 14px;
  color: #718096;
  margin-bottom: 32px;
  text-align: center;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.role-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}

.role-card {
  background: #f8f9fa;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.role-card:hover {
  border-color: #41a6c2;
  background: #f0f9fc;
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(65, 166, 194, 0.15);
}

.role-card.active {
  border-color: #41a6c2;
  background: linear-gradient(135deg, #e3f2f7 0%, #f0f9fc 100%);
  box-shadow: 0 8px 16px rgba(65, 166, 194, 0.2);
}

.role-card:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.role-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.student-icon {
  background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
  color: white;
}

.tutor-icon {
  background: linear-gradient(135deg, #66bb6a 0%, #43a047 100%);
  color: white;
}

.role-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.role-card p {
  font-size: 13px;
  color: #718096;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #41a6c2 0%, #5cb3cc 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #358a9f 0%, #41a6c2 100%);
  box-shadow: 0 8px 16px rgba(65, 166, 194, 0.3);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.cancel-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #718096;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #cbd5e0;
}

.cancel-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .login-card {
    padding: 32px 24px;
  }

  .role-options {
    grid-template-columns: 1fr;
  }
}
</style>
