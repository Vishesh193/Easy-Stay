import jwt from "jsonwebtoken"
const isAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies
        if(!token){
            res.status(400).json({message:"user dosen't have a token"})
        }
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            res.status(400).json({message:"user dosen't have a valid token"})
        }

        req.userId = verifyToken.userId
        next()
    } catch (error) {
         res.status(400).json({message:`isAuth ${erorr}`})
        
    }
}

export default isAuth