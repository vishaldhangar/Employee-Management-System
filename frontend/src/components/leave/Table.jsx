import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import { LeaveButtons } from "../../utils/LeaveHelper";
import Pagination from "../ui/Pagination";
import Card from "../ui/Card";



const Table = () => {
    const [leaves, setLeaves] = useState([]);  // ✅ Fix: Initialize with an empty array
    const [filteredLeaves, setFilteredLeaves] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
  
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
          setFilteredLeaves(data);
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

    useEffect(() => {
      setFilteredLeaves(leaves)
    }, [leaves])
  
    const handleSearch = (e) => {
      const term = e.target.value
      setSearchTerm(term)
      setCurrentPage(1)
      
      if (!term) {
        setFilteredLeaves(leaves)
        return
      }
      
      const filtered = leaves.filter((leave) =>
        leave.leaveType.toLowerCase().includes(term.toLowerCase()) ||
        leave.name.toLowerCase().includes(term.toLowerCase()) ||
        leave.dep_name.toLowerCase().includes(term.toLowerCase()) ||
        leave.status.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredLeaves(filtered)
    }

    const filterByStatus = (status) => {
      setCurrentPage(1)
      if (!status) {
        setFilteredLeaves(leaves)
        return
      }
      
      const filtered = leaves.filter((leave) => leave.status.toLowerCase() === status.toLowerCase())
      setFilteredLeaves(filtered)
    }

    const getCurrentPageData = () => {
      const startIndex = (currentPage - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      return filteredLeaves.slice(startIndex, endIndex)
    }

    const handlePageChange = (page) => {
      setCurrentPage(page)
    }

    const handleItemsPerPageChange = (newItemsPerPage) => {
      setItemsPerPage(newItemsPerPage)
      setCurrentPage(1)
    }

    return (
      <>
        {leaves.length > 0 ? (  // ✅ Fix: Check array length instead of null
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
              <p className="text-gray-600 mt-2">Search, filter, and manage leave requests</p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by leave type, employee name, department, or status..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => filterByStatus('')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  All
                </button>
                <button 
                  onClick={() => filterByStatus('Pending')}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                >
                  Pending
                </button>
                <button 
                  onClick={() => filterByStatus('Approved')}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                >
                  Approved
                </button>
                <button 
                  onClick={() => filterByStatus('Rejected')}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Rejected
                </button>
              </div>
            </div>
            
            <Card padding="none" className="overflow-hidden">
              <DataTable 
                columns={columns} 
                data={getCurrentPageData()}
                highlightOnHover
                pointerOnHover
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: '#f8fafc',
                      borderBottom: '1px solid #e2e8f0',
                    },
                  },
                  headCells: {
                    style: {
                      fontWeight: '600',
                      color: '#374151',
                    },
                  },
                }}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredLeaves.length / itemsPerPage)}
                totalItems={filteredLeaves.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPageOptions={[10, 25, 50, 100]}
              />
            </Card>
          </div>
        ) : 
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading leaves...</p>
            </div>
          </div>
        }
      </>
    );
  };
  
 

export default Table;