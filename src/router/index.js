import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import BookDetail from "../pages/BookDetail.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/book/:isbn",
    name: "BookDetail",
    component: BookDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
