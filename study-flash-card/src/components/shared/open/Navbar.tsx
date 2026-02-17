"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Button from "./Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "Pricing", href: "/pricing" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      {/* NAVBAR PILL */}
      <div className="rounded-full bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-gray-900">
              Flashcards
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-gray-700 font-medium relative group"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              <Link
                href="/login"
                className="text-gray-700 font-medium relative group"
              >
                Log in
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link
                href="/signup"
                className="ml-4 rounded-full bg-gradient-to-b from-blue-700 to-blue-400 text-white px-4 py-2 font-medium"
              >
                Sign up
              </Link>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {open ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (SEPARATE LAYER) */}
      {open && (
        <div className="md:hidden mt-3 rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-700 font-medium py-2"
              >
                {link.title}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-gray-700 font-medium py-2"
            >
              Log in
            </Link>

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-primary text-white text-center py-2 font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
