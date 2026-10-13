import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  variable: "--font-noto-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#003629",
};

export const metadata: Metadata = {
  title: "मेरा नारंगा | My Naranga — Official Village Portal",
  description:
    "Naranga Uttari Gram Panchayat official civic portal, Parihar Block, Sitamarhi District, Bihar 843324. Village governance, agriculture, schools, healthcare, and citizen services.",
  keywords: [
    "Naranga",
    "नारंगा",
    "Naranga Uttari",
    "Parihar",
    "Sitamarhi",
    "Bihar 843324",
    "Gram Panchayat",
    "Bihar Agriculture",
  ],
  authors: [{ name: "Naranga Uttari Gram Panchayat Community Archive" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${inter.variable} ${notoSans.variable}`}>
      <body className="bg-surface font-sans text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-surface-bright">
        <LanguageProvider>
          <SiteHeader />
          <main className="flex-1 w-full pt-28">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
