import { NavLink, Outlet } from "react-router-dom";

export default function SellerDashboard() {
    return (
        <>
            <h2>Seller Dashboard</h2>

            <div className="d-flex">

                <ul className="nav nav-pills flex-column p-3 border-end">

                    <li className="nav-item">
                        <NavLink to="products">
                            My Products
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="add-product">
                            Add Product
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="orders">
                            Orders
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