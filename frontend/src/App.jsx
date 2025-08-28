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
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import { useContext } from 'react'
import { authDataContext } from './Context/AuthContext'

function App(){
  const { userData } = useContext(authDataContext);

  console.log('Current userData:', userData);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
         <Route path='/listingpage1' 
      element={userData != null ? <ListingPage1/>:<Navigate to={"/"}/>}/>
      <Route path='/listingpage2' 
      element={userData != null ? <ListingPage2/>:<Navigate to={"/"}/>}/>
      <Route path='/listingpage3'
       element={userData != null ? <ListingPage3/>:<Navigate to={"/"}/>}/>
      <Route path='/mylisting'
       element={userData != null ? <MyListing/>:<Navigate to={"/"}/>}/>
        <Route path='/viewcard'
        element={userData != null ? <ViewCard/>:<Navigate to={"/"}/>}/>
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
