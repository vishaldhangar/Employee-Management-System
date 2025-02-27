import React from 'react'
import { Navigate } from 'react-router-dom'
import {useAuth} from '../context/authContext'

const RoleBasedRoutes = ({children,requiredRole}) => {
    const {user,loading}=useAuth()

    if(loading){
         return <div>loading....</div>
    }
    if(!requiredRole.includes(user.role)){
        <Navigate to ="/unauthorized"/>
    }
  return user ? children : <Navigate to ="/login"/>
}

export default RoleBasedRoutes