import React from "react";

export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      className="
        relative overflow-hidden
        w-full h-5
        bg-gray-200
        rounded-full
      "
    >
      <div
        className="
          h-full
          bg-gradient-to-r from-blue-500 to-purple-500
          transition-all
        "
        style={{ width: `${progress}%` }}
      />

      <span
        className="
          absolute inset-0 flex items-center justify-center
          text-xs text-slate-700 font-medium
        "
      >
        {progress}%
      </span>
    </div>
  );
};
