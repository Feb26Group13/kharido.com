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
import AdminRegisterComp from './components/AdminRegisterComp'
import LogoutComp from './components/Logout'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Product Components
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'

// Customer Dashboard
import UserDashboard from './components/UserDashboard'

// Seller Dashboard
import SellerDashboard from './components/SellerDashboard'

// Delivery Dashboard
import DeliveryDashboard from './components/DeliveryDashboard'

// Seller Sub-Components
import SellerProducts from './components/SellerProducts'
import AddProduct from './components/AddProduct'
import SellerOrders from './components/SellerOrders'
import SellerProfile from './components/SellerProfile'

// Admin Sub-Components
import AdminDashboard from './components/AdminDashboard'
import AdminOrders from './components/AdminOrders'
import AdminProducts from './components/AdminProducts'
import AdminCustomers from './components/AdminCustomers'
import AdminVendors from './components/AdminVendors'
import AdminReports from './components/AdminReports'
import AdminSettings from './components/AdminSettings'
import AdminMenu from './components/AdminMenu'

// Delivery Components
import AssignedOrders from './components/AssignedOrders'
import PickedOrders from './components/PickedOrders'
import InTransitOrders from './components/InTransitOrders'
import DeliveredOrders from './components/DeliveredOrders'
import SellerHome from './components/SellerHome.jsx'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =====================================================
            PUBLIC ROUTES
        ====================================================== */}

        <Route
          path="/"
          element={<HomeComp />}
        />

        <Route
          path="/login"
          element={<LoginComp />}
        />

        <Route
          path="/register"
          element={<RegisterChoice />}
        />

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


        {/* =====================================================
            PRODUCT ROUTES
            These are currently public
        ====================================================== */}

        <Route
          path="/products"
          element={<ProductList />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />


        {/* =====================================================
            CUSTOMER ROUTES
            Role: CUSTOMER
        ====================================================== */}

        <Route
          path="/user"
          element={
            <ProtectedRoutes role="CUSTOMER">
              <UserDashboard />
            </ProtectedRoutes>
          }
        >

          <Route
            path="profile"
            element={<h1>Profile</h1>}
          />

          <Route
            path="orders"
            element={<h1>Orders</h1>}
          />

          <Route
            path="wishlist"
            element={<h1>Wishlist</h1>}
          />

          <Route
            path="logout"
            element={<LogoutComp />}
          />

        </Route>


        {/* =====================================================
            ADMIN ROUTES
            Role: ADMIN
        ====================================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoutes role="ADMIN">
              <AdminMenu />
            </ProtectedRoutes>
          }
        >

          {/* /admin */}
          <Route
            index
            element={<AdminDashboard />}
          />

          {/* /admin/orders */}
          <Route
            path="orders"
            element={<AdminOrders />}
          />

          {/* /admin/products */}
          <Route
            path="products"
            element={<AdminProducts />}
          />

          {/* /admin/customers */}
          <Route
            path="customers"
            element={<AdminCustomers />}
          />

          {/* /admin/vendors */}
          <Route
            path="vendors"
            element={<AdminVendors />}
          />

          {/* /admin/reports */}
          <Route
            path="reports"
            element={<AdminReports />}
          />

          {/* /admin/settings */}
          <Route
            path="settings"
            element={<AdminSettings />}
          />

          {/* /admin/logout */}
          <Route
            path="logout"
            element={<LogoutComp />}
          />

        </Route>


        {/* =====================================================
            SELLER / VENDOR ROUTES
            Role: VENDOR
        ====================================================== */}
<Route
  path="/seller"
  element={
    <ProtectedRoutes role="SELLER">
      <SellerDashboard />
    </ProtectedRoutes>
  }
>

  {/* Default Seller Dashboard */}
  <Route
    index
    element={<SellerHome />}
  />

  {/* /seller/dashboard */}
  <Route
    path="dashboard"
    element={<SellerHome />}
  />

  {/* /seller/products */}
  <Route
    path="products"
    element={<SellerProducts />}
  />

  {/* /seller/add-product */}
  <Route
    path="add-product"
    element={<AddProduct />}
  />

  {/* /seller/orders */}
  <Route
    path="orders"
    element={<SellerOrders />}
  />

  {/* /seller/profile */}
  <Route
    path="profile"
    element={<SellerProfile />}
  />

  {/* /seller/logout */}
  <Route
    path="logout"
    element={<LogoutComp />}
  />

</Route>


        {/* =====================================================
            DELIVERY ROUTES
            Role: DELIVERY
        ====================================================== */}

        <Route
          path="/delivery"
          element={
            <ProtectedRoutes role="DELIVERY">
              <DeliveryDashboard />
            </ProtectedRoutes>
          }
        >

          {/* /delivery/assigned-orders */}
          <Route
            path="assigned-orders"
            element={<AssignedOrders />}
          />

          {/* /delivery/picked-orders */}
          <Route
            path="picked-orders"
            element={<PickedOrders />}
          />

          {/* /delivery/in-transit */}
          <Route
            path="in-transit"
            element={<InTransitOrders />}
          />

          {/* /delivery/delivered-orders */}
          <Route
            path="delivered-orders"
            element={<DeliveredOrders />}
          />

          {/* /delivery/logout */}
          <Route
            path="logout"
            element={<LogoutComp />}
          />

        </Route>


        {/* =====================================================
            404 PAGE
        ====================================================== */}

        <Route
          path="*"
          element={<h1>404 Page Not Found</h1>}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App