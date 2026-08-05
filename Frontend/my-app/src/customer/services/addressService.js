const BASE_URL = "http://localhost:8082/api/addresses";

const addressService = {

    async getAllAddresses() {

        const response = await fetch(
            BASE_URL,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to fetch addresses.");
        }

        return await response.json();
    },

    async addAddress(address) {

        const response = await fetch(
            BASE_URL,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(address)
            }
        );

        if (!response.ok) {
            throw new Error("Unable to add address.");
        }

        return await response.json();
    },

    async updateAddress(addressId, address) {

        const response = await fetch(
            `${BASE_URL}/${addressId}`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(address)
            }
        );

        if (!response.ok) {
            throw new Error("Unable to update address.");
        }

        return await response.json();
    },

    async deleteAddress(addressId) {

        const response = await fetch(
            `${BASE_URL}/${addressId}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to delete address.");
        }

        return await response.text();
    },

    async setDefaultAddress(addressId) {

        const response = await fetch(
            `${BASE_URL}/${addressId}/default`,
            {
                method: "PATCH",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to set default address.");
        }

        return await response.json();
    }

};

export default addressService;