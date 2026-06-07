import { NavLink,Outlet } from "react-router-dom";
export default function UserDashBoard(){
    return(
        <>
           <h2>User Panel</h2>
         <div className="d-flex">         

           <ul className="nav nav-pills flex-column p-3 border-end">
            <li className="nav-item">
            <NavLink to="Search">Search</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="Booking">Booking</NavLink>
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
    )
}