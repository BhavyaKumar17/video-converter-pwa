import { useState } from "react";
import JSZip from "jszip";
import { VideoItem, UseVideoConverterProps } from "@/types";

export function useVideoConverter({
  videos,
  setVideos,
  totalSelectedSizeMB,
  toFormat,
  fromFormat,
}: UseVideoConverterProps) {
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    try {
      setLoading(true);
      const selectedVideos = videos.filter((v) => v.selected && !v.downloadUrl);

      if (selectedVideos.length === 0) {
        alert("Please select at least one file");
        return;
      }

      const { convertMedia } = await import("@/lib/ffmpeg");

      for (const video of selectedVideos) {
        // Mark row as converting
        setVideos((prev) =>
          prev.map((v) =>
            v.id === video.id ? { ...v, status: "converting" } : v,
          ),
        );

        try {
          const toFormatBlob = await convertMedia(
            video.file,
            toFormat,
            fromFormat,
            (progress) => {
              setVideos((prev) =>
                prev.map((v) => (v.id === video.id ? { ...v, progress } : v)),
              );
            },
          );

          const url = URL.createObjectURL(toFormatBlob);

          setVideos((prev) =>
            prev.map((v) =>
              v.id === video.id
                ? {
                    ...v,
                    progress: 100,
                    status: "completed",
                    convertedBlob: toFormatBlob,
                    downloadUrl: url,
                  }
                : v,
            ),
          );
        } catch (error) {
          setVideos((prev) =>
            prev.map((v) =>
              v.id === video.id ? { ...v, status: "failed" } : v,
            ),
          );
        }
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDownloadZip() {
    const selectedVideos = videos.filter(
      (video) => video.selected && video.convertedBlob,
    );

    if (selectedVideos.length === 0) {
      alert("Please select at least one converted file");
      return;
    }

    if (totalSelectedSizeMB > 1500) {
      alert(
        "Selected files exceed 1.5 GB. Please download fewer files at once.",
      );
      return;
    }

    const zip = new JSZip();
    selectedVideos.forEach((video) => {
      zip.file(
        video.file.name.replace(
          new RegExp(`\\.${fromFormat}$`, "i"),
          `.${toFormat}`,
        ),
        video.convertedBlob!,
      );
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "converted-videos.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleDownloadSelected() {
    const selectedVideos = videos.filter(
      (video) => video.selected && video.convertedBlob,
    );
    
    selectedVideos.forEach((video) => {
      const link = document.createElement("a");
      link.href = video.downloadUrl!;
      const fileName = video.file.name.replace(
        new RegExp(`\\.${fromFormat}$`, "i"),
        `.${toFormat}`,
      );
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  return {
    loading,
    handleConvert,
    handleDownloadZip,
    handleDownloadSelected,
  };
}
