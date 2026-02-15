import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Study Flash Card",
  description:
    "A flash card app to help you study and memorize information effectively, Following the principles of spaced repetition and active recall.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
