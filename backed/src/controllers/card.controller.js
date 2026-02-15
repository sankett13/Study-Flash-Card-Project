import { PrismaClient } from '@prisma/client';
import { scheduleCard } from '../lib/spacedRepetition.js';

const prisma = new PrismaClient();

// Get all cards for a deck
export const getCardsByDeck = async (req, res) => {
  try {
    const { deckId } = req.params;

    // Verify deck ownership
    const deck = await prisma.deck.findFirst({
      where: {
        id: deckId,
        userId: req.user.userId,
      },
    });

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const cards = await prisma.card.findMany({
      where: { deckId },
      orderBy: { createdAt: 'asc' },
    });

    res.json(cards);
  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

// Get cards due for review
export const getDueCards = async (req, res) => {
  try {
    const { deckId } = req.params;

    // Verify deck ownership
    const deck = await prisma.deck.findFirst({
      where: {
        id: deckId,
        userId: req.user.userId,
      },
    });

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const cards = await prisma.card.findMany({
      where: {
        deckId,
        nextReview: {
          lte: new Date(),
        },
      },
      orderBy: [
        { isMastered: 'asc' }, // Non-mastered first
        { nextReview: 'asc' }, // Then by due date
      ],
    });

    res.json(cards);
  } catch (error) {
    console.error('Get due cards error:', error);
    res.status(500).json({ error: 'Failed to fetch due cards' });
  }
};

// Create card manually
export const createCard = async (req, res) => {
  try {
    const { front, back, deckId, imageUrl, imageKeyword } = req.body;

    if (!front || !back || !deckId) {
      return res.status(400).json({ error: 'front, back, and deckId are required' });
    }

    // Verify deck ownership
    const deck = await prisma.deck.findFirst({
      where: {
        id: deckId,
        userId: req.user.userId,
      },
    });

    if (!deck) {
      return res.status(404).json({ error: 'Deck not found' });
    }

    const card = await prisma.card.create({
      data: {
        front: front.trim(),
        back: back.trim(),
        deckId,
        imageUrl: imageUrl || null,
        imageKeyword: imageKeyword || null,
      },
    });

    // Update deck stats
    await prisma.deck.update({
      where: { id: deckId },
      data: {
        totalCards: {
          increment: 1,
        },
      },
    });

    res.status(201).json(card);
  } catch (error) {
    console.error('Create card error:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
};

// Update card
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { front, back, imageUrl, imageKeyword } = req.body;

    // Get card and verify ownership
    const card = await prisma.card.findUnique({
      where: { id },
      include: { deck: true },
    });

    if (!card || card.deck.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const updatedCard = await prisma.card.update({
      where: { id },
      data: {
        front: front?.trim(),
        back: back?.trim(),
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        imageKeyword: imageKeyword !== undefined ? imageKeyword : undefined,
      },
    });

    res.json(updatedCard);
  } catch (error) {
    console.error('Update card error:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
};

// Delete card
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    // Get card and verify ownership
    const card = await prisma.card.findUnique({
      where: { id },
      include: { deck: true },
    });

    if (!card || card.deck.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Card not found' });
    }

    await prisma.card.delete({
      where: { id },
    });

    // Update deck stats
    await prisma.deck.update({
      where: { id: card.deckId },
      data: {
        totalCards: {
          decrement: 1,
        },
        ...(card.isMastered && {
          masteredCards: {
            decrement: 1,
          },
        }),
      },
    });

    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Delete card error:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
};

// Rate card (spaced repetition)
export const rateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (rating === undefined || rating < 0 || rating > 3) {
      return res.status(400).json({ error: 'rating must be 0, 1, 2, or 3' });
    }

    // Get card and verify ownership
    const card = await prisma.card.findUnique({
      where: { id },
      include: { deck: true },
    });

    if (!card || card.deck.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Calculate new schedule
    const update = scheduleCard(card, rating);

    // Update card
    const updatedCard = await prisma.card.update({
      where: { id },
      data: update,
    });

    // Update deck mastered count if mastery status changed
    if (update.isMastered !== card.isMastered) {
      await prisma.deck.update({
        where: { id: card.deckId },
        data: {
          masteredCards: {
            [update.isMastered ? 'increment' : 'decrement']: 1,
          },
        },
      });
    }

    res.json({
      card: updatedCard,
      justMastered: update.isMastered && !card.isMastered,
      lostMastery: !update.isMastered && card.isMastered,
    });
  } catch (error) {
    console.error('Rate card error:', error);
    res.status(500).json({ error: 'Failed to rate card' });
  }
};