import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { fetchOrderDetailsAPI } from "../services/purchaseService";

export function usePurchasePage() {
  const route = useRoute();
  const authStore = useAuthStore();

  const purchaseId = route.params.id;
  const orderDetails = ref(null);
  const loading = ref(true);
  const error = ref(null);

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
          "No se ha encontrado lista de productos.",
        );
      }

      const enrichedItems = data.items.map((item) => {
        const productInfo = allProducts.find(
          (p) => String(p.id).trim() === String(item.productId).trim(),
        );

        return {
          ...item,
          // Si no existe, ponemos el id
          name: productInfo
            ? productInfo.name
            : `Producto ID: ${item.productId} (Descatalogado)`,
          // poner imagen generica si no hay imagen
          imageUrl: productInfo
            ? productInfo.imageUrl
            : "https://placehold.co/55x55/e2e8f0/475569?text=N/A",
        };
      });

      data.items = enrichedItems;
      orderDetails.value = data;
    } catch (e) {
      error.value = e.message;
      console.error("Error cargando el pedido:", e);
    } finally {
      loading.value = false;
    }
  });

  return {
    purchaseId,
    orderDetails,
    loading,
    error,
  };
}
