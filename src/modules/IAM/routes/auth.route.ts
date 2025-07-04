import { checkUserPrasent, loginUserHandler } from "../controller/auth.controller";
import express from 'express'
const router = express.Router();
router.post('/login',loginUserHandler)
router.post('/checkuser',checkUserPrasent )
export default router;