<script setup>
import { usePurchase } from '../composables/usePurchase';
import { formatDate } from '../helpers/date';

const { 
    purchaseId, 
    orderDetails, 
    loading, 
    error,
    orderTotal
} = usePurchase();
</script>

<template>
    <div class="purchase-view">
        <h1 class="page-title">Detalles de compra</h1>   
        <div v-if="loading" class="loading-state">
            <p>Cargando detalles de compra...</p>
        </div>
        <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
        </div>
        <div v-else-if="orderDetails" class="order-content">
            <div class="info-card">
                <p class="info-row">
                    <span class="label">Id de compra:</span> 
                    <span class="value">{{ purchaseId }}</span>
                </p>
                <p class="info-row">
                    <span class="label">Fecha:</span> 
                    <span class="value">{{ formatDate(orderDetails.purchaseDate) }}</span>
                </p>
            </div>
            <h2 class="section-subtitle">Products</h2>
            <div class="products-list">
                <div v-for="item in orderDetails.items" :key="item.productId" class="product-card">
                    <img :src="item.imageUrl" :alt="item.name" class="product-img" /> 
                    <div class="product-info">
                        <h3 class="product-name">{{ item.name }}</h3>
                        <p class="product-price">${{ item.price?.toFixed(2) }}</p>
                    </div>
                    <div class="product-quantity">
                        <span>Quantity: {{ item.quantity }}</span>
                    </div>
                </div>
            </div>
            <div class="total-card">
                <p>
                    <span class="total-label">Total:</span> 
                    <span class="total-value">${{ orderDetails.totalAmount.toFixed(2) }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.purchase-view {
    padding: 1rem;
    font-family: var(--font-family, system-ui, sans-serif);
    color: #333;
    padding-bottom: 5rem;
}

.page-title {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    color: #000;
}

.info-card, .product-card, .total-card {
    background: #ffffff;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    border: 1px solid #f0f0f0;
}

.info-row {
    margin: 0.4rem 0;
    font-size: 0.9rem;
}

.label {
    font-weight: 700;
    color: #555;
    margin-right: 0.3rem;
}

.value {
    color: #444;
}

.section-subtitle {
    font-size: 1.1rem;
    font-weight: 700;
    color: #444;
    margin: 1.5rem 0 1rem 0;
}

.products-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.product-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0; /*  margin-bottom?? usamos gap */
}

.product-img {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 6px;
}

.product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.product-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 0.3rem 0;
}

.product-price {
    font-size: 0.8rem;
    font-weight: 700;
    color: #000;
    margin: 0;
}

.product-quantity {
    font-size: 0.8rem;
    font-weight: 600;
    color: #555;
}

.total-card {
    margin-top: 1.5rem;
    text-align: right;
    padding: 1.2rem 1rem;
}

.total-card p {
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
}

.total-label {
    font-weight: 700;
    font-size: 1.1rem;
    color: #444;
}

.total-value {
    font-weight: 700;
    font-size: 1.1rem;
    color: #555;
}

.loading-state, .error-state {
    text-align: center;
    padding: 2rem;
    color: #666;
}
</style>