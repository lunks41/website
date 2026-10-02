import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { FloatingDock } from "@/components/FloatingDock";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/data/company";
import { faqs } from "@/data/site";
import { services } from "@/data/services";
import { Cormorant_Garamond, Sora } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata = buildMetadata({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: company.name,
      alternateName: company.nameAr,
      description: company.description,
      url: company.siteUrl,
      image: `${company.siteUrl}/logo.png`,
      telephone: company.phone,
      email: company.email,
      taxID: company.trn,
      address: {
        "@type": "PostalAddress",
        postOfficeBoxNumber: "3565",
        addressLocality: "Fujairah",
        addressCountry: "AE",
      },
      areaServed: ["Fujairah", "United Arab Emirates"],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${company.name} services`,
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: `${company.siteUrl}/services/${s.slug}`,
      })),
    },
  ];

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body style={{ fontFamily: "var(--font-sora), var(--font-body)" }}>
        <style>{`
          :root {
            --font-display: var(--font-cormorant), Cormorant Garamond, Georgia, serif;
            --font-body: var(--font-sora), Sora, system-ui, sans-serif;
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
