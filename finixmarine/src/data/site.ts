import { services } from "@/data/services";

export const stats = [
  { value: `${services.length}+`, label: "Marine services" },
  { value: "1", label: "Coordinated Fujairah desk" },
  { value: "24/7", label: "Reachable when vessels call" },
  { value: "UAE", label: "East Coast focus" },
] as const;

export const values = [
  {
    title: "Safety first",
    body: "Every mobilisation is planned around safe people and cargo movement — the same priority leading agencies put at the centre of the call.",
  },
  {
    title: "One clear counterpart",
    body: "Masters and agents work with a single Finix desk instead of chasing separate vendors for water, crew, customs, and logistics.",
  },
  {
    title: "Transparent coordination",
    body: "We confirm scope, timing, and next steps clearly — so owners and charterers know what is arranged and when.",
  },
  {
    title: "Cost-aware planning",
    body: "Services are coordinated to the vessel’s window, reducing idle time and unnecessary duplicate arrangements.",
  },
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Share the call",
    body: "Send vessel name, ETA Fujairah, and the services you need — water, crew, customs, logistics, or more.",
  },
  {
    step: "02",
    title: "We confirm the plan",
    body: "Finix confirms timing, scope, and operational notes so your agent and master stay aligned.",
  },
  {
    step: "03",
    title: "Mobilise & deliver",
    body: "We coordinate delivery, transfers, and clearances around the berth or anchorage window.",
  },
  {
    step: "04",
    title: "Close the loop",
    body: "You get clear follow-up so the next call — or the next stem — starts from a clean record.",
  },
] as const;

export const coverage = [
  {
    title: "Port of Fujairah",
    body: "Berth-side support for fresh water, stores, crew, customs, and husbandry coordination.",
  },
  {
    title: "Fujairah Offshore Anchorage",
    body: "Bay-to-vessel arrangements for water, crew transfers, provisions, and related services.",
  },
  {
    title: "UAE East Coast liaison",
    body: "Local coordination for vessels whose Fujairah call connects to wider East Coast operations.",
  },
] as const;

export const faqs = [
  {
    q: "Which services does Finix Marine provide in Fujairah?",
    a: "We cover fresh water supply, crew change and management, customs clearance, goods logistics, port and husbandry agency support, ship chandling, spares delivery, medical assistance, bunker coordination, and garbage / slop disposal coordination.",
  },
  {
    q: "Do you support vessels at anchorage as well as alongside?",
    a: "Yes. We coordinate services for Port of Fujairah berths and Fujairah offshore anchorage calls, timed to your ETA and operational window.",
  },
  {
    q: "How do I request a service?",
    a: "Email info@finixmarine.ae or use the enquiry form with vessel name, ETA, and required services. You can also call +971 9 228 3044.",
  },
  {
    q: "Can you handle crew change and immigration-related coordination?",
    a: "Yes. We support joining and repatriation, transfers, and shore-side coordination with immigration-aware planning for Fujairah calls.",
  },
  {
    q: "Do you arrange customs clearance for ship stores and spares?",
    a: "Yes. Customs clearance support for stores, spares, and related consignments is part of our logistics offering under UAE procedures.",
  },
  {
    q: "Is Finix a single point of contact for multiple needs?",
    a: "That is the model. Instead of separate vendors for water, crew, customs, and logistics, Finix acts as one coordinated desk for the call.",
  },
] as const;
