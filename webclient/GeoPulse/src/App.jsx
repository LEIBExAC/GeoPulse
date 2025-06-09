import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import Landing from './pages/common/Landing';
import './App.css'
import SignUp from './pages/common/Signup';
import Login from './pages/common/Login';
import VerifyOTP from './pages/common/VerifyOTP';
import { BrowserRouter, Routes, Route } from "react-router";
import AboutUs from './pages/common/AboutUs';
import Contact from './pages/common/Contact';
import Services from './pages/common/Services';
import Feature from './pages/common/Feature';
import UserDashboard from "./pages/user/UserDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/features" element={<Feature/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/verify-email" element={<VerifyOTP/>} />
          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />

        </Routes>
      </BrowserRouter>
      {/* <div><Landing></Landing></div>
      <SignUp></SignUp>
      <Login></Login>      
      <VerifyOTP></VerifyOTP> */}
    </>
  )
}

export default App
