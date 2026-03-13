import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VeloSync — Bikepacking Gear Management",
  description:
    "AI-powered gear management for bikepackers. Track your gear, organize your bikes, collaborate with riding partners, and pack smarter for every trip.",
  manifest: "/manifest.json",
  themeColor: "#C8553D",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VeloSync",
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/apple-touch-icon.svg",
  },
  openGraph: {
    title: "VeloSync — Bikepacking Gear Management",
    description:
      "AI-powered gear management for bikepackers. Pack smarter, ride further.",
    siteName: "VeloSync",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${dmSans.variable} font-body antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
