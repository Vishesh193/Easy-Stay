import { useState } from 'react'
import React from 'react'
import { Route ,Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ListingPage1 from './pages/ListingPage1'

function App(){

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/listingpage1' element={<ListingPage1/>} />
      </Routes>
            </>
  )
}

export default App
