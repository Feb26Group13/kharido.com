import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { deliveryAPI } from '../../services/api';
import './DeliveryDashboard.css';

const DeliveryDashboard = () => {
    const navigate = useNavigate();
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        picked: 0,
        inTransit: 0,
        delivered: 0
    });
    const [filter, setFilter] = useState('ALL');
    const [partnerInfo, setPartnerInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    // In-app confirm modal state
    const [confirmModal, setConfirmModal] = useState(null);
    const [toast, setToast] = useState(null);

    const dropdownRef = useRef(null);
    const ignoreNextOutsideClick = useRef(false);



    const partnerId = localStorage.getItem('partnerId') || '1';
    const username = localStorage.getItem('username') || 'Delivery Partner';

    console.log('🔍 Partner ID from localStorage:', partnerId);
    console.log('🔍 Username from localStorage:', username);

    // If no partner ID, show error
    if (!partnerId) {
        console.error('❌ No partner ID found!');
        showToast('⚠️ Partner ID not found. Please login again.');
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    }

    useEffect(() => {
        fetchMyDeliveries();
        fetchPartnerInfo();
    }, []);

    // Click outside listener for dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ignoreNextOutsideClick.current) {
                ignoreNextOutsideClick.current = false;
                return;
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const fetchPartnerInfo = async () => {
        try {
            setPartnerInfo({
                name: 'FastTrack Logistics',
                city: 'Mumbai',
                phone: '9876543001',
                avatar: '🚚'
            });
        } catch (error) {
            console.error('Error fetching partner info:', error);
        }
    };

    // ============================================================
    // UPDATED: fetchMyDeliveries - NO DUMMY DATA
    // ============================================================
    const fetchMyDeliveries = async () => {
        setLoading(true);
        try {
            const response = await deliveryAPI.getPartnerDeliveries(partnerId);
            console.log('✅ Real data from database:', response.data);

            // Check if we got data
            if (response.data && response.data.length > 0) {
                setDeliveries(response.data);
                updateStats(response.data);
                showToast('✅ Deliveries loaded successfully!');
            } else {
                // No data found in database
                setDeliveries([]);
                updateStats([]);
                showToast('📭 No deliveries assigned to you yet.');
            }
        } catch (error) {
            console.error('❌ Error fetching deliveries:', error);

            // NO DUMMY DATA - set empty array
            setDeliveries([]);
            updateStats([]);

            // Show specific error message
            if (error.response) {
                // Server responded with error
                if (error.response.status === 401) {
                    showToast('🔒 Session expired. Please login again.');
                    setTimeout(() => {
                        localStorage.clear();
                        navigate('/login');
                    }, 2000);
                } else if (error.response.status === 404) {
                    showToast('📭 No deliveries found.');
                } else {
                    showToast(`❌ Server error: ${error.response.status}`);
                }
            } else if (error.request) {
                // No response from server
                showToast('🔌 Cannot connect to server. Please check your connection.');
            } else {
                showToast('❌ Failed to load deliveries. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const updateStats = (deliveryData) => {
        const newStats = {
            total: deliveryData.length,
            pending: deliveryData.filter(d => d.pickupStatus === 'PENDING').length,
            picked: deliveryData.filter(d => d.pickupStatus === 'PICKED').length,
            inTransit: deliveryData.filter(d => d.pickupStatus === 'IN_TRANSIT').length,
            delivered: deliveryData.filter(d => d.pickupStatus === 'DELIVERED').length
        };
        setStats(newStats);
    };

    const showToast = (message) => {
        setToast(message);
        window.setTimeout(() => setToast(null), 2500);
    };

    const handleUpdateStatus = (assignmentId, newStatus) => {
        setConfirmModal({
            message: `Update delivery status to ${newStatus}?`,
            onConfirm: async () => {
                setConfirmModal(null);
                try {
                    await deliveryAPI.updateStatusByPartner(assignmentId, newStatus);
                    showToast('✅ Status updated successfully!');
                    fetchMyDeliveries();
                } catch (error) {
                    console.error('Error updating status:', error);
                    showToast('❌ Failed to update status');
                }
            }
        });
    };

    const handleLogout = () => {
        setConfirmModal({
            message: 'Are you sure you want to logout?',
            onConfirm: () => {
                setConfirmModal(null);
                localStorage.clear();
                navigate('/login');
            }
        });
    };

    const handleViewDetails = (orderId) => {
        navigate(`/delivery/order/${orderId}`);
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        ignoreNextOutsideClick.current = true;
        setShowDropdown(prev => !prev);
    };

    const getStatusBadgeClass = (status) => {
        const classes = {
            'PENDING': 'badge-pending',
            'PICKED': 'badge-picked',
            'IN_TRANSIT': 'badge-transit',
            'DELIVERED': 'badge-delivered'
        };
        return classes[status] || 'badge-default';
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

    const getStatusOptions = (currentStatus) => {
        const allStatuses = ['PENDING', 'PICKED', 'IN_TRANSIT', 'DELIVERED'];
        const currentIndex = allStatuses.indexOf(currentStatus);
        return allStatuses.slice(currentIndex);
    };

    const filteredDeliveries = deliveries.filter(d => {
        if (filter === 'ALL') return true;
        return d.pickupStatus === filter;
    });

    const statCards = [
        { key: 'total', label: 'Total Orders', icon: '📦', color: 'stat-total' },
        { key: 'pending', label: 'Pending Pickup', icon: '⏳', color: 'stat-pending' },
        { key: 'picked', label: 'Picked Up', icon: '📦', color: 'stat-picked' },
        { key: 'inTransit', label: 'In Transit', icon: '🚚', color: 'stat-transit' },
        { key: 'delivered', label: 'Delivered', icon: '✅', color: 'stat-delivered' }
    ];

    if (loading) {
        return (
            <div className="delivery-loading">
                <div className="loader-spinner">
                    <div className="spinner"></div>
                    <p>Loading your deliveries...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="delivery-dashboard">
            {/* Header with Logout */}
            <header className="dashboard-header" style={{ overflow: 'visible', position: 'relative', zIndex: 100 }}>
                <div className="header-left">
                    <div className="logo-section">
                        <span className="logo-icon">🚚</span>
                        <div>
                            <h1 className="dashboard-title">Delivery Dashboard</h1>
                            <p className="dashboard-subtitle">Manage your assigned deliveries</p>
                        </div>
                    </div>
                </div>

                <div className="header-right" style={{ overflow: 'visible' }}>
                    {partnerInfo && (
                        <div className="partner-info">
                            <span className="partner-avatar">{partnerInfo.avatar}</span>
                            <div className="partner-details">
                                <span className="partner-name">{partnerInfo.name}</span>
                                <span className="partner-city">📍 {partnerInfo.city}</span>
                            </div>
                        </div>
                    )}

                    {/* User Menu with Dropdown */}
                    <div
                        className="user-menu"
                        ref={dropdownRef}
                        style={{ position: 'relative', overflow: 'visible' }}
                    >
                        <button
                            type="button"
                            className="user-menu-btn"
                            onClick={toggleDropdown}
                            aria-haspopup="true"
                            aria-expanded={showDropdown}
                            aria-label="User menu"
                        >
                            <span className="user-avatar">
                                {username.charAt(0).toUpperCase()}
                            </span>
                            <span className="user-name">{username}</span>
                            <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
                        </button>

                        {showDropdown && (
                            <div
                                className="dropdown-menu"
                                style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    right: 0,
                                    display: 'block',
                                    visibility: 'visible',
                                    opacity: 1,
                                    zIndex: 9999,
                                    minWidth: 200,
                                    background: '#fff',
                                    borderRadius: 8,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                    border: '1px solid #eee',
                                    padding: '6px 0'
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div
                                    className="dropdown-item"
                                    style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center' }}
                                    onClick={() => {
                                        setShowDropdown(false);
                                        showToast('Profile page coming soon!');
                                    }}
                                >
                                    <span>👤</span>
                                    <span>My Profile</span>
                                </div>
                                <div
                                    className="dropdown-item"
                                    style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center' }}
                                    onClick={() => {
                                        setShowDropdown(false);
                                        showToast(
                                            `📊 Total: ${stats.total} · Pending: ${stats.pending} · Picked: ${stats.picked} · In Transit: ${stats.inTransit} · Delivered: ${stats.delivered}`
                                        );
                                    }}
                                >
                                    <span>📊</span>
                                    <span>Statistics</span>
                                </div>
                                <hr className="dropdown-divider" style={{ margin: '6px 0', border: 'none', borderTop: '1px solid #eee' }} />
                                <button
                                    type="button"
                                    className="dropdown-item logout-btn"
                                    style={{
                                        padding: '10px 16px', cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center',
                                        width: '100%', background: 'none', border: 'none', textAlign: 'left', font: 'inherit', color: '#e53935'
                                    }}
                                    onClick={() => {
                                        setShowDropdown(false);
                                        handleLogout();
                                    }}
                                >
                                    <span>🚪</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Statistics Cards */}
            <div className="stats-grid">
                {statCards.map((stat) => (
                    <div key={stat.key} className={`stat-card ${stat.color}`}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-info">
                            <span className="stat-value">{stats[stat.key] || 0}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                        <div className="stat-progress">
                            <div
                                className="stat-progress-bar"
                                style={{
                                    width: stats.total > 0
                                        ? `${(stats[stat.key] / stats.total) * 100}%`
                                        : '0%'
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <div className="filter-buttons">
                    <button
                        type="button"
                        className={`filter-btn ${filter === 'ALL' ? 'active' : ''}`}
                        onClick={() => setFilter('ALL')}
                    >
                        <span>📋</span> All Orders
                        <span className="filter-count">{deliveries.length}</span>
                    </button>
                    <button
                        type="button"
                        className={`filter-btn ${filter === 'PENDING' ? 'active' : ''}`}
                        onClick={() => setFilter('PENDING')}
                    >
                        <span>⏳</span> Pending
                        <span className="filter-count">{stats.pending}</span>
                    </button>
                    <button
                        type="button"
                        className={`filter-btn ${filter === 'PICKED' ? 'active' : ''}`}
                        onClick={() => setFilter('PICKED')}
                    >
                        <span>📦</span> Picked
                        <span className="filter-count">{stats.picked}</span>
                    </button>
                    <button
                        type="button"
                        className={`filter-btn ${filter === 'IN_TRANSIT' ? 'active' : ''}`}
                        onClick={() => setFilter('IN_TRANSIT')}
                    >
                        <span>🚚</span> In Transit
                        <span className="filter-count">{stats.inTransit}</span>
                    </button>
                    <button
                        type="button"
                        className={`filter-btn ${filter === 'DELIVERED' ? 'active' : ''}`}
                        onClick={() => setFilter('DELIVERED')}
                    >
                        <span>✅</span> Delivered
                        <span className="filter-count">{stats.delivered}</span>
                    </button>
                </div>
                <div className="filter-actions">
                    <button type="button" className="refresh-btn" onClick={fetchMyDeliveries}>
                        🔄 Refresh
                    </button>
                </div>
            </div>

            {/* Deliveries Table */}
            <div className="table-container">
                {filteredDeliveries.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>No deliveries found</h3>
                        <p>You don't have any {filter !== 'ALL' ? filter.toLowerCase() : ''} deliveries at the moment.</p>
                        <button
                            type="button"
                            className="refresh-btn"
                            onClick={fetchMyDeliveries}
                            style={{ marginTop: '15px' }}
                        >
                            🔄 Refresh
                        </button>
                    </div>
                ) : (
                    <table className="deliveries-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDeliveries.map((delivery) => (
                                <tr key={delivery.assignmentId} className="delivery-row">
                                    <td>
                                        <span className="order-id">#{delivery.orderId}</span>
                                    </td>
                                    <td>
                                        <div className="customer-info">
                                            <span className="customer-name">
                                                {delivery.customerName || 'N/A'}
                                            </span>
                                            <span className="customer-email">
                                                {delivery.customerEmail || ''}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="delivery-address">
                                            {delivery.deliveryAddress || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusBadgeClass(delivery.pickupStatus)}`}>
                                            {getStatusIcon(delivery.pickupStatus)} {delivery.pickupStatus}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="order-amount">
                                            ₹{delivery.totalAmount?.toLocaleString() || 0}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="actions-cell">
                                            {delivery.pickupStatus !== 'DELIVERED' && (
                                                <select
                                                    className="status-select"
                                                    value={delivery.pickupStatus}
                                                    onChange={(e) => handleUpdateStatus(
                                                        delivery.assignmentId,
                                                        e.target.value
                                                    )}
                                                >
                                                    {getStatusOptions(delivery.pickupStatus).map(status => (
                                                        <option key={status} value={status}>
                                                            {getStatusIcon(status)} {status}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                            {delivery.pickupStatus === 'DELIVERED' && (
                                                <span className="delivered-badge">✅ Delivered</span>
                                            )}
                                            <button
                                                type="button"
                                                className="btn-view"
                                                onClick={() => handleViewDetails(delivery.orderId)}
                                            >
                                                View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Confirm Modal */}
            {confirmModal && (
                <div
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
                    }}
                    onClick={() => setConfirmModal(null)}
                >
                    <div
                        style={{
                            background: '#fff', borderRadius: 10, padding: '24px 28px',
                            maxWidth: 340, width: '90%', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p style={{ margin: '0 0 20px', fontSize: 15, color: '#222' }}>
                            {confirmModal.message}
                        </p>
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                            <button
                                type="button"
                                onClick={() => setConfirmModal(null)}
                                style={{
                                    padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd',
                                    background: '#f5f5f5', cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmModal.onConfirm}
                                style={{
                                    padding: '8px 16px', borderRadius: 6, border: 'none',
                                    background: '#e53935', color: '#fff', cursor: 'pointer'
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast && (
                <div
                    style={{
                        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                        background: '#323232', color: '#fff', padding: '10px 18px',
                        borderRadius: 8, fontSize: 14, zIndex: 2100, whiteSpace: 'pre-line',
                        maxWidth: '90%', textAlign: 'center'
                    }}
                >
                    {toast}
                </div>
            )}
        </div>
    );
};

export default DeliveryDashboard;