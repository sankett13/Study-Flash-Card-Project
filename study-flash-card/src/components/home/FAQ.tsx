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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Heading and Description */}
          <div className="lg:sticky lg:top-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Any questions?
              <br />
              We got you.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              Yet bed any for assistance indulgence unpleasing. Not thoughts all
              exercise blessing. Indulgence way everything joy alteration
              boisterous the attachment.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-pink-600 font-semibold hover:text-pink-700 transition-colors group"
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

          {/* Right Side - FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between text-left group"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-8 group-hover:text-pink-600 transition-colors">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-gray-400 text-2xl font-light">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="mt-4 text-gray-600 leading-relaxed pr-8 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
