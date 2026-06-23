import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
       

       {/* Admin */}

<Route path="/admin" element={<AdminMenu />}>

  <Route index element={<AdminDashboard />} />

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