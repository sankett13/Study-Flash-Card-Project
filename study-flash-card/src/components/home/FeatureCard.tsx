import React from "react";

export default function FeatureCard({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-blue-100 bg-blue-50 p-6 transition-all hover:border-blue-300 ">
      <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs sm:text-sm font-semibold text-white mb-4">
        Step {step}
      </span>
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
