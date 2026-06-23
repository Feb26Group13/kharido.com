import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleid, setRoleid] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:9000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          roleid: Number(roleid),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful");
        console.log(data);
      } else {
        alert(data.message || "Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Backend not running or network error");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <select
        value={roleid}
        onChange={(e) => setRoleid(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="1">Admin</option>
        <option value="2">Vendor</option>
        <option value="3">Customer</option>
      </select>

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;