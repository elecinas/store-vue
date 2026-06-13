import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { fetchOrderDetailsAPI } from "../services/purchaseService";

export function usePurchase() {
  const route = useRoute();
  const authStore = useAuthStore();

  const purchaseId = route.params.id;
  const orderDetails = ref(null);
  const loading = ref(true);
  const error = ref(null);

  // formato fecha: "February 22, 2026"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  onMounted(async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchOrderDetailsAPI(purchaseId, authStore.token);

      const productsResponse = await fetch("http://localhost:3000/products");
      const rawProducts = await productsResponse.json();

      const allProducts = Array.isArray(rawProducts)
        ? rawProducts
        : rawProducts.items || [];

      if (!Array.isArray(allProducts)) {
        throw new Error(
          "No se pudo encontrar la lista de productos en la respuesta del servidor.",
        );
      }

      const enrichedItems = data.items.map((item) => {
        //mirar si el producto existe en la lista general
        let productInfo = allProducts.find(
          (p) => String(p.id).trim() === String(item.productId).trim(),
        );

        // al hacer pruebas se han detectado productos no existentes 
        // en el listado del pedido, así que
        // Si el backend nos ha dado un id erróneo
        // cogemos el producto de la misma posición (para que no se vea roto)
        if (!productInfo && allProducts.length > 0) {
          const productIndex = parseInt(item.productId, 10) % allProducts.length;
          productInfo = allProducts[isNaN(productIndex) ? 0 : productIndex];
        }

        return {
          ...item,
          name: productInfo ? productInfo.name : "Producto Premium",
          imageUrl: productInfo
            ? productInfo.imageUrl
            : "https://placehold.co/55x55/e2e8f0/475569?text=Shop",
        };
      });

      data.items = enrichedItems;
      orderDetails.value = data;
    } catch (err) {
      error.value = err.message;
      console.error("Error cargando el pedido:", err);
    } finally {
      loading.value = false;
    }
  });

  return {
    purchaseId,
    orderDetails,
    loading,
    error,
    formatDate,
  };
}
