import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import SearchView from "../views/SearchView.vue";
import LoginForm from "../views/LoginForm.vue";
import RegisterForm from "../views/student/RegisterForm.vue";
import RegisterTutor from "../views/tutor/RegisterTutor.vue";
import RegisterLanjutan from "../views/student/RegisterLanjutan.vue";
import RegisterOtp from "../views/student/RegisterOtp.vue";
import TutorOtp from "../views/tutor/TutorOtp.vue";
import LanjutanTutor from "../views/tutor/LanjutanTutor.vue";

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
    path: "/register-tutor",
    name: "RegisterTutor",
    component: RegisterTutor,
  },
  {
    path: "/lanjutan-tutor",
    name: "LanjutanTutor",
    component: LanjutanTutor,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterForm,
  },
  {
    path: "/register-lanjutan",
    name: "RegisterLanjutan",
    component: RegisterLanjutan,
  },
  {
    path: "/register-otp",
    name: "RegisterOtp",
    component: RegisterOtp,
  },
  {
    path: "/otp-tutor",
    name: "TutorOtp",
    component: TutorOtp,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
