import Leave from "../models/Mleave.js";
import Employee from "../models/Employee.js";
import mongoose from "mongoose";




const addLeave = async (req, res) => {
    try {
        // console.log("Received request body:", req.body); // ✅ Log request data

        const { userId, leaveType, startDate, endDate, reason } = req.body;

        if (!userId || !leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        // Convert userId to ObjectId
        const objectIdUserId = new mongoose.Types.ObjectId(userId);

        // Find employee
        const employee = await Employee.findOne({ userId: objectIdUserId });

        if (!employee) {
            console.log("Employee not found for userId:", userId);
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Create a new leave request
        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason,
            status:"Pending"
           
        });

        await newLeave.save();
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("Error adding leave:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



const getLeave=async(req,res)=>{
    try{
         const {id}=req.params;
         const employee=await Employee.findOne({userId: id})
         
         const leaves=await Leave.find({employeeId:employee._id})
         return res.status(200).json({success:true,leaves})
    }catch (error) {
        console.error("Error adding leave:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

const getLeaves=async(req,res)=>{
    try{ 
        const leaves = await Leave.find().populate({
        path: "employeeId",
        select: "userId department _id",  // ✅ Ensure employeeId is included
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name" },
        ],
      });
      
         
        return res.status(200).json({success:true,leaves})
   }catch (error) {
       console.error("Error adding leave:", error);
       return res.status(500).json({ success: false, error: "Internal Server Error" });
   }
}

const getLeaveDetail = async (req, res) => {
    try { 
        
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ success: false, error: "Leave ID is required" });
        }

        const leave = await Leave.findById({_id:id}).populate({
            path: "employeeId",
            populate: [
                { path: "department", select: "dep_name" },
                { path: "userId", select: "name profileImage" }
            ],
        });

        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave record not found" });
        }

        return res.status(200).json({ success: true, leave });

    } catch (error) {
        console.error("Error fetching leave:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


const updateLeave=async(req,res)=>{
   try{
         const {id}=req.params;
         const leave=await Leave.findByIdAndUpdate({_id:id},{status:req.body.status})

         if(!leave)
            return res.status(404).json({ success: false, error: "leave not found" });

         return res.status(200).json({success:true})


   }catch (error) {
           console.error("Error adding leave:", error);
           return res.status(500).json({ success: false, error: "leave and  update Server Error" });
       }
}

export { addLeave, getLeave, getLeaves, getLeaveDetail,updateLeave};
