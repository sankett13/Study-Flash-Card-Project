"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { deckAPI } from "@/lib/decks.api";
import { cardAPI } from "@/lib/cards.api";
import { generateQuiz } from "@/lib/quiz.api";
import Link from "next/link";

interface QuizQuestion {
  cardId: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Deck {
  id: string;
  title: string;
}

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.id as string;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    fetchDeckAndGenerateQuiz();
  }, [deckId]);

  const fetchDeckAndGenerateQuiz = async () => {
    try {
      const [deckRes, cardsRes] = await Promise.all([
        deckAPI.getOne(deckId),
        cardAPI.getByDeck(deckId),
      ]);

      setDeck(deckRes.data);

      if (cardsRes.data.length === 0) {
        alert("No cards in this deck to quiz on!");
        router.push(`/decks/${deckId}/edit`);
        return;
      }

      const quiz = generateQuiz(cardsRes.data, 10);
      setQuestions(quiz);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      alert("Failed to load quiz");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return; // Already answered

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === questions[currentIndex].correctAnswer;
    setAnswers([...answers, isCorrect]);

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);

    // Re-shuffle questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating quiz...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-2xl w-full px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Result Icon */}
            <div className="text-6xl mb-4">{passed ? "🎉" : "📚"}</div>

            {/* Score */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Quiz Complete!
            </h2>
            <div className="text-5xl font-bold mb-4">
              <span className={passed ? "text-green-600" : "text-orange-600"}>
                {percentage}%
              </span>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              You got {score} out of {questions.length} correct
            </p>

            {/* Message */}
            <p className="text-gray-700 mb-8">
              {passed
                ? "🌟 Great job! You really know this material!"
                : "💪 Keep studying! You'll get it next time."}
            </p>

            {/* Review Wrong Answers */}
            {score < questions.length && (
              <div className="mb-8 text-left">
                <h3 className="font-semibold text-lg mb-4">Review:</h3>
                <div className="space-y-3">
                  {questions.map((q, index) => {
                    if (answers[index]) return null; // Skip correct answers

                    return (
                      <div
                        key={q.cardId}
                        className="bg-red-50 border border-red-200 rounded-lg p-4"
                      >
                        <p className="font-medium text-gray-900 mb-2">
                          {q.question}
                        </p>
                        <p className="text-sm text-gray-600">
                          Correct answer:{" "}
                          <span className="font-semibold text-green-700">
                            {q.correctAnswer}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRetake}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Retake Quiz
              </button>
              <Link
                href={`/decks/${deckId}/study`}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Study Flashcards
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
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

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
          <h1 className="text-2xl font-bold text-gray-900">
            {deck?.title} - Quiz
          </h1>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>
              Score: {score}/{currentIndex + (showResult ? 1 : 0)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    showCorrect
                      ? "bg-green-100 border-green-500"
                      : showWrong
                        ? "bg-red-100 border-red-500"
                        : isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                  } ${showResult ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{option}</span>
                    {showCorrect && (
                      <span className="text-green-600 text-xl">✓</span>
                    )}
                    {showWrong && (
                      <span className="text-red-600 text-xl">✗</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        {showResult && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-lg"
            >
              {currentIndex < questions.length - 1
                ? "Next Question →"
                : "See Results"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
