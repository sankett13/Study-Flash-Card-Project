import React, { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/authStore";
import { MdAnalytics, MdQuiz, MdLogout, MdPerson } from "react-icons/md";

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const [isActive, setIsActive] = useState("analytics");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { name: "Analytics", href: "/dashboard", icon: <MdAnalytics /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-blue-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-sm"></div>
            <span className="font-poppins text-gray-900 tracking-tight font-bold text-xl">
              StudyFlash
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`py-2 px-4 rounded-xl flex items-center gap-2 transition-all duration-200 group ${
                  isActive === link.name.toLowerCase()
                    ? "bg-blue-50 text-blue-700 font-medium border border-blue-200 shadow-sm"
                    : "text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border border-transparent"
                }`}
                onClick={() => setIsActive(link.name.toLowerCase())}
              >
                <span
                  className={`text-lg ${isActive === link.name.toLowerCase() ? "text-blue-600" : "text-gray-400 group-hover:text-blue-500"}`}
                >
                  {link.icon}
                </span>
                <span className="text-sm">{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Info and Logout */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 pl-3 rounded-full bg-blue-50 border border-blue-200 hover:border-blue-300 hover:bg-blue-100 transition-all group"
          >
            <div className="flex flex-col items-end mr-1 hidden sm:flex">
              <p className="text-[10px] font-bold text-gray-900 leading-none mb-0.5">
                {user?.email?.split("@")[0]}
              </p>
              <p className="text-[8px] text-blue-600 leading-none uppercase tracking-widest font-medium">
                Dashboard
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-blue-600 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all">
              {user?.email?.[0].toUpperCase()}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm border border-blue-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-blue-100 mb-1">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {user?.email}
                </p>
                <p className="text-[10px] text-blue-600 tracking-tight">
                  Active Learning Session
                </p>
              </div>
              <div className="px-2">
                <button
                  onClick={logout}
                  className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all font-medium rounded-xl"
                >
                  <MdLogout className="text-lg" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
