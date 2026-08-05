import axios from "axios";

const CART_API = "http://localhost:8082/api/cart";

export async function addToCart(productId, quantity = 1) {

    const response = await axios.post(
        `${CART_API}/items`,
        {
            productId,
            quantity
        },
        {
            withCredentials: true
        }
    );

    return response.data;
}

export async function getCart() {

    const response = await axios.get(
        CART_API,
        {
            withCredentials: true
        }
    );

    return response.data;
}

export async function updateCartItem(cartItemId, quantity) {

    const response = await axios.put(
        `${CART_API}/items/${cartItemId}`,
        {
            quantity
        },
        {
            withCredentials: true
        }
    );

    return response.data;
}

export async function removeCartItem(cartItemId) {

    const response = await axios.delete(
        `${CART_API}/items/${cartItemId}`,
        {
            withCredentials: true
        }
    );

    return response.data;
}

export async function clearCart() {

    const response = await axios.delete(
        CART_API,
        {
            withCredentials: true
        }
    );

    return response.data;
}