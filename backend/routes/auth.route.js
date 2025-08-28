import express from "express"
import { login, logout, sendOTP, verifySignup } from "../controllers/auth.controller.js"

const authRouter = express.Router()


authRouter.post("/send-otp", sendOTP)      
authRouter.post("/verify-signup", verifySignup) 
authRouter.post("/login", login)              
authRouter.post("/logout", logout)            

export default authRouter