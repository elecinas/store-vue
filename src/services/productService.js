export const fetchProductsAPI = async () => {
  const response = await fetch('http://localhost:3000/products');
  
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  
  const data = await response.json();
  return Array.isArray(data) ? data : (data.items || []);
};