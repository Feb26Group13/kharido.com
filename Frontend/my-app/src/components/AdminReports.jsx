import { useEffect, useState } from "react";

function AdminReports() {

    const [reports, setReports] = useState({
        totalUsers: 0,
        totalSellers: 0,
        totalProducts: 0,
        totalOrders: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadReports = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8082/api/admin/reports",
                {
                    credentials: "include"
                }
            );

            if (!response.ok) {
                throw new Error("Unable to fetch reports");
            }

            const data = await response.json();

            console.log("REPORT DATA =", data);

            setReports(data);

        } catch (error) {

            console.error(error);
            setError("Unable to load reports");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        loadReports();

    }, []);

    return (

        <div className="admin-page">

            <h1>Reports & Analytics</h1>

            <hr />

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {loading ? (

                <h4>Loading reports...</h4>

            ) : (

                <>
                    <div className="report-container">

                        <div className="report-card">
                            <h3>Total Users</h3>
                            <h2>{reports.totalUsers}</h2>
                            <p>Registered Users</p>
                        </div>

                        <div className="report-card">
                            <h3>Total Sellers</h3>
                            <h2>{reports.totalSellers}</h2>
                            <p>Registered Sellers</p>
                        </div>

                        <div className="report-card">
                            <h3>Total Products</h3>
                            <h2>{reports.totalProducts}</h2>
                            <p>Available Products</p>
                        </div>

                        <div className="report-card">
                            <h3>Total Orders</h3>
                            <h2>{reports.totalOrders}</h2>
                            <p>Orders Received</p>
                        </div>

                    </div>

                    <br />

                    <div className="activity-box">

                        <h2>System Summary</h2>

                        <table className="admin-table">

                            <thead>

                                <tr>
                                    <th>Metric</th>
                                    <th>Count</th>
                                </tr>

                            </thead>

                            <tbody>

                                <tr>
                                    <td>Total Users</td>
                                    <td>{reports.totalUsers}</td>
                                </tr>

                                <tr>
                                    <td>Total Sellers</td>
                                    <td>{reports.totalSellers}</td>
                                </tr>

                                <tr>
                                    <td>Total Products</td>
                                    <td>{reports.totalProducts}</td>
                                </tr>

                                <tr>
                                    <td>Total Orders</td>
                                    <td>{reports.totalOrders}</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </>

            )}

        </div>

    );

}

export default AdminReports;