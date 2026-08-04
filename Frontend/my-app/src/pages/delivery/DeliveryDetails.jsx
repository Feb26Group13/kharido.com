import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deliveryAPI } from '../../services/api';
import './DeliveryDashboard.css';

const DeliveryDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [delivery, setDelivery] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDeliveryDetails();
    }, [orderId]);

    const fetchDeliveryDetails = async () => {
        setLoading(true);
        try {
            // Fetch specific delivery details
            const response = await deliveryAPI.getDeliveryDetails(orderId);
            setDelivery(response.data[0] || null);
        } catch (error) {
            console.error('Error fetching delivery details:', error);
            // Use dummy data
            setDelivery(getDummyDelivery(orderId));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="delivery-loading">
                <div className="loader">Loading delivery details...</div>
            </div>
        );
    }

    if (!delivery) {
        return (
            <div className="delivery-details">
                <h2>Delivery not found</h2>
                <button onClick={() => navigate('/delivery')}>Back to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="delivery-details-container">
            <button className="btn-back" onClick={() => navigate('/delivery')}>
                ← Back to Dashboard
            </button>

            <div className="details-card">
                <div className="details-header">
                    <h2>Order #{delivery.orderId}</h2>
                    <span className={`status-badge ${getStatusBadgeClass(delivery.pickupStatus)}`}>
                        {getStatusIcon(delivery.pickupStatus)} {delivery.pickupStatus}
                    </span>
                </div>

                <div className="details-grid">
                    <div className="details-section">
                        <h4>Customer Information</h4>
                        <p><strong>Name:</strong> {delivery.customerName || 'N/A'}</p>
                        <p><strong>Email:</strong> {delivery.customerEmail || 'N/A'}</p>
                        <p><strong>Phone:</strong> {delivery.customerPhone || 'N/A'}</p>
                    </div>

                    <div className="details-section">
                        <h4>Delivery Information</h4>
                        <p><strong>Address:</strong> {delivery.deliveryAddress || 'N/A'}</p>
                        <p><strong>City:</strong> {delivery.deliveryCity || 'N/A'}</p>
                        <p><strong>Assigned Date:</strong> {delivery.assignedDate || 'N/A'}</p>
                    </div>

                    <div className="details-section">
                        <h4>Order Details</h4>
                        <p><strong>Total Amount:</strong> ₹{delivery.totalAmount?.toLocaleString() || 0}</p>
                        <p><strong>Payment Status:</strong> {delivery.paymentStatus || 'N/A'}</p>
                        <p><strong>Items:</strong> {delivery.itemCount || 0} items</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getStatusBadgeClass = (status) => {
    const classes = {
        'PENDING': 'badge-warning',
        'PICKED': 'badge-info',
        'IN_TRANSIT': 'badge-primary',
        'DELIVERED': 'badge-success'
    };
    return classes[status] || 'badge-secondary';
};

const getStatusIcon = (status) => {
    const icons = {
        'PENDING': '⏳',
        'PICKED': '📦',
        'IN_TRANSIT': '🚚',
        'DELIVERED': '✅'
    };
    return icons[status] || '📋';
};

const getDummyDelivery = (orderId) => ({
    orderId: parseInt(orderId),
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul@gmail.com',
    customerPhone: '9876543210',
    deliveryAddress: '123, MG Road, Mumbai, Maharashtra - 400001',
    deliveryCity: 'Mumbai',
    pickupStatus: 'IN_TRANSIT',
    totalAmount: 79999.00,
    paymentStatus: 'PAID',
    itemCount: 3,
    assignedDate: '2026-01-15 10:30:00'
});

export default DeliveryDetails;