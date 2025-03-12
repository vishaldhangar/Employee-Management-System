import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaDollarSign, FaCog } from 'react-icons/fa'; // Importing icons from react-icons
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
    const {user}=useAuth()
  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-4">
      <div className="text-center mb-9 border-b border-gray-400 pb-7 ">
        <h3 className="text-xl font-semibold ">Employee MS</h3>
      </div>
      
      <div className="space-y-4">
        <NavLink 
          to="/employee-dashboard"
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to={`/employee-dashboard/profile/${user._id}`}
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaUsers className="text-xl" />
          <span>My Profile</span>
        </NavLink>

        <NavLink 
          to="/employee-dashboard/leaves"
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaBuilding className="text-xl" />
          <span>Leaves</span>
        </NavLink>
        
        <NavLink 
          to={`/employee-dashboard/salary/${user._id}`}
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaDollarSign className="text-xl" />
          <span>Salary</span>
        </NavLink>
        
        <NavLink 
          to="/employee-dashboard/setting"
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaCog className="text-xl" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
