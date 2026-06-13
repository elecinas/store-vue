import { defineStore } from "pinia";
import { ref } from "vue";
import { 
  loginAPI, 
  getAuthToken, setAuthToken, removeAuthToken, 
  getAuthUser, setAuthUser, removeAuthUser,
  isValidToken
} from "../services/authService";

export const useAuthStore = defineStore("auth", () => {
 const token = ref(getAuthToken());
  const user = ref(getAuthUser());
  const isLogged = ref(isValidToken(token.value));

  if (!isLogged.value) {
    token.value = "";
  }

  const login = async (username, password) => {
    try {
      const data = await loginAPI(username, password);

      // actualiza estado
      token.value = data.token; 
      user.value = data.user || { name: username };
      isLogged.value = true;

      //persiste datos
      setAuthToken(token.value);
      setAuthUser(user.value);

      return true;
      
    } catch (error) {
      console.error("error de login: ", error);
      return false;
    }
  };

  const logout = () => {
    //limpia estado
    isLogged.value = false;
    token.value = "";
    user.value = null;
    
    //limpia persistencia
    removeAuthToken();
    removeAuthUser();
  };

  return {
    isLogged,
    token,
    user,
    login,
    logout,
  };
});
