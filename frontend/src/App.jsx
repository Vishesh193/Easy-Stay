import { useState } from 'react'
import React from 'react'
import { Route ,Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

function App(){

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
            </>
  )
}

export default App
