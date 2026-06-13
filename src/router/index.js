import { createRouter, createWebHistory } from "vue-router";
import CartView from "../views/CartView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProductView from "../views/ProductView.vue";
import ProfileView from "../views/ProfileView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import { useAuthStore } from "../stores/auth.js";

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
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLogged) {
    //guarda la ruta donde se dirigia originalmente 
    //antes de redirigir a loguin
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
