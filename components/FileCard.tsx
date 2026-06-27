import React from "react";
import { VCFileTableProps } from "@/types";
import { VCCard } from "./VCCard";
import { handleLongText } from "@/utils/handleLongText";
import { ProgressBar } from "./ProgressBar";
import {
  CheckCircle2,
  CircleX,
  Clock3,
  Download,
  DownloadIcon,
  LoaderCircle,
} from "lucide-react";
import { VCButton } from "./VCButton";
import { DownloadLink } from "./DownloadLink";

export const FileCard = ({
  videos,
  onSelectionChange,
  onSelectAll,
  fromFormat,
  toFormat,
}: VCFileTableProps) => {
  return (
    <div>
      {videos.map((video) => (
        <VCCard key={video.id}>
          <div
            className="
              flex flex-col
              gap-4
            "
          >
            <div>
              <h3
                className="
                  flex justify-between
                  font-semibold
                "
                title={video.file.name}
              >
                {handleLongText(video.file.name, 19)}
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
              </h3>
            </div>
            {!video.downloadUrl && <ProgressBar progress={video.progress} />}
            {video.downloadUrl && (
              <DownloadLink
                url={video.downloadUrl}
                fileName={video.file.name.replace(
                  new RegExp(`\\.${fromFormat}$`, "i"),
                  `.${toFormat}`,
                )}
              >
                <VCButton
                  className="
                    w-full
                    bg-green-500 hover:bg-green-600
                  "
                  label="Download"
                />
              </DownloadLink>
            )}
          </div>
        </VCCard>
      ))}
    </div>
  );
};
