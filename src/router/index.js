import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";
import MyPage from "../pages/MyPage.vue";
import Community from "../pages/Community.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/book/:isbn",
    name: "BookDetail",
    component: BookDetail,
  },
  { path: "/mypage", component: MyPage },
  { path: "/community", component: Community },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
