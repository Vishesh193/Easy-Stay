
import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


function ListingPage1() {
  let navigate = useNavigate();

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative overflow-auto'>
      <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px] overflow-auto'>
        <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' 
        onClick={() => navigate("/")}><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
        <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[10%] right-[10px] shadow-lg'>
          Set up your Home
        </div>
      </form>

    </div>
  )
}

export default ListingPage1
