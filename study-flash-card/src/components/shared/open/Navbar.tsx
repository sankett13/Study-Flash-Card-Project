"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { title: "Home", href: "#home" },
    { title: "Features", href: "#features" },
    { title: "Solutions", href: "#solutions" },
    { title: "FAQ", href: "#faq" },
    { title: "Contact", href: "#contact" },
  ];

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    setOpen(false); // Close mobile menu
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      {/* GLASS NAVBAR */}
      <div
        className="rounded-full 
        bg-white/20 
        backdrop-blur-2xl 
        border border-white/20 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] 
        ring-1 ring-white/10"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-gray-900">
              Flashcards
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-gray-900 font-medium relative group transition cursor-pointer"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}

              <Link
                href="/login"
                className="text-gray-900 font-medium relative group transition"
              >
                Log in
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/signup"
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
                Sign up
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {open ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE GLASS MENU */}
      {open && (
        <div
          className="md:hidden mt-3 rounded-2xl 
          bg-white/10 
          backdrop-blur-2xl 
          border border-white/20 
          shadow-xl"
        >
          <div className="px-6 py-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-white/80 hover:text-white font-medium py-2 transition cursor-pointer"
              >
                {link.title}
              </a>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white font-medium py-2 transition"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg 
              bg-gradient-to-b from-blue-700 to-blue-400 
              text-white 
              text-center 
              py-2 
              font-medium 
              hover:from-blue-800 hover:to-blue-600 
              transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
