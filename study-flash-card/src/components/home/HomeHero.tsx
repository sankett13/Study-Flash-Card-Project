import React from "react";
import Image from "next/image";
import { SiGooglegemini } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import Button from "../shared/open/Button";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Blurred blue glow background */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-blue-400/30 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-48 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-blue-400/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-45 -left-48 h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] rounded-full bg-blue-400/20 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 gap-12 sm:gap-14">
          {/* --- Text Content --- */}
          <div className="flex flex-col gap-5 sm:gap-6 items-center text-center pt-4">
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3 border border-gray-300 px-4 py-2 rounded-full shadow-sm bg-white text-xs sm:text-sm">
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
            </div>

            {/* Headline */}
            <h1
              className="font-bold tracking-tight text-gray-900 max-w-4xl leading-snug md:leading-none
              text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem]"
            >
              Mastery made easy. Learning that sticks, without the struggle.
            </h1>

            {/* Subtext */}
            <p
              className="text-gray-600 max-w-2xl leading-relaxed
              text-sm sm:text-base md:text-lg lg:text-xl"
            >
              Turn your notes into smart flashcards, ace any exam with
              AI-powered quizzes, and master any subject with ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button btnName="Get Started For Free" location="/signup" />

              <button className="px-7 py-3 text-sm sm:text-base bg-white text-gray-900 font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 active:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>

          {/* --- Image Section --- */}
          <div className="relative max-w-5xl mx-auto w-full">
            <div className="shadow-lg rounded-2xl">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/home/our_dashboard.png"
                  alt="Study Flashcard Dashboard"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
