import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "hero",
    component: () => import("../views/HeroView.vue"),
  },
  {
    path: "/mahasiswa",
    name: "mahasiswa",
    component: () => import("../views/MahasiswaView.vue"),
  },
  {
    path: "/nilai",
    name: "nilai",
    component: () => import("../views/NilaiView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
