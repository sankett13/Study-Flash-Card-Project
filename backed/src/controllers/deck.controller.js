import { PrismaClient } from "@prisma/client";
import { generateQuiz } from "../lib/llm.js";

const prisma = new PrismaClient();

// Get all decks for logged-in user
export const getAllDecks = async (req, res) => {
  try {
    const decks = await prisma.deck.findMany({
      where: { userId: req.user.userId },
      include: {
        cards: {
          select: {
            id: true,
            nextReview: true,
            updatedAt: true,
            imageUrl: true,
            isMastered: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    decks.forEach((deck) => {
      deck.totalCards = deck.cards.length;
      deck.masteredCards = deck.cards.filter((card) => card.isMastered).length;
      deck.dueToday = deck.cards.filter(
        (card) => card.nextReview && new Date(card.nextReview) <= new Date(),
      ).length;
    });

    res.json(decks);
  } catch (error) {
    console.error("Get decks error:", error);
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

// Get single deck with all cards
export const getDeck = async (req, res) => {
  try {
    const deck = await prisma.deck.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId, // Security: only get user's own deck
      },
      include: {
        cards: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!deck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    res.json(deck);
  } catch (error) {
    console.error("Get deck error:", error);
    res.status(500).json({ error: "Failed to fetch deck" });
  }
};

// Create new deck
export const createDeck = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const deck = await prisma.deck.create({
      data: {
        title: title.trim(),
        description: description?.trim(),
        userId: req.user.userId,
      },
    });

    res.status(201).json(deck);
  } catch (error) {
    console.error("Create deck error:", error);
    res.status(500).json({ error: "Failed to create deck" });
  }
};

// Update deck
export const updateDeck = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check ownership
    const existingDeck = await prisma.deck.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!existingDeck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    const deck = await prisma.deck.update({
      where: { id: req.params.id },
      data: {
        title: title?.trim(),
        description: description?.trim(),
      },
    });

    res.json(deck);
  } catch (error) {
    console.error("Update deck error:", error);
    res.status(500).json({ error: "Failed to update deck" });
  }
};

// Delete deck
export const deleteDeck = async (req, res) => {
  try {
    // Check ownership
    const existingDeck = await prisma.deck.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!existingDeck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    await prisma.deck.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Deck deleted successfully" });
  } catch (error) {
    console.error("Delete deck error:", error);
    res.status(500).json({ error: "Failed to delete deck" });
  }
};

// Generate quiz for a deck
export const generateQuizForDeck = async (req, res) => {
  try {
    // Fetch the deck with its cards
    const deck = await prisma.deck.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
      include: {
        cards: true,
      },
    });

    if (!deck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    // Generate quiz using LLM
    const quiz = await generateQuiz(deck);
    console.log("Generated quiz:", quiz);

    res.json({ quiz });
  } catch (error) {
    console.error("Generate quiz error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};
