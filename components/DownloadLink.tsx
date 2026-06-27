"use client";

type DownloadLinkProps = {
  url: string;
  fileName: string;
  children: React.ReactNode;
};

export const DownloadLink = ({
  url,
  fileName,
  children,
}: DownloadLinkProps) => {
  return (
    <a href={url} download={fileName}>
      {children}
    </a>
  );
};
