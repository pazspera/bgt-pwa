import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import BoardGamesView from "@/views/BoardGames/BoardGamesView.vue";
import CallbackView from "@/views/Callback/CallbackView.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { login } from "@/utils/auth";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "BoardGames",
    component: BoardGamesView,
  },
  {
    path: "/jugadores",
    name: "Players",
    component: () => import(/* webpackChunkName: "Players"*/ "@/views/Players/PlayersView.vue"),
  },
  {
    path: "/partidas",
    name: "Games",
    component: () => import(/*webpackChunkName: "Games" */ "@/views/Games/GamesView.vue"),
  },
  {
    path: "/tipografia",
    name: "Typography",
    component: () => import(/*webpackChunkName: "Tipografia" */"@/views/Typography.vue"),
  },
  {
path: "/callback",
    name: "Callback",
    component: CallbackView,
  },
  {
    path: "/:catchAll(.*)*",
    name: "Not-Found",
    component: () => import(/*webpackChunkName: "Not-Found" */"@/views/NotFound.vue"),
  }
];

const publicRoutes = ['/callback'];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (publicRoutes.includes(to.path)) return true;

  const authStore = useAuthStore();

  if (authStore.isAuthenticated) return true;

  sessionStorage.setItem('redirect_after_login', to.fullPath);
  await login();
  return false;
});

export default router;
