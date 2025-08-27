import React from 'react'
import { Menu } from 'lucide-react'
import { useAuth } from '../../context/authContext'
import Button from '../ui/Button'

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth()

  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4 lg:pl-6">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div className="text-lg font-semibold">
          <p className="hidden sm:block">Welcome, <span className="text-blue-400">{user.name}</span></p>
          <p className="sm:hidden">Hi, <span className="text-blue-400">{user.name}</span></p>
        </div>
      </div>
      
      <Button 
        variant="danger" 
        size="sm"
        onClick={logout}
      >
        <span className="hidden sm:inline">Logout</span>
        <span className="sm:hidden">Exit</span>
      </Button>
    </div>
  )
}

export default Navbar
 