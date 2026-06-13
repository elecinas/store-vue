<script setup>
import useCartPage from "../composables/useCartPage";

const {
    cartStore,
    validationInProcess,
    validationError,
    isSubmitting,
    handleCheckout
} = useCartPage();

</script>

<template>
    <div class="cart-view">
        <h1 class="title-section">Mi Carrito</h1>
        <div v-if="validationInProcess" class="loading-state">
            <p>Validando productos...</p>
        </div>

        <div v-else-if="validationError" class="error-state">
            <p class="error-msg">{{ validationError }}</p>
        </div>

        <div v-else-if="cartStore.items.length === 0" class="empty-cart">
            <i class="fas fa-shopping-basket empty-icon"></i>
            <p>Carrito vacío</p>
            <router-link to="/" class="btn btn--cta start-shopping">Ir a la tienda</router-link>
        </div>

        <div v-else class="cart-content">
            <div class="cart-items-list">
                <div v-for="item in cartStore.items" :key="item.id" class="cart-item-card">
                    <img :src="item.imageUrl" :alt="item.name" class="item-img" />
                    <div class="item-details">
                        <h3 class="item-name line-clamp-1">{{ item.name }}</h3>
                        <p class="item-price">{{ item.price }} €</p>
                    </div>
                    <div class="quantity-controls">
                        <button @click="cartStore.decrementProduct(item.id)" class="qty-btn">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="qty-number">{{ item.quantity }}</span>
                        <button @click="cartStore.addProduct(item)" class="qty-btn">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="cart-summary">
                <div class="summary-row">
                    <span>Productos totales:</span>
                    <strong>{{ cartStore.totalItems }}</strong>
                </div>
                <div class="summary-row total-row">
                    <span>Total a pagar:</span>
                    <span class="total-amount">{{ cartStore.totalPrice.toFixed(2) }} €</span>
                </div>
                <button @click="handleCheckout" :disabled="isSubmitting" class="btn btn--cta checkout-btn">
                    {{ isSubmitting ? 'Procesando...' : 'Tramitar Pedido' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-view {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* carro vacío */
.empty-cart {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: var(--grey);
}

.empty-icon {
    font-size: 3rem;
    color: var(--grey-light);
}

.start-shopping {
    margin-top: 1rem;
    text-decoration: none;
}

/* Contenido del carrito */
.cart-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    justify-content: space-between;
}

.cart-items-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    flex: 1;
    padding-right: 4px;
}

.cart-item-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fdfdfd;
    border: 1px solid #f0f0f0;
    padding: 0.75rem;
    border-radius: 12px;
}

.item-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

.item-details {
    flex: 1;
}

.item-name {
    font-size: 0.95rem;
    color: var(--dark);
    font-weight: 600;
    margin-bottom: 0.2rem;
}

.item-price {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--primary-color);
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-left: auto;
}

/* El botón circular */
.qty-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    background-color: #8fae9f;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.qty-btn:hover {
    background-color: var(--primary-color, #42b983);
}

/* numero cantidad */
.qty-number {
    font-weight: bold;
    font-size: 0.95rem;
    color: var(--dark);
    min-width: 16px;
    text-align: center;
}

/* precios */
.cart-summary {
    background: #f9f9f9;
    border-radius: 16px;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    border: 1px solid #eee;
    margin-top: auto;
    margin-bottom: 48px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: var(--grey-dark);
}

.total-row {
    border-top: 1px solid #e0e0e0;
    padding-top: 0.7rem;
    margin-top: 0.3rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--dark);
}

.total-amount {
    color: var(--dark);
    font-size: 1.2rem;
    font-weight: 800;
}

.checkout-btn {
    width: 100%;
    height: 45px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    margin-top: 0.5rem;
}
</style>