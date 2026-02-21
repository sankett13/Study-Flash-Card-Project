"use client";
import React from "react";
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-12"
          >
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
              retention. Our intelligent algorithm adapts to your learning pace,
              identifying weak areas and prioritizing them for review.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {/* Step 1 */}
            <motion.div variants={itemVariants}>
              <FeatureCard
                step={1}
                title="Create Deck"
                description="Paste your text, upload a PDF, or share a link. Our AI extracts key concepts and generates smart flashcards automatically."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                step={2}
                title="AI Generated Flashcards"
                description="Advanced AI analyzes your content and instantly generates context-aware flashcards, saving hours of manual work."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                step={3}
                title="Smart Review"
                description="Review flashcards at optimal intervals using spaced repetition to maximize retention and mastery."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                step={4}
                title="Track Progress & Quiz"
                description="Test your knowledge with AI quizzes and track progress using detailed analytics to stay motivated."
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
