import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import login from "../views/auth/login.vue";
import resForm from "../views/resForm.vue";
import Answers from "../views/Answers.vue";

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
    {
      path: "/resForm/:id",
      name: "resForm",
      component: resForm,
    },
    {
      path: "/answers/:id",
      name: "answers",
      component: Answers,
    },
  ],
});

export default router;
