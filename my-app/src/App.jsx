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

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComp/>}/>
                 <Route path="login" element={<LoginComp/>}/>
                 <Route path="register" element={<h1> Registrtion Form </h1>}/>
        
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
        </Routes>
        


     </BrowserRouter>
    </>
  )
}

export default App