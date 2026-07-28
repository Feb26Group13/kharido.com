import { useEffect, useState } from "react";

function AdminDashboard() {

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        // Get authentication data from localStorage
        const authData = localStorage.getItem("auth");

        if (!authData) {
            setError("User is not logged in");
            return;
        }

        // Convert JSON string to JavaScript object
        const auth = JSON.parse(authData);

        // Get JWT token
        const token = auth.token;

        if (!token) {
            setError("JWT Token not found");
            return;
        }

        // Call protected Admin API
        fetch("http://localhost:8080/api/admin/auth/test", {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {

            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }

            return response.text();
        })
        .then((data) => {

            console.log("Backend Response:", data);

            setMessage(data);
        })
        .catch((error) => {

            console.error("API Error:", error);

            setError(
                "Unable to access protected Admin API"
            );
        });

    }, []);


    return (

        <div className="admin-page">

            <h1>Kharido Admin Dashboard</h1>


            {/* JWT Authentication Status */}

            <div className="jwt-status">

                {message && (
                    <h3>
                        {message}
                    </h3>
                )}

                {error && (
                    <h3>
                        {error}
                    </h3>
                )}

            </div>


            <div className="dashboard-cards">


                <div className="dashboard-card">

                    <h3>Total Vendors</h3>

                    <h2>75</h2>

                    <p>Registered Vendors</p>

                </div>


                <div className="dashboard-card">

                    <h3>Total Users</h3>

                    <h2>1200</h2>

                    <p>Registered Users</p>

                </div>


                <div className="dashboard-card">

                    <h3>Total Products</h3>

                    <h2>500</h2>

                    <p>Available Products</p>

                </div>


                <div className="dashboard-card">

                    <h3>Total Orders</h3>

                    <h2>350</h2>

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

                            <td>
                                New customer registered
                            </td>

                            <td>
                                16 June 2026
                            </td>

                            <td>
                                <span className="status completed">
                                    Completed
                                </span>
                            </td>

                        </tr>


                        <tr>

                            <td>
                                New order placed
                            </td>

                            <td>
                                16 June 2026
                            </td>

                            <td>
                                <span className="status pending">
                                    Processing
                                </span>
                            </td>

                        </tr>


                        <tr>

                            <td>
                                Product stock updated
                            </td>

                            <td>
                                15 June 2026
                            </td>

                            <td>
                                <span className="status completed">
                                    Updated
                                </span>
                            </td>

                        </tr>


                        <tr>

                            <td>
                                Vendor added new product
                            </td>

                            <td>
                                15 June 2026
                            </td>

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