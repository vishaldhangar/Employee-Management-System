import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

// department fetch kiya employehelper se

const Add = () => {
     
    const [departments,setDepartments]=useState([])
    const [formData,setFormData]=useState({})
    const navigate= useNavigate()
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

    const handleChange=(e)=>{
        const {name,value,files}=e.target
        if(name==="image"){
            setFormData((prevData)=>({...prevData,[name]:files[0]}));
        }else{
            setFormData((prevData)=>({...prevData,[name]:value}))
        }
    }
    
    // submitting the data
    const handleSubmit=async (e)=>{
        e.preventDefault();

// appending all the data from form to form object
   const formDataObj=new FormData()
   Object.keys(formData).forEach((key) => {
       formDataObj.append(key,formData[key])   // eg - like name is key and its vdo is formdata[key]
   })

        try {
            const response = await axios.post(
              "http://localhost:5000/api/employee/add",
              formDataObj,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
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
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className='block text-sm font-medium text-gray-700' >Name</label>
      
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Insert Name"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          required
        
        />
          </div>

          <div>
          <label className='block text-sm font-medium text-gray-700' >Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Insert Email"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
    
        />
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700' >Employee ID</label>
      
        <input
          type="text"
          name="employeeId"
          onChange={handleChange}
          placeholder="Employee ID"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
       
        />
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700' >DOB</label>
      
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
       
        />
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700' >Gender</label>
      
        <select
          name="gender"
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700' >Marital Status</label>
      
        <select
          name="maritalStatus"
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        >
          <option value="">Select Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700' >Designation</label>
      
        <input
          type="text"
          name="designation"
          onChange={handleChange}
          placeholder="Designation"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        />
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700' >Department</label>
      
        <select
          name="department"
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        >
          <option value="">Select Department</option>
          {departments.map((dep)=>(
            <option key ={dep._id} value={dep._id}>{dep.dep_name}</option>
          ))}
        </select>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700' >Salary</label>
      
        <input
          type="number"
          name="salary"
          onChange={handleChange}
          placeholder="Salary"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        
        />
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700' >Password</label>
      
        <input
          type="password"
          name="password"
          placeholder="******"
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
       
        />
        </div>
        <div>
            <label className='block text-sm font-medium text-gray-700' >Role</label>
      
        <select
          name="role"
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"

        >
          <option value="">Select Role</option>
          <option value="manager">Admin</option>
          <option value="employee">Employee</option>
          
        </select>
        </div>

        {/* <div>
            <label className='block text-sm font-medium text-gray-700' >Profile Photo</label>
      
        {/* <input
          type="file"
          name="image"
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        //   onChange={handleChange}
        />
        </div> */} 

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Add Employee
        </button>
        </div>
      </form>
    </div>

   
  )
}

export default Add