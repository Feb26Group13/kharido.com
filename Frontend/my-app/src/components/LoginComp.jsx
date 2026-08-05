import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setMsg("");

        try {

            const response = await fetch(
                "http://localhost:8081/api/auth/login",
                {
                    method: "POST",
                    credentials: "include",
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

            console.log("Login Response:", data);


            if (!response.ok) {

                setMsg(data.message || "Login Failed");
                return;

            }


            // Save logged-in user details
            const authData = {

                user: {
                    username: data.username,
                    role: data.role,
                },

                token: data.token,

            };


            localStorage.setItem(
                "auth",
                JSON.stringify(authData)
            );


            // Optional: separate username storage
            // easier for navbar/header display
            localStorage.setItem(
                "username",
                data.username
            );


            console.log(
                "Logged User:",
                data.username,
                data.role
            );


            switch (data.role) {


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


                default:

                    setMsg(
                        "Unknown Role : " + data.role
                    );

            }


        } catch (error) {

            console.error(error);

            setMsg(
                "Unable to connect to backend."
            );

        }

    };


    return (

        <div className="container mt-5">


            <h2>Login</h2>


            <form onSubmit={handleSubmit}>


                <div className="mb-3">

                    <label>
                        Username
                    </label>


                    <input

                        className="form-control"

                        type="text"

                        value={username}

                        onChange={(e)=>
                            setUsername(e.target.value)
                        }

                        required

                    />

                </div>



                <div className="mb-3">

                    <label>
                        Password
                    </label>


                    <input

                        className="form-control"

                        type="password"

                        value={password}

                        onChange={(e)=>
                            setPassword(e.target.value)
                        }

                        required

                    />

                </div>



                <button
                    type="submit"
                    className="btn btn-primary"
                >

                    Login

                </button>



            </form>



            {
                msg &&

                <p className="text-danger mt-3">

                    {msg}

                </p>
            }


        </div>

    );

}


export default LoginComp;