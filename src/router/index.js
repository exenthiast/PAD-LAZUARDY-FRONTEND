import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomePage.vue";
import SearchView from "../views/SearchView.vue";
import LoginForm from "../views/LoginForm.vue";
import RegisterForm from "../views/student/RegisterForm.vue";
import RegisterTutor from "../views/tutor/RegisterTutor.vue";
import RegisterLanjutan from "../views/student/RegisterLanjutan.vue";
import RegisterOtp from "../views/student/RegisterOtp.vue";
import DashboardPage from "../views/student/DashboardPage.vue";
import TutorOtp from "../views/tutor/TutorOtp.vue";
import LanjutanTutor from "../views/tutor/LanjutanTutor.vue";
import TutorListPage from "../views/tutors/TutorListPage.vue";
import CheckoutPage from "../views/payment/CheckoutPage.vue";
import PackageListPage from "../views/packages/PackageListPage.vue";
import ProfilePage from "../views/student/ProfilePage.vue";

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
    path: "/dashboard-siswa",
    name: "DashboardPage",
    component: DashboardPage,
  },
  {
    path: "/tutors",
    name: "TutorList",
    component: TutorListPage,
  },
  {
    path: "/otp-tutor",
    name: "TutorOtp",
    component: TutorOtp,
  },
  {
  path: '/student/packages',
  name: 'PackageListPage',
  component: PackageListPage,
},
{
  path: '/student/checkout',
  name: 'CheckoutPage',
  component: CheckoutPage,
},
{
  path: '/student/ProfilePage',
  name: 'ProfilePage',
  component: ProfilePage,
},
{
  path: '/tutors/TutorDetailPage',
  name: 'TutorDetailPage',
  component: () => import('../views/tutors/TutorDetailPage.vue'),
},
{
  path: '/transactionhistory',
  name: 'TransactionHistory',
  component: () => import('../views/payment/TransactionHistory.vue'),},

  {
  path: '/progresbelajar',
  name: 'MyClassesPage',
  component: () => import('../views/student/MyClassesPage.vue'),},
{

    path: '/dashboardprogres',
  name: 'DashboardProgress',
  component: () => import('../views/student/DashboardProgres.vue'),
},


  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
