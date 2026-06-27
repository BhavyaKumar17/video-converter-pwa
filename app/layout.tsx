import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Media Converter",
  description:
    "Convert AVI, MP4, MP3, WAV and more directly in your browser. No uploads. No limits. 100% private.",
  keywords: [
    "video converter",
    "audio converter",
    "avi to mp4",
    "mp4 converter",
    "browser converter",
    "mp4 to avi",
    "mp3 to wav",
    "wav to mp3",
    "mov to mp4",
    "mkv to mp4",
    "webm to mp4",
  ],
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body
        className="
          flex flex-col
          min-h-full
        "
      >
        {children}
      </body>
    </html>
  );
}
