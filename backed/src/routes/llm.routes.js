import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { generateCards } from "../controllers/llm.controller.js";

const router = express.Router();

router.use(authenticateToken);

// POST /api/ai/generate - Generate flashcards from content
router.post("/generate", generateCards);

export default router;
