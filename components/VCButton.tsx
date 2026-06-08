import React from "react";

interface VCButtonProps {
  label: string;
  onClickHandler: () => void;
  className?: string;
  isDisabled?: boolean;
}

export const VCButton = ({
  onClickHandler,
  label,
  className,
  isDisabled,
}: VCButtonProps) => {
  const newClassNames = `px-5 py-2.5 font-medium rounded-xl disabled:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:text-gray-500 ${className}`;
  return (
    <button
      aria-label={label}
      onClick={onClickHandler}
      className={newClassNames}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};
