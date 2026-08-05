import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, role }) {

    const authData = localStorage.getItem("auth");

    if (!authData) {
        return <Navigate to="/login" replace />;
    }

    const auth = JSON.parse(authData);

    if (!auth.user) {
        return <Navigate to="/login" replace />;
    }

    if (auth.user.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoutes;