import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  getAllDecks,
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
  generateQuizForDeck,
} from "../controllers/deck.controller.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/decks - Get all user's decks
router.get("/", getAllDecks);

// GET /api/decks/:id - Get single deck
router.get("/:id", getDeck);

// POST /api/decks - Create new deck
router.post("/", createDeck);

router.post("/:id/quiz", generateQuizForDeck);

// PUT /api/decks/:id - Update deck
router.put("/:id", updateDeck);

// DELETE /api/decks/:id - Delete deck
router.delete("/:id", deleteDeck);

export default router;
