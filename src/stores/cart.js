import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchProductsAPI } from "../services/productService";

export const useCartStore = defineStore("cart", () => {
  //estado
  const items = ref([]); 
  const allProducts = ref([]);

  const fetchGlobalProducts = async () => {
    try {
      allProducts.value = await fetchProductsAPI();
    } catch (error) {
      console.error('Error cargando el stock global:', error.message);
    }
  };

  const validateAndFilterStock = () => {
    const insufficientItems = [];
    const validItems = [];

    for (const item of items.value) {
      const productInCatalog = allProducts.value.find(
        (p) => String(p.id).trim() === String(item.id).trim() 
      );

      if (!productInCatalog || item.quantity > productInCatalog.stock) {
        insufficientItems.push(item.id);
      } else {
        validItems.push(item);
      }
    }

    if (insufficientItems.length > 0) {
      items.value = validItems;
      return { success: false, insufficientItems };
    }

    return { success: true, insufficientItems: [] };
  };

  const addProduct = (product) => {
    const existProduct = items.value.find((item) => item.id === product.id);

    if (existProduct) {
      if (existProduct.quantity < product.stock) {
        existProduct.quantity++;
      }
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  };

  const decrementProduct = (product) => {
    const existProduct = items.value.find((item) => item.id === product);
    if (existProduct) {
      if (existProduct.quantity > 1) {
        existProduct.quantity--;
      } else {
        removeProduct(product);
      }
    }
  };

  //elimina producto del todo
  const removeProduct = (product) => {
    items.value = items.value.filter(item => item.id !== product)
  }

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const clearCart = () => {
    items.value = [];
  }

  return {
    items,
    allProducts,
    fetchGlobalProducts,
    validateAndFilterStock,
    addProduct,
    decrementProduct,
    removeProduct,
    totalItems,
    totalPrice,
    clearCart
  }
});
