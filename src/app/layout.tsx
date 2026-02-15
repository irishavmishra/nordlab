import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "NordLab | B2B Ordering Portals & Sales Systems for Distributors",
  description: "Replace manual orders and spreadsheets. NordLab builds custom dealer portals, automated quoting systems, and inventory dashboards for distributors.",
  authors: [{ name: "NordLab" }],
  robots: "index, follow",
  metadataBase: new URL("https://nordlab.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://nordlab.online/",
    title: "NordLab | B2B Ordering Portals & Sales Systems for Distributors",
    description: "Replace manual orders and spreadsheets. NordLab builds custom dealer portals, automated quoting systems, and inventory dashboards for distributors.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
    siteName: "NordLab",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NordLab | B2B Ordering Portals & Sales Systems for Distributors",
    description: "Replace manual orders and spreadsheets. NordLab builds custom dealer portals, automated quoting systems, and inventory dashboards for distributors.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NordLab",
  url: "https://nordlab.online",
  logo: "https://nordlab.online/favicon.svg",
  description:
    "NordLab builds custom dealer portals, automated quoting systems, and real-time inventory dashboards for B2B product distributors.",
  serviceType: [
    "B2B Dealer Ordering Portal Development",
    "Automated Quoting System Development",
    "Real-Time Inventory Dashboard Development",
  ],
  areaServed: "Worldwide",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "English",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}