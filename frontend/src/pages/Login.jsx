import {useState}from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {

    // to store the data mentioned in the email and passwrd input fields
     const[email,setEmail]=useState("")
     const [password,setPassword]=useState("")
     const [loading, setLoading] = useState(false)

     const{login}=useAuth()
     const navigate=useNavigate()
     
     // after submiting the data in login form
     const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        
        try{
             const response=await axios.post(
                "http://localhost:5000/api/auth/login",{email,password}
             );
             if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token",response.data.token)
                toast.success('Login successful!')
                if(response.data.user.role=="admin"){
                   navigate('/admin-dashboard')
                }else{
                    navigate("/employee-dashboard")
                }
             }
        } catch(error){
            const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false)
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
          <Input
            type="email"
            label="Email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <Input
            type="password"
            label="Password"
            placeholder="******"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
          />

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
          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={!email || !password}
          >
            {loading ? 'Signing In...' : 'Login'}
          </Button>
        </form>

       
      </div>
    </div>
  );
};

export default Login;
