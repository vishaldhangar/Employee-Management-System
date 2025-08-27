import multer from "multer";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../lib/cloudinary.js";
import Employee from "../models/Employee.js"
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import path from "path"
import Department from "../models/Department.js"

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'employee_profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0],
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face' }
    ]
  },
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});



const addEmployee=async(req,res)=>{
    console.log("=== ADD EMPLOYEE REQUEST ===");
    console.log("File:", req.file);
    console.log("Body:", req.body);
    console.log("Headers:", req.headers);

    try{

    const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
           
} =req.body;

// Validate required fields
if (!name || !email || !employeeId || !password || !role || !department) {
    return res.status(400).json({success:false,error:"Missing required fields"});
}

const user=await User.findOne({email})
// if user already exists
if(user){
    return res.status(400).json({success:false,error:"user already registered in emp"})
}

// if user not already registered
// then we will convert the psswrd into hashpsswrd
const hashpsswrd=await bcrypt.hash(password,10);

// creating new user
const newUser=new User({
    name,
    email,
    password:hashpsswrd,
    role,
    profileImage: req.file ? req.file.path : ""
    // Cloudinary provides the full URL in req.file.path
})

console.log("Creating user with data:", {
    name,
    email,
    role,
    profileImage: req.file ? req.file.path : "no image"
});
 
const savedUser=await newUser.save()
 
// filling other details of employee
console.log("Creating employee with data:", {
    userId:savedUser._id,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary,
});

const newEmployee=new Employee({
    userId:savedUser._id,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary,

    
})

await newEmployee.save();
return res.status(200).json({success:true,message:"employee created"})
    }catch(error){
         console.error("Error in addEmployee:", error);
         console.error("Error stack:", error.stack);
         return res.status(500).json({
             success: false,
             error: error.message || "server error in adding employee",
             details: error.toString()
         })
    }

}


const getEmployees=async(req,res)=>{
    try {
        const employees = await Employee.find().populate('userId',{password:0}).populate('department');
        res.status(200).json({ success: true, employees });
      } catch (error) {
        res.status(500).json({ success: false, error: "employees server errror"});
      }
}


const getEmployee=async(req,res)=>{
    const {id}=req.params;
    try {
        let employee;
        employee = await Employee.findById({_id:id}).populate('userId',{password:0}).populate('department');
        if(!employee){
            employee=await Employee.findOne({userId:id}).populate('userId',{password:0}).populate('department');
        }
        return res.status(200).json({ success: true, employee });
      } catch (error) {
        res.status(500).json({ success: false, error: "employees server errror"});
      }
}

const updateEmployee = async (req, res)=>{
   try{
    const {id}=req.params;
    const {
        name,
        maritalStatus,
        designation,
        department,
        salary,
        
} =req.body;

     const employee=await Employee.findById({_id:id})
     if(!employee){
        res.status(500).json({ success: false, error: "employee  not found"});

     }

     const user=await User.findById({_id:employee.userId}) 
     
     if(!user){
        res.status(500).json({ success: false, error: "user  not found"});

     }
       
     const updateUser=await User.findByIdAndUpdate({_id:employee.userId},{name})
     const updateEmployee=await Employee.findByIdAndUpdate({_id:id},{
        maritalStatus,
        designation,salary,department
     })

     if(!updateEmployee || !updateUser){
        res.status(500).json({ success: false, error: "document  not found"});
     }

     return res.status(200).json({success:true,message:"employee update"})

   } catch (error) {
    res.status(500).json({ success: false, error: "update employee  server errror"});

   }
}


const fetchEmployeesByDepId=async(req,res)=>{
    const {id}=req.params;
    try {
        const employees = await Employee.find({department:id});
        res.status(200).json({ success: true, employees });
      } catch (error) {
        res.status(500).json({ success: false, error: "employeesbyDepId server errror"});
      }
}


const deleteEmp = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmp = await Employee.findByIdAndDelete(id);
    if (!deleteEmp) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }
    res.status(200).json({ success: true, deleteEmp });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId,deleteEmp}