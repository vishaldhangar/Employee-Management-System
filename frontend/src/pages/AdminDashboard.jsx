import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/Dashboard/AdminSidebar'
import Navbar from '../components/Dashboard/Navbar'
import { useNavigate } from 'react-router-dom'

import { Outlet } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const {user,loading}=useAuth()
  const navigate=useNavigate()

  if(loading){
    return <div>Loading....</div>
  }
  if(!user){
    navigate('/login')
  }
  
  return (
    // <div>AdminDashboard {user.name}</div>
    <div className='flex'>
      <AdminSidebar />
      <div className="flex-1  h-screen">
         <Navbar />
         <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard