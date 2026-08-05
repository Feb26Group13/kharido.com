const BASE_URL = "http://localhost:8083/api/payments";

const paymentService = {

    async makePayment(payment) {

        const response = await fetch(
            `${BASE_URL}/pay`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payment)
            }
        );

        if (!response.ok) {
            throw new Error("Payment failed.");
        }

        return await response.json();
    },

    async getPaymentsByUser(userId) {

        const response = await fetch(
            `${BASE_URL}/user/${userId}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch payments.");
        }

        return await response.json();
    },

    async getPaymentsByOrder(orderId) {

        const response = await fetch(
            `${BASE_URL}/order/${orderId}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch payment.");
        }

        return await response.json();
    }

};

export default paymentService;