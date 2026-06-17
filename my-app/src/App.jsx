import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomeComp from './components/HomeComp'
import LoginComp from './components/LoginComp'

import CustomerRegisterComp from './components/CustomerRegisterComp'
import SellerRegisterComp from './components/SellerRegisterComp'

import ProtectedRoutes from './components/ProtectedRoutes'

import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';

import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import SellerDashboard from './components/SellerDashboard'

import LogoutComp from './components/Logout'
//this is a root component
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails/>}/>

        {/* Public Routes */}

        <Route path="/" element={<HomeComp />} />

        <Route path="/login" element={<LoginComp />} />

        <Route
          path="/register/customer"
          element={<CustomerRegisterComp />}
        />

        <Route
          path="/register/seller"
          element={<SellerRegisterComp />}
        />

        {/* Customer Routes */}

        <Route
          path="/user"
          element={
            <ProtectedRoutes role={3}>
              <UserDashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="wishlist" element={<h1>Wishlist</h1>} />
          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* Seller Routes */}

        <Route
          path="/seller"
          element={
            <ProtectedRoutes role={2}>
              <SellerDashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="products" element={<h1>My Products</h1>} />
          <Route path="add-product" element={<h1>Add Product</h1>} />
          <Route path="orders" element={<h1>Seller Orders</h1>} />
          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoutes role={1}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="users" element={<h1>Manage Users</h1>} />
          <Route path="sellers" element={<h1>Manage Sellers</h1>} />
          <Route path="products" element={<h1>Manage Products</h1>} />
          <Route path="payments" element={<h1>Payments</h1>} />
          <Route path="refunds" element={<h1>Refunds</h1>} />
          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* Invalid Route */}

        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App