import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Kharido</h2>

      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Categories</li>
        <li>Contact</li>
      </ul>

      <button>Login</button>
    </nav>
  );
}

export default Navbar;