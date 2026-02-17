import React from "react";
import { MdAccessTime, MdAutorenew } from "react-icons/md";
import { HiQuestionMarkCircle } from "react-icons/hi2";

export default function ProblemSolution() {
  const solutions = [
    {
      icon: MdAccessTime,
      problem: "Spending hours making flashcards?",
      solution: "AI generates them in 30 seconds",
    },
    {
      icon: MdAutorenew,
      problem: "Forgetting everything after exams?",
      solution: "Spaced repetition ensures long-term retention",
    },
    {
      icon: HiQuestionMarkCircle,
      problem: "Don't know what to study next?",
      solution: "Algorithm tells you exactly which cards to review",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Study Smarter,{" "}
            <span className="font-source-serif-4 font-light italic text-blue-600">
              Not Harder
            </span>
          </h2>
        </div>

        {/* Problem-Solution List */}
        <div className="space-y-12 sm:space-y-16 relative">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
              >
                {/* Problem Side */}
                <div className="flex items-start gap-4 md:justify-end">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 md:text-right">
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                      {item.problem}
                    </p>
                  </div>
                </div>

                {/* Divider (desktop only, fixed positioning) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
                  <div className="w-px h-14 bg-blue-200"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <div className="w-px h-14 bg-blue-200"></div>
                </div>

                {/* Solution Side */}
                <div className="md:pl-4">
                  <p className="text-lg sm:text-xl font-semibold text-blue-600 leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
