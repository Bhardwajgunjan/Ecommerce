import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Hero from './pages/Hero'
import AdminDashboard from './pages/AdminDashboard'
import UserProducts from './pages/UserProducts'
import Profile from './pages/Profile'
import Navbar from './pages/Navbar'
import Cart from './pages/Cart'


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Hero name={name} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/products" element={<UserProducts />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
