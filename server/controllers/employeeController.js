import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import path from "path"
import Department from "../models/Department.js"

// using  multer to store the profile image to upload folder

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage:storage})


const addEmployee=async(req,res)=>{
    try{

    const {
            name,
            email,
            employeeId,
            dob,
            gender,
            martialStatus,
            designation,
            department,
            salary,
            password,
            role,
} =req.body;



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
    profileImage:req.file ? req.file.filename : ""    // if imge is there then its data will store in database
})
 
const savedUser=await newUser.save()
 
// filling other details of employee
const newEmployee=new Employee({
    userId:savedUser._id,
    employeeId,
    dob,
    gender,
    martialStatus,
    designation,
    department,
    salary
})

await newEmployee.save();
return res.status(200).json({success:true,message:"employee created"})
    }catch(error){
         return res.status(500).json({success:false,error:"server error in adding employee"})
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
        martialStatus,
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
        martialStatus,
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

export {addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId}