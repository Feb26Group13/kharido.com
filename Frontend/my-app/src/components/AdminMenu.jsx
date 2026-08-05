import { NavLink, Outlet } from "react-router-dom";


function AdminMenu(){

return(

<div className="admin-container">


<div className="sidebar">


<h2>Kharido</h2>

<h3>Admin Panel</h3>



<NavLink to="/admin">
Dashboard
</NavLink>



<NavLink to="/admin/orders">
Orders
</NavLink>



<NavLink to="/admin/products">
Products
</NavLink>



<NavLink to="/admin/customers">
Customers
</NavLink>



<NavLink to="/admin/vendors">
Vendors
</NavLink>



<NavLink to="/admin/reports">
Reports
</NavLink>



<NavLink to="/admin/settings">
Settings
</NavLink>



{/* Logout */}

<NavLink to="/admin/logout">
Logout
</NavLink>



</div>




<div className="admin-content">

<Outlet />

</div>



</div>

)

}


export default AdminMenu;