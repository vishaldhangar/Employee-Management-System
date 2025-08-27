import mongoose from "mongoose";
import { Schema } from "mongoose";
import Department from "./Department.js";

const employeeSchema = new Schema({
   // name , email,password,role,Image user.js se reference le liya
   userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
   employeeId:{type:String,required:true,unique:true},
   dob:{type:Date},
   gender:{type:String},
   maritalStatus:{type:String},
   designation:{type:String},
   department:{type:Schema.Types.ObjectId,ref:"Department",required:true},
   salary:{type:Number},
   createAt:{type:Date,default:Date.now},
   updatedAt:{type:Date,default:Date.now},

})

const Employee=mongoose.model("Employee",employeeSchema);
export default Employee;