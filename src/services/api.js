import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:8082/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('role');
            localStorage.removeItem('partnerId');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Delivery API endpoints
export const deliveryAPI = {
    // Admin endpoints
    getAllDeliveries: () => api.get('/delivery/admin/all'),
    getDeliveryStats: () => api.get('/delivery/admin/stats'),
    getPartners: () => api.get('/delivery/admin/partners'),
    assignDelivery: (orderId, deliveryPartnerId) =>
        api.post(`/delivery/admin/assign?orderId=${orderId}&deliveryPartnerId=${deliveryPartnerId}`),
    updateStatus: (assignmentId, pickupStatus) =>
        api.put('/delivery/admin/update-status', { assignmentId, pickupStatus }),
    cancelDelivery: (assignmentId) =>
        api.delete(`/delivery/admin/cancel/${assignmentId}`),

    // Delivery Partner endpoints
    getPartnerDeliveries: (partnerId) =>
        api.get(`/delivery/partner/${partnerId}/deliveries`),
    getPartnerDeliveriesByStatus: (partnerId, status) =>
        api.get(`/delivery/partner/${partnerId}/deliveries/status/${status}`),
    updateStatusByPartner: (assignmentId, pickupStatus) =>
        api.put('/delivery/partner/update-status', { assignmentId, pickupStatus }),

    // Customer endpoints
    trackOrder: (orderId) => api.get(`/delivery/track/${orderId}`),
    getDeliveryDetails: (orderId) => api.get(`/delivery/track/details/${orderId}`),
};

// Auth API endpoints
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('partnerId');
        window.location.href = '/login';
    }
};

export default api;