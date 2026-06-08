const VIDEO = "video";
const AUDIO = "audio";
const AVI = "avi";
const MP4 = "mp4";
const MOV = "mov";
const MKV = "mkv";
const WEBM = "webm";
const MP3 = "mp3";
const WAV = "wav";
const AAC = "aac";
const FLAC = "flac";

export interface VCUploadAreaProps {
  onFileUpload: (videos: VideoItem[]) => void;
  fromFormat: string;
}

export interface VCFileTableProps {
  videos: VideoItem[];
  onSelectionChange: (videoId: string, checked: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  fromFormat: string;
  toFormat: string;
}

export type VideoItem = {
  id: string;
  file: File;
  selected: boolean;
  progress: number;
  status: "waiting" | "converting" | "completed" | "failed" | "paused";

  convertedBlob?: Blob;
  downloadUrl?: string;
};

export interface UseVideoConverterProps {
  videos: VideoItem[];
  setVideos: React.Dispatch<React.SetStateAction<VideoItem[]>>;
  totalSelectedSizeMB: number;
  toFormat: string;
  fromFormat: string;
}

export const acceptMap = {
  avi: ".avi",
  mp4: ".mp4",
  mov: ".mov",
  mkv: ".mkv",
  mp3: ".mp3",
  wav: ".wav",
};

export const formats = {
  mp4: {
    type: VIDEO,
    convertsTo: [AVI, MOV, MKV, WEBM],
  },

  avi: {
    type: VIDEO,
    convertsTo: [MP4, MOV, MKV, WEBM],
  },

  mov: {
    type: VIDEO,
    convertsTo: [MP4, AVI, MKV, WEBM],
  },

  mkv: {
    type: VIDEO,
    convertsTo: [MP4, AVI, MOV, WEBM],
  },

  webm: {
    type: VIDEO,
    convertsTo: [MP4, AVI, MOV, MKV],
  },

  mp3: {
    type: AUDIO,
    convertsTo: [WAV, AAC, FLAC],
  },

  wav: {
    type: AUDIO,
    convertsTo: [MP3, AAC, FLAC],
  },

  aac: {
    type: AUDIO,
    convertsTo: [MP3, WAV, FLAC],
  },

  flac: {
    type: AUDIO,
    convertsTo: [MP3, WAV, AAC],
  },
};
