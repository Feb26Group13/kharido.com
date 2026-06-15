import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("role", role);

    if (role === "customer") {
      navigate("/");
    } else if (role === "admin") {
      navigate("/admin");
    } else if (role === "vendor") {
      navigate("/vendor");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
        <option value="vendor">Vendor</option>
      </select>

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;