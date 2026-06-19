import type { Metadata, Viewport } from "next";
import { Cinzel_Decorative, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4B0082",
};

export const metadata: Metadata = {
  title: "Akshay & Mayuri | Royal Wedding Celebration | 4th July 2026",
  description:
    "You are cordially invited to the grand Maharashtrian wedding celebration of Akshay & Mayuri on 4th July 2026 at Sukhakarta Lawns, Ahilyanagar. Experience the royal union of two souls.",
  keywords: [
    "Akshay Mayuri Wedding",
    "Maharashtrian Wedding",
    "Wedding Invitation",
    "July 2026 Wedding",
    "Sukhakarta Lawns",
    "Ahilyanagar Wedding",
  ],
  openGraph: {
    title: "Akshay & Mayuri | Royal Wedding Celebration",
    description:
      "Join us for the grand celebration of love. 4th July 2026 at Sukhakarta Lawns, Ahilyanagar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0015] text-[#FFF8E7] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
