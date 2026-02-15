"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { deckAPI } from "@/lib/decks.api";
import { cardAPI } from "@/lib/cards.api";
import Link from "next/link";

interface Card {
  id: string;
  front: string;
  back: string;
  imageUrl: string | null;
  isMastered: boolean;
  interval: number;
}

interface Deck {
  id: string;
  title: string;
}

export default function StudyPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.id as string;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    fetchDeckAndCards();
  }, [deckId]);

  const fetchDeckAndCards = async () => {
    try {
      const [deckRes, cardsRes] = await Promise.all([
        deckAPI.getOne(deckId),
        cardAPI.getDue(deckId),
      ]);

      setDeck(deckRes.data);
      setCards(cardsRes.data);

      if (cardsRes.data.length === 0) {
        setSessionComplete(true);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Failed to load study session");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (rating: number) => {
    const currentCard = cards[currentIndex];

    try {
      const response = await cardAPI.rate(currentCard.id, rating);

      // Show celebration if just mastered
      if (response.data.justMastered) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }

      // Move to next card
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
      } else {
        // Session complete
        setSessionComplete(true);
      }
    } catch (error) {
      console.error("Failed to rate card:", error);
      alert("Failed to save rating");
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (sessionComplete) return;

    if (e.code === "Space") {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    } else if (isFlipped) {
      if (e.code === "Digit1") handleRating(0);
      else if (e.code === "Digit2") handleRating(1);
      else if (e.code === "Digit3") handleRating(2);
      else if (e.code === "Digit4") handleRating(3);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFlipped, currentIndex, sessionComplete]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading study session...</p>
        </div>
      </div>
    );
  }

  if (sessionComplete || cards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Done!</h2>
          <p className="text-gray-600 mb-6">
            {cards.length === 0
              ? "No cards to review today. Great job staying on track!"
              : `You've reviewed ${cards.length} cards. Keep up the great work!`}
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href={`/decks/${deckId}/edit`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              View Deck
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/decks/${deckId}/edit`}
            className="text-blue-600 hover:underline inline-flex items-center gap-1 mb-4"
          >
            ← Back to Deck
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{deck?.title}</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Card {currentIndex + 1} of {cards.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Celebration Banner */}
        {showCelebration && (
          <div className="mb-4 bg-green-100 border border-green-400 rounded-lg p-4 animate-bounce">
            <p className="text-green-800 font-semibold text-center">
              🎉 Card Mastered! You'll see this less often now.
            </p>
          </div>
        )}

        {/* Flashcard */}
        <div
          className="bg-white rounded-lg shadow-lg p-8 min-h-[400px] cursor-pointer relative border-2 border-gray-200 hover:border-blue-300 transition"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Mastery Badge */}
          {currentCard.isMastered && (
            <div className="absolute top-4 right-4">
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
                ✓ Mastered
              </span>
            </div>
          )}

          {/* Card Content */}
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {!isFlipped ? (
              /* Front */
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold mb-4">
                  Question
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {currentCard.front}
                </h2>
                <p className="text-sm text-gray-400 mt-8">
                  Click or press Space to reveal answer
                </p>
              </div>
            ) : (
              /* Back */
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold mb-4">
                  Answer
                </p>
                <p className="text-xl text-gray-900 leading-relaxed">
                  {currentCard.back}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Rating Buttons */}
        {isFlipped && (
          <div className="mt-6 grid grid-cols-4 gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(0);
              }}
              className="bg-red-500 hover:bg-red-600 text-white py-4 px-4 rounded-lg font-semibold transition"
            >
              <div className="text-lg">Again</div>
              <div className="text-xs opacity-80">Forgot it</div>
              <div className="text-xs opacity-60 mt-1">Press 1</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(1);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white py-4 px-4 rounded-lg font-semibold transition"
            >
              <div className="text-lg">Hard</div>
              <div className="text-xs opacity-80">Struggled</div>
              <div className="text-xs opacity-60 mt-1">Press 2</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(2);
              }}
              className="bg-green-500 hover:bg-green-600 text-white py-4 px-4 rounded-lg font-semibold transition"
            >
              <div className="text-lg">Good</div>
              <div className="text-xs opacity-80">Got it</div>
              <div className="text-xs opacity-60 mt-1">Press 3</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(3);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-4 rounded-lg font-semibold transition"
            >
              <div className="text-lg">Easy</div>
              <div className="text-xs opacity-80">Too easy!</div>
              <div className="text-xs opacity-60 mt-1">Press 4</div>
            </button>
          </div>
        )}

        {/* Keyboard Hint */}
        <p className="text-center text-sm text-gray-400 mt-4">
          {!isFlipped
            ? "Press Space to flip card"
            : "Press 1-4 to rate your recall"}
        </p>
      </div>
    </div>
  );
}
