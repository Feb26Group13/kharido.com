import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.username;

  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h2>Kharido</h2>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {userName ? (
        <>
          <span>Welcome, {userName}</span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;