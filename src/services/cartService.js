const formatCartItems = (items) =>
  items.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));

export const validateCartAPI = async (items, token) => {
  const jsonItems = JSON.stringify(formatCartItems(items));
  const url = `http://localhost:3000/cart?items=${encodeURIComponent(jsonItems)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const serverData = await response.json().catch(() => ({}));
    throw new Error(serverData.message || `Error ${response.status}`);
  }

  return response.json();
};

export const purchaseCartAPI = async (items, token) => {
  const response = await fetch("http://localhost:3000/cart/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: formatCartItems(items),
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  return response.json();
};
