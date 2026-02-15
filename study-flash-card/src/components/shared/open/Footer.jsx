import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col py-6">
        <div className="grid grid-cols-4">
          <div className="grid col-span-2 flex-col">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Study FlashCard
            </h3>
            <p className="text-sm text-gray-500">
              &copy; 2023 Study FlashCard. All rights reserved.
            </p>
          </div>
          <div className="grid col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="grid-col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Follow Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-pink-600 w-full h-8 mt-8"></div>
    </footer>
  );
}
