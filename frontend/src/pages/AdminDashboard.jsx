import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../components/Dashboard/AdminSidebar'
import Navbar from '../components/Dashboard/Navbar'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    navigate('/login')
    return null
  }
  
  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Desktop Sidebar */}
      <AdminSidebar />
      
      {/* Mobile Sidebar */}
      <AdminSidebar 
        isMobile={true} 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard