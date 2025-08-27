import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { columns,EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import LoadingSpinner from '../ui/LoadingSpinner'
import Button from '../ui/Button'
import SearchFilter from '../ui/SearchFilter'
import Card from '../ui/Card'
import Pagination from '../ui/Pagination'




const List = () => {
  const [employees,setEmployees]=useState([])
  const [empLoading,setEmpLoading]=useState(false)
  const [searchEmp,setSearchEmp]=useState([])
  const [departments,setDepartments]=useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(()=>{
    const fetchEmployees =async()=>{
      setEmpLoading(true)
        try{
             const response = await axios.get('http://localhost:5000/api/employee',{
              headers:{
               Authorization:`Bearer ${localStorage.getItem('token')}`,
              }
           
           })
           if(response.data.success){
             let sno=1;
              const data=await response.data.employees.map((emp)=>(
               {
                    _id:emp._id,
                    sno:sno++,
                    dep_name:emp.department.dep_name,
                    name:emp.userId.name,
                    dob:new Date(emp.dob).toDateString(),
                    role:emp.userId.role,
                    designation:emp.designation,
                    profileImage: emp.userId.profileImage ? (
                      <img 
                        width={40} 
                        height={40}
                        className="rounded-full object-cover" 
                        src={emp.userId.profileImage}
                        alt={`${emp.userId.name}'s profile`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/40x40/6b7280/ffffff?text=${emp.userId.name.charAt(0).toUpperCase()}`;
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {emp.userId.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    ),
                    action: (<EmployeeButtons id={emp._id}/>),

               }
              ))
              setEmployees(data)
              setSearchEmp(data)
              
              // Extract unique departments for filtering
              const uniqueDepartments = [...new Set(data.map(emp => emp.dep_name))]
              setDepartments(uniqueDepartments)
           }
        }catch(error){
            const errorMessage = error.response?.data?.error || 'Failed to load employees';
            toast.error(errorMessage);
        }
        finally{
          setEmpLoading(false)
        }

        
    }
    fetchEmployees();
  },[])


  // Enhanced search and filter functions
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setSearchEmp(employees)
      setCurrentPage(1)
      return
    }
    
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.dep_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchEmp(filtered)
    setCurrentPage(1)
  }

  const handleFilter = (filters) => {
    let filtered = employees

    // Apply department filter
    if (filters.department) {
      filtered = filtered.filter(emp => emp.dep_name === filters.department)
    }

    // Apply role filter  
    if (filters.role) {
      filtered = filtered.filter(emp => emp.role === filters.role)
    }

    setSearchEmp(filtered)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchEmp(employees)
    setCurrentPage(1)
  }

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return searchEmp.slice(startIndex, endIndex)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }
  
  // Prepare filter options
  const filterOptions = [
    {
      key: 'department',
      label: 'Department',
      options: departments.map(dept => ({ value: dept, label: dept }))
    },
    {
      key: 'role', 
      label: 'Role',
      options: [
        { value: 'manager', label: 'Admin' },
        { value: 'employee', label: 'Employee' }
      ]
    }
  ]

  if (empLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
        <div className='text-center'>
            <h3 className='text-2xl font-bold text-gray-800'>Manage Employees</h3>
            <p className="text-gray-600 mt-2">Search, filter, and manage your team members</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              onClear={handleClearFilters}
              searchPlaceholder="Search employees by name, department, or role..."
              filterOptions={filterOptions}
            />
          </div>
          <div className="flex justify-center lg:justify-start">
            <Link to="/admin-dashboard/add-employee" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                <span className="hidden sm:inline">Add New Employee</span>
                <span className="sm:hidden">Add Employee</span>
              </Button>
            </Link>
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
            totalPages={Math.ceil(searchEmp.length / itemsPerPage)}
            totalItems={searchEmp.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={[10, 25, 50, 100]}
          />
        </Card>
    </div> 
  )
}

export default List