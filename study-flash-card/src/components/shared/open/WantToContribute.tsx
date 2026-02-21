"use client";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { submitContribution } from "@/lib/email.api";
import { motion, AnimatePresence } from "framer-motion";

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
    setError(null);

    try {
      const response = await submitContribution(email, message);
      console.log("API Response:", response.data);

      if (response.data.success) {
        setSubmitted(true);
        setEmail("");
        setMessage("");
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(
          response.data.message || "Failed to submit your contribution.",
        );
      }
    } catch {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-20 sm:py-28"
    >
      {/* Decorative Blurred Background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute bottom-40 left-1/2 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-blue-400/30 blur-[120px]"
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Top Content Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Join Our <span className="text-blue-600">Community</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Want to be a contributor? Have suggestions or feedback? We’d love to
            hear from you. Let’s build something better together.
          </p>
        </motion.div>

        {/* Integrated Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-slate-200 shadow-2xl shadow-blue-900/5 rounded-3xl p-2 sm:p-3"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-[20px] bg-slate-50/50 p-6 sm:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Email Input */}
              <div className="md:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5
                    text-base bg-white
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                    outline-none transition-all shadow-sm"
                />
              </div>

              {/* Message Input */}
              <div className="md:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2 ml-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your ideas or feedback with us..."
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5
                    text-base bg-white resize-none
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                    outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || !email || !message}
                className="flex gap-2 justify-center items-center rounded-full bg-gradient-to-b from-blue-700 to-blue-400 
                text-white text-center font-medium
                px-6 py-2 sm:px-8 sm:py-3 w-full sm:w-auto
                text-sm sm:text-base
                hover:from-blue-800 hover:to-blue-600 
                transform hover:scale-[1.02] active:scale-[0.98]
                shadow-lg hover:shadow-xl hover:shadow-blue-500/25
                transition-all duration-300 ease-out
                border-0 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    Send Your Message
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 font-semibold "
                  >
                    <p className="text-lg">Thank you! Message received.</p>
                  </motion.div>
                )}

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-600 font-medium text-sm bg-red-50 px-4 py-2 rounded-lg"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
