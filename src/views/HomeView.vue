<script setup>
import { onMounted } from 'vue';
import { useProducts } from '../composables/useProducts';
import { getStarClass } from '../helpers/stars';

const { 
  products, 
  loading, 
  error, 
  total, 
  loadInitialProducts, 
  loadMoreProducts 
} = useProducts();

onMounted(() => {
  loadInitialProducts();
});

</script>
<template>
  <div class="home-view">
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="products-container">     
      <router-link 
        v-for="product in products" 
        :key="product.id" 
        :to="`/products/${product.id}`" 
        class="product-card"
      >
        <img :src="product.imageUrl" :alt="product.title" class="product-image" /> 
        <h2 class="product-title">{{ product.title }}</h2>
        <span class="product-price">{{ product.price }}€</span>
        <div class="product-rating">
          <i 
            v-for="n in 5" 
            :key="n" 
            :class="['star-icon', getStarClass(product.rating, n)]"
          ></i>
          <span class="rating-number">
            ({{ product.rating || 0 }})
          </span>
        </div>
      </router-link>
    </div>
    <div v-if="loading" class="spinner">Cargando productos...</div>
    <button 
      v-if="products.length < total" 
      @click="loadMoreProducts" 
      :disabled="loading"
      class="btn btn-load-more"
    >
      {{ loading ? 'Cargando...' : 'Mostrar más' }}
    </button>
  </div>
</template>
<style scoped>

h1, button {
    margin: 2rem auto;
}

h1 {
    text-align: center;
}

.products-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 1rem 0;
}

.product-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    height: 100%;
    /* (Grid) */
}

.product-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    /* 'contain' */
    object-position: center;
    border-radius: 1rem;
}

.product-title {
    font-size: .75rem;
    margin: .5em 0;
}

.product-price {
    font-weight: bolder;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin-top: 0.2rem;
}

.star-icon {
    color: var(--primary-color);
    font-size: 0.85rem;
}

.rating-number {
    font-size: 0.75rem;
    color: grey;
    margin-left: 0.3rem;
}
</style>