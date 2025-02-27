import {useState}from 'react';
import axios from "axios";
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    // to store the data mentioned in the email and passwrd input fields
     const[email,setEmail]=useState("")
     const [password,setPassword]=useState("")

     const{login}=useAuth()
     const navigate=useNavigate()
     
     // after submiting the data in login form
     const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
             const response=await axios.post(
                "http://localhost:5000/api/auth/login",{email,password}
             );
             if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token",response.data.token)
                if(response.data.user.role=="admin"){
                   navigate('/admin-dashboard')
                }else{
                    navigate("/employee-dashboard")
                }
             }
        } catch(error){
            console.log(error);
        }
     };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-gray-100 to-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Employee Management System
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-gray-700 text-center">Login</h3>
          

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              
              placeholder="Enter Email"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="******"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
              />
              <span className="ml-2">Remember Me</span>
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-lg focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        {/* <p className="mt-6 text-sm text-center text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
