import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isLogged = ref(false);
  const token = ref(localStorage.getItem("token") || "");
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  if (token.value) isLogged.value = true;

  const login = async (username, password) => {
    try {
      const resp = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!resp.ok) throw new Error("Credenciales inválidas");
      token.value = 238; //fake token
      user.value = {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      };
      isLogged.value = true;
      localStorage.setItem("token", token.value);
      localStorage.setItem("user", JSON.stringify(user.value));
      return true;
    } catch (error) {
      console.error("Error en login: ", error);
      return false;
    }
  };

  const logout = () => {
    isLogged.value = false;
    token.value = "";
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    isLogged,
    token,
    user,
    login,
    logout,
  };
});
