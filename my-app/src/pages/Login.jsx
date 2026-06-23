import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    const response = await fetch(
      "http://localhost:9000/login",
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

    if (response.ok) {

      const data = await response.json();

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Role Based Routing

      if (data.user.role === 1) {
        navigate("/admin");
      }
      else if (data.user.role === 2) {
        navigate("/vendor");
      }
      else {
        navigate("/");
      }

    } else {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <br /><br />

<Link to="/register">
  New User? Register Here
</Link>
    </div>
  );
}

export default Login;