<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <!-- Kiri: form -->
      <div class="login-card">
        <div class="logo">
          <img :src="logo" alt="Bimbel Lazuardy" />
        </div>

        <form @submit.prevent="handleLogin" class="login-form" novalidate>
          <div class="form-group">
            <input
              id="email"
              type="email"
              v-model.trim="email"
              required
              placeholder="Email"
              inputmode="email"
              autocomplete="email"
            />
          </div>

          <div class="form-group">
            <input
              id="password"
              type="password"
              v-model.trim="password"
              required
              placeholder="Password"
              autocomplete="current-password"
              minlength="6"
            />
          </div>

          <p v-if="tried && !isValid" class="error-text">
            Email harus valid dan password minimal 6 karakter.
          </p>

          <div class="button-group">
            <button
              type="submit"
              class="btn-login"
              :disabled="submitting || !isValid"
            >
              {{ submitting ? "Memproses…" : "Masuk" }}
            </button>

            <button type="button" class="btn-register" @click="handleRegister">
              Daftar
            </button>
          </div>
        </form>
      </div>

      <!-- Kanan: panel abu-abu ber-gambar -->
      <div
        class="illustration-panel"
        :style="{ backgroundImage: `url(${hero})` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// gambar di src/assets/
import hero from "@/assets/hero.png";
import logo from "@/assets/logo.svg";

const router = useRouter();

const email = ref("");
const password = ref("");
const submitting = ref(false);
const tried = ref(false);

const isValid = computed(() => {
  const emailOk = /\S+@\S+\.\S+/.test(email.value);
  const passOk = (password.value || "").length >= 6;
  return emailOk && passOk;
});

const handleLogin = async () => {
  tried.value = true;
  if (!isValid.value) return;
  submitting.value = true;
  try {
    // TODO: panggil API login di sini
    alert("Login berhasil!");
    // router.push('/dashboard')
  } finally {
    submitting.value = false;
  }
};

const handleRegister = () => {
  router.push("/register");
};
</script>

<style scoped>
/* wrapper halaman */
.auth-wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f5f5;
  padding: 24px;
}

/* kartu besar: 2 kolom (form | ilustrasi) */
.auth-card {
  width: min(1100px, 87vw);
  min-height: 520px;
  background: #f6f7f8; /* abu-abu terang seperti contoh */
  border-radius: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 420px 1fr;
  overflow: hidden;
}

/* kiri: form (punyamu sebelumnya, sedikit rapih) */
.login-card {
  background: #fff;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 28px;
}
.logo img {
  width: 160px;
  height: auto;
  object-fit: contain;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 14px;
}
.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  transition: border-color 0.2s;
}
.form-group input::placeholder {
  color: #999;
}
.form-group input:focus {
  outline: none;
  border-color: #36a3b9;
}

.error-text {
  color: #d33;
  font-size: 0.9rem;
  margin-top: 8px;
}

.button-group {
  margin-top: 18px;
}
.btn-login,
.btn-register {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: 0;
  margin-bottom: 10px;
  transition: 0.2s;
}
.btn-login {
  background: #36a3b9;
  color: #fff;
}
.btn-login:hover {
  background: #2d8a9c;
}
.btn-register {
  background: #fff;
  color: #36a3b9;
  border: 1px solid #36a3b9;
}
.btn-register:hover {
  background: #f0f9fb;
}
.btn-login[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* kanan: panel ilustrasi sebagai background */
.illustration-panel {
  background: #e7eef2; /* fallback */
  background-size: cover;
  background-position: center;
}

/* responsive: jadi satu kolom, gambar di atas */
@media (max-width: 900px) {
  .auth-card {
    grid-template-columns: 1fr;
  }
  .illustration-panel {
    height: 260px;
    order: -1;
  }
}
</style>
