import express from "express";
import { createEmployee, updateEmployee } from "../controller/userEmployee.controller";
import { getEmployee } from "../controller/userEmployee.controller";
import { deleteemployee } from "../controller/userEmployee.controller";

const router = express.Router();
router.post('/create',createEmployee)
router.post('/getEmployee',getEmployee)
router.delete('/delete/:id', deleteemployee);
router.patch('/update/:id',updateEmployee)
export default router

