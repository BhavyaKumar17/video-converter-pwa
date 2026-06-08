import React from "react";

export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      className="
        flex items-center
        gap-3
      "
    >
      <div
        className="
            flex-1 overflow-hidden
            h-3
            bg-gray-200
            rounded-full
          "
      >
        <div
          className="
                h-full
                bg-linear-to-r from-blue-500 to-purple-500
                transition-all
              "
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <span
        className="
            w-12
            text-sm text-gray-600 text-right font-medium
          "
      >
        {progress}%
      </span>
    </div>
  );
};
