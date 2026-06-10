import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

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

  //elimina producto del todo
  const removeProduct = (productId) => {
    items.value = items.value.filter(item => item.id !== productId)
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
    addProduct,
    removeProduct,
    totalItems,
    totalPrice,
    clearCart
  }
});
