import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Study FlashCard
              </h3>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Master any subject with AI-powered flashcards and scientifically
              proven spaced repetition. Join thousands of students studying
              smarter.
            </p>
            <div className="flex gap-5 text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
                Platform
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    AI Generator
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
                Resources
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
                Legal
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Study FlashCard. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Modern Accent Bar */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-700 w-full h-1.5"></div>
    </footer>
  );
}
