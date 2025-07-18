import { createCartSchema } from "../schema/schema";
import { CartService } from "../service/service";
import { Request, Response } from "express";
import { cartschema } from "../schema/schema";

export const CartController = {
  async create(req: Request, res: Response) {
    try {
      console.log("BODY:", req.body);

      const validated = createCartSchema.parse(req.body);
      console.log("validation", validated);
      const cart = await CartService.createCart(validated);
      console.log(cart);
      return res.status(201).json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getCarts(
    req: Request,
    res: Response,
    next: (error: unknown) => void
  ): Promise<void> {
    try {
      const input = cartschema.parse(req.body);

      const result = await CartService.Getcartservice(input);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error); // Pass to global error handler
    }
  }
};

// function next(error: unknown) {
//   // Simple error handler: log and send generic error response
//   console.error("Error in controller:", error);
//   // In a real Express app, this would be handled by middleware
//   // Here, just throw to simulate error propagation
//   throw error;
// }

// function next(error: unknown) {
//   throw new Error("Function not implemented.");
// }
