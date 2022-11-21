import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      isShow: true,
    },
    {
      path: "/tasks",
      name: "Todo list",
      component: () => import("../views/Tasks.vue"),
      isShow: true,
    },
    {
      path: "/tasks/create",
      name: "Create task",
      component: () => import("../views/TaskCreate.vue"),
      isShow: false,
    },
    {
      path: "/tasks/update",
      name: "Update task",
      component: () => import("../views/TaskUpdate.vue"),
      isShow: false,
      // beforeEnter: (to, from, next) => {
      //   // Redirect to Home page if task id less than 15
      //   if (to.query?.id < 15) {
      //     next("/");
      //     return
      //   }
      //   next();
      // },
    },
  ],
});

export default router;
