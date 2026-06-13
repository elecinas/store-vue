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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  onMounted(async () => {
    if (authStore.token) {
      try {
        const data = await fetchUserPurchasesAPI(authStore.token);
        purchases.value = Array.isArray(data)
          ? data
          : data.purchases || data.orders || data.items || data.data || [];
      } catch (error) {
        console.error("Error cargando el historial de pedidos:", error);
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
    formatDate,
  };
}
