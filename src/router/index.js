// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";
import MyPage from "../pages/MyPage.vue";
import Community from "../pages/Community.vue";
import PostDetail from "../pages/PostDetail.vue";

// --- 이 부분을 추가/수정해야 합니다 ---

// 1. 로그인 및 회원가입 페이지 컴포넌트 임포트
import LoginPage from "../pages/LoginPage.vue";   // 추가
import SignupPage from "../pages/SignupPage.vue"; // 추가

// --- 여기까지 추가/수정해야 합니다 ---


const routes = [
  { path: "/", component: Home },
  {
    path: "/book/:isbn",
    name: "BookDetail",
    component: BookDetail,
    props: true, // URL 파라미터 (isbn)를 컴포넌트 props로 전달하려면 이 줄을 추가하는 것이 좋습니다.
  },
  { path: "/mypage", component: MyPage },
  { path: "/community", component: Community },
  {
    path: "/post/:id", // PostDetail은 특정 게시글을 보여주므로, ID 파라미터가 필요할 수 있습니다.
    name: "PostDetail",
    component: PostDetail,
    props: true, // ID 파라미터를 컴포넌트 props로 전달하려면 이 줄을 추가
  },

  // --- 이 부분을 추가해야 합니다 ---

  // 2. 로그인 및 회원가입 라우트 추가
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,
  },

  // --- 여기까지 추가해야 합니다 ---
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;