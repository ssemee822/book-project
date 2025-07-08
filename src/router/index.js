import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";
import MyPage from "../pages/MyPage.vue";
import Community from "../pages/Community.vue";
import PostDetail from "../pages/PostDetail.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue";
import PostCreate from "../pages/PostCreate.vue";
import Bestseller from "../pages/Home.vue";
import Search from "../pages/Search.vue";
import Favorite from "../pages/FavoritePage.vue";

const routes = [
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "SignupPage",
    component: SignupPage,
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Bestseller,
        meta: { requiresAuth: true },
      },
      {
        path: "/book/:isbn",
        name: "BookDetail",
        component: BookDetail,
        meta: { requiresAuth: true },
      },
      {
        path: "/mypage",
        name: "MyPage",
        component: MyPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/community",
        name: "Community",
        component: Community,
        meta: { requiresAuth: true },
      },
      {
        path: "/favorites",
        name: "favorites",
        component: Favorite,
        meta: { requiresAuth: true },  
      },
      {
        path: "/post/:boardId",
        name: "PostDetail",
        component: PostDetail,
        meta: { requiresAuth: true },
      },
      {
        path: "/postcreate",
        name: "PostCreate",
        component: PostCreate,
        meta: { requiresAuth: true },
      },
      {
        path: "/bestseller",
        name: "Bestseller",
        component: Bestseller,
        meta: { requiresAuth: true },
      },
      {
        path: "/search",
        name: "Search",
        component: Search,
        meta: { requiresAuth: true },
        
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLogin") === "true";

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "LoginPage" });
  } else if (
    (to.name === "LoginPage" || to.name === "SignupPage") &&
    isLoggedIn
  ) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
