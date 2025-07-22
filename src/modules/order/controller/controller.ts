import { type Request, type Response, type NextFunction } from "express";
import { getOrderSchema, orderSchema } from "../schema/schema";
import { getOrderService, placeorderService } from "../services/services";
export const PlaceOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsed = orderSchema.parse(request.body);
    const result = await placeorderService(parsed);
    response.status(201).json(result);
  } catch (error: any) {
    console.log("hiiii"  ,error)
    if (error.message.includes('foreign key constraint')) {
      response.status(400).json({ 
        success: false, 
        message: "Invalid user or menu reference" 
      });
    } else {
      response.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
};

export const GetOrder = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
  const id = Number(request.params.id);
const parsed = getOrderSchema.parse({ id });

    // const parsed = getOrderSchema.parse({ id });

    const result = await getOrderService(parsed);

    response.status(200).json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error: any) {
    response.status(500).json({ success: false, message: error.message });
    next(error);
  }
};
