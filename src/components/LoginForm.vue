<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <img src="../assets/logo.svg" alt="Bimbel Lazuardy" />
      </div>

      <form @submit.prevent="onSubmit" class="login-form" novalidate>
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
          <!-- Disable jika belum valid atau sedang submit -->
          <button
            type="submit"
            class="btn-login"
            :disabled="submitting || !isValid"
          >
            {{ submitting ? "Memproses…" : "Masuk" }}
          </button>

          <!-- gunakan emit, bukan $emit -->
          <button type="button" class="btn-register" @click="emit('register')">
            Daftar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const email = ref("");
const password = ref("");
const submitting = ref(false);
const tried = ref(false);

// wajib kalau ingin emit event di <script setup>
const emit = defineEmits(["register", "success"]);

const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);
const isValid = computed(
  () => isValidEmail(email.value) && password.value.length >= 6
);

async function onSubmit() {
  tried.value = true;
  if (!isValid.value || submitting.value) return;

  submitting.value = true;
  try {
    // BUKTI tombol berfungsi (tanpa API dulu)
    await new Promise((r) => setTimeout(r, 300));
    alert("Klik bekerja, form terkirim lokal");
    emit("success");
    // lalu sambungkan ke API login kamu di sini
  } catch (e) {
    console.error(e);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-left: calc((100% - min(90%, 800px)) / 2 + 40px);
}
.login-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 380px;
}
.logo {
  text-align: center;
  margin-bottom: 3rem;
}
.logo img {
  width: 200px;
  height: 200px;
  margin-bottom: 1.5rem;
  object-fit: contain;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
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
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
}

.button-group {
  margin-top: 1.5rem;
}
.btn-login,
.btn-register {
  width: 100%;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}
.btn-login {
  background-color: #36a3b9;
  color: #fff;
}
.btn-login:hover {
  background-color: #2d8a9c;
}
.btn-register {
  background-color: #fff;
  color: #36a3b9;
  border: 1px solid #36a3b9;
}
.btn-register:hover {
  background-color: #f0f9fb;
}

/* visual disabled */
.btn-login[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Hilangkan autofill kuning di Chrome */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}

/* Mobile styles */
@media (max-width: 768px) {
  .login-container {
    padding-left: 0rem;
    justify-content: center;
  }
}
</style>
