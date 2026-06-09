<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useProductDetail from '../composables/useProductDetail';
import { getStarClass } from '../helpers/stars';

const {
    product: detailProduct,
    loading: detailLoading,
    error: detailError,
    getProduct
} = useProductDetail();

const route = useRoute();

onMounted(() => getProduct(route.params.id));

</script>
<template>
    <div class="product-detail-view">
        <div class="detail-header">
            <router-link to="/" class="back-link">
                <i class="fas fa-arrow-left"></i> Volver a la tienda
            </router-link>
            <span v-if="detailProduct" class="category-badge">{{ detailProduct.category }}</span>
        </div>

        <div v-if="detailLoading" class="status-container">
            <p class="loading-text">Cargando producto...</p>
        </div>
        
        <div v-else-if="detailError" class="status-container">
            <p class="error">{{ detailError }}</p>
        </div>

        <div v-else class="detail-content">
            <div class="image-wrapper">
                <img :src="detailProduct.imageUrl" :alt="detailProduct.name" class="detail-image" />
            </div>

            <div class="info-wrapper">
                <div class="meta-row">
                    <span class="product-brand">{{ detailProduct.brand }}</span>
                    <div class="product-rating">
                        <i v-for="n in 5" :key="n" :class="getStarClass(detailProduct.rating, n)" class="star-icon"></i>
                        <span class="rating-number">({{ detailProduct.rating }})</span>
                    </div>
                </div>

                <h1 class="product-title">{{ detailProduct.name }}</h1>
                
                <p class="product-description">{{ detailProduct.description }}</p>
                
                <div class="stock-status" :class="{ 'low-stock': detailProduct.stock <= 5 }">
                    <i class="fas fa-box"></i> 
                    <span>{{ detailProduct.stock > 0 ? `Stock disponible: ${detailProduct.stock} uds.` : 'Agotado' }}</span>
                </div>
            </div>

            <div class="purchase-bar">
                <div class="price-container">
                    <span class="price-label">Precio</span>
                    <span class="product-price">{{ detailProduct.price }} €</span>
                </div>
                <button class="btn btn--cta purchase-btn" :disabled="detailProduct.stock <= 0">
                    <i class="fas fa-shopping-cart"></i> Añadir al carrito
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-detail-view {
    margin: -1rem; 
    display: flex;
    flex-direction: column;
    min-height: calc(100% + 2rem);
    background: #fff;
}

/* Header */
.detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f0f0f0;
}

.back-link {
    color: var(--grey-dark);
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.back-link:hover {
    color: var(--primary-color);
}

.category-badge {
    background-color: #f0f0f0;
    color: var(--grey-dark);
    font-size: 0.75rem;
    padding: 4px 10px;
    border-radius: 999px;
    font-weight: 500;
}

/* Pantallas de estado */
.status-container {
    flex: 1;
    display: grid;
    place-items: center;
    padding: 2rem;
}

/* Contenido Principal */
.detail-content {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.image-wrapper {
    width: 100%;
    height: 260px;
    background-color: #fdfdfd;
}

.detail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.info-wrapper {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    flex: 1;
}

.meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-brand {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--grey);
    font-weight: 600;
}

/* Valoraciones */
.product-rating {
    display: flex;
    align-items: center;
    gap: 0.15rem;
}

.star-icon {
    color: #6f42c1;
    font-size: 0.85rem;
}

.rating-number {
    font-size: 0.75rem;
    color: var(--grey);
    margin-left: 0.2rem;
    font-weight: 500;
}

/* Textos */
.product-title {
    font-size: 1.4rem;
    color: var(--dark);
    line-height: 1.2;
    font-weight: 700;
}

.product-description {
    font-size: 0.9rem;
    color: var(--grey-dark);
    line-height: 1.6;
}

.stock-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--secondary-color);
    font-weight: 500;
    margin-top: 0.5rem;
}

.stock-status.low-stock {
    color: #dc3545;
}

/* Barra inferior de compra */
.purchase-bar {
    position: sticky;
    bottom: 0;
    margin-top: auto;
    background: white;
    border-top: 1px solid #eee;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -4px 10px rgba(0,0,0,0.03);
    z-index: 10;
}

.price-container {
    display: flex;
    flex-direction: column;
}

.price-label {
    font-size: 0.75rem;
    color: var(--grey);
    text-transform: uppercase;
}

.product-price {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--dark);
}

.purchase-btn {
    height: 45px;
    padding: 0 24px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(196, 114, 185, 0.3);
    transition: transform 0.2s;
}

.purchase-btn:active {
    transform: scale(0.97);
}

.purchase-btn:disabled {
    background-color: var(--grey-light);
    box-shadow: none;
    cursor: not-allowed;
}
</style>