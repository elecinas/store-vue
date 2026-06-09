import { ref } from "vue";

const useProductDetail = () => {
    const product = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const getProduct = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/products/${id}`)
            if(!res.ok) throw new Error('Error en la petición del servidor')
            product.value = await res.json();
        } catch(e) {
            error.value = "No se ha podido cargar el producto";
        } finally {
            loading.value = false;
        }
    }
    return {
        product,
        loading,
        error,
        getProduct
    }
}

export default useProductDetail;