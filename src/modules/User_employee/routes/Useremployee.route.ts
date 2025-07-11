import express from "express";
import { upload } from '../util/cloudinary';


import { createEmployee, updateEmployee } from "../controller/userEmployee.controller";
import { getEmployee } from "../controller/userEmployee.controller";
import { deleteemployee } from "../controller/userEmployee.controller";

const router = express.Router();
router.post('/create',upload.single('profile'),createEmployee)
router.post('/getEmployee',getEmployee)
router.delete('/delete/:id', deleteemployee);
router.patch('/update/:id',updateEmployee)
export default router

