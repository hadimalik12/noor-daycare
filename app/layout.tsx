import type { Metadata } from "next";
import { DM_Sans, Fredoka } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malik's Daycare | Lawrenceville, GA",
  description:
    "Small, licensed home daycare in Lawrenceville, GA, with a capacity of 6 children. Warm, personal care for ages 8 weeks–4 years. Weekdays, 7:30 AM–6:00 PM. Schedule a visit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
