import { NavLink, Outlet } from "react-router-dom";

export default function DeliveryDashboard(){

    return(
        <>
            <h2>Delivery Dashboard</h2>

            <div className="d-flex">

                <ul className="nav nav-pills flex-column p-3 border-end">

                    <li className="nav-item">
                        <NavLink to="assigned-orders">
                            Assigned Orders
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="picked-orders">
                            Picked Orders
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="in-transit">
                            In Transit
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="delivered-orders">
                            Delivered Orders
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