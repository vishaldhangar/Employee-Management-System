 
 import express from 'express';
 import authMiddleware from '../middleware/authMiddleware.js';
 import { addDepartment,getDepartments,getDepartment,updateDepartment,deleteDep } from '../controllers/departmentController.js';

 const router=express.Router()

 router.get('/',getDepartments)
 router.post('/add', authMiddleware, addDepartment);
 router.get('/:id',authMiddleware,getDepartment)
 router.put('/:id',authMiddleware,updateDepartment)
 router.delete('/:id',authMiddleware,deleteDep)

 export default router