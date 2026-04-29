import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import BoardGamesView from "@/views/BoardGames/BoardGamesView.vue";

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
    component: () => import(/*webpackChunkName: "Callback" */"@/views/Callback/CallbackView.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "Not-Found",
    component: () => import(/*webpackChunkName: "Not-Found" */"@/views/NotFound.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
