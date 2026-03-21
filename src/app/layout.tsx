import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kouassi Anderson Ehoussou",
  alternateName: "Anderson Kouassi",
  jobTitle: "Data Analyst & BI Consultant",
  description:
    "Data Analyst & Consultant BI avec 3,5 ans d'expérience. Expert en Power BI, DAX, SQL, Python et pipelines ETL.",
  email: "andersonkouassi2016@gmail.com",
  sameAs: [
    "https://www.linkedin.com/in/kouassi-anderson-ehoussou",
    "https://github.com/Anderson-Archimede",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anderson-kouassi.dev"),
  title: "Anderson Kouassi — Data Analyst & Consultant BI",
  description:
    "Portfolio de Kouassi Anderson Ehoussou — Data Analyst & Consultant BI. Expert en Power BI, DAX, SQL, Python et pipelines ETL.",
  keywords: [
    "Data Analyst",
    "Business Intelligence",
    "Power BI",
    "DAX",
    "SQL",
    "Python",
    "ETL",
    "Portfolio",
    "Consultant BI",
    "Azure",
  ],
  authors: [{ name: "Kouassi Anderson Ehoussou" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://anderson-kouassi.dev",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Anderson Kouassi — Data Analyst & Consultant BI",
    description:
      "Je transforme des données complexes en recommandations stratégiques.",
    type: "website",
    url: "https://anderson-kouassi.dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anderson Kouassi — Data Analyst & Consultant BI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anderson Kouassi — Data Analyst & Consultant BI",
    description:
      "Je transforme des données complexes en recommandations stratégiques.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-text font-body noise-overlay">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
