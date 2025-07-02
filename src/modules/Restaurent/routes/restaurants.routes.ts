 import express from "express"
import { createRestaurant } from "../controller/restaurant.controller";
 import { getRestaurantList } from "../controller/restaurant.controller";
const router = express.Router();

 router.post('/create', createRestaurant)
router.post('/list', getRestaurantList )
 export default router;
