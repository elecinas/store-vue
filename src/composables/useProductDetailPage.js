import { ref } from "vue";
import { getProduct } from "../services/productService";

export default function useProductDetailPage() {
  const product = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const relatedProducts = ref([]);
  const relatedLoading = ref(false);

  const fetchRelatedProducts = async (currentProduct) => {
    if (!currentProduct || !currentProduct.category) return;
    relatedLoading.value = true;

    try {
      const response = await fetch(
        "http://localhost:3000/products?limit=50&offset=0",
      );

      if (response.ok) {
        const data = await response.json();
        const allProducts = data.items || [];

        // filtramos por sin el actual
        const filtered = allProducts.filter(
          (p) =>
            p.category === currentProduct.category &&
            p.id !== currentProduct.id,
        );

        // mezclamos resultados
        const shuffled = filtered.sort(() => Math.random() - 0.5);

        // solo 3
        relatedProducts.value = shuffled.slice(0, 3);
      }
    } catch (error) {
      console.error("Error cargando productos relacionados:", error);
    } finally {
      relatedLoading.value = false;
    }
  };

  const loadPage = async (id) => {
    product.value = await getProduct(id);
    loading.value = false;

    if (product.value) {
      await fetchRelatedProducts(product.value);
    }
  };

  return {
    product,
    loading,
    error,

    relatedProducts,
    relatedLoading,
    fetchRelatedProducts,
    loadPage,
  };
}
