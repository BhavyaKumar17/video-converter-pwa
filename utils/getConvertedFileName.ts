export function getConvertedFileName(fileName: string, targetFormat: string) {
  const baseName = fileName.replace(/\.[^/.]+$/, "");

  return `${baseName}.${targetFormat}`;
}
