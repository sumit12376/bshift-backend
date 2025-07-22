import express from "express";
import { GetOrder, PlaceOrder } from "../controller/controller";

const router = express.Router();

router.post("/placeorder", PlaceOrder);
router.get("/getOrder/:id", GetOrder);


export default router;
