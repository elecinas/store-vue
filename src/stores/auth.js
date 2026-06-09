import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token") || "");
  const isLogged = ref(false);
  const user = ref(null);

  // Por si se ha guardado un información anterior no válida
  try {
    const savedUser = localStorage.getItem("user");
    user.value = savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
  } catch (e) {
    user.value = null;
  }

  if (token.value && token.value !== "undefined" && token.value !== "238") {
    isLogged.value = true;
  } else {
    token.value = "";
    isLogged.value = false;
  }

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
      const data = await resp.json();
      token.value = data.token; 
      user.value = data.user || { name: username };
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
