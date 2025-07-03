import z from "zod";

export const SendOtpInput = z.object({
  email: z.string().email(),
  purpose: z.enum(["login", "register"]),
});

export type SendOtpInputType = z.infer<typeof SendOtpInput>;

export const VerifyOtpInput = z.object({
  identifier: z.string().min(2).max(255),
  otp: z.string().length(6, { message: "Minimum Otp length is 6" }),
  purpose: z.enum(["login", "register"]),
});
export type VerifyOtpInputType = z.infer<typeof VerifyOtpInput>;
