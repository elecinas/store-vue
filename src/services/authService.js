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