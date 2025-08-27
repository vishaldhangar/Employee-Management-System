import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBuilding, FaDollarSign, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import { X, Menu } from 'lucide-react';

const AdminSidebar = ({ isMobile = false, isOpen = false, onClose = () => {} }) => {
  const navItems = [
    { to: "/admin-dashboard", icon: FaTachometerAlt, label: "Dashboard" },
    { to: "/admin-dashboard/employees", icon: FaUsers, label: "Employees" },
    { to: "/admin-dashboard/departments", icon: FaBuilding, label: "Departments" },
    { to: "/admin-dashboard/salary/add", icon: FaDollarSign, label: "Salary" },
    { to: "/admin-dashboard/leaves", icon: FaDollarSign, label: "Leaves" },
    { to: "/admin-dashboard/setting", icon: FaCog, label: "Settings" },
  ];

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Employee MS</h3>
              <button onClick={onClose} className="p-1 hover:bg-gray-700 rounded">
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`
                    }
                  >
                    <IconComponent className="text-lg" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-4 hidden lg:block">
      <div className="text-center mb-9 border-b border-gray-600 pb-6">
        <h3 className="text-xl font-semibold">Employee MS</h3>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <IconComponent className="text-lg" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
