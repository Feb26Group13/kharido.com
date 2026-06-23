import { NavLink, Outlet } from "react-router-dom";

export default function AdminDashBoard() {
  return (
    <>
      <h2>Admin Dashboard</h2>

      <div className="d-flex">

        <ul className="nav nav-pills flex-column p-3 border-end">

          <li className="nav-item">
            <NavLink to="users">Manage Users</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="sellers">Manage Sellers</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="products">Manage Products</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="payments">Payments</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="refunds">Refunds</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="logout">Logout</NavLink>
          </li>

        </ul>

        <div className="p-3 flex-grow-1">
          <Outlet />
        </div>

      </div>
    </>
  );
}