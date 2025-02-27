import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaDollarSign, FaCog } from 'react-icons/fa'; // Importing icons from react-icons

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-4">
      <div className="text-center mb-9 border-b border-gray-400 pb-7 ">
        <h3 className="text-xl font-semibold ">Employee MS</h3>
      </div>
      
      <div className="space-y-4">
        <NavLink 
          to="/admin-dashboard"
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/admin-dashboard/employees"
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaUsers className="text-xl" />
          <span>Employee</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/departments"
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaBuilding className="text-xl" />
          <span>Department</span>
        </NavLink>
        
        <NavLink 
          to="/admin-dashboard/salary/add"
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaDollarSign className="text-xl" />
          <span>Salary</span>
        </NavLink>
        
        <NavLink 
          to="/admin-dashboard"
          className="flex items-center space-x-3 text-lg hover:bg-gray-700 p-2 rounded-lg"
        >
          <FaCog className="text-xl" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
