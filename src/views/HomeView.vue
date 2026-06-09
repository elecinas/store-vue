<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useProducts } from '../composables/useProducts';

const { products: apiProducts, limit: apiLimit, offset: apiOffset, total: apiTotal, error: apiError, loading: apiLoading, getProducts } = useProducts();

const updateListProducts = () => {
    apiOffset.value  += 10;
    getProducts();
}

onMounted(() => getProducts());
</script>
<template>
    <h1>Vista Home</h1>
    <p v-if="apiLoading">Cargando productos...</p>
    <p  class="error" v-else-if="apiError">Error: {{apiError}}</p>
    <div class="products-container" v-else>
        <div v-for="product in apiProducts" :key="product.id">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
        </div>
    </div>
    <button type="button" class="btn" v-if="apiProducts.length < apiTotal" @click="updateListProducts">Mostrar más productos</button>
</template>