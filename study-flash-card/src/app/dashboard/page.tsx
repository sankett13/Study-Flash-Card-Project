"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { deckAPI } from "@/lib/decks.api";
import Link from "next/link";
import DashboardLayout from "@/components/shared/auth/DashboardLayout";
import Loading from "@/components/shared/open/Loading";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { FaFire } from "react-icons/fa";

interface Card {
  id: string;
  nextReview: string;
  updatedAt: string;
  imageUrl: string | null;
  isMastered: boolean;
}

interface Deck {
  id: string;
  title: string;
  description: string | null;
  totalCards: number;
  masteredCards: number;
  dueToday: number;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { user, loadUser, logout } = useAuthStore();
  const router = useRouter();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (!user && !localStorage.getItem("authToken")) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      fetchDecks();
    }
  }, [user]);

  const fetchDecks = async () => {
    try {
      const response = await deckAPI.getAll();
      setDecks(response.data);
    } catch (error) {
      console.error("Failed to fetch decks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This will delete all its cards.`,
      )
    ) {
      return;
    }

    try {
      await deckAPI.delete(id);
      setDecks(decks.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Failed to delete deck:", error);
      alert("Failed to delete deck");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white">
        <Loading message="Authenticating..." size="lg" />
      </div>
    );
  }

  const totalCards = decks.reduce((sum, deck) => sum + deck.totalCards, 0);
  const masteredCards = decks.reduce(
    (sum, deck) => sum + deck.masteredCards,
    0,
  );
  const retentionRate =
    totalCards > 0 ? ((masteredCards / totalCards) * 100).toFixed(1) : 0;

  // Find weakest deck (lowest mastery percentage)
  const decksWithStats = decks
    .map((deck) => ({
      ...deck,
      masteryPercentage:
        deck.totalCards > 0 ? (deck.masteredCards / deck.totalCards) * 100 : 0,
    }))
    .sort((a, b) => a.masteryPercentage - b.masteryPercentage);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden">
      {/* Blurred blue glow background */}
      {/* <div className="pointer-events-none absolute -top-32 right-1/3 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -left-48 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-400/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-48 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-400/15 blur-[120px]" /> */}

      <DashboardLayout />

      <main className="flex-1 p-10 overflow-y-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
              <p className="text-sm text-blue-600 mt-1 font-medium">
                Welcome back, {user?.email?.split("@")[0]}
              </p>
            </div>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loading
                message="Loading your dashboard..."
                size="md"
              />
            </div>
          ) : decks.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BsStack className="text-gray-400 text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No decks found
              </h2>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                Start your learning journey by creating your first flashcard
                deck.
              </p>
              <Link
                href="/decks/new"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Create First Deck
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column - Stats and Decks */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                {/* Stats Grid */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Total Decks */}
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-blue-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 block">
                        Total Decks
                      </span>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                          {decks.length}
                        </span>
                        <span className="text-xs text-blue-600 font-medium mb-1.5 flex items-center gap-0.5">
                          <FaArrowTrendUp className="text-[10px]" />
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total Cards */}
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-blue-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 block">
                        Total Cards
                      </span>
                      <span className="text-3xl font-bold text-gray-900">
                        {totalCards}
                      </span>
                    </div>
                  </div>

                  {/* Mastery/Mastered */}
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-blue-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 block">
                        Mastered Cards
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-gray-900">
                          {masteredCards}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Daily Streak */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl shadow-xl border border-blue-500 flex flex-col justify-between text-white">
                    <div>
                      <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1 block">
                        Daily Streak
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          <FaFire />
                        </span>
                        <span className="text-3xl font-bold">
                          {(() => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const activeDates = decks
                              .map((d) => new Date(d.updatedAt))
                              .map((d) => {
                                d.setHours(0, 0, 0, 0);
                                return d.getTime();
                              })
                              .filter((v, i, a) => a.indexOf(v) === i)
                              .sort((a, b) => b - a);

                            let streak = 0;
                            let current = today.getTime();
                            for (const date of activeDates) {
                              if (date === current) {
                                streak++;
                                current -= 86400000;
                              } else if (date < current) break;
                            }
                            return streak;
                          })()}
                        </span>
                        <span className="text-xs text-blue-200 font-medium mt-2">
                          days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decks Section */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Your Decks
                    </h2>
                    <Link
                      href="/decks/new"
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      View all
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {decks.map((deck) => (
                      <div
                        key={deck.id}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-blue-100 flex flex-col justify-between group hover:shadow-xl transition-all"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-bold text-gray-900 truncate">
                              {deck.title}
                            </h3>
                            <button
                              onClick={() => handleDelete(deck.id, deck.title)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            >
                              <MdDelete size={18} />
                            </button>
                          </div>
                          <p className="text-xs text-gray-400 mb-4">
                            {deck.description?.slice(0, 20) || "No description"}
                            {deck.description && deck.description.length > 20
                              ? "..."
                              : ""}
                          </p>

                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                                Cards
                              </span>
                              <span className="text-xs font-bold text-gray-900">
                                {deck.totalCards}
                              </span>
                            </div>
                            <div className="w-px h-3 bg-blue-100"></div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                                Due
                              </span>
                              <span
                                className={`text-xs font-bold ${deck.dueToday > 0 ? "text-orange-500" : "text-gray-900"}`}
                              >
                                {deck.dueToday}
                              </span>
                            </div>
                          </div>

                          <div className="w-full bg-blue-50 h-0.5 rounded-full mb-6 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-700 h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${deck.totalCards > 0 ? (deck.masteredCards / deck.totalCards) * 100 : 0}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            href={`/decks/${deck.id}/study`}
                            className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                          >
                            Study
                          </Link>
                          <Link
                            href={`/decks/${deck.id}/edit`}
                            className="flex-1 py-2.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-xl text-center hover:bg-blue-100 transition-colors border border-blue-200"
                          >
                            View/Edit
                          </Link>
                          <Link
                            href={`/decks/${deck.id}/quiz`}
                            className="flex-1 py-2.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-xl text-center hover:bg-blue-100 transition-colors border border-blue-200"
                          >
                            Quiz
                          </Link>
                        </div>
                      </div>
                    ))}

                    {/* Add New Deck Card */}

                    <Link href="/decks/new" className="h-full">
                      <div className="h-full bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:border-blue-300 hover:bg-blue-100/50 transition-all group min-h-[180px]">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-400 group-hover:text-blue-600 transition-colors">
                          <span className="text-2xl">+</span>
                        </div>
                        <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                          New Deck
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                {/* Retention Card */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-blue-100">
                  <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-8">
                    Retention
                  </h3>
                  <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        <defs>
                          <linearGradient
                            id="blueGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#1D4ED8" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="#DBEAFE"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="url(#blueGradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          strokeDashoffset={`${2 * Math.PI * 70 * (1 - Number(retentionRate) / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-bold text-gray-900">
                          {retentionRate}%
                        </span>
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                          Mastery
                        </span>
                      </div>
                    </div>
                    <p className="mt-8 text-xs text-gray-500 text-center leading-relaxed">
                      You've mastered{" "}
                      <span className="font-bold text-gray-900">
                        {masteredCards}
                      </span>{" "}
                      of your{" "}
                      <span className="font-bold text-gray-900">
                        {totalCards}
                      </span>{" "}
                      cards so far.
                    </p>
                  </div>
                </div>

                {/* Suggestions Card */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-blue-100">
                  <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-6">
                    Suggestions
                  </h3>
                  <div className="space-y-4">
                    {decksWithStats.length > 0 &&
                    decksWithStats[0].masteryPercentage < 100 ? (
                      <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">
                            Focus Area
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 font-medium mb-1">
                          {decksWithStats[0].title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Low mastery (
                          {decksWithStats[0].masteryPercentage.toFixed(0)}%).
                          Consider a review session today.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-center">
                        <p className="text-xs font-bold text-green-700 uppercase tracking-widest">
                          All Clear
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Excellent progress on all decks!
                        </p>
                      </div>
                    )}

                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">
                        Learning Tip
                      </p>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Spaced repetition works best with small, daily study
                        sessions rather than long marathons.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
