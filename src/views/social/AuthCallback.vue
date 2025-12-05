<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
      <div v-if="loading" class="space-y-4">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#41a6c2] mx-auto"
        ></div>
        <p class="text-lg font-semibold text-gray-700">
          Memproses autentikasi...
        </p>
      </div>

      <div v-if="error" class="space-y-4">
        <div class="text-red-500 text-5xl">⚠️</div>
        <p class="text-lg font-semibold text-red-600">{{ error }}</p>
        <button
          @click="goToLogin"
          class="mt-4 px-6 py-2 bg-[#41a6c2] text-white rounded-lg hover:bg-[#358a9f] transition"
        >
          Kembali ke Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  try {
    const token = route.query.token;
    const status = route.query.status;
    const onboardingToken = route.query.t;

    console.log("AuthCallback params:", { token, status, onboardingToken });

    // Case 1: User baru yang perlu pilih role
    if (status === "NEEDS_ROLE") {
      if (!onboardingToken) {
        throw new Error("Onboarding token tidak ditemukan");
      }
      router.replace({ name: "ChooseRole", query: { t: onboardingToken } });
      return;
    }

    // Case 2: User baru yang perlu OTP (setelah pilih role)
    if (status === "NEEDS_OTP") {
      if (!onboardingToken) {
        throw new Error("Onboarding token tidak ditemukan");
      }
      const role = route.query.role || "";
      router.replace({
        name: "VerifyOtp",
        query: { t: onboardingToken, role },
      });
      return;
    }

    // Case 3: User sudah terdaftar lengkap, langsung dapat token
    if (token) {
      localStorage.setItem("auth_token", token);

      // Fetch user profile
      const response = await axios.get("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data.user || response.data;

      console.log("User profile:", user);

      // CEK: Jika role masih kosong/null, paksa ke choose-role
      if (!user.role || user.role === null || user.role === "") {
        localStorage.setItem("auth_user", JSON.stringify(user));
        localStorage.setItem("onboarding_token", token);
        console.log("User belum punya role, redirect ke choose-role");
        router.replace("/choose-role");
        return;
      }

      localStorage.setItem("auth_user", JSON.stringify(user));

      // Redirect berdasarkan role dan status
      const redirectPath = getRedirectPath(user);
      console.log("Redirecting to:", redirectPath);

      router.replace(redirectPath);
      return;
    }

    // Case 4: Tidak ada parameter yang valid
    throw new Error("Parameter autentikasi tidak valid");
  } catch (err) {
    console.error("AuthCallback error:", err);
    error.value =
      err.response?.data?.message || err.message || "Autentikasi gagal";
    loading.value = false;
  }
});

function getRedirectPath(user) {
  if (!user) return "/login";

  // Deteksi role
  let role = null;
  if (typeof user.role === "string") {
    role = user.role;
  } else if (user.role?.name) {
    role = user.role.name;
  } else if (Array.isArray(user.roles) && user.roles.length > 0) {
    role =
      typeof user.roles[0] === "string" ? user.roles[0] : user.roles[0].name;
  }

  const normalizedRole = String(role || "")
    .toLowerCase()
    .trim();

  switch (normalizedRole) {
    case "admin":
      return "/admin/dashboard";

    case "tutor":
      // Cek apakah data tutor sudah lengkap
      if (!user.tutor) {
        // Belum ada data tutor sama sekali
        return "/tutor/register-lanjutan";
      }

      // Cek kelengkapan data tutor dari relasi
      const tutorData = user.tutor;
      if (!tutorData.keahlian || !tutorData.market_siswa) {
        // Data tutor belum lengkap
        return "/tutor/register-lanjutan";
      }

      // Data sudah lengkap, cek status verifikasi
      const status = tutorData.status?.value || tutorData.status || "verify";

      if (status === "pending" || status === "verify") {
        return "/tutor/home-pending";
      } else if (status === "rejected") {
        return "/tutor/rejected";
      } else if (status === "active" || status === "approved") {
        return "/tutor/dashboard";
      } else {
        // Default ke pending jika status tidak jelas
        return "/tutor/home-pending";
      }

    case "student":
    case "siswa":
      return "/student/dashboard";

    default:
      return "/login";
  }
}

function goToLogin() {
  router.push("/login");
}
</script>
