import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors" 
import listingRouter from "./routes/listing.route.js"


dotenv.config()

let port =process.env.PORT || 6000
let app=express()

// app.get("/",(req,res)=>{
//     res.send("hello from server")
// })

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/listing", listingRouter)

app.listen(port,()=>{
    connectDb()
    console.log("server started")
})
