import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function LogoutComp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const logoutUser = async () => {

            try {

                await fetch(
                    "http://localhost:8081/api/auth/logout",
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

            } catch (error) {

                console.error("Logout Error:", error);

            } finally {

                dispatch(logout());

                navigate("/");

            }

        };

        logoutUser();

    }, [dispatch, navigate]);

    return <h2>Logging out...</h2>;
}