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
            <p>Validando productos con el servidor...</p>
        </div>

        <div v-else-if="validationError" class="error-state">
            <p class="error-msg">{{ validationError }}</p>
        </div>

        <div v-else-if="cartStore.items.length === 0" class="empty-cart">
            <i class="fas fa-shopping-basket empty-icon"></i>
            <p>Tu carrito está vacío</p>
            <router-link to="/" class="btn btn--cta start-shopping">Ir a la tienda</router-link>
        </div>

        <div v-else class="cart-content">
            <div class="cart-items-list">
                <div v-for="item in cartStore.items" :key="item.id" class="cart-item-card">
                    <img :src="item.imageUrl" :alt="item.name" class="item-img" />

                    <div class="item-details">
                        <h3 class="item-name line-clamp-1">{{ item.name }}</h3>
                        <p class="item-price">{{ item.price }} €</p>
                        <p class="item-quantity">Cantidad: {{ item.quantity }}</p>
                    </div>
                    <button @click="cartStore.removeProduct(item.id)" class="delete-btn" title="Eliminar producto">
                        <i class="fas fa-trash-alt"></i>
                    </button>
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

/* Estado vacío */
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
    max-height: 280px;
    /* Ajuste para que no desborde el contenedor del App.vue */
    padding-right: 4px;
}

/* Tarjeta de producto individual */
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

.item-quantity {
    font-size: 0.8rem;
    color: var(--grey);
}

.delete-btn {
    color: #dc3545;
    font-size: 1rem;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
}

/* Caja de resumen de precios */
.cart-summary {
    background: #f9f9f9;
    border-radius: 16px;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    border: 1px solid #eee;
    margin-top: auto;
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