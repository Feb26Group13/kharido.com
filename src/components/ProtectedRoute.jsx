import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

    const authData = localStorage.getItem("auth");

    // User is not logged in
    if (!authData) {
        return <Navigate to="/login" replace />;
    }

    const auth = JSON.parse(authData);

    // Check Admin role
    if (auth.user?.role !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    // User is authenticated and is ADMIN
    return <Outlet />;
}

export default ProtectedRoute;