"use client";

import React from "react";
import { VCFileTableProps, VideoItem } from "@/types";
import { ProgressBar } from "./ProgressBar";
import { handleLongText } from "@/utils/handleLongText";
import { SELECT_ALL } from "@/constants";
import {
  Download,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  CircleX,
} from "lucide-react";
import { DownloadLink } from "./DownloadLink";

export const FileTable = ({
  videos,
  onSelectionChange,
  onSelectAll,
  fromFormat,
  toFormat,
}: VCFileTableProps) => {
  return (
    <table
      className="
        table-fixed
        w-full
        bg-white
      "
    >
      <thead
        className="
          bg-gray-100
        "
      >
        <tr>
          <th
            className="
              w-12
              p-4
            "
          >
            {" "}
            <input
              type="checkbox"
              checked={videos.every((v) => v.selected)}
              onChange={(e) => onSelectAll(e.target.checked)}
              aria-label={SELECT_ALL}
            />
          </th>
          <th
            className="
              w-[55%]
              p-4
              text-left
            "
          >
            File Name
          </th>
          <th
            className="
              w-[25%]
              p-4
              text-left
            "
          >
            Progress
          </th>
          <th
            className="
              w-[10%]
              p-4
            "
          >
            Status
          </th>
          <th
            className="
              w-[10%]
              p-4
            "
          >
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {videos.map((video) => (
          <tr
            key={video.id}
            className="
              hover:bg-gray-50
              border-b
            "
          >
            <td
              className="
                p-4
              "
            >
              <input
                type="checkbox"
                checked={video.selected}
                onChange={(e) => onSelectionChange(video.id, e.target.checked)}
                aria-label={`Select ${video.file.name}`}
              />
            </td>

            <td
              className="
                p-4
              "
              title={video.file.name}
            >
              {handleLongText(video.file.name)}
            </td>

            <td
              className="
                p-4
              "
            >
              <ProgressBar progress={video.progress} />
            </td>

            <td
              className="
                p-4
              "
            >
              <span
                className="
                  flex justify-self-center
                "
              >
                {video.status === "completed" && (
                  <CheckCircle2
                    className="
                      text-green-700
                    "
                    size={20}
                    strokeWidth={3}
                  />
                )}
                {video.status === "waiting" && (
                  <Clock3
                    className="
                      text-gray-700
                    "
                    size={20}
                    strokeWidth={3}
                  />
                )}
                {video.status === "converting" && (
                  <LoaderCircle
                    size={20}
                    strokeWidth={3}
                    className="
                      text-blue-700
                      animate-spin
                    "
                  />
                )}
                {video.status === "failed" && (
                  <CircleX
                    className="
                      text-red-700
                    "
                    size={20}
                    strokeWidth={3}
                  />
                )}
              </span>
            </td>
            <td
              className="
                flex justify-self-center
                p-4
              "
            >
              {video.downloadUrl ? (
                <DownloadLink
                  url={video.downloadUrl}
                  fileName={video.file.name.replace(
                    new RegExp(`\\.${fromFormat}$`, "i"),
                    `.${toFormat}`,
                  )}
                >
                  <Download size={20} />
                </DownloadLink>
              ) : (
                // <a
                //   href={video.downloadUrl}
                //   download={video.file.name.replace(
                //     new RegExp(`\\.${fromFormat}$`, "i"),
                //     `.${toFormat}`,
                //   )}
                // >
                //   <Download size={20} color="#d5c039" strokeWidth={3} />
                // </a>
                "-"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
