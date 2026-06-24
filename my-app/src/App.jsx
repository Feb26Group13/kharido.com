import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
import AdminDashboard from './components/AdminDashboard'
import SellerDashboard from './components/SellerDashboard'
import DeliveryDashboard from './components/DeliveryDashboard';

// Seller Sub-Components
import SellerProducts from './components/SellerProducts'
import AddProduct from './components/AddProduct'
import SellerOrders from './components/SellerOrders'
import SellerProfile from './components/SellerProfile'

//Delivery Components
import AssignedOrders from './components/AssignedOrders'
import PickedOrders from './components/PickedOrders';
import InTransitOrders from './components/InTransitOrders';
import DeliveredOrders from './components/DeliveredOrders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<HomeComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/register" element={<RegisterChoice />} />
        <Route path="/register/customer" element={<CustomerRegisterComp />} />
        <Route path="/register/seller" element={<SellerRegisterComp />} />

        {/* --- Product Routes --- */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* --- Customer Routes (Role 3) --- */}
        <Route
          path="/user"
          element={
            <ProtectedRoutes role={3}>
              <UserDashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="profile" element={<h1>Profile hgkiuo.io.lyug</h1>} />
          <Route path="orders" element={<h1>Orders</h1>} />
          <Route path="wishlist" element={<h1>Wishlist</h1>} />
          <Route path="logout" element={<LogoutComp />} />
        </Route>

        {/* --- Admin Routes (Role 1) --- */}
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

        {/* --- Seller Routes (Role 2) --- */}
        <Route
          path="/seller"
          element={
            <ProtectedRoutes role={2}>
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

        {/* --- Delivery Routes (Role 4) --- */}
        <Route
          path="/delivery"
          element={
            <ProtectedRoutes role={4}>
              <DeliveryDashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="assigned-orders" element={<AssignedOrders/>}/>
          <Route path="picked-orders" element={<PickedOrders/>}/>
          <Route path="in-transit" element={<InTransitOrders/>}/>
          <Route path="delivered-orders" element={<DeliveredOrders/>}/>
          <Route path="logout" element={<LogoutComp />}/>
        </Route>

        {/* --- 404 Catch-All --- */}
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App