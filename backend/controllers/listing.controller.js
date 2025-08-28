import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";



export const addListing = async (req,res) => {
    try {
        let host = req.userId;
        if (!host) {
            return res.status(401).json({ message: "Authentication required" });
        }

        let {title, description, rent, city, landMark, category} = req.body;
        console.log(req.body);
        console.log(req.files);
        
        if (!title || !description || !rent || !city || !landMark || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
            return res.status(400).json({ message: "All three images are required" });
        }

        
        let image1 = await uploadOnCloudinary(req.files.image1[0].path)
        let image2 = await uploadOnCloudinary(req.files.image2[0].path)
        let image3 = await uploadOnCloudinary(req.files.image3[0].path)

        if (!image1 || !image2 || !image3) {
            return res.status(500).json({ message: "Image upload failed" });
        }

        let listing = await Listing.create({
            title,
            description,
            rent,
            city,
            landMark,
            category,
            image1,
            image2,
            image3,
            host
        })
        let user = await User.findByIdAndUpdate(host,{$push:{listing:listing._id}},{new:true})

        if(!user){
          return  res.status(404).json({message:"user is not found "})
        }
        return res.status(201).json(listing)
       

    } catch (error) {
        return res.status(500).json({message:`AddListing error ${error}`})
    }
}

export const getListing= async (req,res) => {
    try {
        let listing = await Listing.find().sort({createdAt:-1})
        return res.status(200).json(listing)
    } catch (error) {
        return res.status(500).json({message:`getListing error ${error}`})
    }
    
}

export const findListing= async (req,res) => {
    try {
        let {id}= req.params
        let listing = await Listing.findById(id)
        if(!listing){
            return  res.status(404).json({message:"listing not found"})
        }
        return res.status(200).json(listing)
    } catch (error) {
       return res.status(500).json(`findListing error ${error}`)
    }
    
}
export const updateListing = async (req,res) => {
    try {
        const {id} = req.params;
        const {title, description, rent, city, landMark, category} = req.body;

      
        const existingListing = await Listing.findById(id);
        if (!existingListing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        
        if (existingListing.host.toString() !== req.userId) {
            return res.status(403).json({ message: "Not authorized to update this listing" });
        }

    
        const updateData = {
            ...(title && { title }),
            ...(description && { description }),
            ...(rent && { rent }),
            ...(city && { city }),
            ...(landMark && { landMark }),
            ...(category && { category })
        };

        if (req.files) {
            if (req.files.image1) {
                const image1 = await uploadOnCloudinary(req.files.image1[0].path);
                if (image1) updateData.image1 = image1;
            }
            if (req.files.image2) {
                const image2 = await uploadOnCloudinary(req.files.image2[0].path);
                if (image2) updateData.image2 = image2;
            }
            if (req.files.image3) {
                const image3 = await uploadOnCloudinary(req.files.image3[0].path);
                if (image3) updateData.image3 = image3;
            }
        }

        const listing = await Listing.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        return res.status(200).json(listing);
       

    } catch (error) {
        return res.status(500).json({message:`UpdateListing Error ${error}`})
    }
}

export const deleteListing = async (req,res) => {
    try {
        let {id} = req.params
        let listing = await Listing.findByIdAndDelete(id)
        let user = await User.findByIdAndUpdate(listing.host,{
            $pull:{listing:listing._id}
        },{new:true})
        if(!user){
            return res.status(404).json({message:"user is not found"})
        }
        return res.status(201).json({message:"Listing deleted"})
    } catch (error) {
        return res.status(500).json({message:`DeleteListing Error ${error}`})
    }
    
}

export const ratingListing = async (req, res) => {
    try {
        const { id } = req.params;
        const { ratings } = req.body;

       

        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        listing.ratings = Number(ratings);
        await listing.save();

        return res.status(200).json({ ratings: listing.ratings });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Rating error" });
    }
};

export const search = async (req,res) => {
    try {
        const { query } = req.query;
    
        if (!query || query.trim() === "") {
            // Return all listings when query is empty
            const allListings = await Listing.find().sort({ createdAt: -1 });
            return res.status(200).json(allListings);
        }
    
        const listing = await Listing.find({
            $or: [
                { landMark: { $regex: query, $options: "i" } },
                { city: { $regex: query, $options: "i" } },
                { title: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } }
            ],
        });
    
       return res.status(200).json(listing);
    } catch (error) {
        console.error("Search error:", error);
      return  res.status(500).json({ message: "Internal server error" });
    }
    }
    
