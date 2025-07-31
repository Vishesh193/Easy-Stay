import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext'
import UserContext from './Context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContext>
            <UserContext>
                <App />
                <ToastContainer position="top-right" autoClose={3000} />
            </UserContext>
        </AuthContext>
    </BrowserRouter>
)