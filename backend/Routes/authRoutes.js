import express from "express";
import {
  emailAlreadyExists,
  isValidEmail,
  sendOTPToEmail,
  usernameAlreadyExists,
} from "../Middlewares/authMiddlewares.js";
import {
  verifyOTP,
  signUp,
  login,
  refreshAccessToken,
} from "../Controllers/authController.js";

const router = express.Router();

let refreshTokens = [];

router.post("/login", login);

router.post("/refresh-token", refreshAccessToken);

router.post("/verify-otp", verifyOTP);

router.post(
  "/signup",
  isValidEmail,
  emailAlreadyExists,
  usernameAlreadyExists,
  sendOTPToEmail,
  signUp
);

export default router;
