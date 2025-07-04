import { NextFunction, Request, Response } from "express";
import { LoginInputSchema } from "../schema/auth.schema";
import { loginUser } from "../services/auth.service";
import { checkUser } from "../schema/auth.schema";
import { checkUsers } from "../services/auth.service";
export const checkUserPrasent = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input = checkUser.parse(request.body);
    const result = await checkUsers({
      identifier: input.identifier,
    });

    if (!result.success) {
      response.status(404).json({ success: false, message: result.message });
      return;
    }

    response.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUserHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const input = LoginInputSchema.parse(request.body);
    const result = await loginUser({
      identifier: input.identifier,
      password: input.password,
    });
if (!result.status) {
  response.status(400).json({ success: false, message: result.message });
  return;
}

response.status(200).json({
  success: true,
  message: result.message,
  user: result.user,
});
  } catch (error) {

    next(error); 
  }
};


// if (!result.status) {
//   response.status(400).json({ success: false, message: result.message });
//   return;
// }

// response.status(200).json({
//   success: true,
//   message: result.message,
//   user: result.user,
// });

