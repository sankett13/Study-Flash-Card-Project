"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { deckAPI } from "@/lib/decks.api";
import { cardAPI } from "@/lib/cards.api";
import Loading from "@/components/shared/open/Loading";
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white">
        <Loading message="Loading study session..." size="lg" />
      </div>
    );
  }

  if (sessionComplete || cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden flex items-center justify-center">
        {/* Blue glow effects */}
        <div className="pointer-events-none absolute -top-32 right-1/3 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-1/4 -left-48 h-[400px] w-[400px] rounded-full bg-blue-400/15 blur-[140px]" />

        <div className="text-center max-w-md px-4 relative z-10">
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
              className="px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-400 text-white rounded-xl hover:from-blue-800 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg"
            >
              View Deck
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-700 rounded-xl hover:bg-blue-50 transition-all duration-200 font-medium border border-blue-200 shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden py-8">
      {/* Blue glow effects */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/3 -right-48 h-[400px] w-[400px] rounded-full bg-blue-400/15 blur-[140px]" />

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={`/decks/${deckId}/edit`}
            className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 mb-4 font-medium"
          >
            ← Back to Deck
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{deck?.title}</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-blue-600 font-medium mb-2">
            <span>
              Card {currentIndex + 1} of {cards.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-700 to-blue-400 h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Celebration Banner */}
        {showCelebration && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-2xl p-4 animate-bounce shadow-lg border-green-300">
            <p className="text-green-700 font-semibold text-center">
              🎉 Card Mastered! You'll see this less often now.
            </p>
          </div>
        )}

        {/* Flashcard */}
        <div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 min-h-[400px] cursor-pointer relative border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Mastery Badge */}
          {currentCard.isMastered && (
            <div className="absolute top-4 right-4">
              <span className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full font-semibold border border-green-200 shadow-sm">
                ✓ Mastered
              </span>
            </div>
          )}

          {/* Card Content */}
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            {!isFlipped ? (
              /* Front */
              <div>
                <p className="text-sm text-blue-500 uppercase font-bold mb-4 tracking-wider">
                  Question
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {currentCard.front}
                </h2>
                <p className="text-sm text-blue-400 mt-8">
                  Click or press Space to reveal answer
                </p>
              </div>
            ) : (
              /* Back */
              <div>
                <p className="text-sm text-blue-500 uppercase font-bold mb-4 tracking-wider">
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
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(0);
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="text-lg">Again</div>
              <div className="text-xs opacity-90">Forgot it</div>
              <div className="text-xs opacity-70 mt-1">Press 1</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(1);
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="text-lg">Hard</div>
              <div className="text-xs opacity-90">Struggled</div>
              <div className="text-xs opacity-70 mt-1">Press 2</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(2);
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="text-lg">Good</div>
              <div className="text-xs opacity-90">Got it</div>
              <div className="text-xs opacity-70 mt-1">Press 3</div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRating(3);
              }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="text-lg">Easy</div>
              <div className="text-xs opacity-90">Too easy!</div>
              <div className="text-xs opacity-70 mt-1">Press 4</div>
            </button>
          </div>
        )}

        {/* Keyboard Hint */}
        <p className="text-center text-sm text-blue-400 mt-4 font-medium">
          {!isFlipped
            ? "Press Space to flip card"
            : "Press 1-4 to rate your recall"}
        </p>
      </div>
    </div>
  );
}
