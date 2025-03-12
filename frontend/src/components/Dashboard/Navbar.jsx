import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
  const { user,logout } = useAuth()

  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="text-xl font-semibold">
        <p>Welcome, <span className="text-blue-500">{user.name}</span></p>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default Navbar
 