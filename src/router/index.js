import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";
import MyPage from "../pages/MyPage.vue";
import Community from "../pages/Community.vue";
import PostDetail from "../pages/PostDetail.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
