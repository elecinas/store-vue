import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";
import { useRouter } from "vue-router";
import { fetchUserPurchasesAPI } from "../services/purchaseService";

export function useProfilePage() {
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const router = useRouter();

  const purchases = ref([]);
  const isLoadingOrders = ref(true);

  const handleLogout = () => {
    authStore.logout();
    cartStore.clearCart();
    router.push("/login");
  };

  onMounted(async () => {
    if (authStore.token) {
      try {
        const data = await fetchUserPurchasesAPI(authStore.token);
        purchases.value = Array.isArray(data)
          ? data
          : data.purchases || [];
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        isLoadingOrders.value = false;
      }
    }
  });
  return {
    authStore,
    purchases,
    isLoadingOrders,
    handleLogout,
  };
}
