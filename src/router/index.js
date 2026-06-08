import { createRouter, createWebHistory } from "vue-router";
import CartView from "../views/CartView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProductView from "../views/ProductView.vue";
import ProfileView from "../views/ProfileView.vue";
import PurchaseView from "../views/PurchaseView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/products/:id", component: ProductView },
  { path: "/login", component: LoginView },
  { path: "/profile", component: ProfileView, meta: { requiresAuth: true } },
  { path: "/cart", component: CartView, meta: { requiresAuth: true } },
  {
    path: "/purchases/:id",
    component: PurchaseView,
    meta: { requiresAuth: true },
  },
];

//Router con VUE3:
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//comprobamos si el usuario está autenticado
//y adaptamos la navegación en consecuencia
router.beforeEach((to, from, next) => {
  const protectedRoute = to.matched.some((ruta) => ruta.meta.requiresAuth);
  const authUser = !!localStorage.getItem("token");

  if (protectedRoute && !authUser) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },//guarda la dirección que puso el usuario
    });
  } else {
    next();
  }
});

export default router;
