import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";
import LoginPage from '../pages/LoginPage.vue'
import MyPage from "../pages/MyPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/mypage", component: MyPage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  
  {
    path: "/book/:isbn",
    name: "BookDetail",
    component: BookDetail,
  },
  { path: "/mypage", component: MyPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
