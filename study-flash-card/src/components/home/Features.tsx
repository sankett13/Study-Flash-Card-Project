import React from "react";

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-12">
            <h2
              className="font-bold tracking-tight text-gray-900 max-w-2xl
              text-2xl sm:text-3xl md:text-4xl"
            >
              Everything you need to{" "}
              <span className="font-source-serif-4 font-light italic">
                ace your preparation
              </span>
            </h2>

            <p
              className="text-gray-600 max-w-xl leading-relaxed
              text-sm sm:text-base md:text-lg"
            >
              Leverage scientifically proven spaced repetition patterns to
              optimize your study sessions and ensure long-term memory
              retention.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="flex flex-col h-full rounded-2xl border border-blue-100 bg-blue-50 p-6 transition-all hover:shadow-md hover:-translate-y-1">
              <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs sm:text-sm font-semibold text-white mb-4">
                Step 1
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Create Deck
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Paste your text, upload a PDF, or share a link. Our AI extracts
                key concepts and generates smart flashcards automatically.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col h-full rounded-2xl border border-blue-100 bg-blue-50 p-6 transition-all hover:shadow-md hover:-translate-y-1">
              <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs sm:text-sm font-semibold text-white mb-4">
                Step 2
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                AI Generated Flashcards
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Advanced AI analyzes your content and instantly generates
                context-aware flashcards, saving hours of manual work.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col h-full rounded-2xl border border-blue-100 bg-blue-50 p-6 transition-all hover:shadow-md hover:-translate-y-1">
              <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs sm:text-sm font-semibold text-white mb-4">
                Step 3
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Smart Review
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Review flashcards at optimal intervals using spaced repetition
                to maximize retention and mastery.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col h-full rounded-2xl border border-blue-100 bg-blue-50 p-6 transition-all hover:shadow-md hover:-translate-y-1">
              <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs sm:text-sm font-semibold text-white mb-4">
                Step 4
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Track Progress & Quiz
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Test your knowledge with AI quizzes and track progress using
                detailed analytics to stay motivated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
