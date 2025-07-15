import express from "express";
import { createMenuHandler, GetMenuHndler} from "./controller";
import { deleteMenus } from "./controller";
import { updateMenuController } from "./controller";
import { upload } from "../User_employee/util/cloudinary";
const router = express.Router();

router.post('/createMenu', upload.array('Image', 5), createMenuHandler);
router.get('/ListMenu/:restaurantId', GetMenuHndler);
router.delete('/Remove/:menuId', deleteMenus );
router.patch('/Update/:menuId',upload.array('Image', 5), updateMenuController );

export default router;
