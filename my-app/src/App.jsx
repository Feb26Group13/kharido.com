import './App.css'
import LoginComp from './components/LoginComp'
// 1. Import the Provider wrapper from react-redux
import { Provider } from 'react-redux' 
import { store } from './redux/store.js'
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

function App() {
  return (
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
        <Route path="/admin" element={<ProtectedRoutes role={1}><AdminDashBoard/></ProtectedRoutes>}>
        <Route path="Search" element={<h1>Search</h1>} />
                <Route path="Booking" element={ <h1> Booking</h1>} />
                <Route path="logout" element={ <LogoutComp />} /> 
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
        


     </BrowserRouter>
    </>
  )
}

export default App