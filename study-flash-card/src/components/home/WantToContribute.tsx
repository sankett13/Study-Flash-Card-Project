"use client";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { submitContribution } from "@/lib/email.api";
import { Interface } from "readline";

export interface ResponseData {
  success: boolean;
  message?: string;
}

export default function WantToContribute() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state
    console.log("Submitting contribution:", { email, message });

    try {
      const response = await submitContribution(email, message);
      console.log("Contribution submitted successfully:", response);

      if (response.data.success) {
        setSubmitted(true);
        setEmail("");
        setMessage("");

        // Reset submitted state after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        console.error("Failed to submit contribution:", response.data.message);
        setError(
          response.data.message || "Failed to submit your contribution.",
        );
      }
    } catch (error) {
      console.error("Failed to submit:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Header */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-600">
              Want to be a contributor? Have suggestions or feedback? We would
              love to hear from you! Fill out the form, and let's make this
              platform even better together.
            </p>
          </div>

          {/* Right - Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition outline-none"
                aria-label="Your email"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message, suggestions, or feedback..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition outline-none resize-none"
                aria-label="Your message"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !message}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send your message"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-5 border-b-2 border-white" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            {/* Success Message */}
            {submitted && (
              <div className="text-center py-2">
                <p className="text-green-600 font-medium">
                  Thank you! We've received your message.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-center py-2">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
