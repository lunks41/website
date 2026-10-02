import { Hero } from "@/components/Hero";
import { CtaBand } from "@/components/CtaBand";
import { HomeClient } from "@/components/HomeClient";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  description: company.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeClient services={[...services]} />
      <CtaBand />
    </>
  );
}
