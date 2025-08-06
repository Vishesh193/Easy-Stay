import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { useContext } from 'react'
import { authDataContext } from './Context/AuthContext'

function App(){
  const { userData } = useContext(authDataContext);

  // Debug log
  console.log('Current userData:', userData);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/listingpage1' element={userData ? <ListingPage1/> : <Navigate to="/login"/>}/>
        <Route path='/listingpage2' element={userData ? <ListingPage2/> : <Navigate to="/login"/>}/>
        <Route path='/listingpage3' element={userData ? <ListingPage3/> : <Navigate to="/login"/>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
