"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { aiAPI } from "@/lib/llm.api";
import { deckAPI } from "@/lib/decks.api";
import Link from "next/link";

export default function NewDeckPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatingAI, setGeneratingAI] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Create deck
      const deckResponse = await deckAPI.create({
        title: title.trim(),
        description: description.trim() || undefined,
      });
      const deckId = deckResponse.data.id;

      // Step 2: Generate flashcards if content provided
      if (content.trim() && content.trim().length >= 50) {
        setGeneratingAI(true);
        try {
          await aiAPI.generate(deckId, content.trim());
        } catch (aiError: any) {
          console.error("AI generation error:", aiError);
          // Don't fail - deck is created, just warn user
          alert(
            "Deck created but AI generation failed. You can add cards manually.",
          );
        }
      }

      // Step 3: Redirect to edit page
      router.push(`/decks/${deckId}/edit`);
    } catch (err: any) {
      console.error("Create deck error:", err);
      setError(err.response?.data?.error || "Failed to create deck");
      setLoading(false);
      setGeneratingAI(false);
    }
  };

  const contentLength = content.trim().length;
  const isContentValid = contentLength === 0 || contentLength >= 50;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden py-8">
      {/* Blue glow effects */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/3 -right-48 h-[400px] w-[400px] rounded-full bg-blue-400/15 blur-[140px]" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 mb-4 font-medium"
          >
            ← Back to Dashboard
          </Link>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Deck
            </h1>
            <p className="text-gray-600 mt-2">
              Add your study material and let AI generate flashcards
              automatically
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm">
              {error}
            </div>
          )}

          {/* Deck Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-blue-700 mb-2"
            >
              Deck Name <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Biology Chapter 3: Cell Division"
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-blue-700 mb-2"
            >
              Description{" "}
              <span className="text-blue-400 font-normal">(optional)</span>
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Covers mitosis, meiosis, and cell cycle"
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
              disabled={loading}
            />
          </div>

          {/* Content for AI */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-blue-700 mb-2"
            >
              Study Material{" "}
              <span className="text-blue-400 font-normal">
                (for AI generation)
              </span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your notes, textbook content, lecture slides, or any study material here.

AI will automatically generate flashcards covering key concepts, definitions, and important details.

Leave empty to create a blank deck and add cards manually later."
              rows={14}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm transition-all duration-200 shadow-sm"
              disabled={loading}
            />
            <div className="mt-2 flex justify-between items-center text-sm">
              <span
                className={
                  contentLength > 0 && contentLength < 50
                    ? "text-red-600"
                    : "text-gray-500"
                }
              >
                {contentLength} characters
                {contentLength > 0 && contentLength < 50 && (
                  <span className="ml-2">
                    (minimum 50 characters for AI generation)
                  </span>
                )}
              </span>
              {contentLength >= 50 && (
                <span className="text-green-600 font-medium">
                  ✓ Ready for AI generation
                </span>
              )}
            </div>
          </div>

          {/* Info Box */}
          {contentLength >= 50 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
              <div className="flex gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    AI will generate 10-15 flashcards
                  </p>
                  <p className="text-xs text-blue-700">
                    Powered by Google Gemini. Takes about 3-5 seconds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || !title.trim() || !isContentValid}
              className="flex-1 px-6 py-3 bg-gradient-to-b from-blue-700 to-blue-400 text-white rounded-xl font-medium hover:from-blue-800 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {generatingAI
                    ? "Generating flashcards..."
                    : "Creating deck..."}
                </>
              ) : content.trim() && contentLength >= 50 ? (
                "✨ Create & Generate Flashcards"
              ) : (
                "Create Empty Deck"
              )}
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white/80 backdrop-blur-sm text-blue-700 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200 inline-flex items-center border border-blue-200 shadow-lg"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
