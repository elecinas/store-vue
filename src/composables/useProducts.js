import { ref } from "vue";

const products = ref([]);
const limit = ref(10);
const offset = ref(0);
const total = ref(0);
const error = ref(null);
const loading = ref(true);

export function useProducts() {
  const fetchProductsFromApi = async () => {
    loading.value = true;
    try {
      const res = await fetch(
        `http://localhost:3000/products?limit=${limit.value}&offset=${offset.value}`
      );
      if (!res.ok) throw new Error("Error en la petición del servidor");
      
      const resJson = await res.json();
      
      //evita duplicados
      const moreProducts = resJson.items.filter(
        (product) => !products.value.some((p) => p.id === product.id)
      );
      
      products.value = [...products.value, ...moreProducts];
      total.value = resJson.paginator.total;
      error.value = null;
    } catch (e) {
      error.value = "No se han podido cargar los productos";
    } finally {
      loading.value = false;
    }
  };

  const loadInitialProducts = async () => {
    if (products.value.length === 0) {
      await fetchProductsFromApi();
    }
  };

  const loadMoreProducts = async () => {
    if (loading.value || products.value.length >= total.value) return;
    
    offset.value += limit.value; 
    await fetchProductsFromApi();
  };

  const resetProducts = () => {
    products.value = [];
    offset.value = 0;
    total.value = 0;
    error.value = null;
  };

  return {
    products,
    loading,
    error,
    total,
    loadInitialProducts,
    loadMoreProducts,
    resetProducts
  };
}