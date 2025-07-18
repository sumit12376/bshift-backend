import express from 'express'
const router = express.Router();
import { CartController } from '../controller/controller';
router.post('/createcart',CartController.create )
router.post('/getCart', CartController.getCarts )
export default router;