const BASE_URL = "http://localhost:8082/api/customers";

const customerService = {

    async getProfile() {

        const response = await fetch(
            `${BASE_URL}/profile`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to fetch profile");
        }

        return await response.json();
    },

    async updateProfile(profile) {

        const response = await fetch(
            `${BASE_URL}/profile`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            }
        );

        if (!response.ok) {
            throw new Error("Unable to update profile");
        }

        return await response.json();
    }

};

export default customerService;