import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  getCardsByDeck,
  getDueCards,
  createCard,
  updateCard,
  deleteCard,
  rateCard,
} from "../controllers/card.controller.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/cards/deck/:deckId - Get all cards in deck
router.get("/deck/:deckId", getCardsByDeck);

// GET /api/cards/deck/:deckId/due - Get cards due for review
router.get("/deck/:deckId/due", getDueCards);

// POST /api/cards - Create card
router.post("/", createCard);

// PUT /api/cards/:id - Update card
router.put("/:id", updateCard);

// DELETE /api/cards/:id - Delete card
router.delete("/:id", deleteCard);

// POST /api/cards/:id/rate - Rate card (spaced repetition)
router.post("/:id/rate", rateCard);

export default router;
