import React from "react";
import Link from "next/link";

export default function Navbar() {
  const NAV_LINKS = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "/features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 max-w-7xl z-50 bg-white/70 backdrop-blur-lg rounded-full border border-white/20 shadow-lg transition-all duration-300">
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">
                Flashcards
              </span>
            </div>
          </div>
          <div className="flex items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-pink-600 after:transition-transform after:duration-300 after:origin-left group-hover:after:scale-x-100">
                  {link.title}
                </span>
              </Link>
            ))}
            <Link
              href="/login"
              className="group px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-pink-600 after:transition-transform after:duration-300 after:origin-left group-hover:after:scale-x-100">
                Log in
              </span>
            </Link>

            <Link
              href="/signup"
              className="ml-4 px-4 py-2 text-sm font-medium text-gray-100 bg-pink-600 rounded-full hover:bg-pink-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
