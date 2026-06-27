"use client";
import React from "react";

interface VCButtonProps {
  label: string;
  onClickHandler?: () => void;
  className?: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
}

export const VCButton = ({
  onClickHandler,
  label,
  className,
  isDisabled,
  icon,
}: VCButtonProps) => {
  const newClassNames = `px-5 py-2.5 font-medium rounded-xl disabled:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:text-gray-500 ${className}`;
  return (
    <button
      aria-label={label}
      onClick={onClickHandler}
      className={newClassNames}
      disabled={isDisabled}
      title={label}
    >
      {icon && (
        <div
          className="
            hidden md:block
          "
        >
          {label}
        </div>
      )}
      {!icon && <div>{label}</div>}
      {icon && (
        <div
          className="
            block md:hidden
          "
        >
          {icon}
        </div>
      )}
    </button>
  );
};
