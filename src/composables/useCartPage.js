import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";

export default function useCartPage() {
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const router = useRouter();

  // estados de validación
  const validationInProcess = ref(true);
  const validationError = ref("");

  // estado checkout
  const isSubmitting = ref(false);

  const validateCart = async () => {
    if (cartStore.items.length === 0) {
      validationInProcess.value = false;
      return;
    }

    try {
      const formatCartItems = cartStore.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const jsonItems = JSON.stringify(formatCartItems);

      const url = `http://localhost:3000/cart?items=${encodeURIComponent(jsonItems)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const serverData = await response.json().catch(() => ({}));
        throw new Error(
          serverData.message ||
            `Error del servidor (Status: ${response.status})`,
        );
      }

      const serverData = await response.json();

      console.log("✅ Carrito validado con éxito:", serverData);

      // sincronizamos datos del servidor
      cartStore.items.forEach((localItem) => {
        const freshServerProduct = serverData.find(
          (sp) => sp.id === localItem.id,
        );

        if (freshServerProduct) {
          localItem.price = freshServerProduct.price;
          localItem.stock = freshServerProduct.stock;
          localItem.name = freshServerProduct.name;
          localItem.imageUrl = freshServerProduct.imageUrl;
        }
      });
    } catch (error) {
      validationError.value = error.message;
    } finally {
      validationInProcess.value = false;
    }
  };

  onMounted(() => {
    validateCart();
  });

  const handleCheckout = async () => {
    if (cartStore.items.length === 0) return;

    isSubmitting.value = true;

    try {
      const formatCartItems = cartStore.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const response = await fetch("http://localhost:3000/cart/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify({
          items: formatCartItems,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error en el servidor (Status: ${response.status})`,
        );
      }

      const purchaseResult = await response.json();

      console.log("✅ Compra realizada con éxito:", purchaseResult);

      // vaciar carrito
      cartStore.clearCart();

      // redirección a detalle de compra
      const orderId = purchaseResult.purchaseId;
      router.push(`/purchases/${orderId}`);
    } catch (error) {
      console.error("Error en el Checkout:", error);
      alert(error.message);
    } finally {
      isSubmitting.value = false;
    }
  };
  return {
    cartStore,
    validationInProcess,
    validationError,
    isSubmitting,
    validateCart,
    handleCheckout,
  };
}
