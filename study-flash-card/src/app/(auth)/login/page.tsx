"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {}
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-blue-100">
      {/* Blue glow blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 -left-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[160px]" />

      {/* Login Card */}
      <div className="relative z-10 max-w-md w-full mx-4 space-y-8 p-8 sm:p-10 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Log in to continue learning smarter
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex-1 rounded-full bg-gradient-to-b from-blue-700 to-blue-400 
                text-white text-center font-medium
                px-6 py-2 sm:px-8 sm:py-3 
                text-sm sm:text-base
                hover:from-blue-800 hover:to-blue-600 
                transform hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-xl hover:shadow-blue-500/25
                transition-all duration-300 ease-out
                border-0 cursor-pointer"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          {/* Signup link */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              href="/signup"
              className="text-blue-600 font-semibold relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
