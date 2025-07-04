import { SendOtpInput, VerifyOtpInput } from "../schema/otp.schema";
import { Request, Response, NextFunction } from 'express';
import { sendOtpService } from "../services/otp.service";
import { verifyOtp } from "../services/otp.service";
export const sendOtp = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = SendOtpInput.parse(request.body);
    const result = await sendOtpService(data);
    response.status(200).json(result);
  } catch (error: any) {
    response.status(400).json({
      success: false,
      message:'Something went wrong',
    });
  }
};
export const verify = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inputData = VerifyOtpInput.parse(request.body);
    console.log("input", inputData)
    const result = await verifyOtp(inputData);

    response.status(200).json({
      success: true,
      token: result.token,
    });
  } catch (error: any) {
    console.error("VERIFY OTP ERROR:", error);
    response.status(400).json({
      success: false,
      message:'Something went wrong',
    });
  }
};
