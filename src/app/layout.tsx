import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BedVista — Tell us why you're here",
  description:
    "A minimal space to share why you landed on bedvista.com. Drop a note and we'll read it.",
  metadataBase: new URL("https://bedvista.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
