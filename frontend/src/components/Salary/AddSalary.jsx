import React, { useEffect, useState } from 'react'
import { fetchDepartments,getEmployees } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate,useParams } from "react-router-dom";

// department fetch kiya employehelper se

const  AddSalary = () => {
     
    const [Salary,setSalary]=useState({
        employeeId:null,
        basicSalary:0,
        allowances:0,
        deductions:0,
        payDate:null,
    })
    const [departments,setDepartments]=useState([])
    const [Employees,setEmployees]=useState([])
    // const {id}=useParams()
    const navigate= useNavigate();

    useEffect(() => {
            const getDepartments = async () => {
                try {
                    const departments = await fetchDepartments(); // ✅ Add `await` here
                    setDepartments(departments || []); // ✅ Ensure it's always an array
                } catch (error) {
                    console.error("Error fetching departments:", error);
                    setDepartments([]); // ✅ Prevents crash if API fails
                }
            };
            getDepartments();
        }, []);
        

        const handleDepartment = async (e) => {
             const emps=await getEmployees(e.target.value) // taken from employeehelpers
             setEmployees(emps);
        }



    // useEffect(() => {

    //     const fetchEmployee = async () => {
    //         // try {
    //         //     const departments = await fetchDepartments(); // ✅ Add `await` here
    //         //     setDepartments(departments || []); // ✅ Ensure it's always an array
    //         // } catch (error) {
    //         //     console.error("Error fetching departments:", error);
    //         //     setDepartments([]); // ✅ Prevents crash if API fails
    //         // }

    //         try {
    //             const response = await axios.get(
    //               `http://localhost:5000/api/employee/${id}`,
    //               {
    //                 headers: {
    //                   Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                 },
    //               }
    //             );
    //             if (response.data.success) {
    //                 const employee=response.data.employee;
    //                 setEmployee((prev)=>({
    //                     ...prev,
    //                     name: employee.userId.name,
    //                     maritalStatus:employee.maritalStatus,
    //                     designation:employee.designation,
    //                     salary: employee.salary,
    //                     department: employee.department

    //                 }));
    //             }
    //         }catch (error) {
    //             if (error.response && !error.response.data.success) {
    //               alert(error.response.data.error);
    //             }
    //           } 
    //         };
    //         fetchEmployee();
    //     }, [])

    const handleChange=(e)=>{
        const {name,value}=e.target
        
        setSalary((prevData)=>({...prevData,[name]:value}))
        }
    
    
    // submitting the data
    const handleSubmit=async (e)=>{
        e.preventDefault();

        try {
            const response = await axios.post(
              `http://localhost:5000/api/salary/add`,
              Salary,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (response.data.success) {
              navigate("/admin-dashboard/employees");
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error);
            }
          }
    }



  return (
    <>{departments? (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
            <label className='block text-sm font-medium text-gray-700' >Department</label>
      
        <select
          name="department"
          onChange={handleDepartment}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        >
          <option value="">Select Department</option>
          {departments.map((dep)=>(
            <option key ={dep._id} value={dep._id}>{dep.dep_name}</option>
          ))}
        </select>
        </div>
        <div>
            <label className='block text-sm font-medium text-gray-700' >Employee</label>
      
        <select
          name="employeeId"
          onChange={handleChange}
        
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
          <option value="">Select Employee</option>
          {Employees.map((emp)=>(
            <option key ={emp._id} value={emp._id}>{emp.employeeId}</option>
          ))}
        </select>
        </div>


        <div>
            <label className='block text-sm font-medium text-gray-700' >Basic Salary</label>
      
        <input
          type="number"
          name="basicSalary"
          onChange={handleChange}
          placeholder="Basic Salary"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        />
        </div>

         <div>
            <label className='block text-sm font-medium text-gray-700' >Allowance</label>
      
        <input
          type="number"
          name="allowances"
          onChange={handleChange}
          placeholder="Allowance"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        />
        </div>
         <div>
            <label className='block text-sm font-medium text-gray-700' >Deductions</label>
      
        <input
          type="number"
          name="deductions"
          onChange={handleChange}
          placeholder="Deduction"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        />
        </div>
         <div>
            <label className='block text-sm font-medium text-gray-700' >Pay Date</label>
      
        <input
          type="date"
          name="payDate"
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        />
        </div>



        

        

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Add Salary
        </button>
        </div>
      </form>
    </div>
    ):<div>Loading...</div>}</>

   
  )
}

export default AddSalary