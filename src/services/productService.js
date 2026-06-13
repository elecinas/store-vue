export const fetchProductsAPI = async () => {
  const response = await fetch("http://localhost:3000/products");

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.items || [];
};

export const getProduct = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/products/${id}`);
    if (!res.ok) throw new Error("Error en la petición del servidor");
    const product = await res.json();
    return product;
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }
};
