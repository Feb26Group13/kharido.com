import { NavLink, Outlet } from "react-router-dom";

export default function UserDashBoard() {
    return (
        <>
            <h2>Customer Dashboard</h2>

            <div className="d-flex">

                <ul className="nav nav-pills flex-column p-3 border-end">

                    <li className="nav-item">
                        <NavLink to="profile">
                            Profile
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="orders">
                            Orders
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="wishlist">
                            Wishlist
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="logout">
                            Logout
                        </NavLink>
                    </li>

                </ul>

                <div className="p-3 flex-grow-1">
                    <Outlet />
                </div>

            </div>
        </>
    );
}