import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

const Setting = () => {
    
    const navigate=useNavigate();
    const {user}=useAuth();
    const [setting,setSetting]=useState({
        userId:user._id,
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
    });
    const [error,setError]=useState(null)
   
    const handleChange=(e)=>{
        const {name,value}=e.target
        setSetting({...setting,[name]:value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(setting.newPassword !==setting.confirmPassword){
            setError("password not matched")
        
        }else{
            try {
                const response = await axios.put(
                    "http://localhost:5000/api/setting/change-password",
                    setting,
                  {
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                if (response.data.success) {
                    alert("Password changed successfully!");
                    navigate('/admin-dashboard/employees')
                    setError("")
                }
              } catch (error) {
                if (error.response && error.response.data) {
                  setError(error.response.data.error || "Something went wrong!");
                } else {
                  setError("Server error. Please try again later.");
                }
              } 
            };
        }
        







  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
    
      <h2 className="text-2xl font-bold  mb-6">
       Change Password
      </h2>
      <form onSubmit={handleSubmit}>
        
        {/* Email Input */}
        <div>
          <label
           
            className=" text-sm font-medium text-gray-600"
          >
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Change password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label
           
            className=" text-sm font-medium text-gray-600"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label
           
            className=" text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            required
            onChange={handleChange}
          />
        </div>
        

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-lg focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
        >
          Submit
        </button>
      </form>

     
    </div>
  
  )
}

export default Setting