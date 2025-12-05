<template>
  <div class="auth-wrap">
    <div class="auth-card">
      <!-- Kiri: form -->
      <div class="login-card">
        <div class="logo">
          <img :src="logo" alt="Bimbel Lazuardy" />
        </div>

        <div class="flex justify-center mb-4">
          <button
            @click="handleSiswa"
            class="text-[#41a6c2] hover:text-teal-700 flex items-center gap-2"
          >
            Daftar sebagai Siswa
          </button>
          &nbsp; atau &nbsp;
          <button
            @click="handleTutor"
            class="text-[#41a6c2] hover:text-teal-700 flex items-center gap-2"
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
              minlength="8"
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
            >
              <EyeClosed v-if="showPassword" class="eye-icon" />
              <Eye v-else class="eye-icon" />
            </button>
          </div>

          <p v-if="tried && !isValid" class="error-text">
            Email harus valid dan password minimal 8 karakter.
          </p>

          <p v-if="serverError" class="error-text">
            {{ serverError }}
          </p>

          <div class="button-group">
            <button
              type="submit"
              class="btn-login"
              :disabled="submitting || !isValid"
            >
              {{ submitting ? "Memproses…" : "Masuk" }}
            </button>

            <div class="forgot-password">
              <button
                type="button"
                class="text-sm text-[#41a6c2] hover:text-teal-700"
                @click="handleForgotPassword"
              >
                Lupa password?
              </button>
            </div>

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
import { Eye } from "lucide-vue-next";
import { EyeClosed } from "lucide-vue-next";
import hero from "@/assets/hero.png";
import logo from "@/assets/logo.svg";
import { loginRequest, fetchMe } from "@/services/auth.js";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const submitting = ref(false);
const tried = ref(false);

const serverError = ref();

function extractErr(e) {
  return (
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.message ||
    "Email atau password salah."
  );
}

const isValid = computed(() => {
  const emailOk = /\S+@\S+\.\S+/.test(email.value);
  const passOk = (password.value || "").length >= 8;
  return emailOk && passOk;
});

function getRedirectPath(user) {
  if (!user) {
    console.error("getRedirectPath: user is null or undefined");
    return "/login";
  }

  console.log("=== getRedirectPath Debug ===");
  console.log("Full user object:", JSON.stringify(user, null, 2));

  // Cek berbagai kemungkinan format role dari backend
  let role = null;

  // Format 1: user.role (string langsung)
  if (typeof user.role === "string") {
    role = user.role;
    console.log("Role found in user.role (string):", role);
  }
  // Format 2: user.role.name (object dengan property name)
  else if (user.role && typeof user.role === "object" && user.role.name) {
    role = user.role.name;
    console.log("Role found in user.role.name:", role);
  }
  // Format 3: user.roles (array)
  else if (Array.isArray(user.roles) && user.roles.length > 0) {
    role =
      typeof user.roles[0] === "string" ? user.roles[0] : user.roles[0].name;
    console.log("Role found in user.roles array:", role);
  }
  // Format 4: user.data.roles (nested array)
  else if (
    user.data &&
    Array.isArray(user.data.roles) &&
    user.data.roles.length > 0
  ) {
    role =
      typeof user.data.roles[0] === "string"
        ? user.data.roles[0]
        : user.data.roles[0].name;
    console.log("Role found in user.data.roles:", role);
  }
  // Format 5: user.role_id (ID based)
  else if (user.role_id) {
    // Map role_id ke nama role
    const roleMap = {
      1: "admin",
      2: "tutor",
      3: "student",
    };
    role = roleMap[user.role_id];
    console.log("Role found via role_id:", user.role_id, "=>", role);
  }
  // Format 6: Cek semua property user
  else {
    console.warn(
      "Role not found in standard locations, checking all properties:"
    );
    Object.keys(user).forEach((key) => {
      if (key.toLowerCase().includes("role")) {
        console.log(`Found role-related property: ${key} =`, user[key]);
      }
    });
  }

  console.log("Detected role:", role);

  // Jika masih null, coba cek dari email (admin biasanya punya email khusus)
  if (!role && user.email) {
    if (user.email.toLowerCase().includes("admin")) {
      role = "admin";
      console.log("Role guessed from email:", role);
    }
  }

  // Normalisasi role ke lowercase
  const normalizedRole = String(role || "")
    .toLowerCase()
    .trim();

  console.log("Normalized role:", normalizedRole);

  // Jika masih kosong, return error yang jelas
  if (!normalizedRole) {
    console.error("CRITICAL: Role is empty or undefined!");
    console.error("User data:", user);
    // Fallback: redirect ke student dashboard sebagai default
    console.warn("Defaulting to student dashboard as fallback");
    return "/student/dashboard";
  }

  switch (normalizedRole) {
    case "admin":
    case "administrator":
      console.log("Redirecting to admin dashboard");
      return "/admin/dashboard";

    case "tutor":
    case "guru":
    case "pengajar":
      // Cek status tutor
      const status =
        user.status || user.tutor_status || user.verification_status;
      console.log("Tutor status:", status);

      if (status === "pending" || status === "verify") {
        console.log("Redirecting to tutor pending");
        return "/tutor/home-pending";
      } else if (status === "rejected") {
        console.log("Redirecting to tutor rejected");
        return "/tutor/rejected";
      } else if (status === "active" || status === "approved") {
        console.log("Redirecting to tutor dashboard");
        return "/tutor/dashboard";
      } else {
        console.log("Tutor status unclear, redirecting to pending");
        return "/tutor/home-pending";
      }

    case "student":
    case "siswa":
    case "murid":
      console.log("Redirecting to student dashboard");
      return "/student/dashboard";

    default:
      console.warn("Unknown role:", normalizedRole);
      console.warn("Defaulting to student dashboard");
      return "/student/dashboard";
  }
}

const handleLogin = async () => {
  tried.value = true;
  if (!isValid.value) return;
  submitting.value = true;
  serverError.value = "";

  try {
    console.log("Login attempt with:", { email: email.value });

    const result = await loginRequest({
      email: email.value,
      password: password.value,
    });

    console.log("Login response:", result);

    const token =
      result?.token ??
      result?.access_token ??
      result?.data?.token ??
      result?.data?.access_token;

    const userRaw = result?.user ?? result?.data?.user ?? null;

    if (!token) {
      throw new Error("Token tidak ditemukan dalam response");
    }

    // Simpan token
    localStorage.setItem("auth_token", token);

    if (userRaw) {
      localStorage.setItem("auth_user", JSON.stringify(userRaw));
    }

    // Fetch user profile lengkap dari API
    let me = userRaw;
    try {
      const meResponse = await fetchMe();
      console.log("Fetched user profile:", meResponse);
      console.log("meResponse type:", typeof meResponse);
      console.log("meResponse.user exists:", !!meResponse?.user);
      
      // fetchMe() mengembalikan {user: {...}}, ambil user-nya saja
      me = meResponse?.user || meResponse;
      console.log("Extracted me:", me);
      
      if (me) {
        localStorage.setItem("auth_user", JSON.stringify(me));
      }
    } catch (fetchError) {
      console.warn("Failed to fetch user profile:", fetchError);
    }

    const userData = me || userRaw;
    console.log("userData before getRedirectPath:", userData);
    
    if (!userData) {
      throw new Error("Data user tidak ditemukan");
    }

    const target = getRedirectPath(userData);
    console.log("Redirecting to:", target);

    // Hapus validasi yang terlalu ketat - biarkan default fallback bekerja
    // if (!target || target === "/login") {
    //   throw new Error(
    //     "Redirect path tidak valid. Role mungkin tidak dikenali."
    //   );
    // }

    alert("Login berhasil!");

    // Tunggu sebentar sebelum redirect agar alert terlihat
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Gunakan replace agar tidak bisa back ke login page
    await router.replace(target);

    console.log("Redirect completed to:", target);
  } catch (error) {
    console.error("Login error:", error);
    serverError.value = extractErr(error);
    alert(`Gagal login: ${serverError.value}`);
  } finally {
    submitting.value = false;
  }
};

const handleSiswa = () => {
  router.push("/student/register");
};

const handleTutor = () => {
  router.push("/tutor/register");
};

const handleForgotPassword = () => {
  router.push("/forgot-password");
};

const handleGoogleLogin = async () => {
  window.location.href = "http://localhost:8000/auth/google";
  console.log("Google login clicked");
};

const handleFacebookLogin = async () => {
  window.location.href = "http://localhost:8000/auth/facebook";
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
  border-color: #41a6c2;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye-icon {
  width: 30px;
  height: 30px;
  color: #000;
  transition: color 0.2s;
}

.password-toggle:hover .eye-icon {
  color: #999;
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
  background: #41a6c2;
  color: #fff;
}
.btn-login:hover {
  background: #2d8a9c;
}
.btn-register {
  background: #fff;
  color: #41a6c2;
  border: 1px solid #41a6c2;
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
