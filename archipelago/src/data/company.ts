export const company = {
  name: "Archipelago Middle East Shipping LLC",
  shortName: "Archipelago",
  tagline: "Independent ship agency across the UAE and Oman",
  description:
    "Archipelago Middle East Shipping LLC is a leading independent ship agency providing ship agency, marine services, ship supply, crew changes, logistics, inspection, and medical assistance across UAE and Oman ports.",
  location: "United Arab Emirates",
  phone: "+971 9 2282223",
  phoneDubai: "+971 4 3595895",
  fax: "+971 9 2282220",
  email: "operations@archipelago.ae",
  emailAlt: "archipelago@archipelago.ae",
  whatsapp: "97150433783",
  siteUrl: "https://archipelago.ae",
  brochure: "/archipelagoBroucher.pdf",
  linkedin: "https://www.linkedin.com/company/archipelago-middle-east-shipping-llc",
} as const;

export const offices = [
  {
    title: "Fujairah",
    body: "Primary operations desk for East Coast port and anchorage calls.",
    phone: "+971 9 2282223",
    fax: "+971 9 2282220",
    email: "operations@archipelago.ae",
  },
  {
    title: "Dubai",
    body: "Commercial coordination close to UAE trade and logistics hubs.",
    phone: "+971 4 3595895",
    fax: "+971 9 2282220",
    email: "operations@archipelago.ae",
  },
  {
    title: "Khorfakkan",
    body: "Port coordination for East Coast vessel programmes.",
    phone: "+971 9 2386189",
    fax: "+971 9 2386198",
    email: "operations@archipelago.ae",
  },
  {
    title: "Oman",
    body: "Regional support for Oman port calls and crew movements.",
    phone: "+971 9 2282227",
    email: "omanoperations@archipelago.ae",
  },
] as const;

export const groupCompanies = [
  {
    name: "CRD Marine",
    location: "Fujairah",
    blurb: "Boat and barge support — fresh water, deck cargo, and crew transport.",
    href: "https://crdmarine.ae",
  },
  {
    name: "Finix Marine",
    location: "Fujairah",
    blurb: "Full husbandry desk for fresh water, crew, customs, logistics, and agency.",
    href: "https://finixmarine.ae",
  },
  {
    name: "Phoenix Marine",
    location: "Ras Al Khaimah",
    blurb: "RAK operations for water, crew, customs, logistics, and vessel support.",
    href: "https://phoenixmarine.ae",
  },
] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/group", label: "Group" },
  { href: "/contact", label: "Contact" },
] as const;

export const values = [
  {
    title: "Independent agency",
    body: "A pure agency focus for owners, charterers, and managers — clear reporting and accountable local execution.",
  },
  {
    title: "Port-side speed",
    body: "Offices minutes from main gates and authorities so crew, cargo, and formalities move without delay.",
  },
  {
    title: "Regional coverage",
    body: "UAE East Coast, Dubai, and Oman desks coordinated as one operations network.",
  },
  {
    title: "One message channel",
    body: "WhatsApp and email to operations@archipelago.ae — the same desk that runs the call.",
  },
] as const;

export const processSteps = [
  { step: "01", title: "Request", body: "Share vessel, ETA, and service needs by WhatsApp or the contact form." },
  { step: "02", title: "Confirm", body: "We align port formalities, suppliers, and timing against your programme." },
  { step: "03", title: "Execute", body: "Agency, supply, crew, and logistics run with live status to your office." },
  { step: "04", title: "Close out", body: "Clear reporting and documentation when the call is complete." },
] as const;

export const faqs = [
  {
    q: "What ports does Archipelago cover?",
    a: "We support vessel operations across UAE commercial ports and Oman, with desks in Fujairah, Dubai, Khorfakkan, and Oman.",
  },
  {
    q: "How do I reach the operations desk?",
    a: "WhatsApp +971 50 433 3783 or email operations@archipelago.ae. Fujairah line +971 9 2282223 · Dubai +971 4 3595895.",
  },
  {
    q: "Do you handle crew changes and medical cases?",
    a: "Yes — immigration-aware crew changes, transfers, accommodation liaison, and medical assistance coordination.",
  },
  {
    q: "How are CRD, Finix, and Phoenix related?",
    a: "They are group marine companies focused on Fujairah and Ras Al Khaimah operational support alongside Archipelago’s agency network.",
  },
] as const;

export const stats = [
  { value: "UAE + Oman", label: "Coverage" },
  { value: "4", label: "Desks" },
  { value: "24/7", label: "Ops response" },
  { value: "1", label: "Accountable desk" },
] as const;
