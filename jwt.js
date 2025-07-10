const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtAuthMiddleware = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error:"unauthorized"})
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
      //pass user information to req object
      req.user = decoded
      next()
    } 
    catch (error) 
    {
        console.error(error);    
        res.status(401).json({error:"unauthorized"})
    }
}
const generateToken = (userData) =>{
    return jwt.sign({userData},process.env.JWT_SECRET_KEY,{expiresIn:1000})
}
module.exports = {jwtAuthMiddleware,generateToken}