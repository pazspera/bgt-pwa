import { createRouter, createWebHistory } from "vue-router";
import BoardGamesView from "@/views/BoardGames/BoardGamesView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
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
    path: "/agregar-jugador",
    name: "AddPlayer",
    component: () => import(/* webpackChunkName: "AddPlayer"*/ "@/views/Players/AddPlayer.vue"),
  },
  {
    path: "/ludoteca",
    name: "BoardGames",
    component: () => import(/*webpackChunkName: "BoardGames"*/ "@/views/BoardGames/BoardGamesView.vue"),
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
