import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-white overflow-hidden">
      {/* Subtle Blue Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-blue-300/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-blue-300/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
              Study FlashCard
            </h3>

            <p className="text-slate-600 max-w-lg text-justify leading-relaxed font-medium">
              Revolutionize your learning experience with our AI-powered
              flashcard platform. Create, organize, and master any subject with
              intelligent spaced repetition and personalized study
              recommendations.
            </p>

            <div className="flex gap-5 text-slate-400">
              <a href="#" className="hover:text-slate-700 transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="hover:text-slate-700 transition-colors">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-5 tracking-wide">
              Quick Links
            </h4>

            <ul className="space-y-3 flex flex-row gap-4">
              {[
                "Features",
                "Pricing",
                "Help Center",
                "Contact Us",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-slate-900 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-400 text-center">
            &copy; {new Date().getFullYear()} Study FlashCard. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
