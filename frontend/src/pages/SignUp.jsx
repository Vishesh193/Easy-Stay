import React, { useContext, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext.jsx';
import { toast } from 'react-toastify';

function SignUp() {
    const [show, setShow] = useState(false)
    const [showOtpInput, setShowOtpInput] = useState(false)
    const navigate = useNavigate()
    const {serverUrl} = useContext(authDataContext)
    const {userData,setUserData} = useContext(userDataContext)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [otp, setOtp] = useState("")
    const {loading,setLoading} = useContext(authDataContext)
    const [formData, setFormData] = useState(null)



    const handleSendOTP = async (e) => {
        e.preventDefault()
        
        // Basic validation
        if (!name || name.length < 3) {
            toast.error("Name must be at least 3 characters long")
            return
        }
        if (!email || !email.includes('@')) {
            toast.error("Please enter a valid email address")
            return
        }
        if (!password || password.length < 6) {
            toast.error("Password must be at least 6 characters long")
            return
        }

        setLoading(true)
        try {
            const response = await axios.post('/api/auth/send-otp', {
                name,
                email,
                password
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            setFormData({ name, email, password });
            setShowOtpInput(true);
            setLoading(false);
            toast.success("OTP sent to your email!");
        } catch (error) {
            setLoading(false)
            console.error("OTP send error:", error)
            
            if (error.response) {
                toast.error(error.response.data.message || "Failed to send OTP")
            } else if (error.request) {
                toast.error("Cannot connect to server. Please check your internet connection.")
            } else {
                toast.error("Something went wrong. Please try again.")
            }
        }
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        if (!otp) {
            toast.error("Please enter the OTP")
            return
        }

        setLoading(true)
        try {
            const result = await axios.post('/api/auth/verify-signup', {
                ...formData,
                otp
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setUserData(result.data)
            setLoading(false)
            toast.success("Signup Successful!")
            navigate("/")
        } catch (error) {
            setLoading(false)
            console.error("Signup verification error:", error)
            
       
            if (error.response) {
                const message = error.response.data.message || "Signup failed. Please try again."
                toast.error(message)
            } else if (error.request) {
                toast.error("Cannot connect to server. Please check your internet connection.")
            } else {
                toast.error("Something went wrong. Please try again.")
            }
        }
    }
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
        <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={()=>navigate("/")}><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
        <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]' onSubmit={showOtpInput ? handleVerifyOTP : handleSendOTP}>
            <h1 className='text-[30px] text-[black]'>Welcome to Easy Stay</h1>
            
            {!showOtpInput ? (
                <>
                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                        <label htmlFor="name" className='text-[20px]'>UserName</label>
                        <input type="text" id='name' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' 
                            required onChange={(e)=>setName(e.target.value)} value={name}/>
                    </div>
                    
                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                        <label htmlFor="email" className='text-[20px]'>Email</label>
                        <input type="email" id='email' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' 
                            required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </div>
                    
                    <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] relative'>
                        <label htmlFor="password" className='text-[20px]'>Password</label>
                        <input type={show?"text":"password"} id='password' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' 
                            required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        {!show && <IoMdEye className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>setShow(prev =>!prev)}/>}
                        {show && <IoMdEyeOff className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer' onClick={()=>setShow(prev =>!prev)}/>}
                    </div>
                </>
            ) : (
                <div className='w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]'>
                    <label htmlFor="otp" className='text-[20px]'>Enter OTP sent to your email</label>
                    <input type="text" id='otp' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] tracking-[8px] text-center' 
                        required onChange={(e)=>setOtp(e.target.value)} value={otp} maxLength="6" placeholder="------"/>
                </div>
            )}
            
            <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg mt-[20px]' 
                disabled={loading}>
                {loading ? "Loading..." : (showOtpInput ? "Verify OTP" : "Get OTP")}
            </button>
            
            <p className='text-[18px]'>Already have an account? 
                <span className='text-[19px] text-[red] cursor-pointer ml-2' onClick={()=>navigate("/login")}>Login</span>
            </p>
        </form>
     
    </div>
  )
}

export default SignUp