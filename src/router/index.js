import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import SearchView from "../views/SearchView.vue";
import LoginForm from "../views/LoginForm.vue";
import RegisterForm from "../views/student/RegisterForm.vue";
import RegisterTutor from "../views/tutor/RegisterTutor.vue";
import RegisterLanjutan from "../views/student/RegisterLanjutan.vue";
import RegisterOtp from "../views/student/RegisterOtp.vue";
import DashboardPage from "../views/student/DashboardPage.vue";
import ProfilePage from "../views/student/ProfilePage.vue";
import TutorOtp from "../views/tutor/TutorOtp.vue";
import LanjutanTutor from "../views/tutor/LanjutanTutor.vue";
import TutorListPage from "../views/tutors/TutorListPage.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import EditProfile from "../views/student/EditProfile.vue";

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
    path: "/student/dashboard",
    name: "DashboardPage",
    component: DashboardPage,
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
    path: "/tutor/otp-tutor",
    name: "TutorOtp",
    component: TutorOtp,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
