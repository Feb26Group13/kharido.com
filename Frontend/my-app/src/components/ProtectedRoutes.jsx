import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, role }) {

    const authData = localStorage.getItem("auth");

    // User is not logged in
    if (!authData) {
        return <Navigate to="/login" replace />;
    }

    const auth = JSON.parse(authData);

    // Get logged-in user's role
    const userRole = auth.user?.role;

    // User does not have required role
    if (userRole !== role) {
        return <Navigate to="/login" replace />;
    }

    // User is authorized
    return children;
}

export default ProtectedRoutes;