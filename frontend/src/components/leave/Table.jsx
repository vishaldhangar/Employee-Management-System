import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import { LeaveButtons } from "../../utils/LeaveHelper";



const Table = () => {
    const [leaves, setLeaves] = useState([]);  // ✅ Fix: Initialize with an empty array
  
    const fetchleaves = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leave", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        console.log("Fetched Leaves:", response.data.leaves);
  
        if (response.data.success) {
          let sno = 1;
          const data = response.data.leaves.map((leave) => ({
            _id: leave._id,
            sno: sno++,
            dep_name: leave.employeeId?.department?.dep_name || "N/A", // ✅ Fix undefined error
            name: leave.employeeId?.userId?.name || "N/A", // ✅ Fix undefined error
            leaveType: leave.leaveType,
            department: leave.employeeId?.department?.dep_name || "N/A",
            days: (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24), // ✅ Fix date issue
            status: leave.status,
            action: <LeaveButtons Id={leave._id} />,
          }));
          setLeaves(data);  // ✅ Fix: This will trigger re-render properly
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
  
    useEffect(() => {
      fetchleaves();
    }, []);
  
    return (
      <>
        {leaves.length > 0 ? (  // ✅ Fix: Check array length instead of null
          <div className="p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search by Leave Type"
                className="px-4 py-0.5 border-2"
              />
              <div className="flex space-x-3">
                <button className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-md transition">
                  Pending
                </button>
                <button className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition">
                  Approved
                </button>
                <button className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md transition">
                  Rejected
                </button>
              </div>
            </div>
  
            <DataTable columns={columns} data={leaves} pagination />
          </div>
        ) : 
          <div>Loading...</div>
        }
      </>
    );
  };
  
 

export default Table;