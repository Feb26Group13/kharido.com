import { NavLink } from "react-router-dom";


function AdminSidebar() {


    return (

        <div className="admin-sidebar">


            <h2>
                KHARIDO
            </h2>



            <ul>


                <li>
                    <NavLink to="/admin">
                        Dashboard
                    </NavLink>
                </li>



                <li>
                    <NavLink to="/admin/orders">
                        Orders
                    </NavLink>
                </li>



                <li>
                    <NavLink to="/admin/products">
                        Products
                    </NavLink>
                </li>



                <li>
                    <NavLink to="/admin/customers">
                        Customers
                    </NavLink>
                </li>



                <li>
                    <NavLink to="/admin/vendors">
                        Vendors
                    </NavLink>
                </li>



                <li>
                    <NavLink to="/admin/reports">
                        Reports
                    </NavLink>
                </li>



                <li>
                    <NavLink to="/admin/settings">
                        Settings
                    </NavLink>
                </li>



                <li>
                    <NavLink to="/admin/logout">
                        Logout
                    </NavLink>
                </li>


            </ul>


        </div>

    );

}


export default AdminSidebar;