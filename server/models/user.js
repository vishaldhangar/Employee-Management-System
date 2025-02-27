import mongoose from 'mongoose';

const userSchema =new mongoose.Schema({
    name:{type:"string",required:"true"},
    email:{type:"string",required:"true"},
    password:{type:"string",required:"true"},
    role:{type:"string",enum:["admin","employee"],required:"true"},
    profileImage:{type:String},
    createAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
})

const User=mongoose.model("User",userSchema)
export default User