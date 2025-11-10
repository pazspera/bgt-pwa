import { createRouter, createWebHistory } from "vue-router";
import BoardGamesView from "@/views/BoardGames/BoardGamesView.vue";

export const routes = [
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
    path: "/editar-jugador/:id?",
    name: "EditPlayer",
    component: () => import(/*webpackChunkName: "EditPlayer"*/ "@/views/Players/EditPlayer.vue"),
    props: true,
  },
  {
    path: "/partidas",
    name: "Games",
    component: () => import(/*webpackChunkName: "Games" */ "@/views/Games/GamesView.vue"),
  },
  {
    path: "/agregar-partida",
    name: "AddGame",
    component: () => import(/*webpackChunkName: "AddGame" */ "@/views/Games/AddGame.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
