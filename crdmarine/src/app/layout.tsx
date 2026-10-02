import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { FloatingDock } from "@/components/FloatingDock";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/data/company";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = buildMetadata({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    url: company.siteUrl,
    image: `${company.siteUrl}/logo.png`,
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot 10 A, Port of Fujairah",
      addressLocality: "Fujairah",
      addressCountry: "AE",
      postalCode: "3886",
    },
    areaServed: "Fujairah, United Arab Emirates",
    openingHours: "Mo-Su 00:00-23:59",
  };

  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body style={{ fontFamily: "var(--font-manrope), var(--font-body)" }}>
        <style>{`
          :root {
            --font-display: var(--font-syne), Syne, system-ui, sans-serif;
            --font-body: var(--font-manrope), Manrope, system-ui, sans-serif;
          }
          .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingDock />
      </body>
    </html>
  );
}
