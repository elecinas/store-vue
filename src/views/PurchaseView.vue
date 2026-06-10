<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const authStore = useAuthStore();

//id de la url (/purchases/:id)
const purchaseId = route.params.id;

const orderDetails = ref(null);
const loading = ref(null);

onMounted(async () => {
    try {
        const response = await fetch(`http://localhost:3000/purchases/${purchaseId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authStore.token}`,
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json();
            orderDetails.value = data;
        }
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false;
    }
})
</script>

<template>
    <div class="purchase-success-view">
        <div v-if="loading" class="loading-box">
            <p>Procesando confirmación...</p>
        </div>

        <div v-else class="success-card">
            <div class="icon-container">
                <span class="success-icon">✓</span>
            </div>
            
            <h1 class="title-section">¡Pedido Confirmado!</h1>
            <p class="subtitle">Tu compra se ha registrado correctamente en nuestro sistema.</p>
            
            <div class="order-info-box">
                <span class="info-label">Identificador de tu compra</span>
                <strong class="order-id">{{ purchaseId }}</strong>
            </div>

            <div v-if="orderDetails && orderDetails.items" class="order-summary-details">
                <h3>Resumen de productos</h3>
                <ul class="summary-list">
                    <li v-for="item in orderDetails.items" :key="item.productId" class="summary-item">
                        <span>Producto ID: {{ item.productId }}</span>
                        <strong>x{{ item.quantity }}</strong>
                    </li>
                </ul>
            </div>

            <div class="action-footer">
                <p class="notice">Guarda este código para cualquier reclamación o seguimiento de tu envío.</p>
                <router-link to="/" class="return-home-btn">
                    Volver a la Tienda
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.purchase-success-view {
    max-width: 550px;
    margin: 4rem auto;
    padding: 0 1.5rem;
    font-family: system-ui, -apple-system, sans-serif;
}

.loading-box {
    text-align: center;
    color: #7f8c8d;
    font-size: 1.1rem;
}

.success-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 3rem 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
    text-align: center;
}

.icon-container {
    margin-bottom: 1.5rem;
}

.success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    background-color: #ecfdf5;
    color: #10b981;
    font-size: 2.5rem;
    font-weight: bold;
    border-radius: 50%;
}

.title-section {
    font-size: 1.75rem;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
    font-weight: 700;
}

.subtitle {
    color: #64748b;
    font-size: 0.95rem;
    margin: 0 0 2.5rem 0;
    line-height: 1.5;
}

.order-info-box {
    background: #f8fafc;
    border: 1px dashed #cbd5e1;
    padding: 1.25rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.info-label {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.order-id {
    font-size: 1.3rem;
    color: #0f172a;
    font-family: monospace;
    word-break: break-all;
}

.action-footer {
    margin-top: 2rem;
}

.notice {
    font-size: 0.85rem;
    color: #94a3b8;
    margin-bottom: 1.5rem;
}

.return-home-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #0f172a;
    color: #ffffff;
    text-decoration: none;
    width: 100%;
    height: 48px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background-color 0.2s;
}

.return-home-btn:hover {
    background-color: #1e293b;
}

.order-summary-details {
    text-align: left;
    background: #ffffff;
    border: 1px solid #edf2f7;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 2rem;
}

.order-summary-details h3 {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 0.5rem;
}

.summary-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    padding: 0.4rem 0;
    color: #4a5568;
}
</style>