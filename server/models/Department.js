import mongoose from 'mongoose'

const departmentSchema=new mongoose.Schema({
    dep_name: {
        type: String,
        required: [true, "Department name is required"], // ✅ Add validation message
        trim: true,
      },
      description: {
        type: String,
        required: false,
        // trim: true,
      },
    
    createAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
},{ timestamps: true })

const Department=mongoose.model('Department',departmentSchema)
export default Department;