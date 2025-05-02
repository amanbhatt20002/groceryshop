import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import  { Toaster } from 'react-hot-toast'
import Footer from './components/Footer.jsx'
import { useAppContext } from './context/AppContex.jsx'
import Login from './components/Login.jsx'
import AllProduct from './pages/AllProduct.jsx'

const App = () => {
const isSellerpath=useLocation().pathname.includes('seller');
const {showUserLogin}=useAppContext()

  return (
    <div>
     {isSellerpath?null: <Navbar />}
     {showUserLogin? <Login/>:null}

<Toaster/>
      <div className={`${isSellerpath?"":"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProduct/>}/>
          </Routes>

      </div>
     {!isSellerpath &&<Footer/>}
    </div>
  )
}

export default App
