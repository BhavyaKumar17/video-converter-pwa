"use client";

import { useEffect, useState } from "react";
import {
  CHOOSE_SOURCE,
  CHOOSE_TARGET,
  CONVERT_SELECTED_BUTTON,
  DOWNLOAD_SELECTED_BUTTON,
  DOWNLOAD_ZIP_BUTTON,
  FILE_ACTIONS,
  FORMATS_LOCKED,
  FORMATS_UNLOCKED,
  SOURCE_FORMAT,
  TARGET_FORMAT,
} from "@/constants";
import { formats } from "@/types";
import {
  FileTable,
  FileOverview,
  Header,
  UploadArea,
  VCButton,
} from "@/components";
import { useVideoConverter, useVideoState } from "@/hooks";
import {
  ArrowBigDownDashIcon,
  FolderArchiveIcon,
  LockKeyhole,
  LockKeyholeOpen,
  RefreshCcwIcon,
} from "lucide-react";
import { FileCard } from "@/components/FileCard";

export default function Home() {
  const [fromFormat, setFromFormat] = useState("");

  const [toFormat, setToFormat] = useState("");

  const {
    videos,
    setVideos,
    handleFilesUpload,
    handleFileSelectionChange,
    handleSelectAll,
    totalSelectedSizeMB,
  } = useVideoState();

  const { loading, handleConvert, handleDownloadZip, handleDownloadSelected } =
    useVideoConverter({
      videos,
      setVideos,
      totalSelectedSizeMB,
      toFormat,
      fromFormat,
    });

  return (
    <main
      aria-busy={loading}
      className="
        w-full min-h-screen max-w-7xl
        mx-auto px-6 py-10
      "
    >
      <Header />
      <div
        className="
          flex items-center justify-center
          mb-8
          text-gray-700
          gap-2
        "
      >
        <div
          className="
            flex flex-col
            gap-2
          "
        >
          <label htmlFor="from-format">{SOURCE_FORMAT}</label>
          <select
            id="from-format"
            value={fromFormat}
            onChange={(e) => {
              setFromFormat(e.target.value);
            }}
            className="border rounded-xl px-5 py-3 text-lg shadow-sm"
            disabled={videos.length > 0}
          >
            <option value="">{CHOOSE_SOURCE}</option>
            {Object.keys(formats).map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div
          aria-hidden="true"
          className="
            text-2xl font-bold
          "
        >
          →
        </div>

        <div
          className="
            flex flex-col
            gap-2
          "
        >
          <label htmlFor="to-format">{TARGET_FORMAT}</label>
          <select
            id="to-format"
            value={toFormat}
            onChange={(e) => setToFormat(e.target.value)}
            className="border rounded-xl px-5 py-3 text-lg shadow-sm"
            disabled={videos.length > 0}
          >
            <option value="">{CHOOSE_TARGET}</option>
            {fromFormat &&
              formats[fromFormat as keyof typeof formats].convertsTo.map(
                (format) => {
                  return (
                    <option key={format} value={format}>
                      {format.toUpperCase()}
                    </option>
                  );
                },
              )}
          </select>
        </div>
        <span
          role="status"
          aria-label={videos.length > 0 ? FORMATS_LOCKED : FORMATS_UNLOCKED}
        >
          {videos.length > 0 ? (
            <LockKeyhole size={30} color="#938425" strokeWidth={3} />
          ) : (
            <LockKeyholeOpen size={30} color="#938425" strokeWidth={3} />
          )}
        </span>
      </div>
      <div
        className="
          w-full
        "
      >
        {fromFormat && toFormat && (
          <UploadArea
            fromFormat={fromFormat}
            onFileUpload={handleFilesUpload}
          />
        )}
        {!!videos.length && (
          <div
            className="
              w-full
              p-6 mt-8
              bg-white
              rounded-3xl
              shadow-xl
            "
          >
            <div
              className="
                hidden md:block
              "
            >
              <FileOverview videos={videos} />
            </div>

            <div
              role="toolbar"
              aria-label={FILE_ACTIONS}
              className="
                flex flex-wrap items-center justify-between
                min-w-0
                p-5 mb-6
                bg-slate-50
                rounded-2xl border
              "
            >
              <VCButton
                className="
                  text-white
                  bg-blue-400 hover:bg-blue-500
                "
                onClickHandler={handleConvert}
                label={CONVERT_SELECTED_BUTTON}
                isDisabled={loading}
                icon={<RefreshCcwIcon />}
              />

              <VCButton
                className="
                  hidden md:inline-flex
                  text-white
                  bg-blue-600 hover:bg-blue-700
                "
                onClickHandler={handleDownloadSelected}
                label={DOWNLOAD_SELECTED_BUTTON}
                isDisabled={loading}
                icon={<ArrowBigDownDashIcon />}
              />

              <VCButton
                className="
                  text-white
                  bg-green-400 hover:bg-green-500
                "
                onClickHandler={handleDownloadZip}
                label={DOWNLOAD_ZIP_BUTTON}
                isDisabled={loading}
                icon={<FolderArchiveIcon />}
              />
            </div>
            <div
              className="
                hidden md:block
                w-full
              "
            >
              <FileTable
                videos={videos}
                onSelectionChange={handleFileSelectionChange}
                onSelectAll={handleSelectAll}
                fromFormat={fromFormat}
                toFormat={toFormat}
              />
            </div>
            <div
              className="
                block md:hidden
              "
            >
              <FileCard
                videos={videos}
                onSelectionChange={handleFileSelectionChange}
                onSelectAll={handleSelectAll}
                fromFormat={fromFormat}
                toFormat={toFormat}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
