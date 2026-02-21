"use client";

import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loading({
  message = "Loading...",
  size = "md",
}: LoadingProps) {
  const sizeConfig = {
    sm: {
      dot: "w-2 h-2",
      gap: "gap-1",
      text: "text-sm",
    },
    md: {
      dot: "w-3 h-3",
      gap: "gap-1.5",
      text: "text-base",
    },
    lg: {
      dot: "w-4 h-4",
      gap: "gap-2",
      text: "text-lg",
    },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Three Dot Animation */}
      <div className={`flex items-center ${config.gap} mb-4`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${config.dot} bg-blue-700 rounded-full animate-bounce`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: "0.6s",
            }}
          />
        ))}
      </div>

      {/* Loading Message */}
      <p className={`${config.text} font-medium text-gray-700`}>{message}</p>
    </div>
  );
}
