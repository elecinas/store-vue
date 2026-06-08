<script setup>
</script>

<template>
  <main class="main">
    <router-view />
  </main>
  <nav class="nav-bar">
    <router-link to="/" class="fas fa-home has-color-light"></router-link>
    <router-link to="/cart" class="fas fa-shopping-cart has-color-light"></router-link>
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
</style>
