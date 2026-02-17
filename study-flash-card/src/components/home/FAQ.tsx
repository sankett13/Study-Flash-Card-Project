"use client";
import React, { useState } from "react";

const faqData = [
  {
    question: "Is it really free?",
    answer:
      "Yes! Our core features are completely free to use. Create unlimited decks, generate AI flashcards, and study with spaced repetition at no cost.",
  },
  {
    question: "How does the AI work?",
    answer:
      "Our AI uses advanced natural language processing to analyze your content, extract key concepts, and generate intelligent flashcards that focus on the most important information.",
  },
  {
    question: "What is spaced repetition?",
    answer:
      "Spaced repetition is a scientifically proven learning technique that schedules review sessions at optimal intervals, helping you retain information in long-term memory more effectively.",
  },
  {
    question: "Can I edit AI-generated cards?",
    answer:
      "Absolutely! All AI-generated flashcards are fully editable. You can modify questions, answers, or create new cards manually to customize your study experience.",
  },
  {
    question: "What subjects does it work for?",
    answer:
      "Our platform works for any subject! Whether you're studying medicine, languages, history, programming, or any other topic, the AI adapts to your content.",
  },
  {
    question: "Do I need to download anything?",
    answer:
      "No downloads required! Everything works directly in your web browser. Just sign up and start creating flashcards immediately.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side */}
          <div className="lg:sticky lg:top-24">
            <h2 className="font-bold tracking-tight text-gray-900 leading-tight
              text-3xl sm:text-4xl md:text-5xl mb-6">
              Any questions?
              <br />
              We got you.
            </h2>

            <p className="text-gray-600 leading-relaxed max-w-md mb-8
              text-sm sm:text-base md:text-lg">
              Everything you need to know about how Flashcards works, pricing,
              and getting started.
            </p>

            <a
              href="#"
              className="inline-flex items-center text-primary font-semibold hover:opacity-80 transition group"
            >
              More FAQs
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Right Side - Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-blue-100 bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between text-left group"
                >
                  <span className="font-semibold text-gray-900 pr-6
                    text-base sm:text-lg group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-2xl text-gray-400 leading-none">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base pr-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
