import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import SiteChrome from "@/components/site/SiteChrome";
import SmoothScroll from "@/components/site/SmoothScroll";
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
  title: {
    default: "Yeti Tours & Trek | Licensed Bhutan Tour Operator",
    template: "%s | Yeti Tours & Trek",
  },
  description:
    "Licensed Bhutanese tour operator (Licence No. 50002238) in Taba, Thimphu. Culture, treks and tailor-made journeys. We arrange visa, SDF and certified hotels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <SmoothScroll />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
