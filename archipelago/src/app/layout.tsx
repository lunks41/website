import { Syne, DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { FloatingDock } from "@/components/FloatingDock";
import { buildMetadata } from "@/lib/seo";
import { company, faqs } from "@/data/company";
import { services } from "@/data/services";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata = buildMetadata({});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: company.name,
      description: company.description,
      url: company.siteUrl,
      image: `${company.siteUrl}/images/home/ship.jpg`,
      telephone: company.phone,
      email: company.email,
      areaServed: ["United Arab Emirates", "Oman"],
      sameAs: [company.linkedin, `https://wa.me/${company.whatsapp}`],
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
            --font-display: var(--font-syne), Syne, system-ui, sans-serif;
            --font-body: var(--font-dm), "DM Sans", system-ui, sans-serif;
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
