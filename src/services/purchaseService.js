/**
 * para obtener detalles de compra.
 * @param {string} purchaseId - ID compra
 * @param {string} token - Token usuario
 * @returns {Promise<Object>} - datos devueltos por el bakc
 */
export const fetchOrderDetailsAPI = async (purchaseId, token) => {
    const response = await fetch(`http://localhost:3000/cart/purchases/${purchaseId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Error al recuperar el pedido: ${response.status}`);
    }

    return response.json();
};

export const fetchUserPurchasesAPI = async (token) => {
  const response = await fetch("http://localhost:3000/cart/purchases", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo recuperar el historial de compras");
  }

  return response.json();
};