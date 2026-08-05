import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'


// Route Guard
import ProtectedRoutes from './components/ProtectedRoutes'


// Admin Layout
import AdminLayout from './components/AdminLayout'


// Public Components
import HomeComp from './components/HomeComp'
import LoginComp from './components/LoginComp'
import RegisterChoice from './components/RegisterChoice'
import CustomerRegisterComp from './components/CustomerRegisterComp'
import SellerRegisterComp from './components/SellerRegisterComp'
import AdminRegisterComp from './components/AdminRegisterComp'
import LogoutComp from './components/LogoutComp'


// Product Components
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'


// Customer
import UserDashboard from './components/UserDashboard'


// Seller
import SellerDashboard from './components/SellerDashboard'
import SellerProducts from './components/SellerProducts'
import AddProduct from './components/AddProduct'
import SellerOrders from './components/SellerOrders'
import SellerProfile from './components/SellerProfile'


// Admin Pages
import AdminDashboard from './components/AdminDashboard'
import AdminOrders from './components/AdminOrders'
import AdminProducts from './components/AdminProducts'
import AdminCustomers from './components/AdminCustomers'
import AdminVendors from './components/AdminVendors'
import AdminReports from './components/AdminReports'
import AdminSettings from './components/AdminSettings'


// Delivery
import DeliveryDashboard from './components/DeliveryDashboard'
import AssignedOrders from './components/AssignedOrders'
import PickedOrders from './components/PickedOrders'
import InTransitOrders from './components/InTransitOrders'
import DeliveredOrders from './components/DeliveredOrders'



function App() {


return (

<BrowserRouter>

<Routes>



{/* ================= PUBLIC ================= */}


<Route path="/" element={<HomeComp />} />

<Route path="/login" element={<LoginComp />} />


<Route path="/register" element={<RegisterChoice />} />


<Route 
path="/register/user"
element={<CustomerRegisterComp />}
/>


<Route 
path="/register/seller"
element={<SellerRegisterComp />}
/>


<Route 
path="/register/admin"
element={<AdminRegisterComp />}
/>




{/* ================= PRODUCTS ================= */}


<Route 
path="/products"
element={<ProductList />}
/>


<Route 
path="/product/:id"
element={<ProductDetails />}
/>





{/* ================= CUSTOMER ================= */}


<Route

path="/user"

element={

<ProtectedRoutes role="CUSTOMER">

<UserDashboard />

</ProtectedRoutes>

}

>


<Route path="profile" element={<h1>Profile</h1>} />

<Route path="orders" element={<h1>Orders</h1>} />

<Route path="wishlist" element={<h1>Wishlist</h1>} />

<Route path="logout" element={<LogoutComp />} />


</Route>







{/* ================= ADMIN ================= */}



<Route

path="/admin"

element={

<ProtectedRoutes role="ADMIN">

<AdminLayout />

</ProtectedRoutes>

}

>


<Route

index

element={<AdminDashboard />}

/>



<Route

path="orders"

element={<AdminOrders />}

/>



<Route

path="products"

element={<AdminProducts />}

/>



<Route

path="customers"

element={<AdminCustomers />}

/>



<Route

path="vendors"

element={<AdminVendors />}

/>



<Route

path="reports"

element={<AdminReports />}

/>



<Route

path="settings"

element={<AdminSettings />}

/>



<Route

path="logout"

element={<LogoutComp />}

/>


</Route>







{/* ================= SELLER ================= */}


<Route

path="/seller"

element={

<ProtectedRoutes role="SELLER">

<SellerDashboard />

</ProtectedRoutes>

}

>


<Route path="products" element={<SellerProducts />} />

<Route path="add-product" element={<AddProduct />} />

<Route path="orders" element={<SellerOrders />} />

<Route path="profile" element={<SellerProfile />} />

<Route path="logout" element={<LogoutComp />} />


</Route>







{/* ================= DELIVERY ================= */}



<Route

path="/delivery"

element={

<ProtectedRoutes role="DELIVERY">

<DeliveryDashboard />

</ProtectedRoutes>

}

>


<Route

path="assigned-orders"

element={<AssignedOrders />}

/>


<Route

path="picked-orders"

element={<PickedOrders />}

/>


<Route

path="in-transit"

element={<InTransitOrders />}

/>


<Route

path="delivered-orders"

element={<DeliveredOrders />}

/>


<Route

path="logout"

element={<LogoutComp />}

/>


</Route>







{/* ================= 404 ================= */}


<Route

path="*"

element={<Navigate to="/" replace />}

/>



</Routes>


</BrowserRouter>

);


}


export default App;