import { ref } from "vue";

const products = ref([]);
const limit = ref(10);
const offset = ref(0);
const total = ref(0);
const error = ref(null);
const loading = ref(true);

export function useProducts() {
  const getProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/products?limit=${limit.value}&offset=${offset.value}`,
      );
      if (!res.ok) throw new Error("Error en la petición del servidor");
      const resJson = await res.json();
      //evita duplicados
      const moreProducts = resJson.items.filter(
        (product) => !products.value.some((p) => p.id === product.id),
      );
      products.value = [...products.value, ...moreProducts];
      total.value = resJson.paginator.total;
    } catch (e) {
      error.value = "No se han podido cargar los productos";
    } finally {
      loading.value = false;
    }
  };
  return {
    products,
    limit,
    offset,
    total,
    error,
    loading,
    getProducts,
  };
}
