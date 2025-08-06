import React, { useContext, useState, useEffect } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';
import { authDataContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

function ListingPage1() {
   const navigate = useNavigate();
   const { userData } = useContext(authDataContext);
   const {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
    handleAddListing
   } = useContext(listingDataContext);

   useEffect(() => {
     // Check for user data in localStorage if context is empty
     const storedUser = localStorage.getItem('userData');
     
     if (!userData && !storedUser) {
       toast.error("Please login to continue");
       navigate('/login');
       return;
     }

     // Clear form data only if user is authenticated
     if (userData || storedUser) {
       setTitle("");
       setDescription("");
       setFrontEndImage1(null);
       setFrontEndImage2(null);
       setFrontEndImage3(null);
       setBackEndImage1(null);
       setBackEndImage2(null);
       setBackEndImage3(null);
       setRent("");
       setCity("");
       setLandmark("");
       setCategory("");
     }
   }, [userData, navigate]);
    

    const validateImageFile = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            toast.error('Please upload JPEG, PNG, or WebP images only');
            return false;
        }

        if (file.size > maxSize) {
            toast.error('Image size should be less than 5MB');
            return false;
        }

        return true;
    };

    const handleImage1 = (e) => {
        const file = e.target.files[0];
        if (file && validateImageFile(file)) {
            setBackEndImage1(file);
            setFrontEndImage1(URL.createObjectURL(file));
        }
    };

    const handleImage2 = (e) => {
        const file = e.target.files[0];
        if (file && validateImageFile(file)) {
            setBackEndImage2(file);
            setFrontEndImage2(URL.createObjectURL(file));
        }
    };

    const handleImage3 = (e) => {
        const file = e.target.files[0];
        if (file && validateImageFile(file)) {
            setBackEndImage3(file);
            setFrontEndImage3(URL.createObjectURL(file));
        }
    };

    return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto'>

        <form action="" className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start flex-col md:items-start gap-[10px] overflow-auto mt-[50px]' 
            onSubmit={async (e) => {
                e.preventDefault();

                // Check authentication
                if (!userData && !localStorage.getItem('userData')) {
                    toast.error('Please login to continue');
                    navigate('/login');
                    return;
                }
                
                // Validate all required fields
                if (!title.trim()) {
                    toast.error('Please enter a title');
                    return;
                }
                if (!description.trim()) {
                    toast.error('Please enter a description');
                    return;
                }
                if (!backEndImage1 || !backEndImage2 || !backEndImage3) {
                    toast.error('Please upload all three images');
                    return;
                }
                if (!rent || isNaN(rent) || parseFloat(rent) <= 0) {
                    toast.error('Please enter a valid rent amount');
                    return;
                }
                if (!city.trim()) {
                    toast.error('Please enter the city');
                    return;
                }
                if (!landmark.trim()) {
                    toast.error('Please enter a landmark');
                    return;
                }

                // Create FormData object
                const formData = new FormData();
                formData.append('title', title.trim());
                formData.append('description', description.trim());
                formData.append('frontEndImage1', backEndImage1);
                formData.append('frontEndImage2', backEndImage2);
                formData.append('frontEndImage3', backEndImage3);
                formData.append('rent', rent);
                formData.append('city', city.trim());
                formData.append('landmark', landmark.trim());

                // Since we're using a multi-step form, we'll just navigate to the next page
                // The actual submission will happen in ListingPage3
                navigate('/listingpage2');
            }}>
            <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={()=>navigate("/")}><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]' /></div>
            <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg'>
                SetUp Your Home
            </div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="title" className='text-[20px]'>Title</label>
              <input type="text" id='title' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='_bhk house or best title '/>
            </div> 

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="des" className='text-[20px]'>Description</label>
              <textarea name="" id="des" className='w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setDescription(e.target.value)} value={description} ></textarea>
            </div> 

            <div className='w-[90%] flex items-start justify-center flex-col gap-[10px]'>
              <label htmlFor="img1" className='text-[20px]'>Image1</label>
              <div className='flex items-center justify-start  w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px] '><input type="file" id='img1' className='w-[100%] text-[15px] px-[10px] ' required onChange={handleImage1}/>
              </div>
            </div> 

            <div className='w-[90%] flex items-start justify-center flex-col gap-[10px]'>
              <label htmlFor="img2" className='text-[20px]'>Image2</label>
              <div className='flex items-center justify-start  w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'><input type="file" id='img2' className='w-[100%] text-[15px] px-[10px] ' required onChange={handleImage2} />
              </div>
            </div> 

            <div className='w-[90%] flex items-start justify-center flex-col gap-[10px]'>
              <label htmlFor="img3" className='text-[20px]'>Image3</label>
              <div className='flex items-center justify-start  w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'><input type="file" id='img3' className='w-[100%] text-[15px] px-[10px] ' required  onChange={handleImage3}/>
              </div>
            </div> 

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="rent" className='text-[20px]'>Rent</label>
              <input type="number" id='rent' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setRent(e.target.value)} value={rent} placeholder='Rs.______/day'/>
            </div> 

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="city" className='text-[20px]'>City</label>
              <input type="text" id='city' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setCity(e.target.value)} value={city} placeholder='city,country'/>
            </div> 

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="landmark" className='text-[20px]'>Landmark</label>
              <input type="text" id='landmark' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setLandmark(e.target.value)} value={landmark}/>

            </div> 

            <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg '>Next</button>





        </form>
      

      
    </div>
  )
}

export default ListingPage1