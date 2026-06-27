import React from "react";

export const VCCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        p-4 mb-2
        bg-white
        border-2 border-gray-200 rounded-lg
        shadow-sm
      "
    >
      {children}
    </div>
  );
};
