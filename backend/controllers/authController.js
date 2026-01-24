import asyncHandler from "../utils/asyncHandler.js";
import { loginService } from "../services/authService.js";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 1000, // 1 hour
};

export const login = asyncHandler(async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  const { token, user } = await loginService({ email, password });

  res.cookie("token", token, COOKIE_OPTS).json({
    success: true,
    message: "Login successful",
    data: user,
  });
});
