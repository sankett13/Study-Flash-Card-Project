"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { cardAPI } from "@/lib/cards.api";
import { deckAPI } from "@/lib/decks.api";
import Loading from "@/components/shared/open/Loading";
import Link from "next/link";

interface Card {
  id: string;
  front: string;
  back: string;
  imageUrl: string | null;
  imageKeyword: string | null;
  createdAt: string;
}

interface Deck {
  id: string;
  title: string;
  description: string | null;
  totalCards: number;
  cards: Card[];
}

export default function EditDeckPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.id as string;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editFront, setEditFront] = useState("");
  const [editBack, setEditBack] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

  useEffect(() => {
    fetchDeck();
  }, [deckId]);

  const fetchDeck = async () => {
    try {
      const response = await deckAPI.getOne(deckId);
      setDeck(response.data);
    } catch (error) {
      console.error("Failed to fetch deck:", error);
      alert("Failed to load deck");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card.id);
    setEditFront(card.front);
    setEditBack(card.back);
  };

  const handleSaveEdit = async (cardId: string) => {
    if (!editFront.trim() || !editBack.trim()) {
      alert("Front and back cannot be empty");
      return;
    }

    try {
      await cardAPI.update(cardId, {
        front: editFront.trim(),
        back: editBack.trim(),
      });

      // Update local state
      setDeck((prev) =>
        prev
          ? {
              ...prev,
              cards: prev.cards.map((c) =>
                c.id === cardId
                  ? { ...c, front: editFront.trim(), back: editBack.trim() }
                  : c,
              ),
            }
          : null,
      );

      setEditingCard(null);
    } catch (error) {
      console.error("Failed to update card:", error);
      alert("Failed to update card");
    }
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
    setEditFront("");
    setEditBack("");
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm("Delete this card?")) return;

    try {
      await cardAPI.delete(cardId);

      // Update local state
      setDeck((prev) =>
        prev
          ? {
              ...prev,
              cards: prev.cards.filter((c) => c.id !== cardId),
              totalCards: prev.totalCards - 1,
            }
          : null,
      );
    } catch (error) {
      console.error("Failed to delete card:", error);
      alert("Failed to delete card");
    }
  };

  const handleAddCard = async () => {
    if (!newFront.trim() || !newBack.trim()) {
      alert("Front and back cannot be empty");
      return;
    }

    try {
      const response = await cardAPI.create({
        front: newFront.trim(),
        back: newBack.trim(),
        deckId: deckId,
      });

      // Update local state
      setDeck((prev) =>
        prev
          ? {
              ...prev,
              cards: [...prev.cards, response.data],
              totalCards: prev.totalCards + 1,
            }
          : null,
      );

      // Reset form
      setNewFront("");
      setNewBack("");
      setShowAddCard(false);
    } catch (error) {
      console.error("Failed to add card:", error);
      alert("Failed to add card");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-white">
        <Loading message="Loading deck..." size="lg" />
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Deck not found</p>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800 hover:underline mt-4 inline-block font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden py-8">
      {/* Blue glow effects */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/3 -right-48 h-[400px] w-[400px] rounded-full bg-blue-400/15 blur-[140px]" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 mb-4 font-medium"
          >
            ← Back to Dashboard
          </Link>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6">
            <h1 className="text-3xl font-bold text-gray-900">{deck.title}</h1>
            {deck.description && (
              <p className="text-gray-600 mt-2">{deck.description}</p>
            )}
            <div className="mt-4 flex items-center gap-4 text-sm text-blue-600 font-medium">
              <span>📚 {deck.totalCards} cards</span>
            </div>
          </div>
        </div>

        {/* Cards List */}
        <div className="space-y-4">
          {deck.cards.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-blue-300 shadow-lg">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No cards yet
              </h3>
              <p className="text-gray-600 mb-4">
                Add your first flashcard to start studying
              </p>
              <button
                onClick={() => setShowAddCard(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg"
              >
                + Add First Card
              </button>
            </div>
          ) : (
            <>
              {/* Card Items */}
              {deck.cards.map((card, index) => (
                <div
                  key={card.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6"
                >
                  {editingCard === card.id ? (
                    /* Edit Mode */
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-2">
                          Front (Question)
                        </label>
                        <textarea
                          value={editFront}
                          onChange={(e) => setEditFront(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-700 mb-2">
                          Back (Answer)
                        </label>
                        <textarea
                          value={editBack}
                          onChange={(e) => setEditBack(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(card.id)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium shadow-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all duration-200 text-sm font-medium border border-blue-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-semibold text-blue-600">
                          Card {index + 1}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditCard(card)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCard(card.id)}
                            className="text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-bold text-blue-500 uppercase mb-1 tracking-wider">
                            Question
                          </p>
                          <p className="text-gray-900">{card.front}</p>
                        </div>
                        <div className="border-t pt-3">
                          <p className="text-xs font-bold text-blue-500 uppercase mb-1 tracking-wider">
                            Answer
                          </p>
                          <p className="text-gray-900">{card.back}</p>
                        </div>
                        {card.imageUrl && (
                          <div className="border-t pt-3">
                            <p className="text-xs font-bold text-blue-500 uppercase mb-2 tracking-wider">
                              Image
                            </p>
                            <img
                              src={card.imageUrl}
                              alt=""
                              className="rounded-xl max-h-48 object-cover border border-blue-100"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Add Card Button */}
              {!showAddCard && (
                <button
                  onClick={() => setShowAddCard(true)}
                  className="w-full py-4 border-2 border-dashed border-blue-300 rounded-2xl text-blue-600 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  + Add New Card
                </button>
              )}
            </>
          )}

          {/* Add Card Form */}
          {showAddCard && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">
                Add New Card
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Front (Question) *
                  </label>
                  <textarea
                    value={newFront}
                    onChange={(e) => setNewFront(e.target.value)}
                    placeholder="What is photosynthesis?"
                    rows={3}
                    className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Back (Answer) *
                  </label>
                  <textarea
                    value={newBack}
                    onChange={(e) => setNewBack(e.target.value)}
                    placeholder="The process by which plants convert light energy into chemical energy..."
                    rows={3}
                    className="w-full px-4 py-2 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddCard}
                    disabled={!newFront.trim() || !newBack.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    Add Card
                  </button>
                  <button
                    onClick={() => {
                      setShowAddCard(false);
                      setNewFront("");
                      setNewBack("");
                    }}
                    className="px-6 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all duration-200 text-sm font-medium border border-blue-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
