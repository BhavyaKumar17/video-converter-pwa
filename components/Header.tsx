import React from "react";
import {
  MEDIA_CONVERTER_DESCRIPTION,
  MEDIA_CONVERTER_TITLE,
  FAST,
  ONLINE,
} from "@/constants";

export const Header = () => {
  return (
    <div
      className="
        mb-10
        text-center
      "
    >
      <h1
        className="
          text-5xl text-transparent font-bold
          bg-linear-to-r bg-clip-text from-blue-600 to-purple-600
        "
      >
        {MEDIA_CONVERTER_TITLE}
      </h1>

      <p
        className="
          mt-4
          text-gray-500 text-lg
        "
      >
        {MEDIA_CONVERTER_DESCRIPTION}
      </p>

      <div
        className="
          flex justify-center
          mt-6
          gap-4
        "
      >
        <span
          className="
            px-3 py-1
            bg-blue-100
            rounded-full
          "
        >
          {FAST}
        </span>

        <span
          className="
            px-3 py-1
            bg-purple-100
            rounded-full
          "
        >
          {ONLINE}
        </span>
      </div>
    </div>
  );
};
