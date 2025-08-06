import express from "express"
import { login, logout, sendOTP, verifySignup } from "../controllers/auth.controller.js"

const authRouter = express.Router()

// Auth routes
authRouter.post("/send-otp", sendOTP)        // Step 1: Send OTP during signup
authRouter.post("/verify-signup", verifySignup) // Step 2: Verify OTP and create account
authRouter.post("/login", login)              // Login user
authRouter.post("/logout", logout)            // Logout user

export default authRouter