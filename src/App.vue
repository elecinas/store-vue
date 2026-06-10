<script setup>
import { useCartStore } from './stores/cart';
import { useAuthStore } from './stores/auth';

const cartStore = useCartStore()
const authStore = useAuthStore()
</script>

<template>
  <main class="main">
    <router-view />
  </main>
  
  <nav class="nav-bar">
    <router-link to="/" class="nav-item" exact-active-class="active-route">
      <i class="fas fa-home"></i>
    </router-link>

    <router-link to="/cart" class="nav-item cart-link" active-class="active-route">
      <i class="fas fa-shopping-cart"></i>
      <span v-if="cartStore.totalItems > 0" class="cart-badge">
        {{ cartStore.totalItems }}
      </span>
    </router-link>

    <router-link to="/profile" class="nav-item" active-class="active-route">
      <img 
        v-if="authStore.isLogged && authStore.user?.profileImg" 
        :src="authStore.user.profileImg" 
        alt="Avatar"
        class="menu-avatar" />
      <i v-else class="fas fa-user"></i>
    </router-link>
  </nav>
</template>

<style scoped>
.main {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.nav-bar {
  background-color: var(--dark);
  height: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* Unificamos el estilo base de los botones para quitar el has-color-light */
.nav-item {
  text-decoration: none;
  color: #f8f9fa; /* Color gris clarito por defecto */
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.65rem;
  font-family: var(--font-family);
  font-weight: bold;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.menu-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent; /* Truco visual para que no salte de tamaño al activarse */
}

/* === AQUÍ OCURRE LA MAGIA DEL COLOR ACTIVO === */
.active-route i {
  color: var(--primary-color, #42b983);
}

/* Y si la ruta activa es el perfil y hay foto, le pintamos el borde a la imagen */
.active-route .menu-avatar {
  border-color: var(--primary-color, #42b983);
}
</style>