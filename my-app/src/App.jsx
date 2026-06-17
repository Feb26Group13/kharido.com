import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeComp from './components/HomeComp.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import UserDashBoard from './components/UserDashBoard.jsx'
import AdminDashBoard from './components/AdminDashBoard.jsx'
import LogoutComp from './components/Logout.jsx'
import SellerDashboard from './components/SellerDashboard.jsx'
import SellerProducts from './components/SellerProducts.jsx'
import AddProduct from './components/AddProduct.jsx'
import SellerOrders from './components/SellerOrders.jsx'
import SellerProfile from './components/SellerProfile.jsx'
import SellerRegisterComp from './components/SellerRegisterComp.jsx'
import RegisterChoice from './components/RegisterChoice.jsx'

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
    <>
     <BrowserRouter>
        <Routes>
          {/* Registration Routes */}
          {/* <Route path="register" element={<h1>Select Registration Type</h1>} /> */}
          {/* <Route path="register/user" element={<UserRegisterComp />} /> */}
          <Route path="register/seller" element={<SellerRegisterComp />} />
                  <Route path="/" element={<HomeComp/>}/>
                 <Route path="login" element={<LoginComp/>}/>
                 <Route path="register" element={<RegisterChoice />} />
                  <Route path="register/seller" element={<SellerRegisterComp />} />
                 {/* <Route path="register" element={<h1> Registrtion Form </h1>}/> */}
        
        <Route path="/user" element={<ProtectedRoutes role={2}><UserDashBoard/></ProtectedRoutes>}>
        <Route path="users" element={<h1> Users</h1>} />
                <Route path="reports" element={ <h1> Reports</h1>} />
                <Route path="logout" element={<LogoutComp/>} /> 
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
        {/* Seller Routes */}
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
        </Routes>
        

        {/* Invalid Route */}

        <Route path="*" element={<h1>404 Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App