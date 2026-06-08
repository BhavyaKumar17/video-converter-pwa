import { useState } from "react";
import { VideoItem } from "@/types";

export function useVideoState() {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  function handleFilesUpload(uploadedFiles: VideoItem[]) {
    setVideos((prev) => [...prev, ...uploadedFiles]);
  }

  function handleFileSelectionChange(videoId: string, status: boolean) {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, selected: status } : v)),
    );
  }

  function handleSelectAll(selected: boolean) {
    setVideos((prev) =>
      prev.map((video) => ({
        ...video,
        selected,
      })),
    );
  }

  const allSelected = videos.length > 0 && videos.every((v) => v.selected);

  const selectedConvertedVideos = videos.filter(
    (video) => video.selected && video.convertedBlob,
  );

  const totalSelectedSize = selectedConvertedVideos.reduce(
    (sum, video) => sum + (video.convertedBlob?.size || 0),
    0,
  );

  const totalSelectedSizeMB = totalSelectedSize / 1024 / 1024;

  return {
    videos,
    setVideos,
    handleFilesUpload,
    handleFileSelectionChange,
    handleSelectAll,
    allSelected,
    totalSelectedSizeMB,
  };
}
