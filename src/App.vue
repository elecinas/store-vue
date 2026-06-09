<script setup>
import { useCartStore } from './stores/cart';

const cartStore = useCartStore()
</script>

<template>
  <main class="main">
    <router-view />
  </main>
  <nav class="nav-bar">
    <router-link to="/" class="fas fa-home has-color-light"></router-link>
    <router-link to="/cart" class="fas fa-shopping-cart has-color-light cart-link">
      <span v-if="cartStore.totalItems > 0" class="cart-badge">
        {{ cartStore.totalItems }}
      </span>
    </router-link>
    <router-link to="/profile" class="fas fa-user has-color-light"></router-link>
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

.cart-link {
  position: relative;
  text-decoration: none;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: var(--primary-color); /* Usa tu morado corporativo */
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
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
</style>
