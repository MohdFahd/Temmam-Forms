import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import login from "../views/auth/login.vue";
import resForm from "../views/resForm.vue";
import Answers from "../views/Answers.vue";
import Form from "../views/Form.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/Form",
      name: "Form",
      component: Form,
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
      meta: { requiresAuth: true }, // Add a meta field to indicate that authentication is required for this route
    },
    {
      path: "/answers/:id",
      name: "answers",
      component: Answers,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("userData") !== null;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated
    // Redirect to the login page with preserved route parameters
    next({
      name: "login",
      query: { redirect: to.fullPath }, // Pass the original route path as a query parameter
    });
  } else {
    // Otherwise, proceed to the route
    next();
  }
});

export default router;
