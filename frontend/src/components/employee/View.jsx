import React, { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from '../ui/LoadingSpinner'
import Card from '../ui/Card'

const View = () => {
 
    const {id}=useParams()
    const navigate = useNavigate()
    const[employee,setEmployee]=useState(null)
    const[loading,setLoading]=useState(true)

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Employee Not Found</h3>
            <p className="text-gray-600 mb-4">The employee you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/admin-dashboard/employees')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Employees
            </button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
                <p className="text-gray-600 mt-1">Complete employee information</p>
              </div>
              <button
                onClick={() => navigate('/admin-dashboard/employees')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ← Back to Employees
              </button>
            </div>
          </div>
        </div>

        {/* Employee Details */}
        <Card>
          <div className="space-y-8">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                  {employee.userId.profileImage ? (
                    <img
                      src={employee.userId.profileImage}
                      alt={`${employee.userId.name}'s profile`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/128x128/6b7280/ffffff?text=' + employee.userId.name.charAt(0).toUpperCase();
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {employee.userId.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{employee.userId.name}</h2>
                  <p className="text-lg text-gray-600">{employee.designation}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {employee.userId.role === 'manager' ? 'Admin' : 'Employee'}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {employee.department.dep_name}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Employee ID</label>
                    <p className="text-gray-900 font-medium">{employee.employeeId}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Address</label>
                    <p className="text-gray-900 font-medium">{employee.userId.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900 font-medium">{new Date(employee.dob).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-900 font-medium capitalize">{employee.gender}</p>
                  </div>
                  
                  {employee.maritalStatus && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Marital Status</label>
                      <p className="text-gray-900 font-medium capitalize">{employee.maritalStatus}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Work Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p className="text-gray-900 font-medium">{employee.department.dep_name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Designation</label>
                    <p className="text-gray-900 font-medium">{employee.designation}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Role</label>
                    <p className="text-gray-900 font-medium">{employee.userId.role === 'manager' ? 'Admin' : 'Employee'}</p>
                  </div>
                  
                  {employee.salary && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Salary</label>
                      <p className="text-gray-900 font-medium">₹{employee.salary.toLocaleString('en-IN')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default View