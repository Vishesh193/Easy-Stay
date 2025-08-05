import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js";

export const addListing = async (req,res) => {
    try {
        let host = req.userId;
        let {title,description,rent,city,landMark,category}= req.body;
        let image1 = uploadOnCloudinary(res.files.image1[0].path)
        let image2 = uploadOnCloudinary(res.files.image2[0].path)
        let image3 = uploadOnCloudinary(res.files.image3[0].path)

        let listing = await Listing.create({
            title,
            description,
            rent,city,
            landMark,
            category,
            image1,
            image2,
            image3,
            host
        })
        let user = await User.findByIdAndUpdate(host,{$puch:{listing:listing._id}},{new:true})
        if(!user){
            res.status(404).json({message:"user is not found"})
        }
        res.status(201).json(listing)
    } catch (error) {
        res.status(500).json({message:`AddListing error ${error}`})
    }
}