// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "../redux/authSlice";
// import { useNavigate } from "react-router-dom";
//
// export default function LoginComp() {
//
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [msg, setMsg] = useState("");
//
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//
//     const handleSubmit = async (e) => {
//
//         e.preventDefault();
//         setMsg("");
//
//         try {
//             const response = await fetch(
//                 "http://localhost:8081/api/auth/login",
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         username,
//                         password,
//                     }),
//                 }
//             );
//
//             const data = await response.json();
//
//             console.log("Spring Boot Response:", data);
//
//             // Login failed
//             if (!data.token) {
//                 setMsg(data.message || "Invalid username or password");
//                 return;
//             }
//
//             const userData = {
//                 username: data.username,
//                 role: data.role,
//             };
//
//             dispatch(
//                 login({
//                     token: data.token,
//                     user: userData,
//                 })
//             );
//
//             localStorage.setItem(
//                 "auth",
//                 JSON.stringify({
//                     token: data.token,
//                     user: userData,
//                 })
//             );
//
//             console.log("JWT Token Saved:", data.token);
//
//             switch (data.role) {
//
//                 case "ADMIN":
//                     navigate("/admin");
//                     break;
//
//                 case "SELLER":
//                     navigate("/seller");
//                     break;
//
//                 case "CUSTOMER":
//                     navigate("/user");
//                     break;
//
//                 case "DELIVERY":
//                     navigate("/delivery");
//                     break;
//
//                 case "DELIVERY_PARTNER":
//                     navigate("/delivery");
//                     break;
//
//                 default:
//                     setMsg("Invalid user role: " + data.role);
//                     break;
//             }
//
//         } catch (error) {
//
//             console.error("Login Error:", error);
//
//             setMsg(
//                 "Unable to connect to Spring Boot Backend. Make sure Spring Boot is running on port 8081."
//             );
//         }
//     };
//
//     return (
//         <div>
//
//             <h1>Login Form</h1>
//
//             <form onSubmit={handleSubmit}>
//
//                 <label>Enter Username:</label>
//                 <br />
//
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//
//                 <br />
//                 <br />
//
//                 <label>Enter Password:</label>
//                 <br />
//
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//
//                 <br />
//                 <br />
//
//                 <button type="submit">
//                     LOGIN
//                 </button>
//
//             </form>
//
//             {msg && (
//                 <p style={{ color: "red" }}>
//                     {msg}
//                 </p>
//             )}
//
//         </div>
//     );
// }

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
            const response = await fetch(
                "http://localhost:8081/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                }
            );

            const data = await response.json();

            console.log("📥 Spring Boot Response:", data);

            // Login failed
            if (!data.token) {
                setMsg(data.message || "Invalid username or password");
                return;
            }

            // 🔥 Extract user data from response
            const {
                token,
                userId,
                username: responseUsername,
                role,
                partnerId,
                partnerCity,
                partnerCompany
            } = data;

            // 🔥 Build user data object
            const userData = {
                username: responseUsername || username,
                role: role,
                userId: userId,
            };

            // 🔥 Dispatch to Redux
            dispatch(
                login({
                    token: token,
                    user: userData,
                })
            );

            // 🔥 Store auth data in localStorage
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    token: token,
                    user: userData,
                })
            );

            // 🔥 Store individual items for easy access
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId ? String(userId) : "");
            localStorage.setItem("username", responseUsername || username);
            localStorage.setItem("role", role);

            // 🔥 IMPORTANT: Store partner ID if delivery partner
            if ((role === "DELIVERY" || role === "DELIVERY_PARTNER") && partnerId) {
                localStorage.setItem("partnerId", String(partnerId));
                localStorage.setItem("partnerCity", partnerCity || "");
                localStorage.setItem("partnerCompany", partnerCompany || "");
                console.log("✅ Partner ID saved:", partnerId);
            }

            console.log("✅ JWT Token Saved:", token);
            console.log("📌 Stored Data:");
            console.log("  UserId:", localStorage.getItem("userId"));
            console.log("  Username:", localStorage.getItem("username"));
            console.log("  Role:", localStorage.getItem("role"));
            console.log("  PartnerId:", localStorage.getItem("partnerId"));

            // 🔥 Redirect based on role
            switch (role) {

                case "ADMIN":
                    navigate("/admin");
                    break;

                case "SELLER":
                    navigate("/seller");
                    break;

                case "CUSTOMER":
                    navigate("/user");
                    break;

                case "DELIVERY":
                    navigate("/delivery");
                    break;

                case "DELIVERY_PARTNER":
                    navigate("/delivery");
                    break;

                default:
                    setMsg("Invalid user role: " + role);
                    break;
            }

        } catch (error) {

            console.error("❌ Login Error:", error);

            setMsg(
                "Unable to connect to Spring Boot Backend. Make sure Spring Boot is running on port 8081."
            );
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login to Kharido</h1>

                {msg && (
                    <p style={{ color: "red", marginBottom: "15px" }}>
                        {msg}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <br />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <br />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
}