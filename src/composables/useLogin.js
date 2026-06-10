import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export function useLogin() {
  const authStore = useAuthStore();
  const route = useRoute();
  const router = useRouter();

  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');

  const handleSubmit = async () => {
    errorMessage.value = '';
    
    const success = await authStore.login(username.value, password.value);
    
    if (success) {
      // Redirección inteligente
      const redirectPath = route.query.redirect || '/';
      router.push(redirectPath);
    } else {
      errorMessage.value = 'Usuario o contraseña incorrectos';
    }
  };

  return {
    username,
    password,
    errorMessage,
    handleSubmit
  };
}