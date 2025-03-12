import React,{useState} from 'react'
import { useAuth } from '../../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddLeave = () => {
    const {user}=useAuth()
   const [leave,setLeave]=useState({
    userId:user._id,
   })

   const navigate=useNavigate()

    const handleChange=(e)=>{
        const {name,value}=e.target
        setLeave((prevState)=>({...prevState,[name]:value}))
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(
              `http://localhost:5000/api/leave/add`,leave,
              {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (response.data.success) {
                navigate('/employee-dashboard/leaves')
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error);
            }
          } 
        };
    

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
    <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
    <form onSubmit={handleSubmit}>
        
    <div>
          <label className='block text-sm font-medium text-gray-700' >Leave Type</label>
    
      <select
        name="leaveType"
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
      
      >
        <option value="">Select Type</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Annual Leave">Annual Leave</option>
      </select>
      </div>


         <div className="grid grdi-cols-1 md:grid-cols-2 gap-4">
            <div>
          <label className='block text-sm font-medium text-gray-700' >From Date</label>
    
      <input
        type="date"
        name="startDate"
        onChange={handleChange}
       
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        required
      
      />
      </div>
            <div>
          <label className='block text-sm font-medium text-gray-700' >To Date</label>
    
      <input
        type="date"
        name="endDate"
        onChange={handleChange}
        
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        required
      
      />
      </div>
      </div>

      <div>
          <label className='block text-sm font-medium text-gray-700' >Description</label>
    
      <textarea
           name="reason"
        onChange={handleChange}
        placeholder="Reason"
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md">

        </textarea>
      </div>

      

      {/* Submit Button */}
      <button
        type="submit"
        className="col-span-2 bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Submit
      </button>
     
    </form>
  </div>
  )
}

export default AddLeave