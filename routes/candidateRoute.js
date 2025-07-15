const express = require('express')
const router  = express.Router()
const Candidate = require('../models/Candidate')
const User = require('../models/User')
const {jwtAuthMiddleware,generateToken} = require('../jwt')
const { json } = require('body-parser')
// const User = require('../models/User')


const checkAdminRole =async (userId)=> {
  try{
    const user =await User.findById(userId)
    return user.role == 'admin'
  }
  catch(err){
    return false
  }
}

router.post('/',jwtAuthMiddleware,async(req,res)=>{

try {
  if( !await checkAdminRole(req.user.id))
  {
    return res.status(403).json({message:"does not have admin role"})
  }
   const data = req.body //bodyParser stores data on request body
  const newUser = new Candidate(data)

  const response = await newUser.save()

  // const payload = {
  //   id:response.id,
  // }
  // console.log(JSON.stringify(payload));
  
  // const token = generateToken(payload)

  res.status(200).json(response)
} catch (err) {
  res.status(500).json({error:'internal error'})
}
})

//login route


router.get('/',async (req,res)=>{
  try {
    const data =await User.find()
    res.status(200).json(data)
  } catch (err) {
    console.log("error");
    res.send(500).json({error:'server side problem'}) 
  }
})



//parameterized query



router.put('/:candidateId',async(req,res)=>{

try{
  if(! await checkAdminRole(req.user.id))
  {
    return res.status(403).json({message:"admin role required"})
  }
  // const userId = req.user; // extract id from jwt token
    const id = req.params.candidateId;
const data = req.body
const response =await Candidate.findByIdAndUpdate(id,data,{
  new:true,
  runValidators:true
})



res.status(200).json(response)
} 
catch(err)
{
  res.status(500).json({error:"Internal error"})
}
})

router.delete('/:id',async(req,res)=>{
  try{

    if(!await checkAdminRole(req.user.id))
  {
    return res.status(403).json({message:"admin role required"})
  }
    const id = req.params.id;
   const response =await Candidate.findByIdAndDelete(id)
   res.status(200).json(response)
  }
  catch(err)
  {
    res.status(500).json({error:"Internal server error"})
  }
})

module.exports = router