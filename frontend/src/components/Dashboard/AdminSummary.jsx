import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'

const AdminSummary = () => {
  return (
    <div className="p-6">
        <h3 className="text-2xl font-bold">Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <SummaryCard icon ={<FaUsers />} text="Total Employees" number={13}  />
            <SummaryCard icon ={<FaBuilding />} text="Total Departments" number={5}   />
            <SummaryCard icon ={<FaMoneyBillWave />} text="Monthly Salary" number={50000}   />
        </div>
        <div className="mt-12">
         <h4 className="text-center text-2xl font-bold">Leave Details</h4>
         <div className="grid grdi-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SummaryCard icon ={<FaFileAlt />} text="leave Applied" number={2}  />
            <SummaryCard icon ={<FaCheckCircle />} text="leave Approved" number={2}  />
            <SummaryCard icon ={<FaHourglassHalf />} text="leave Pending" number={4}  />
            <SummaryCard icon ={<FaTimesCircle/>} text="leave Rejected" number={1}  />

         </div>
        </div>

    </div>
  )
}

export default AdminSummary