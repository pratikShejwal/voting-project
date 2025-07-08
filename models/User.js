const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    email:{
        type:String
    },
    mobileNo:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    aadharCardNumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        enum:['voter','admin'],
        default:'voter',
        required:true
    },
    isVoted:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User