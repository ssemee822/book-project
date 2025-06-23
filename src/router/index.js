import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";
import MyPage from "../pages/MyPage.vue";
import Community from "../pages/Community.vue";
import PostDetail from "../pages/PostDetail.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue";
import PostCreate from "../pages/PostCreate.vue";
import Bestseller from "../pages/Bestseller.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/book/:isbn",
    name: "BookDetail",
    component: BookDetail,
  },
  { path: "/mypage", name: "MyPage", component: MyPage },
  { path: "/community", name: "Community", component: Community },
  { path: "/post", name: "PostDetail", component: PostDetail },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/signup", name: "SignupPage", component: SignupPage },
  { path: "/postcreate", name: "PostCreate", component: PostCreate },
  { path: "/postcreate", name: "PostCreate", component: PostCreate },
  { path: "/bestseller", name: "Bestseller", component: Bestseller },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
