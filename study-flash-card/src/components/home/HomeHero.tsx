import React from "react";
import Image from "next/image";
import { SiGooglegemini } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";

export default function HomeHero() {
  return (
    <section className="relative bg-gray-100 py-20 pt-40 overflow-hidden">

      {/* --- Main Content --- */}
      {/* Added relative and z-10 to ensure content stays ABOVE the papers */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
          <div className="flex flex-col gap-6 items-center">
            {/* Updated badge with Gemini branding */}
            <div className="flex flex-row gap-3 border rounded-full border-gray-300 px-4 py-2 items-center shadow-sm bg-white">
              {/* Early Users Badge */}
              <div className="flex items-center gap-2">
                <FiUsers className="text-pink-600 w-4 h-4" />
                <span className="text-sm text-gray-700 font-medium">
                  Join 100+ early users
                </span>
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-300"></div>

              {/* Powered by Gemini */}
              <div className="flex items-center gap-2">
                <SiGooglegemini className="text-blue-600 w-4 h-4" />
                <span className="text-sm text-gray-700 font-medium">
                  Powered by{" "}
                  <span className="font-semibold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Google Gemini
                  </span>
                </span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl tracking-tight max-w-4xl text-center">
              Mastery made easy. Learning that sticks, without the struggle.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl text-center">
              Turn your notes into smart flashcards, ace any exam with
              AI-powered quizzes, and master any subject with ease.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3.5 bg-pink-600 text-gray-50 font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 active:bg-pink-700">
                Get Started For Free
              </button>
              <button className="px-8 py-3.5 bg-white text-gray-900 font-bold rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 active:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
