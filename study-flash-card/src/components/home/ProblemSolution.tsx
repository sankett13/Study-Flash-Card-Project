"use client";
import React from "react";
import { MdAccessTime, MdAutorenew } from "react-icons/md";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { motion } from "framer-motion";

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
    <section id="solutions" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Study Smarter,{" "}
            <span className="font-source-serif-4 font-light italic text-blue-600">
              Not Harder
            </span>
          </h2>
        </motion.div>

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
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-start gap-4 md:justify-end"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 md:text-right">
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                      {item.problem}
                    </p>
                  </div>
                </motion.div>

                {/* Divider (desktop only, fixed positioning) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 56 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-px bg-blue-200"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="w-3 h-3 rounded-full bg-blue-600"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 56 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-px bg-blue-200"
                  />
                </div>

                {/* Solution Side */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="md:pl-4"
                >
                  <p className="text-lg sm:text-xl font-semibold text-blue-600 leading-relaxed">
                    {item.solution}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
