import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import FloatingCTA from "@/components/FloatingCTA";
import ScrollReveal from "@/components/ScrollReveal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: {
    default: "Drop Taxi & One Way Cab in South India | DropTaxi",
    template: "%s | DropTaxi",
  },
  description:
    "Book drop taxi and one way cab service across South India. Mini, Sedan, Etios, SUV, Innova & Innova Crysta with transparent one way taxi price, verified drivers, and 24x7 support. No return fare charged.",
  keywords: [
    "drop taxi",
    "one way cab",
    "one way taxi",
    "one way taxi South India",
    "one way cab booking",
    "outstation cabs one way",
    "drop taxi Chennai",
    "drop taxi Bangalore",
    "intercity taxi",
    "one way drop taxi",
  ],
  authors: [{ name: "DropTaxi" }],
  creator: "DropTaxi",
  publisher: "DropTaxi",
  icons: { icon: "/images/favicon.svg" },
  openGraph: {
    type: "website",
    title: "Drop Taxi & One Way Cab in South India | DropTaxi",
    description:
      "Reliable one way cabs across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana, and Puducherry. No return fare. Sedan from INR 11/km.",
    url: "https://www.droptaxi.ai/",
    siteName: "DropTaxi",
    locale: "en_IN",
    images: [
      {
        url: "https://www.droptaxi.ai/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "DropTaxi — One Way Taxi Service Across South India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drop Taxi & One Way Cab in South India | DropTaxi",
    description:
      "Book one way intercity taxis with transparent pricing and fast confirmation. No return fare.",
    images: [
      {
        url: "https://www.droptaxi.ai/images/og-cover.png",
        alt: "DropTaxi — One Way Taxi Service Across South India",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  metadataBase: new URL("https://www.droptaxi.ai"),
  alternates: {
    canonical: "https://www.droptaxi.ai/",
  },
  category: "transportation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <FloatingCTA />
        <ScrollReveal />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18009619334"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18009619334');`}
        </Script>
      </body>
    </html>
  );
}
