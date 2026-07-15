import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Condensed, Cairo } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";

// Condensed UI font for the app buttons (matches the Bankily reference).
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-condensed",
  display: "swap",
});

// Arabic display font for the Bankily slogan (matches the reference).
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  // Base URL used to turn relative paths (like the OG image below) into
  // absolute URLs — Facebook requires absolute image URLs.
  metadataBase: new URL("https://bankily.example.com"),
  title: "Bankily بنكيلي — par BPM",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  description:
    "Bankily بنكيلي — votre banque dans votre poche, par BPM.",
  applicationName: "Bankily",
  keywords: [
    "Bankily",
    "بنكيلي",
    "BPM",
    "Banque Populaire de Mauritanie",
    "البنك الشعبي الموريتاني",
    "بنكي فيدي",
    "Mauritanie",
    "banque mobile",
  ],

  // Open Graph = what Facebook / WhatsApp / Telegram show in the link preview.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["ar_MR"],
    siteName: "Bankily بنكيلي",
    url: "https://bankily.example.com",
    title: "Bankily بنكيلي — par BPM",
    description:
      "Bankily بنكيلي — votre banque dans votre poche, par BPM.",
    images: [
      {
        url: "/logo.png",
        width: 245,
        height: 150,
        alt: "Bankily بنكيلي — par BPM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bankily بنكيلي — par BPM",
    description:
      "Bankily بنكيلي — votre banque dans votre poche, par BPM.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${robotoCondensed.variable} ${cairo.variable}`}>
      <body className="min-h-screen leading-normal text-[#16191f] antialiased font-['Segoe_UI',system-ui,-apple-system,Roboto,Helvetica,Arial,sans-serif]">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
