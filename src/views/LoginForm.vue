<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <!-- Kiri: form -->
      <div class="login-card">
        <div class="logo">
          <img :src="logo" alt="Bimbel Lazuardy" />
        </div>

        <div class="flex justify- mb-4">
          <button
            @click="handleSiswa"
            class="text-teal-600 hover:text-teal-700 flex items-center gap-2"
          >
            Daftar sebagai Siswa
          </button>
          &nbsp; atau &nbsp;
          <button
            @click="handleTutor"
            class="text-teal-600 hover:text-teal-700 flex items-center gap-2"
          >
            Daftar sebagai Tutor
          </button>
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

          <div class="form-group password-group">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model.trim="password"
              required
              placeholder="Password"
              autocomplete="current-password"
              minlength="6"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="!showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="eye-icon"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="eye-icon"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                />
              </svg>
            </button>
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

            <div class="social-login">
              <div class="divider">atau</div>
              <button
                type="button"
                class="btn-social btn-google"
                @click="handleGoogleLogin"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  class="social-icon"
                />
                Masuk dengan Google
              </button>
              <button
                type="button"
                class="btn-social btn-facebook"
                @click="handleFacebookLogin"
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  class="social-icon"
                />
                Masuk dengan Facebook
              </button>
            </div>
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
const showPassword = ref(false);
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

const handleSiswa = () => {
  router.push("/register");
};

const handleTutor = () => {
  router.push("/register-tutor");
};

const handleGoogleLogin = async () => {
  // TODO: Implement Google OAuth login
  console.log("Google login clicked");
};

const handleFacebookLogin = async () => {
  // TODO: Implement Facebook OAuth login
  console.log("Facebook login clicked");
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

.password-group {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.eye-icon {
  width: 24px;
  height: 24px;
  fill: #999;
  transition: fill 0.2s;
}

.password-toggle:hover .eye-icon {
  fill: #666;
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

/* Social login buttons */
.social-login {
  margin-top: 20px;
}

.divider {
  text-align: center;
  position: relative;
  color: #666;
  margin: 15px 0;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: #e0e0e0;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.btn-social {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #e0e0e0;
  background: white;
  color: #333;
  transition: background-color 0.2s;
}

.btn-social:hover {
  background-color: #f5f5f5;
}

.social-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.btn-google {
  border-color: #ddd;
}

.btn-facebook {
  border-color: #1877f2;
  color: #1877f2;
}

.btn-facebook:hover {
  background-color: #f0f2f5;
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
