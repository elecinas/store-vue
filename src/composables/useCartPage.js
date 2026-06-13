import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";
import { validateCartAPI, purchaseCartAPI } from "../services/cartService";

export default function useCartPage() {
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const router = useRouter();

  const validationInProcess = ref(true);
  const validationError = ref("");
  const isSubmitting = ref(false);

  const validateCart = async () => {
    if (cartStore.items.length === 0) {
      validationInProcess.value = false;
      return;
    }

    try {
      validationInProcess.value = true;

      const serverData = await validateCartAPI(
        cartStore.items,
        authStore.token,
      );

      console.log("carrito validado", serverData);

      // sincroniza con back
      cartStore.items.forEach((currentItem) => {
        const fresh = serverData.find((sp) => sp.id === currentItem.id);

        if (fresh) {
          currentItem.price = fresh.price;
          currentItem.stock = fresh.stock;
          currentItem.name = fresh.name;
          currentItem.imageUrl = fresh.imageUrl;
        }
      });
    } catch (error) {
      validationError.value = error.message;
    } finally {
      validationInProcess.value = false;
    }
  };

  const handleCheckout = async () => {
    if (cartStore.items.length === 0) return;

    isSubmitting.value = true;

    try {
      // valida el stock
      await cartStore.fetchGlobalProducts();
      const validation = cartStore.validateAndFilterStock();

      if (!validation.success) {
        alert(
          `Lo sentimos, algunos productos ya no tienen stock (IDs: ${validation.insufficientItems.join(', ')}). ` +
          `Se ha actualizado el carrito con los articulos disponibles.`
        );
        isSubmitting.value = false;
        return;
      }

      const purchaseResult = await purchaseCartAPI(
        cartStore.items,
        authStore.token
      );

      cartStore.clearCart();
      const orderId = purchaseResult.purchaseId;
      router.push(`/purchases/${orderId}`);
      
    } catch (error) {
      console.error("Error checkout:", error);
      alert(error.message);
    } finally {
      isSubmitting.value = false;
    }
  };

  onMounted(() => {
    validateCart();
  });

  return {
    cartStore,
    validationInProcess,
    validationError,
    isSubmitting,
    validateCart,
    handleCheckout,
  };
}
