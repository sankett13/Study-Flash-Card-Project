"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { deckAPI } from "@/lib/decks.api";
import { quizAPI } from "@/lib/quiz.api";
import Loading from "@/components/shared/open/Loading";
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
      // Fetch deck details
      const deckRes = await deckAPI.getOne(deckId);
      setDeck(deckRes.data);

      // Generate quiz using LLM backend
      const quiz = await quizAPI.generateQuiz(deckId);

      if (quiz.length === 0) {
        alert("No cards in this deck to quiz on!");
        router.push(`/decks/${deckId}/edit`);
        return;
      }

      setQuestions(quiz);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      alert("Failed to load quiz. Please try again.");
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white">
        <Loading message="Generating quiz..." size="lg" />
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden flex items-center justify-center py-8">
        {/* Blue glow effects */}
        <div className="pointer-events-none absolute -top-32 right-1/3 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-1/4 -left-48 h-[400px] w-[400px] rounded-full bg-blue-400/15 blur-[140px]" />

        <div className="max-w-2xl w-full px-4 relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-blue-100">
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
                        className="bg-red-50 border border-red-200 rounded-2xl p-4"
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetake}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg"
              >
                Retake Quiz
              </button>
              <Link
                href={`/decks/${deckId}/study`}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg"
              >
                Study Flashcards
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
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

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
          <h1 className="text-2xl font-bold text-gray-900">
            {deck?.title} - Quiz
          </h1>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-blue-600 font-medium mb-2">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>
              Score: {score}/{currentIndex + (showResult ? 1 : 0)}
            </span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 border border-blue-100 hover:border-blue-200 transition-all duration-300">
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
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                    showCorrect
                      ? "bg-green-50 border-green-500 shadow-lg"
                      : showWrong
                        ? "bg-red-50 border-red-500 shadow-lg"
                        : isSelected
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-blue-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md"
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
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
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
