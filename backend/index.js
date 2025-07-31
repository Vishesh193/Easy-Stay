import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors" 


dotenv.config()

let port =process.env.PORT || 6000
let app=express()

// app.get("/",(req,res)=>{
//     res.send("hello from server")
// })

app.use(express.json()) //body toh undefined nahh chakai
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173"  ,
    credentials :true }
))

app.use("/api/auth", authRouter)

app.listen(port,()=>{
    connectDb()
    console.log("server started")
})
