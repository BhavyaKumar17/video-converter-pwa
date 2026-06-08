export function handleLongText(fileName: string, maxLength = 35) {
  const lastDot = fileName.lastIndexOf(".");

  if (lastDot === -1) {
    return fileName.length > maxLength
      ? `${fileName.slice(0, maxLength)}...`
      : fileName;
  }

  const name = fileName.slice(0, lastDot);
  const extension = fileName.slice(lastDot);

  return name.length > maxLength
    ? `${name.slice(0, maxLength)}...${extension}`
    : fileName;
}
