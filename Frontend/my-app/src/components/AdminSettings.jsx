import { useEffect, useState } from "react";

function AdminSettings() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8082/api/admin/profile",
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load profile");
                }

                const data = await response.json();

                console.log("PROFILE =", data);

                setProfile(data);

            } catch (err) {

                console.error(err);

                setError("Unable to load profile.");

            } finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (

        <div className="admin-page">

            <h1>Admin Profile</h1>

            <hr />

            <table className="admin-table">

                <tbody>

                    <tr>
                        <th>User ID</th>
                        <td>{profile.userId}</td>
                    </tr>

                    <tr>
                        <th>Username</th>
                        <td>{profile.username}</td>
                    </tr>

                    <tr>
                        <th>Email</th>
                        <td>{profile.email}</td>
                    </tr>

                    <tr>
                        <th>Role</th>
                        <td>{profile.role}</td>
                    </tr>

                    <tr>
                        <th>Status</th>
                        <td>{profile.status}</td>
                    </tr>

                    <tr>
                        <th>Created At</th>
                        <td>{profile.createdAt}</td>
                    </tr>

                </tbody>

            </table>

        </div>

    );
}

export default AdminSettings;