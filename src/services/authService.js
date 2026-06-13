export const loginAPI = async (username, password) => {
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Credenciales inválidas");
  }

  return response.json();
};


export const getAuthToken = () => localStorage.getItem("token") || "";
export const setAuthToken = (token) => localStorage.setItem("token", token);
export const removeAuthToken = () => localStorage.removeItem("token");

export const getAuthUser = () => {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
  } catch (e) {
    return null;
  }
};
export const setAuthUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const removeAuthUser = () => localStorage.removeItem("user");


export const isValidToken = (token) => {
  return token && token !== "undefined" && token !== "238";
};