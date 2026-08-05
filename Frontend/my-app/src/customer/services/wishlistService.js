import axios from "axios";

const WISHLIST_API = "http://localhost:8082/api/wishlist";
const LOCAL_STORAGE_KEY = "kharido_wishlist_items";

export function getLocalWishlist() {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveLocalWishlist(items) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
        console.error("Error saving wishlist to localStorage:", e);
    }
}

export async function getWishlist() {
    try {
        const response = await axios.get(WISHLIST_API, { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
            saveLocalWishlist(response.data);
            return response.data;
        }
    } catch {
        // Fallback to local storage if API is offline or not implemented yet
    }
    return getLocalWishlist();
}

export async function addToWishlist(product) {
    let current = getLocalWishlist();
    const prodId = product.id || product.productId || product.productid;
    const exists = current.some((item) => String(item.id || item.productId || item.productid) === String(prodId));
    if (!exists) {
        current = [...current, product];
        saveLocalWishlist(current);
    }

    try {
        await axios.post(
            `${WISHLIST_API}/items`,
            { productId: prodId },
            { withCredentials: true }
        );
    } catch {
        // Fallback handled via localStorage
    }

    return current;
}

export async function removeFromWishlist(productId) {
    let current = getLocalWishlist();
    current = current.filter((item) => String(item.id || item.productId || item.productid) !== String(productId));
    saveLocalWishlist(current);

    try {
        await axios.delete(`${WISHLIST_API}/items/${productId}`, { withCredentials: true });
    } catch {
        // Fallback handled via localStorage
    }

    return current;
}

export async function clearWishlist() {
    saveLocalWishlist([]);
    try {
        await axios.delete(WISHLIST_API, { withCredentials: true });
    } catch {
        // Fallback handled
    }
    return [];
}
