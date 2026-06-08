import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export async function convertMedia(
  file: File,
  toFormat: string,
  fromFormat: string,
  onProgress?: (progress: number) => void,
) {
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  ffmpeg.on("progress", ({ progress }) => {
    onProgress?.(Math.round(progress * 100));
  });

  await ffmpeg.writeFile(`input.${fromFormat}`, await fetchFile(file));

  await ffmpeg.exec([
    "-i",
    `input.${fromFormat}`,
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    `output.${toFormat}`,
  ]);

  const data = await ffmpeg.readFile(`output.${toFormat}`);

  const uint8 = new Uint8Array(data as Uint8Array);

  return new Blob([uint8], {
    type: `video/${toFormat}`,
  });
}
