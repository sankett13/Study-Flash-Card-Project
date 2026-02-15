import { PrismaClient } from "@prisma/client";
import { generateFlashcards } from "../lib/llm.js";

const prisma = new PrismaClient();

export const generateCards = async (req, res) => {
  try {
    const { deckId, content } = req.body;

    // Validation
    if (!deckId || !content) {
      return res.status(400).json({
        error: "deckId and content are required",
      });
    }

    if (content.trim().length < 50) {
      return res.status(400).json({
        error: "Content must be at least 50 characters",
      });
    }

    // Check deck ownership
    const deck = await prisma.deck.findFirst({
      where: {
        id: deckId,
        userId: req.user.userId,
      },
    });

    if (!deck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    console.log("Generating flashcards with Gemini...");

    // Generate flashcards with AI
    const flashcards = await generateFlashcards(content);

    console.log(`Generated ${flashcards.length} flashcards`);

    // Save cards to database
    const createdCards = await prisma.card.createMany({
      data: flashcards.map((card) => ({
        front: card.front,
        back: card.back,
        imageKeyword: card.imageKeyword || null,
        deckId: deckId,
      })),
    });

    // Update deck stats
    await prisma.deck.update({
      where: { id: deckId },
      data: {
        totalCards: {
          increment: flashcards.length,
        },
      },
    });

    res.json({
      message: "Flashcards generated successfully",
      count: createdCards.count,
      cards: flashcards,
    });
  } catch (error) {
    console.error("Generate cards error:", error);

    if (error.message.includes("Failed to generate")) {
      return res.status(500).json({
        error: "AI generation failed. Please try again with different content.",
      });
    }

    res.status(500).json({
      error: "Failed to generate flashcards",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
