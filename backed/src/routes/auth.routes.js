import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../middleware/auth.middleware.js";
import passport from "../lib/passport.js";
import {
  signup,
  login,
  getMe,
  googleAuth,
  googleCallback,
} from "../controllers/auth.controller.js";

const router = express.Router();
const prisma = new PrismaClient();

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// GET CURRENT USER (protected route example)
router.get("/me", authenticateToken, getMe);

// GOOGLE OAUTH ROUTES
router.get("/google", googleAuth);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback,
);

export default router;
