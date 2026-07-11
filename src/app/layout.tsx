import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import SiteChrome from "@/components/site/SiteChrome";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-worksans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yeti Tours & Treks | Explore the Land of Happiness (Bhutan)",
  description:
    "Discover the Hidden Kingdom of Bhutan. Experience luxury, culture, spiritual journeys, and trekking with Yeti Tours & Treks — your local Bhutan experts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
