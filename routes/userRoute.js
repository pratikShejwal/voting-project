const express = require('express')
const router  = express.Router()
const User = require('./../models/User')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')
const { json } = require('body-parser')

router.post('/signup',async(req,res)=>{

try {
   const data = req.body //bodyParser stores data on request body
 
   //logic for the single admin
   if(data.role == "admin")
   {
     const adminExists = await User.findOne({role:"admin"})
     if(adminExists) return res.status(400).json({message:"Admin already exists"})
   }
   

   const newUser = new User(data)

   const response = await newUser.save()

   const payload = {
    id:response.id,
   }
  console.log(JSON.stringify(payload));
  
  const token = generateToken(payload)

  res.status(200).json({response:response,token:token})
} catch (err) {
  res.status(500).json({error:'internal error'})
}
})

//login route
router.post('/login',async(req,res)=>{
  
try {
  const {aadharCardNumber,password} = req.body
  const voter =await User.findOne({aadharCardNumber:aadharCardNumber})
  //generate token
    const payload = {
      id:voter.id,
      
    }
   const token = generateToken(payload)
    
   //return token as response
   res.json(token)

} catch (error) {
  res.status(500).json({message:"server side error"})
}

})

router.get('/',async (req,res)=>{
  try {
    const data =await User.find()
    res.status(200).json(data)
  } catch (err) {
    console.log("error");
    res.send(500).json({error:'server side problem'}) 
  }
})

router.get('/profile',async (req,res)=> {
  try {
    const userData = req.user
    console.log("userData: ",userData);
    const userId = userData.id
    const user =await Person.findById(userId)
    res.status(200).json({user})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
})

//parameterized query

router.get('/:workType',async(req,res)=>{
  try{
    const workType = req.params.workType;
   const response =await Person.find({work:workType})
   res.status(200).json(response)
  }
  catch(err)
  {
    res.status(500).json({error:"Internal server error"})
  }
})

router.put('/profile/password',async(req,res)=>{

try{
  const id = req.id; // extract id from jwt token
const {currentPassword,newPassword} = req.body //extract new and current password from body
const response = await User.findById(userId)

 if(!(await response.comparePassword(currentPassword))){
    return res.status(401).json({message:'invalid username or password'})
  }

  response.password = newPassword
  await response.save()

res.status(200).json(response)
} 
catch(err)
{
  res.status(500).json({error:"Internal error"})
}
})

router.delete('/:id',async(req,res)=>{
  try{
    const id = req.params.id;
   const response =await Person.findByIdAndDelete(id)
   res.status(200).json(response)
  }
  catch(err)
  {
    res.status(500).json({error:"Internal server error"})
  }
})

module.exports = router