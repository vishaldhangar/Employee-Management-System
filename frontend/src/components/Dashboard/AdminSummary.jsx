import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import SummaryCard from './SummaryCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'
const AdminSummary = () => {
    
  const [summary,setSummary]=useState(null)

  useEffect(()=>{
    const fetchSummary=async()=>{
       try{
            const summary=await axios.get('http://localhost:5000/api/dashboard/summary',{
              headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
              }
            })
            setSummary(summary.data)
       }catch(error){
             const errorMessage = error.response?.data?.error || 'Failed to load dashboard data';
             toast.error(errorMessage);
       }    

    } 
    fetchSummary()
  },[])

  if(!summary)
    return (
      <div className="p-6 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )



  return (
    <div className="p-6">
        <h3 className="text-2xl font-bold">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SummaryCard icon ={<FaUsers />} text="Total Employees" number={summary.totalEmployees}  />
            <SummaryCard icon ={<FaBuilding />} text="Total Departments" number={summary.totalDepartments}   />
            {/* <SummaryCard icon ={<FaMoneyBillWave />} text="Monthly Salary" number={summary.totalSalary}   /> */}
        </div>
        <div className="mt-12">
         <h4 className="text-center text-2xl font-bold">Leave Details</h4>
         <div className="grid grdi-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryCard icon ={<FaFileAlt />} text="leave Applied" number={summary.leaveSummary.apppliedFor}  />
            <SummaryCard icon ={<FaCheckCircle />} text="leave Approved" number={summary.leaveSummary.approved}  />
            <SummaryCard icon ={<FaHourglassHalf />} text="leave Pending" number={summary.leaveSummary.pending}  />
            <SummaryCard icon ={<FaTimesCircle/>} text="leave Rejected" number={summary.leaveSummary.rejected}  />

         </div>
        </div>

    </div>
  )
}

export default AdminSummary