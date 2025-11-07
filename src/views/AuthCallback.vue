<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <div class="login-card">
        <p>Sedang memproses login sosial...</p>
        <p v-if="error" class="error-text">{{ error }}</p>
      </div>
      <div class="illustration-panel"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchMe } from "@/services/auth.js"; 

const route = useRoute();
const router = useRouter();
const error = ref("");

onMounted(async () => {
  const token = route.query.token;
  const err = route.query.error;

  if (err) {
    error.value = "Login sosial gagal: " + err;
    // boleh redirect ke /login setelah beberapa detik
    return;
  }

  if (!token) {
    error.value = "Token tidak ditemukan dari login sosial.";
    return;
  }

  try {
    // simpan token
    localStorage.setItem("auth_token", token);

    // optional: ambil data user terbaru
    try {
      const me = await fetchMe();
      localStorage.setItem("auth_user", JSON.stringify(me));
    } catch (e) {
      // kalau gagal fetchMe nggak apa-apa, minimal token sudah ada
    }

    // TODO: kalau needs_registration mau dicek,
    // bisa panggil endpoint khusus, atau BE bisa include info di query.
    // Untuk sekarang langsung ke dashboard student:
    router.replace("/student/dashboard");
  } catch (e) {
    error.value = "Terjadi kesalahan saat menyelesaikan login sosial.";
  }
});
</script>

<style scoped>
/* boleh copy style dari LoginPage biar konsisten */
.auth-wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f5f5;
  padding: 24px;
}

.auth-card {
  width: min(600px, 90vw);
  min-height: 200px;
  background: #f6f7f8;
  border-radius: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
}

.login-card {
  background: #fff;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.error-text {
  color: #d33;
  margin-top: 8px;
}

.illustration-panel {
  display: none;
}
</style>
