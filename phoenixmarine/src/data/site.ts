import { services } from "@/data/services";

export const stats = [
  { value: `${services.length}+`, label: "Marine services" },
  { value: "RAK", label: "Based in Ras Al Khaimah" },
  { value: "24/7", label: "Reachable for vessel calls" },
  { value: "1", label: "Coordinated operations desk" },
] as const;

export const values = [
  {
    title: "Operational clarity",
    body: "One desk confirms scope and timing — so masters and agents are not chasing separate vendors mid-call.",
  },
  {
    title: "Safety in every move",
    body: "Crew transfers, stores, and shore coordination are planned around safe, documented execution.",
  },
  {
    title: "East Coast readiness",
    body: "From Ras Al Khaimah we support practical husbandry and logistics needs with fast, direct contact lines.",
  },
  {
    title: "Transparent follow-through",
    body: "You get clear next steps after the enquiry — what is arranged, when, and who to call.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Send the requirement",
    body: "Vessel name, ETA, and services needed — water, crew, customs, logistics, or a combined request.",
  },
  {
    step: "02",
    title: "We lock the plan",
    body: "Phoenix confirms timing and operational notes for your agent and master.",
  },
  {
    step: "03",
    title: "Execute the call",
    body: "We coordinate delivery, transfers, and clearances around the vessel window.",
  },
  {
    step: "04",
    title: "Confirm completion",
    body: "Close-out communication so the next call starts clean.",
  },
] as const;

export const coverage = [
  {
    title: "Ras Al Khaimah",
    body: "Local desk at Al Nazish Business Center for coordination, enquiries, and shore-side support.",
  },
  {
    title: "Port & anchorage calls",
    body: "Husbandry and logistics arrangements timed to berth or anchorage programmes.",
  },
  {
    title: "UAE East Coast liaison",
    body: "Practical coordination when your RAK call connects to wider East Coast operations.",
  },
] as const;

export const faqs = [
  {
    q: "Where is Phoenix Marine based?",
    a: "Office No. 20, Mezz Floor, Al Nazish Business Center, Ras Al Khaimah, U.A.E. Contact us on +971 9 228 3049 or info@finixmarine.ae.",
  },
  {
    q: "Which services can you arrange?",
    a: "Fresh water, crew change, customs clearance, goods logistics, port/husbandry agency support, ship chandling, spares delivery, medical assistance, bunker coordination, and garbage/slop disposal coordination.",
  },
  {
    q: "How do I send a service request?",
    a: "Use WhatsApp, email, or the enquiry form with vessel name, ETA, and required services. We will confirm the next step.",
  },
  {
    q: "Do you support crew change coordination?",
    a: "Yes. We support joining, repatriation, transfers, and shore-side coordination for crew movements.",
  },
  {
    q: "Can you help with customs and stores logistics?",
    a: "Yes. Customs clearance support and shore-to-vessel goods logistics are part of our core offering.",
  },
  {
    q: "Is WhatsApp available for urgent calls?",
    a: "Yes. Message +971 9 228 3049 on WhatsApp for fast operational contact, or email info@finixmarine.ae.",
  },
] as const;
