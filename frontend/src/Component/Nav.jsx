import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { MdSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { MdOutlinePool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { MdBedroomChild } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { GiShop } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { authDataContext } from '../Context/AuthContext.jsx';
import { userDataContext } from '../Context/UserContext.jsx';






function Nav() {
    let [showpopup, setshowpopup] = useState(false)
    let navigate = useNavigate()
    let {userData,setUserData} = useContext(userDataContext)
    let {serverUrl} = useContext(authDataContext)
    const handleLogOut = async ()=> {
        try {
            let result = await axios.post(serverUrl + "/api/auth/logout", {withCredentials:true})
            console.log(result)
            setUserData(null)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='w-[100vw] min-h-[80px] border-b-[1px]
        border-[#dcdcdc] px-[40px] flex item-center 
        justify-between md:px-[40px]'>
                <div><img src={logo} alt="" className='w-[130px]' /></div>
                <div className='w-[35%] relative hidden md:block'>
                    <input type="text" className='w-[100%] px-[30px] py-[10px]
                    border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]' placeholder='Any Where | Any Location | Any City' />
                    <button className='absolute p-[10px] rounded-[50px] bg-[red] right-[2%] top-[5px]'>
                        <MdSearch className='w-[20px] h-[20px] text-[white]' />
                    </button>

                </div>
                <div className='flex items-center justify-center gap-[10px] relative'>
                    <span className='text-[18px] cursor-pointer rounded-[40px]
                    hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block' >List your home</span>
                    <button className='px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c]
                    rounded-[50px] hover:shadow-lg 'onClick={() => setshowpopup(prev => !prev)}>
                        <span><GiHamburgerMenu className='w-[20px] h-[20px]' /></span>
                        {userData==null && <span><CgProfile className='w-[23px] h-[23px]' /></span>}
                        {userData!=null && <span className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex 
                        items-center justify-center'>{userData?.name.slice(0,1)}</span>}

                    </button>
                    {/* in which login logout details wil check */}
                    {showpopup && <div className='w-[220px] h-[250px] absolute 
                    bg-slate-50 top-[110%] right-[10%] border-[1px]
                    border-[#aaa9a9] z-10 rounded-lg'>
                        <ul className='w-[100%] h-[100%] text-[17px]
                        flex items-start justify-around flex-col py-[10px]'>
                            <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer 'onClick={()=>navigate("/login")}>Login</li>
                            <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer' onClick={handleLogOut}>Logout</li>
                            <div className='w-[100%] h-[1px] bg-[#c1c0c0]'></div>
                            <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer'>List your Home</li>
                            <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer'>My listing</li>
                            <li className='w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer'>Check Bookings</li>
                        </ul>
                    </div>}
                </div>
            </div>
            <div className='w-[100%] h-[60px] flex items-center justify-center block md:hidden'>
                <div className='w-[80%] relative '>
                    <input type="text" className='w-[100%] px-[30px] py-[10px]
                    border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]' placeholder='Any Where | Any Location | Any City' />
                    <button className='absolute p-[10px] rounded-[50px] bg-[red] right-[2%] top-[5px]'>
                        <MdSearch className='w-[20px] h-[20px] text-[white]' />
                    </button>

                </div>
            </div>
            {/* another navbar */}
            <div className='w-[100vw] h-[85px] bg-white flex items-center justify-start cursor-pointer gap-[40px] overflow-auto md:justify-center
            px-[15px]'>
                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
                    <MdWhatshot className='w-[30px] h-[30px] text-black' />
                    <h3>Trending</h3>
                </div>

                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
                    <GiFamilyHouse className='w-[30px] h-[30px] text-black' />
                    <h3>Vila</h3>
                </div>

                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px] text-nowrap'>
                    <FaTreeCity className='w-[30px] h-[30px] text-black ' />
                    <h3>Farm House</h3>
                </div>
                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px]  text-nowrap'>
                    <MdOutlinePool className='w-[30px] h-[30px] text-black' />
                    <h3>Pool House</h3>
                </div>
                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
                    <MdBedroomParent className='w-[30px] h-[30px] text-black' />
                    <h3>Rooms</h3>
                </div>
                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
                    <BiBuildingHouse className='w-[30px] h-[30px] text-black' />
                    <h3>Flat</h3>
                </div>
                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
                    <MdBedroomChild className='w-[30px] h-[30px] text-black' />
                    <h3>PG</h3>
                </div>
                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
                    <GiWoodCabin className='w-[30px] h-[30px] text-black' />
                    <h3>Cabin</h3>
                </div>
                <div className='flex items-center justify-center flex-col  hover:border-b-[1px] border-[#a6a5a5] text-[13px]'>
                    <GiShop className='w-[30px] h-[30px] text-black' />
                    <h3>Shop</h3>
                </div>
            </div>

        </div>
    )
}

export default Nav
