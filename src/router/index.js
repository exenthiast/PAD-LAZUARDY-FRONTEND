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
import ProfilePage from "../views/student/ProfilePage.vue";
import TutorOtp from "../views/tutor/TutorOtp.vue";
import LanjutanTutor from "../views/tutor/LanjutanTutor.vue";
import TutorListPage from "../views/tutors/TutorListPage.vue";
import TutorDetailPage from "../views/tutors/TutorDetailPage.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import EditProfile from "../views/student/EditProfile.vue";
import PackageListPage from "../views/packages/PackageListPage.vue";
import ConversationDetail from "../views/messages/ConversationDetail.vue";
import AuthCallback from "../views/AuthCallback.vue";
import SchedulePage from "../views/student/SchedulePage.vue";
import DashboardTutor from "../views/tutor/DashboardTutor.vue";
import HomePending from "../views/tutor/HomePending.vue";
import MyStudentPage from "../views/tutor/MyStudentPage.vue";

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
    path: "/auth/callback",
    name: "AuthCallback",
    component: AuthCallback
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
    path: "/payment/checkout",
    name: "CheckoutPage",
    component: CheckoutPage,
  },
  {
    path: "/student/payment-history",
    name: "PaymentHistoryPage",
    component: PaymentHistoryPage,
  },
  {
    path: "/student/profile-student",
    name: "ProfilePage",
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
    path: "/tutor/dashboard",
    name: "DashboardTutor",
    component: DashboardTutor,
  },
  {
    path: "/tutor/ajuan-belajar",
    name: "AjuanBelajar",
    component: MyStudentPage,
  },
  {
    path: "/messages/:tutorId",
    name: "ConversationDetail",
    component: ConversationDetail,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
