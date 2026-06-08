import React, { useState } from "react";
import { acceptMap, VCUploadAreaProps } from "@/types";
import { DRAG_AND_DROP_FILES, OR_CLICK_TO_BROWSE } from "@/constants";

export const UploadArea = ({ onFileUpload, fromFormat }: VCUploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);

  function processFiles(files: File[]) {
    const newVideos = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      selected: true,
      progress: 0,
      status: "waiting" as const,
    }));

    onFileUpload(newVideos);
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>): void {
    processFiles(Array.from(e.target.files || []));
    e.target.value = "";
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();

    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []);
    const allowedExtension = fromFormat?.toLowerCase();

    const filteredFiles = files.filter((file) =>
      file.name.toLowerCase().endsWith(`.${allowedExtension}`),
    );

    if (filteredFiles.length === 0) {
      alert(`Only ${fromFormat?.toUpperCase()} files are allowed`);
      return;
    }

    processFiles(filteredFiles);
  }

  return (
    <>
      <label
        htmlFor="file-upload"
        tabIndex={0}
        role="button"
        aria-label={
          fromFormat
            ? `Upload ${fromFormat.toUpperCase()} files`
            : "Select a source format before uploading files"
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            document.getElementById("file-upload")?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
            block
            w-full
            p-8 md:p-16
            text-center
            bg-white
            border-2
            border-dashed
            rounded-3xl
            focus:outline-none
            focus:ring-4
            focus:ring-blue-300
            transition
            cursor-pointer

            ${
              isDragging
                ? `
                    border-blue-600
                    bg-blue-50
                    shadow-2xl
                    scale-[1.02]
                `
                : `
                    hover:border-blue-500
                    hover:shadow-xl
                `
            }
        `}
      >
        <div
          aria-hidden="true"
          className="
            mb-4
            text-5xl
          "
        >
          📁
        </div>

        <h2
          className="
            text-xl font-semibold
          "
        >
          {DRAG_AND_DROP_FILES}
        </h2>

        <p
          id="upload-help"
          className="
            mt-2
            text-gray-500
          "
        >
          {OR_CLICK_TO_BROWSE}
          {fromFormat && <span> ({fromFormat.toUpperCase()} files only)</span>}
        </p>
      </label>

      <input
        id="file-upload"
        aria-describedby="upload-help"
        type="file"
        accept={
          fromFormat
            ? acceptMap[fromFormat as keyof typeof acceptMap]
            : undefined
        }
        multiple
        className="
          sr-only
        "
        onChange={handleFileUpload}
      />
    </>
  );
};
