import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../ui/LoadingSpinner'
import Card from '../ui/Card'
import { useAuth } from '../../context/authContext'

const Profile = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.error('Error fetching employee:', error)
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false)
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <Card className="text-center py-12 max-w-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Not Found</h3>
          <p className="text-gray-600">Unable to load your profile information.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
      <div className="h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        {/* Header Section */}
        <div className="text-center mb-3">
          <div className="relative inline-block">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">Welcome back, {employee.userId.name}!</p>
        </div>

        {/* Main Profile Card */}
        <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-32 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='7' cy='7' r='5'/%3E%3Ccircle cx='53' cy='7' r='5'/%3E%3Ccircle cx='53' cy='53' r='5'/%3E%3Ccircle cx='7' cy='53' r='5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative p-2 sm:p-3 lg:p-4">
              {/* Profile Header */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                {/* Profile Photo */}
                <div className="relative group flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-gradient-to-br from-blue-100 to-indigo-100 relative">
                    {employee.userId.profileImage ? (
                      <img
                        src={employee.userId.profileImage}
                        alt={`${employee.userId.name}'s profile`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/160x160/6b7280/ffffff?text=' + employee.userId.name.charAt(0).toUpperCase();
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-700 transition-all duration-300">
                        <span className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">
                          {employee.userId.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow-sm"></div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center lg:text-left min-w-0">
                  <div className="mb-2">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-0.5 break-words">{employee.userId.name}</h2>
                    <p className="text-sm sm:text-base text-indigo-600 font-semibold mb-0.5 break-words">{employee.designation}</p>
                    <p className="text-gray-600 mb-2 break-all text-xs">{employee.userId.email}</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-1"></span>
                      {employee.userId.role === 'manager' ? 'Admin' : 'Employee'}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                      <span className="w-1 h-1 bg-green-500 rounded-full mr-1"></span>
                      {employee.department.dep_name}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                      <span className="w-1 h-1 bg-purple-500 rounded-full mr-1"></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4">
                {/* Personal Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">Personal Information</h3>
                  </div>
                  
                  <div className="space-y-1.5">
                    {[
                      { label: 'Employee ID', value: employee.employeeId, icon: '🆔' },
                      { label: 'Email Address', value: employee.userId.email, icon: '📧' },
                      { label: 'Date of Birth', value: new Date(employee.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: '🎂' },
                      { label: 'Gender', value: employee.gender?.charAt(0).toUpperCase() + employee.gender?.slice(1), icon: '⚤' },
                      ...(employee.maritalStatus ? [{ label: 'Marital Status', value: employee.maritalStatus?.charAt(0).toUpperCase() + employee.maritalStatus?.slice(1), icon: '💍' }] : [])
                    ].map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-1.5 rounded-md border border-gray-100 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2">
                          <span className="text-xs flex-shrink-0">{item.icon}</span>
                          <div className="min-w-0 flex-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">{item.label}</label>
                            <p className="text-gray-900 font-medium text-xs break-words">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Information */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">Work Information</h3>
                  </div>
                  
                  <div className="space-y-1.5">
                    {[
                      { label: 'Department', value: employee.department.dep_name, icon: '🏢' },
                      { label: 'Designation', value: employee.designation, icon: '👨‍💼' },
                      { label: 'Role', value: employee.userId.role === 'manager' ? 'Admin' : 'Employee', icon: '🎯' },
                      ...(employee.salary ? [{ label: 'Salary', value: `₹${employee.salary.toLocaleString('en-IN')}`, icon: '💰' }] : [])
                    ].map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-green-50 p-1.5 rounded-md border border-gray-100 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2">
                          <span className="text-xs flex-shrink-0">{item.icon}</span>
                          <div className="min-w-0 flex-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">{item.label}</label>
                            <p className="text-gray-900 font-medium text-xs break-words">{item.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-2 text-center">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-sm mx-auto">
                  <button 
                    onClick={() => navigate('/employee-dashboard/leaves')}
                    className="flex items-center justify-center gap-1.5 p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium text-xs">Apply Leave</span>
                  </button>
                  <button 
                    onClick={() => navigate(`/employee-dashboard/salary/${user._id}`)}
                    className="flex items-center justify-center gap-1.5 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <span className="text-sm font-bold flex-shrink-0">₹</span>
                    <span className="font-medium text-xs">View Salary</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile