 
 import express from 'express';
 import authMiddleware from '../middleware/authMiddleware.js';
 

 import { addEmployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId,deleteEmp} from '../controllers/employeeController.js';

 const router=express.Router()

 router.get('/',authMiddleware,getEmployees)
 router.post('/add', authMiddleware,upload.single("profileImage"), addEmployee);
 router.get('/:id',authMiddleware,getEmployee)
 router.put('/:id',authMiddleware,updateEmployee)
 router.get('/department/:id',authMiddleware,fetchEmployeesByDepId)
 router.delete('/:id',authMiddleware,deleteEmp)

 export default router