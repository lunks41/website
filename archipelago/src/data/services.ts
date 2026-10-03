export type Service = {
  slug: string;
  title: string;
  short: string;
  body: string;
  image: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "ship-agency",
    title: "Ship Agency",
    short: "Port formalities, authority liaison, and full call coordination.",
    body: "We act as the local link between ship operators and port authorities — pilotage and tug coordination, customs, crew welfare, husbandry, and clear reporting to owners, charterers, and managers.",
    image: "/images/our-services/shipAgency.svg",
    highlights: ["Pre-arrival formalities", "Authority liaison", "Owner / charterer reporting"],
  },
  {
    slug: "marine-services",
    title: "Marine Services",
    short: "Operational support that keeps vessels moving safely and on time.",
    body: "Comprehensive marine support for construction, repair, and day-to-day vessel operations — coordinated through our regional desks with practical local expertise.",
    image: "/images/our-services/marineServices.svg",
    highlights: ["Port & anchorage support", "Operational coordination", "Safety-minded execution"],
  },
  {
    slug: "ship-supply",
    title: "Ship Supply",
    short: "Provisions, stores, and marine supplies delivered to the vessel.",
    body: "Warehouse and yard capacity for provisions and marine stores — ordered, packed, and delivered to berth or launch with manifests that match your operational needs.",
    image: "/images/our-services/shipSupply.svg",
    highlights: ["800m² covered warehouse", "2000m² open yard", "Berth & launch delivery"],
  },
  {
    slug: "crew-changes",
    title: "Crew Changes",
    short: "Joining, repatriation, transfers, and shore-side crew coordination.",
    body: "Immigration-aware embarkation and disembarkation, airport transfers, hotel liaison, and documentation support so people movements stay on the vessel’s schedule.",
    image: "/images/our-services/crewChanges.svg",
    highlights: ["On/off signing", "Airport & hotel liaison", "Immigration coordination"],
  },
  {
    slug: "logistics",
    title: "Logistics & Clearance",
    short: "Customs clearance and shore-to-vessel logistics for cargo and stores.",
    body: "Customs and logistics support for stores, spares, and cargo — timed to marine operations rather than generic freight schedules.",
    image: "/images/our-services/logiClearence.svg",
    highlights: ["Customs clearance", "Shore to vessel", "ETA-aligned planning"],
  },
  {
    slug: "inspection",
    title: "Surveys & Inspection",
    short: "Inspection support to reduce operational and compliance risk.",
    body: "Vessel and cargo inspection coordination so masters and managers have the surveys and checks they need before departure.",
    image: "/images/our-services/s6.svg",
    highlights: ["Survey liaison", "Compliance support", "Operational readiness"],
  },
  {
    slug: "medical-assistance",
    title: "Medical Assistance",
    short: "Clinic appointments, emergencies, and crew welfare ashore.",
    body: "Medical assistance for seafarers — clinic bookings, emergency liaison, and coordination so crew welfare issues are handled quickly during the call.",
    image: "/images/our-services/s7.svg",
    highlights: ["Clinic appointments", "Emergency liaison", "Crew welfare"],
  },
  {
    slug: "launch-services",
    title: "Launch Services",
    short: "Launch and boat support for personnel and light cargo transfers.",
    body: "Launch coordination for personnel and light consignments between shore and vessel, timed into your port or anchorage programme.",
    image: "/images/media-imgs/launchNew.svg",
    highlights: ["Personnel transfer", "Light cargo", "Anchorage support"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
