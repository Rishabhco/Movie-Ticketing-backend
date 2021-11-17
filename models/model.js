const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    name:{
       type:String,
       required:true,
       trim:true
    },
    email:{
       type:String,
       unique:true,
       required:true,
       trim:true,
       lowercase:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
})

userSchema.statics.findByCredentials=async(name,password)=>{
    const user=await User.findOne({name})

    if(!user){
        throw new Error('Invalid Email!')
    }

    const isMatch= await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Invalid Password!')
    }
    return user
}

const User=mongoose.model('User',userSchema)
module.exports=User