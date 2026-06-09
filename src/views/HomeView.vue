<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useProducts } from '../composables/useProducts';

const { products: apiProducts, limit: apiLimit, offset: apiOffset, total: apiTotal, error: apiError, loading: apiLoading, getProducts } = useProducts();

const updateListProducts = () => {
    apiOffset.value += 10;
    getProducts();
}

onMounted(() => getProducts());

const getStarClass = (rating, starIndex) => {
    if (rating >= starIndex) {
        return 'fas fa-star'; // Rellena
    } else if (rating >= starIndex - 0.5) {
        return 'fas fa-star-half-alt'; // Media rellena
    } else {
        return 'far fa-star'; // Vacía 
    }
};
</script>
<template>
    <h1 class="title-section">Products Store</h1>
    <p v-if="apiLoading">Cargando productos...</p>
    <p v-else-if="apiError" class="error">Error: {{ apiError }}</p>
    <div v-else class="products-container">
        <router-link v-for="product in apiProducts" :key="product.id" :to="`/products/${product.id}`"
            class="product-card">
            <img :src="product.imageUrl" :alt="product.description" class="product-image">
            <p class="product-title">{{ product.name }}</p>
            <p class="product-price">${{ product.price }}</p>
            <div class="product-rating">
                <i v-for="n in 5" :key="n" :class="getStarClass(product.rating, n)" class="star-icon"></i>
                <span class="rating-number">({{ product.rating }})</span>
            </div>
        </router-link>
    </div>
    <button v-if="apiProducts.length < apiTotal" @click="updateListProducts" type="button" class="btn">Show more products</button>
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