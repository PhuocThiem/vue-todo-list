import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const checkRedirectById = (id, cbFunction) => {
  if (id < 15) {
    cbFunction("/");
    return;
  }
  cbFunction();
};

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
      //   checkRedirectById(to.query?.id, next);
      // },
    },
    {
      path: "/tasks/detail",
      name: "task detail",
      component: () => import("../views/TaskDetail.vue"),
      isShow: false,
      beforeEnter: (to, from, next) => {
        checkRedirectById(to.query?.id, next);
      },
    },
  ],
});

export default router;
