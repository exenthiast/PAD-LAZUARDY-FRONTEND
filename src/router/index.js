import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../views/LoginForm.vue";
import RegisterForm from "../views/RegisterForm.vue";
import RegisterLanjutan from "../views/RegisterLanjutan.vue";
import RegisterOtp from "../views/RegisterOtp.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
