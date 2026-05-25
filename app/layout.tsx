import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Reply — Reply smarter with AI",
  description:
    "Generate perfect replies instantly for Telegram, WhatsApp, Instagram, Tinder, email and dating apps. Pick a tone, get 5 human-sounding options in seconds.",
  metadataBase: new URL("https://aireply.app"),
  openGraph: {
    title: "AI Reply — Reply smarter with AI",
    description:
      "Generate perfect replies instantly across every chat app and tone.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07070b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06] mix-blend-overlay bg-noise" />
        {children}
      </body>
    </html>
  );
}
