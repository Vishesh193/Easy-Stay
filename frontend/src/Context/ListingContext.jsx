import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Create the context
export const listingDataContext = createContext(null);

// Create the provider component
const ListingProvider = ({ children }) => {
    let navigate = useNavigate() 
    let [title,setTitle] = useState("")
    let [description,setDescription]=useState("")
    let [frontEndImage1,setFrontEndImage1]=useState(null)
    let [frontEndImage2,setFrontEndImage2]=useState(null)
    let [frontEndImage3,setFrontEndImage3]=useState(null)
    let [backEndImage1,setBackEndImage1]=useState(null)
    let [backEndImage2,setBackEndImage2]=useState(null)
    let [backEndImage3,setBackEndImage3]=useState(null)
    let [rent,setRent]=useState("")
    let [city,setCity]=useState("")
    let [landmark,setLandmark]=useState("")
    let [category,setCategory]=useState("")
    let [adding,setAdding]=useState(false)
    let [updating,setUpdating]=useState(false)
    let [deleting,setDeleting]=useState(false)
    let [listingData,setListingData]=useState([])
    let [newListData,setNewListData]=useState([])
    let [cardDetails,setCardDetails]=useState(null)
    let [searchData,setSearchData]=useState([])

    let {serverUrl} = useContext(authDataContext)

    

     const handleAddListing = async () => {
        if(adding) return;
        setAdding(true);

        try {
            
            // Validate all required fields
            if (!title || !description || !rent || !city || !landmark || !category) {
                setAdding(false);
                console.error('Missing fields:', {
                    title: !title,
                    description: !description,
                    rent: !rent,
                    city: !city,
                    landmark: !landmark,
                    category: !category
                });
                throw new Error('Please fill in all fields');
            }

          
            if (!backEndImage1 || !backEndImage2 || !backEndImage3) {
                setAdding(false);
                throw new Error('All three images are required');
            }

            // Validate rent as a number
            const rentNumber = parseFloat(rent);
            if (isNaN(rentNumber)) {
                setAdding(false);
                throw new Error('Rent must be a valid number');
            }

            const formData = new FormData();
            
            // Add basic fields
            formData.append("title", title.trim());
            formData.append("description", description.trim());
            formData.append("rent", Number(rent)); // Ensure rent is a number
            formData.append("city", city.trim());
            formData.append("landMark", landmark.trim());
            formData.append("category", category);

            // Add images with proper file handling
            if (backEndImage1 instanceof File) {
                formData.append("image1", backEndImage1);
            }
            if (backEndImage2 instanceof File) {
                formData.append("image2", backEndImage2);
            }
            if (backEndImage3 instanceof File) {
                formData.append("image3", backEndImage3);
            }

            console.log("FormData payload:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Log the complete FormData for debugging
            console.log("Sending data to server:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            // Log URL and data before making the request
            console.log('Sending to URL:', `${serverUrl}/api/listing/add`);
            
            const response = await axios.post(
                serverUrl + "/api/listing/add",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    timeout: 60000,
                    maxContentLength: 50 * 1024 * 1024,
                    maxBodyLength: 50 * 1024 * 1024,
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log('Upload progress:', percentCompleted + '%');
                    }
                }
            );

            if (response.data) {
                toast.success("Listing added successfully!");
                navigate("/");
                
              
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
            } else {
                throw new Error('No response data received');
            }
        } catch (error) {
            console.error('Error details:', error);
            
            if (error.response) {
                console.error('Server response:', error.response.data);
                console.error('Status code:', error.response.status);
                
                if (error.response.status === 401) {
                    // Clear form data on auth error
                    setTitle("");
                    setDescription("");
                    setRent("");
                    setCity("");
                    setLandmark("");
                    setCategory("");
                    toast.error('Please login to continue');
                    navigate('/login', { state: { from: window.location.pathname } });
                } else if (error.response.status === 413) {
                    toast.error('Files are too large. Please use smaller images.');
                } else if (error.response.status === 500) {
                    console.error('Server error details:', error.response.data);
                    if (error.response.data?.message) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error('Server error. Please try again later.');
                    }
                } else if (error.response.status === 400) {
                    // Handle validation errors
                    const errorMessage = error.response.data?.message || 'Validation failed';
                    console.error('Validation error:', errorMessage);
                    toast.error(errorMessage);
                } else {
                    toast.error(error.response.data?.message || 'Failed to add listing');
                }
            } else if (error.request) {
                
                toast.error('No response from server. Please check your connection.');
            } else if (error.message === 'All three images are required' || error.message === 'Please fill in all fields') {
                toast.error(error.message);
            } else {
                toast.error('Error uploading listing. Please try again.');
            }
        } finally {
            setAdding(false);
        }
        
     }
     const handleViewCard = async (id) => {
        try {
            let result = await axios.get( serverUrl + `/api/listing/findlistingByid/${id}`,{withCredentials:true})
            console.log(result.data)
            setCardDetails(result.data)
            navigate("/viewcard")
        } catch (error) {
            console.log(error)
        }
        
     }
     const handleSearch = async (data) => {
        try {
            let result = await axios.get(serverUrl + `/api/listing/search?query=${data}`)
            setSearchData(result.data)
        } catch (error) {
            setSearchData(null)
            console.log(error)
            
        }
        
     }

     const getListing = async () => {
        try {
            let result = await axios.get( serverUrl + "/api/listing/get",{withCredentials:true})
            setListingData(result.data)
            setNewListData(result.data)

        } catch (error) {
            console.log(error)
        }
        
     }

    useEffect(()=>{
     getListing()
    },[adding,updating,deleting])



    const value = {
        title,
        setTitle,
        description,
        setDescription,
        frontEndImage1,
        setFrontEndImage1,
        frontEndImage2,
        setFrontEndImage2,
        frontEndImage3,
        setFrontEndImage3,
        backEndImage1,
        setBackEndImage1,
        backEndImage2,
        setBackEndImage2,
        backEndImage3,
        setBackEndImage3,
        rent,
        setRent,
        city,
        setCity,
        landmark,
        setLandmark,
        category,
        setCategory,
        handleAddListing,
        adding,
        setAdding,
        listingData,
        setListingData,
        getListing,
        newListData,
        setNewListData,
        handleViewCard,
        cardDetails,
        setCardDetails,
        updating,
        setUpdating,
        deleting,
        setDeleting,
        handleSearch,
        searchData,
        setSearchData
    }
  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  )
}

export default ListingProvider
