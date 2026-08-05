import { useEffect, useState } from "react";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalSellers: 0,
        totalProducts: 0,
        totalOrders: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetch("http://localhost:8082/api/admin/dashboard", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async (response) => {

            if (!response.ok) {

                const text = await response.text();

                throw new Error(text || "Failed to load dashboard");
            }

            return response.json();
        })
        .then((data) => {

            console.log("Dashboard Response:", data);

            setDashboard(data);
        })
        .catch((error) => {

            console.error(error);

            setError(error.message);

        })
        .finally(() => {

            setLoading(false);

        });

    }, []);

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <div className="admin-page">

            <h1>Kharido Admin Dashboard</h1>

            {error && (
                <h3 style={{ color: "red" }}>
                    {error}
                </h3>
            )}

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Vendors</h3>
                    <h2>{dashboard.totalSellers}</h2>
                    <p>Registered Vendors</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Users</h3>
                    <h2>{dashboard.totalUsers}</h2>
                    <p>Registered Users</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Products</h3>
                    <h2>{dashboard.totalProducts}</h2>
                    <p>Available Products</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Orders</h3>
                    <h2>{dashboard.totalOrders}</h2>
                    <p>Customer Orders</p>
                </div>

                <div className="dashboard-card">
                    <h3>Revenue</h3>
                    <h2>₹2,50,000</h2>
                    <p>Total Sales</p>
                </div>

            </div>

            <div className="activity-box">

                <h2>Recent Activities</h2>

                <table className="admin-table">

                    <thead>

                        <tr>
                            <th>Activity</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>New customer registered</td>
                            <td>16 June 2026</td>
                            <td>
                                <span className="status completed">
                                    Completed
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>New order placed</td>
                            <td>16 June 2026</td>
                            <td>
                                <span className="status pending">
                                    Processing
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>Product stock updated</td>
                            <td>15 June 2026</td>
                            <td>
                                <span className="status completed">
                                    Updated
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>Vendor added new product</td>
                            <td>15 June 2026</td>
                            <td>
                                <span className="status completed">
                                    Added
                                </span>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default AdminDashboard;