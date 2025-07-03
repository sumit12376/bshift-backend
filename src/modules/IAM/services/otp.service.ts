import { VerifyOtpInputType, type SendOtpInputType } from "../schema/otp.schema";
import { generateOtp } from "../../../utils/security/otp";
import { sendMail } from "../../../utils/email";
// import { getCachedItem } from "@/utils/redis/redisHelper";
// import { setCachedItem } from "@/utils/redis/redisHelper";
import { getCachedItem, setCachedItem } from "../../../utils/redis/redisHelper";
import jwt from "jsonwebtoken"; // Make sure you install & configure this properly

const MAX_ATTEMPTS = 5;
const OTP_TTL = 10 * 60; // 10 minutes

enum RedisIdentifier {
  OTP = 'OTP',
}

export async function sendOtpService(input: SendOtpInputType): Promise<{
  success: boolean;
  message: string;
}> {
  const {  email, purpose } = input;
  const userCacheKey = `${RedisIdentifier.OTP}::${email}`;

  const cachedData = await getCachedItem(userCacheKey);

  if (cachedData?.attempts && cachedData.attempts >= MAX_ATTEMPTS) {
    throw new Error("You have reached the maximum number of OTP requests.");
  }

  const otp = generateOtp();
  const newAttemptCount = (cachedData?.attempts || 0) + 1;

  await setCachedItem(
    userCacheKey,
    {
      otp,
      attempts: newAttemptCount,
      purpose,
    },
    OTP_TTL
  );

  console.log(`OTP attempt #${newAttemptCount} for ${email}`);

  const subject = `${purpose.charAt(0).toUpperCase()}${purpose.slice(1)} OTP`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>${subject}</h2>
      <p>Your OTP is:</p>
      <h1 style="color: #007bff;">${otp}</h1>
      <p>This OTP will expire in <strong>10 minutes</strong>.</p>
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
): Promise<{ success: boolean; token: string }> {
  const { identifier, otp, purpose } = otpInput;
  const userCacheKey = `OTP::${identifier}`;

  const rawCached = await getCachedItem(userCacheKey);

  if (!rawCached) {
    throw new Error("OTP has expired or is invalid.");
  }

  const cached = typeof rawCached === "string" ? JSON.parse(rawCached) : rawCached;

  if (cached.otp !== otp) {
    throw new Error("Invalid OTP.");
  }

  if (cached.purpose !== purpose) {
    throw new Error("OTP purpose mismatch.");
  }

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
