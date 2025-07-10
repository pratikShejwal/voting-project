const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
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
        type:String,
        enum:['voter','admin'],
        default:'voter',
        required:true
    },
    isVoted:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save',async function (next){
    const person = this
    if(!person.isModified('password')) return next()
        
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(person.password,salt)
        person.password = hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
})

userSchema.methods.comparePassword = async function(userPassword){

    try {
        const isMatch = await bcrypt.compare(userPassword,this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('User',userSchema)
module.exports = User