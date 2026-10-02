import { Barlow_Condensed, Work_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { FloatingDock } from "@/components/FloatingDock";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/data/company";
import { faqs } from "@/data/site";
import { services } from "@/data/services";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work",
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
        streetAddress: "Office No. 20, Mezz Floor, Al Nazish Business Center",
        addressLocality: "Ras Al Khaimah",
        addressCountry: "AE",
      },
      areaServed: ["Ras Al Khaimah", "United Arab Emirates"],
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
      <body>
        <style>{`
          :root {
            --font-display: var(--font-barlow), "Barlow Condensed", system-ui, sans-serif;
            --font-body: var(--font-work), "Work Sans", system-ui, sans-serif;
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
