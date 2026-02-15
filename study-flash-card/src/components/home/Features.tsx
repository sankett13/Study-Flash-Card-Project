import React from "react";

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          <div className="flex flex-row justify-between items-start gap-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl max-w-2xl">
              Everything you need to{" "}
              <span className="font-source-serif-4 font-light italic">
                ace your Preparation
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-lg">
              Leverage scientifically proven spaced repetition patterns to
              optimize your study sessions and ensure long-term memory
              retention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            <div className="flex flex-col border border-gray-200 rounded-2xl p-6 h-full transition-all hover:border-pink-200 hover:shadow-sm bg-pink-50">
              <div className="bg-pink-600 text-gray-100 px-3 py-1 rounded-full text-sm font-semibold w-fit mb-4">
                Step 1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Create Deck
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Paste your text, upload a PDF, or share a link. Our AI will
                  automatically extract key concepts and generate smart
                  flashcards.
                </p>
              </div>
            </div>

            <div className="flex flex-col border border-gray-200 rounded-2xl p-6 h-full transition-all hover:border-pink-200 hover:shadow-sm bg-pink-50">
              <div className="bg-pink-600 text-gray-100 px-3 py-1 rounded-full text-sm font-semibold w-fit mb-4">
                Step 2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI Generated Flashcards
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI analyzes your content and instantly generates
                  smart, context-aware flashcards, saving you hours of manual
                  work.
                </p>
              </div>
            </div>

            <div className="flex flex-col border border-gray-200 rounded-2xl p-6 h-full transition-all hover:border-pink-200 hover:shadow-sm bg-pink-50">
              <div className="bg-pink-600 text-gray-100 px-3 py-1 rounded-full text-sm font-semibold w-fit mb-4">
                Step 3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Smart Review
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Review flashcards at optimal intervals to maximize retention.
                  Follow the science of learning with our spaced repetition
                  system, and master any subject with ease.
                </p>
              </div>
            </div>

            <div className="flex flex-col border border-gray-200 rounded-2xl p-6 h-full transition-all hover:border-pink-200 hover:shadow-sm bg-pink-50">
              <div className="bg-pink-600 text-gray-100 px-3 py-1 rounded-full text-sm font-semibold w-fit mb-4">
                Step 4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Track Progress and Quiz
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Test your knowledge with AI-generated quizzes and track your
                  progress with detailed analytics. Stay motivated and achieve
                  your learning goals with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
