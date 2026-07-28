import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginComp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setMsg("");

        try {

            // Call Spring Boot Login API
            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                }
            );

            // Get response from Spring Boot
            const data = await response.json();

            console.log("Spring Boot Response:", data);

            // Check if login successful
            if (!response.ok) {

                setMsg(
                    data.message ||
                    "Invalid username or password"
                );

                return;
            }

            // =====================================
            // Save login information in Redux
            // =====================================

            dispatch(
                login({
                    token: data.token,

                    user: {
                        userid: data.userid,
                        username: data.username,
                        roleid: data.roleid,
                        role: data.role,
                    },
                })
            );

            // =====================================
            // Save JWT + User information
            // in localStorage
            // =====================================

            localStorage.setItem(
                "auth",
                JSON.stringify({
                    token: data.token,

                    user: {
                        userid: data.userid,
                        username: data.username,
                        roleid: data.roleid,
                        role: data.role,
                    },
                })
            );

            console.log("JWT Token Saved:", data.token);

            // =====================================
            // Redirect according to user role
            // =====================================

            if (data.role === "ADMIN") {

                navigate("/admin");

            } else if (data.role === "VENDOR") {

                navigate("/seller");

            } else if (data.role === "CUSTOMER") {

                navigate("/user");

            } else if (data.role === "DELIVERY") {

                navigate("/delivery");

            } else {

                setMsg("Invalid user role");
            }

        } catch (error) {

            console.error("Login Error:", error);

            setMsg(
                "Unable to connect to Spring Boot Backend. " +
                "Make sure Spring Boot is running on port 8081."
            );
        }
    };


    return (
        <div>

            <h1>Login Form</h1>

            <form onSubmit={handleSubmit}>

                <label>
                    Enter Username:
                </label>

                <br />

                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    required
                />

                <br />
                <br />

                <label>
                    Enter Password:
                </label>

                <br />

                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <br />
                <br />

                <button type="submit">
                    LOGIN
                </button>

            </form>

            {msg && (
                <p>
                    {msg}
                </p>
            )}

        </div>
    );
}