import {BrowserRouter ,Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/Dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import EditEmployee from './components/employee/EditEmployee';
import AddSalary from './components/Salary/AddSalary';
import ViewPage from './components/Salary/ViewPage';
import Summary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leave/List';
import AddLeave from './components/leave/AddLeave';
import Setting from './components/EmployeeDashboard/Setting';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Navigate to ="/admin-dashboard"/>}></Route> 
         <Route path="/login" element={<Login />}></Route> 
         <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={['admin']}>
          <AdminDashboard />
          </RoleBasedRoutes>
          </PrivateRoutes>}>
          <Route index element={<AdminSummary />}></Route>

          <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>

          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
          <Route path="/admin-dashboard/employee/:id" element={<View />}></Route>
          <Route path="/admin-dashboard/employee/edit/:id" element={<EditEmployee />}></Route>
          <Route path="/admin-dashboard/employee/salary/:id" element={<ViewPage />}></Route>

          <Route path="/admin-dashboard/salary/add" element={<AddSalary />}></Route>
          </Route> 
         <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={['admin','employee']}>
          <EmployeeDashboard />
          </RoleBasedRoutes>
          </PrivateRoutes>
          }>



<Route index element={<Summary />}></Route>

<Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
<Route path="/employee-dashboard/leaves" element={<LeaveList />}></Route>
<Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
<Route path="/employee-dashboard/salary/:id" element={<ViewPage />}></Route>
<Route path="/employee-dashboard/setting" element={<Setting />}></Route>

          </Route> 
      </Routes>
    </BrowserRouter>  
  )
}

export default App
