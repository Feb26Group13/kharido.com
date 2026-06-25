import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<<<<<<< Updated upstream
import Home from './pages/Home';
import Login from './pages/Login';
//Admin
import AdminMenu from './pages/AdminDashboard/AdminMenu';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AdminOrders from './pages/AdminDashboard/AdminOrders';
import AdminProducts from './pages/AdminDashboard/AdminProducts';
import AdminCustomers from './pages/AdminDashboard/AdminCustomers';
import AdminVendors from './pages/AdminDashboard/AdminVendors';
import AdminReports from './pages/AdminDashboard/AdminReports';
import AdminSettings from './pages/AdminDashboard/AdminSettings';
//Vendor
import VendorDashboard from './pages/VendorDashboard';
//Customer
import CustomerDashboard from './pages/CustomerDashboard';
import Register from './pages/Register';
=======
// Layout & Route Guards
import ProtectedRoutes from './components/ProtectedRoutes'

// Public Components
import HomeComp from './components/HomeComp'
import LoginComp from './components/LoginComp'
import RegisterChoice from './components/RegisterChoice'
import CustomerRegisterComp from './components/CustomerRegisterComp'
import SellerRegisterComp from './components/SellerRegisterComp'
import LogoutComp from './components/Logout'

// Product Components
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'

// Dashboard Components
import UserDashboard from './components/UserDashboard'

import SellerDashboard from './components/SellerDashboard'

// Seller Sub-Components
import SellerProducts from './components/SellerProducts'
import AddProduct from './components/AddProduct'
import SellerOrders from './components/SellerOrders'
import SellerProfile from './components/SellerProfile'
>>>>>>> Stashed changes

// Admin Sub-Components
import AdminDashboard from './components/AdminDashboard'
import AdminOrders from './components/AdminOrders'
import AdminProducts from './components/AdminProducts' 
import AdminCustomers from './components/AdminCustomers'
import AdminVendors from './components/AdminVendors'
import AdminReports from './components/AdminReports'
import AdminSettings from './components/AdminSettings'
import AdminMenu from './components/AdminMenu'


function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
       
=======
        {/* --- Public Routes --- */}
        <Route path="/" element={<HomeComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/register" element={<RegisterChoice />} />
        <Route path="/register/customer" element={<CustomerRegisterComp />} />
        <Route path="/register/seller" element={<SellerRegisterComp />} />
   
>>>>>>> Stashed changes

       {/* Admin */}

<Route path="/admin" element={<AdminMenu />}>

<<<<<<< Updated upstream
  <Route index element={<AdminDashboard />} />
=======
       {/* --- Admin Routes (Role 1) --- */}
<Route
  path="/admin"
  element={
    <ProtectedRoutes role={1}>
      <AdminMenu />
    </ProtectedRoutes>
  }
>
  <Route index element={<AdminDashboard />} />

  <Route path="orders" element={<AdminOrders />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="customers" element={<AdminCustomers />} />
  <Route path="vendors" element={<AdminVendors />} />
  <Route path="reports" element={<AdminReports />} />
  <Route path="settings" element={<AdminSettings />} />

  <Route path="logout" element={<LogoutComp />} />
</Route>
>>>>>>> Stashed changes

  <Route path="orders" element={<AdminOrders />} />

  <Route path="products" element={<AdminProducts />} />

  <Route path="customers" element={<AdminCustomers />} />
  <Route path='vendors' element={< AdminVendors/>}/>

  <Route path="reports" element={<AdminReports />} />

  <Route path="settings" element={<AdminSettings />} />

</Route>
         <Route path="/vendor" element={<VendorDashboard />} />
         <Route path="/customer" element={<CustomerDashboard />} />
         <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;