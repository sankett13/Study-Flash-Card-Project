"use client";
import React from "react";
import Image from "next/image";
import { SiGooglegemini } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";

export default function HomeHero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white"
    >
      {/* Blurred blue glow background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-blue-400/30 blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="pointer-events-none absolute top-1/3 -right-48 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-blue-400/20 blur-[140px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="pointer-events-none absolute bottom-45 -left-48 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-blue-400/20 blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-16 sm:pb-20">
        <motion.div
          className="grid grid-cols-1 gap-12 sm:gap-14"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* --- Text Content --- */}
          <div className="flex flex-col gap-5 sm:gap-6 items-center text-center pt-4">
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3 border border-gray-300 px-4 py-2 rounded-full shadow-sm bg-white text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <FiUsers className="text-blue-600 w-4 h-4" />
                <span className="text-gray-700 font-medium">
                  Join 100+ early users
                </span>
              </div>

              <div className="hidden sm:block w-px h-5 bg-gray-300" />

              <div className="flex items-center gap-2">
                <SiGooglegemini className="text-blue-600 w-4 h-4" />
                <span className="text-gray-700 font-medium">
                  Powered by{" "}
                  <span className="font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Google Gemini
                  </span>
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-bold tracking-tight text-gray-900 max-w-4xl leading-snug md:leading-none
              text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem]"
            >
              Mastery made easy. Turn Your Notes Into{" "}
              <span className="relative inline-flex items-center justify-center mx-2">
                <span className="inline-block relative z-10 text-red-500 font-sans font-normal -rotate-12">
                  A+
                </span>
                <svg
                  className="absolute -inset-3 w-[calc(100%+1.5rem)] h-[calc(100%+1.5rem)] text-red-500/40 -rotate-6"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M95,50 C95,75 75,95 50,95 C25,95 5,75 5,50 C5,25 25,5 50,5 C70,5 90,20 92,45"
                    fill="none"
                    stroke="red"
                    strokeWidth="4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>{" "}
              Grades.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 max-w-2xl leading-relaxed
              text-sm sm:text-base md:text-lg lg:text-xl"
            >
              Turn your notes into smart flashcards, ace any exam with
              AI-powered quizzes, and master any subject with ease.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <button
                className="flex-1 rounded-full bg-gradient-to-b from-blue-700 to-blue-400 
                text-white text-center font-medium
                px-6 py-2 sm:px-8 sm:py-3 
                text-sm sm:text-base
                hover:from-blue-800 hover:to-blue-600 
                transform hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-xl hover:shadow-blue-500/25
                transition-all duration-300 ease-out
                border-0 cursor-pointer"
              >
                Get Started For Free
              </button>
              <button
                className="flex-1 rounded-full border border-gray-300 bg-white text-gray-900 
                font-medium px-6 py-2 sm:px-8 sm:py-3
                text-sm sm:text-base
                hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 
                hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-300 ease-out
                cursor-pointer"
              >
                Learn More
              </button>
            </motion.div>
          </div>

          {/* --- Image Section --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="relative max-w-5xl mx-auto w-full"
          >
            <div className="shadow-lg rounded-2xl">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/home/ourDashboard.png"
                  alt="Study Flashcard Dashboard"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
