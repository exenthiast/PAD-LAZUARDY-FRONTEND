import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import SearchView from "../views/SearchView.vue";
import LoginForm from "../views/LoginForm.vue";
import RegisterForm from "../views/student/RegisterForm.vue";
import RegisterTutor from "../views/tutor/RegisterTutor.vue";
import RegisterLanjutan from "../views/student/RegisterLanjutan.vue";
import RegisterOtp from "../views/student/RegisterOtp.vue";
import DashboardPage from "../views/student/DashboardPage.vue";
// import ProgressPage from "../views/student/ProgressPage.vue";
// import MyPackagePage from "../views/student/MyPackagePage.vue";
import CheckoutPage from "../views/payment/CheckoutPage.vue";
import PaymentHistoryPage from "../views/student/PaymentHistoryPage.vue";
import PaymentSimulation from "../views/payment/PaymentSimulation.vue";
import PaymentSuccess from "../views/payment/PaymentSuccess.vue";
import ProfilePage from "../views/student/ProfilePage.vue";
import TutorOtp from "../views/tutor/TutorOtp.vue";
import LanjutanTutor from "../views/tutor/LanjutanTutor.vue";
import TutorListPage from "../views/tutors/TutorListPage.vue";
import TutorDetailPage from "../views/tutors/TutorDetailPage.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import VerifyResetOTP from "../views/VerifyResetOTP.vue";
import ResetPassword from "../views/ResetPassword.vue";
import EditProfile from "../views/student/EditProfile.vue";
import PackageListPage from "../views/packages/PackageListPage.vue";
import ConversationDetail from "../views/messages/ConversationDetail.vue";
import AuthCallback from "../views/social/AuthCallback.vue";
import SchedulePage from "../views/student/SchedulePage.vue";
import DashboardTutor from "../views/tutor/DashboardTutor.vue";
import HomePending from "../views/tutor/HomePending.vue";
import MyStudentPage from "../views/tutor/MyStudentPage.vue";
import DashboardAdmin from "../views/admin/DashboardAdmin.vue";
import DetailDataTutor from "../views/admin/DetailDataTutor.vue";
import DetailDataSiswa from "../views/admin/DetailDataSiswa.vue";
import KelolaTutor from "../views/admin/KelolaTutor.vue";
import DetailKelolaTutor from "../views/admin/DetailKelolaTutor.vue";
import AjuanBelajar from "../views/tutor/AjuanBelajar.vue";
import AbsensiStudent from "../views/tutor/AbsensiStudent.vue";
import ProfileTutor from "../views/tutor/ProfilePage.vue";
import EditProfileTutor from "../views/tutor/EditProfileTutor.vue";
import AttendancePage from "../views/student/AttendancePage.vue";
import ReviewPage from "../views/student/ReviewPage.vue";
import ChooseRole from "../views/social/ChooseRole.vue";
import VerifyOtp from "../views/social/VerifyOtp.vue";
import Rejected from "../views/tutor/Rejected.vue";
import { setupGuards } from "./guards.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/choose-role",
    name: "ChooseRole",
    component: ChooseRole,
  },
  {
    path: "/verify-otp",
    name: "VerifyOtp",
    component: VerifyOtp,
  },
  {
    path: "/tutor/register",
    name: "RegisterTutor",
    component: RegisterTutor,
  },
  {
    path: "/tutor/register-lanjutan",
    name: "LanjutanTutor",
    component: LanjutanTutor,
  },
  {
    path: "/student/register",
    name: "Register",
    component: RegisterForm,
  },
  {
    path: "/student/register-lanjutan",
    name: "RegisterLanjutan",
    component: RegisterLanjutan,
  },
  {
    path: "/student/register-otp",
    name: "RegisterOtp",
    component: RegisterOtp,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/verify-reset-otp",
    name: "VerifyResetOTP",
    component: VerifyResetOTP,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/auth/callback",
    name: "AuthCallback",
    component: AuthCallback,
  },
  {
    path: "/student/dashboard",
    name: "DashboardPage",
    component: DashboardPage,
  },
  // {
  //   path: "/student/progress",
  //   name: "ProgressPage",
  //   component: ProgressPage,
  // },
  // {
  //   path: "/student/package",
  //   name: "MyPackagePage",
  //   component: MyPackagePage,
  // },
  {
    path: "/packages",
    name: "PackageListPage",
    component: PackageListPage,
  },
  // Redirect old path to new one
  {
    path: "/package/package-list",
    redirect: "/packages",
  },
  {
    path: "/student/schedule",
    name: "SchedulePage",
    component: SchedulePage,
  },
  {
    path: "/student/attendance/:scheduleId",
    name: "AttendancePage",
    component: AttendancePage,
  },
  {
    path: "/student/review/:tutorId",
    name: "ReviewPage",
    component: ReviewPage,
  },
  {
    path: "/payment/checkout",
    name: "CheckoutPage",
    component: CheckoutPage,
  },
  {
    path: "/payment/simulation/:id",
    name: "PaymentSimulation",
    component: PaymentSimulation,
  },
  {
    path: "/payment/success",
    name: "PaymentSuccess",
    component: PaymentSuccess,
  },
  {
    path: "/student/payment-history",
    name: "PaymentHistoryPage",
    component: PaymentHistoryPage,
  },
  {
    path: "/student/profile-student",
    name: "ProfileStudent",
    component: ProfilePage,
  },
  {
    path: "/student/edit-profile",
    name: "EditProfile",
    component: EditProfile,
  },
  {
    path: "/tutors",
    name: "TutorList",
    component: TutorListPage,
  },
  {
    path: "/tutors/tutor-detail",
    name: "TutorDetailPage",
    component: TutorDetailPage,
  },
  {
    path: "/tutor/otp-tutor",
    name: "TutorOtp",
    component: TutorOtp,
  },
  {
    path: "/tutor/home-pending",
    name: "HomePending",
    component: HomePending,
  },
  {
    path: "/tutor/rejected",
    name: "TutorRejected",
    component: Rejected,
  },
  {
    path: "/tutor/dashboard",
    name: "DashboardTutor",
    component: DashboardTutor,
  },
  {
    path: "/tutor/profile-tutor",
    name: "ProfileTutor",
    component: ProfileTutor,
  },
  {
    path: "/tutor/edit-profile",
    name: "EditProfileTutor",
    component: EditProfileTutor,
  },
  {
    path: "/tutor/ajuan-belajar",
    name: "AjuanBelajar",
    component: AjuanBelajar,
  },
  {
    path: "/tutor/data-siswa",
    name: "MyStudentPage",
    component: MyStudentPage,
  },
  {
    path: "/tutor/absensi-student",
    name: "AbsensiStudent",
    component: AbsensiStudent,
  },
  {
    path: "/messages/:tutorId",
    name: "ConversationDetail",
    component: ConversationDetail,
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: DashboardAdmin,
  },
  {
    path: "/admin/kelola-tutor",
    name: "KelolaTutor",
    component: KelolaTutor,
  },
  {
    path: "/admin/kelola-tutor/:id",
    name: "DetailKelolaTutor",
    component: DetailKelolaTutor,
  },
  {
    path: "/admin/data-tutor",
    name: "DetailDataTutor",
    component: DetailDataTutor,
  },
  {
    path: "/admin/data-siswa",
    name: "DetailDataSiswa",
    component: DetailDataSiswa,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Setup route guards
setupGuards(router);

export default router;
