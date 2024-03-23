import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import login from "../views/auth/login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
  ],
});

export default router;
