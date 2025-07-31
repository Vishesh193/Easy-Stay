import jwt from "jsonwebtoken"

const genToken=async(userId)=>{
    try{
        let token =jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "15d"})
        return token 
    }
    catch(error){
        console.log("Token error");
    }
}

export default genToken
