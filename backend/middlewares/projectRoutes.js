
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export default async function projectRoutes(req,res,next){

    try{

        let token = req.cookies.jwt
        if(!token) return res.status(401).send("Unauthorized: No token provided")
        const verifyUser = jwt.verify(token,process.env.JWT_SECRET)

        if(!verifyUser) return res.status(401).send("Unauthorized: Invalid token")
        
            

        const user = await User.findOne({_id:verifyUser.userId}).select("-password")

        if(!user) return res.status(404).send("Unauthorized: User not found")

        req.user = user
        
        next()
    }
    catch(error){   
        console.log("Error in project routes",error)
        res.status(500).send(error.message)
    }


}