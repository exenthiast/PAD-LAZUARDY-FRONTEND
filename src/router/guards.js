/**
 * Route Guards untuk proteksi halaman berdasarkan authentication dan role
 */

export function setupGuards(router) {
  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("auth_token");
    const userStr = localStorage.getItem("auth_user");
    const user = userStr ? JSON.parse(userStr) : null;

    console.log("Route guard:", {
      to: to.path,
      from: from.path,
      hasToken: !!token,
      user: user,
    });

    // Halaman yang tidak perlu authentication
    const publicPages = [
      "/login",
      "/student/register",
      "/tutor/register",
      "/student/register-otp",
      "/tutor/tutor-otp",
      "/forgot-password",
      "/choose-role",
      "/verify-otp",
      "/auth/callback",
      "/admin/data-tutor",
      "/",
    ];

    const isPublicPage = publicPages.some((page) => to.path.startsWith(page));

    // Jika halaman public, izinkan akses
    if (isPublicPage) {
      next();
      return;
    }

    // Jika tidak ada token, redirect ke login
    if (!token || !user) {
      console.log("No auth, redirecting to login");
      next("/login");
      return;
    }

    // Deteksi role user
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

    // Guard khusus untuk tutor
    if (to.path.startsWith("/tutor")) {
      if (normalizedRole !== "tutor") {
        console.log("Not a tutor, access denied");
        next("/login");
        return;
      }

      const status =
        user.status || user.tutor_status || user.verification_status;

      // Halaman yang bisa diakses tutor dengan status apapun
      const tutorPublicPages = [
        "/tutor/register-lanjutan",
        "/tutor/home-pending",
        "/tutor/rejected",
        "/tutor/register",
        "/tutor/tutor-otp",
      ];

      const isTutorPublicPage = tutorPublicPages.some((page) =>
        to.path.startsWith(page)
      );

      // Jika mencoba akses dashboard tapi belum active
      if (to.path === "/tutor/dashboard") {
        if (status !== "active" && status !== "approved") {
          console.log("Tutor not active, redirecting based on status:", status);

          // Cek apakah sudah lengkap data profil
          const hasCompleteProfile = user.keahlian && user.marketSiswa;

          if (!hasCompleteProfile) {
            next("/tutor/register-lanjutan");
          } else if (status === "rejected") {
            next("/tutor/rejected");
          } else {
            next("/tutor/home-pending");
          }
          return;
        }
      }

      // Jika sudah active tapi masih di halaman pending/rejected
      if (status === "active" || status === "approved") {
        if (
          to.path === "/tutor/home-pending" ||
          to.path === "/tutor/rejected"
        ) {
          console.log("Tutor already active, redirecting to dashboard");
          next("/tutor/dashboard");
          return;
        }
      }
    }

    // Guard untuk student
    if (to.path.startsWith("/student")) {
      if (normalizedRole !== "student" && normalizedRole !== "siswa") {
        console.log("Not a student, access denied");
        next("/login");
        return;
      }
    }

    // Guard untuk admin
    if (to.path.startsWith("/admin")) {
      if (normalizedRole !== "admin") {
        console.log("Not an admin, access denied");
        next("/login");
        return;
      }
    }

    // Jika semua pengecekan lolos, izinkan akses
    next();
  });
}
