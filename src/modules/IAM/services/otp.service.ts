import { VerifyOtpInputType, type SendOtpInputType } from "../schema/otp.schema";
import { generateOtp } from "../../../utils/security/otp";
import { sendMail } from "../../../utils/email";
// import { getCachedItem } from "@/utils/redis/redisHelper";
// import { setCachedItem } from "@/utils/redis/redisHelper";
import { getCachedItem, setCachedItem } from "../../../utils/redis/redisHelper";
import jwt from "jsonwebtoken";
import { UserEmployee } from "../../../modules/User_employee/models/userEmployee.model";

const MAX_ATTEMPTS = 5;
const OTP_TTL = 10 * 60; // 10 minutes

enum RedisIdentifier {
  OTP = 'OTP',
}

export async function sendOtpService(input: SendOtpInputType): Promise<{
  success: boolean;
  message: string;
}> {
  const { email, purpose } = input;
  const userCacheKey = `${RedisIdentifier.OTP}::${email}`;

  const cachedData = await getCachedItem(userCacheKey);

  if (cachedData?.attempts && cachedData.attempts >= MAX_ATTEMPTS) {
    throw new Error("You have reached the maximum number of OTP requests.");
  }

  // Only check for existing user if purpose is login
  if (purpose === 'login') {
    const user = await UserEmployee.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found with the provided email.");
    }
  }

  const otp = generateOtp();
  const newAttemptCount = (cachedData?.attempts || 0) + 1;

  // Prepare cache data - don't include user.id for registration
  const cacheData: any = {
    otp,
    attempts: newAttemptCount,
    purpose,
    email
  };

  // Only include user ID if it's login and user exists
  if (purpose === 'login') {
    const user = await UserEmployee.findOne({ where: { email } });
    if (user) {
      cacheData.id = user.id;
    }
  }

  await setCachedItem(userCacheKey, cacheData, OTP_TTL);

  console.log(`OTP attempt #${newAttemptCount} for ${email}`);

  const subject = `${purpose.charAt(0).toUpperCase()}${purpose.slice(1)} OTP`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f3f3f3;">
      <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color: #2c3e50;">${subject}</h2>
        <p>Hello,</p>
        <p>Thank you for using <strong>DeRestaurant</strong> – your all-in-one solution for restaurant management.</p>

        <p>To <strong>${purpose === 'login' ? 'log in to' : 'complete your registration on'}</strong> DeRestaurant, please use the following One-Time Password (OTP):</p>

        <div style="text-align: center; margin: 30px 0;">
          <h1 style="color: #e67e22; font-size: 42px; letter-spacing: 6px;">${otp}</h1>
        </div>

        <p><strong>Note:</strong> This OTP is valid for <strong>10 minutes</strong> and can be used only once. For your security, do not share it with anyone.</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

        <p>If you did not request this OTP, please ignore this email or contact our support team immediately.</p>
        <p>Need help? Just reply to this email or reach us at <a href="mailto:support@derestaurant.com">support@derestaurant.com</a>.</p>

        <p style="margin-top: 30px;">Warm regards,<br><strong>DeRestaurant Team</strong></p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">
        <p>&copy; ${new Date().getFullYear()} DeRestaurant. All rights reserved.</p>
      </div>
    </div>
  `;

  await sendMail(email, subject, htmlContent);

  return {
    success: true,
    message: "OTP sent successfully to your email.",
  };
}

export async function verifyOtp(
  otpInput: VerifyOtpInputType
): Promise<{ success: boolean; token?: string }> {
  const { identifier, otp, purpose } = otpInput;
  const userCacheKey = `${RedisIdentifier.OTP}::${identifier}`;

  const cached = await getCachedItem(userCacheKey);

  if (!cached) {
    throw new Error("OTP has expired or is invalid.");
  }

  if (cached.otp !== otp) {
    throw new Error("Invalid OTP.");
  }

  if (cached.purpose !== purpose) {
    throw new Error("OTP purpose mismatch.");
  }
  if (purpose === 'login') {
    const { id, email } = cached;
    if (!id || !email) {
      throw new Error("Missing user data in cache.");
    }

    const token = jwt.sign(
      { id, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return {
      success: true,
      token,
    };
  }

  return {
    success: true
  };
}