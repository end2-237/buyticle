import React from "react";

export default function CardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col justify-between border border-gray-200 shadow rounded-xl p-6 bg-base-200 h-[550px]">
      {/* Titre */}
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>

      {/* Description */}
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-6 w-3/4"></div>

      {/* Prix */}
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>

      {/* Features simulées */}
      <div className="space-y-3 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 rounded w-5/6"></div>
        ))}
      </div>

      {/* Bouton */}
      <div className="h-12 bg-gray-300 rounded w-full"></div>
    </div>
  );
}
