
import { createMenu, updateMenuService, GetMenu, removeMenuServices } from "./services";
import { createMenuSchema, GetMenuByRestaurant, updateMenuSchema, deleteMenu } from "./schema";
import { Request, Response } from "express";
import { z } from "zod";

export const createMenuHandler = async (req: Request, res: Response) => {
  try {
    console.log("Received req.body:", req.body);
    console.log("Received req.files:", req.files);

    const parsed = createMenuSchema.parse({
      ...req.body,
      price: Number(req.body.price),
      restaurantId: Number(req.body.restaurantId),
    });


    const files = req.files as Express.Multer.File[]; 
    console.log("filddlsmd",files)
    const imagePaths = files?.map((file) => file.path) ?? [];
console.log("imahemkivn",imagePaths)
    const menu = await createMenu({
      ...parsed,
        Image: imagePaths,
    });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menu,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};



export const GetMenuHndler = async(req:Request, res:Response)=>{
  try {
    const parsed = GetMenuByRestaurant.parse(req.params);
    const result = await GetMenu(parsed);
    res.status(201).json({
      success: result.success,
      message:result.message,
      data: result.data,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

export const deleteMenus = async(req:Request, res: Response)=>{
  console.log("Params:", req.params);

  try {
    const parsed = deleteMenu.parse(req.params);
    const result = await removeMenuServices(parsed)
        res.status(201).json({
      success: result.success,
      message:result.message,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message:error.message
    })
  }
}

export const updateMenuController = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const imagePaths = files?.map((file) => file.path) ?? [];

   const parsed = updateMenuSchema.parse({
  ...req.body,
  ...req.params,
  price: Number(req.body.price),         
  ...(imagePaths.length > 0 && {Image: imagePaths }),
});


    const result = await updateMenuService(parsed);

    res.status(200).json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

