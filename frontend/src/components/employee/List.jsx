import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { columns,EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import { useParams } from 'react'




const List = () => {
  const [employees,setEmployees]=useState([])
  const [empLoading,setEmpLoading]=useState([])
  const [searchEmp,setSearchEmp]=useState([])

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
                    profileImage:<img width={40} className="rounded-full" src={`http:localhost:5000/${emp.userId.profileImage}`}/>,
                    action: (<EmployeeButtons id={emp._id}/>),

               }
              ))
              setEmployees(data)
              setSearchEmp(data)
           }
        }catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
        }
        finally{
          setEmpLoading(false)
        }

        
    }
    fetchEmployees();
  },[])


          
  
   const handleFilter=(e)=>{
    const records=employees.filter((emp)=>(
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setSearchEmp(records)
  }

  return (
    <div className="p-6">
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Employee</h3>
        </div>
        <div className="flex justify-between items-center">
            <input type="text" placeholder="Search by Dep Name" className="px-4 py-0.5 border-2"
            onChange={handleFilter}
            />
            <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-500 rounded text-white"
            >
            Add New Employee</Link>
        </div>
        
        <div className='mt-6'>
          <DataTable columns={columns} data={searchEmp} pagination/>
        </div>
    </div> 
  )
}

export default List