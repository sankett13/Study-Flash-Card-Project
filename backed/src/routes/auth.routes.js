import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { signup, login, getMe } from "../controllers/auth.controller.js";

const router = express.Router();
const prisma = new PrismaClient();

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// GET CURRENT USER (protected route example)
router.get("/me", authenticateToken, getMe);

export default router;
