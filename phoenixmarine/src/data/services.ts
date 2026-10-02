export type Service = {
  slug: string;
  title: string;
  short: string;
  body: string;
  image: string;
  category: "Husbandry" | "Agency" | "Logistics" | "Technical";
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "fresh-water",
    title: "Fresh Water Supply",
    category: "Husbandry",
    short: "Potable water delivered to vessels at Port of Ras Al Khaimah and the anchorage.",
    body: "We arrange fresh water supply for ships at berth or offshore anchorage — confirmed volumes, timed delivery windows, and coordination with your agent so tanks are topped without delaying the voyage.",
    image: "/services/fresh-water.jpg",
    highlights: ["Berth & anchorage delivery", "Volume confirmation", "24h mobilisation support"],
  },
  {
    slug: "crew-management",
    title: "Crew Change & Management",
    category: "Husbandry",
    short: "Joining, repatriation, transfers, and shore-side crew coordination.",
    body: "Full crew handling for Ras Al Khaimah calls: immigration-aware embarkation and disembarkation, airport transfers, accommodation liaison, and documentation support so people movements stay on schedule.",
    image: "/services/crew-management.jpg",
    highlights: ["On/off signing", "Airport & hotel liaison", "Immigration coordination"],
  },
  {
    slug: "customs",
    title: "Customs Clearance",
    category: "Logistics",
    short: "Customs formalities for ship stores, spares, and cargo.",
    body: "We support customs clearance and related paperwork so stores, spares, and cargo clear under UAE procedures — aligned to your ETA and operational window in Ras Al Khaimah.",
    image: "/services/customs.jpg",
    highlights: ["Stores & spares clearance", "Documentation support", "UAE procedure alignment"],
  },
  {
    slug: "logistics",
    title: "Goods & Ship Stores Logistics",
    category: "Logistics",
    short: "Shore-to-vessel logistics for provisions, spares, and general cargo.",
    body: "End-to-end goods movement: trucking liaison, packing, and bay-to-vessel transfer planning for provisions, spares, and project cargo — timed to marine operations rather than generic freight schedules.",
    image: "/services/logistics.jpg",
    highlights: ["Shore to vessel", "Provisions & general cargo", "Transfer planning"],
  },
  {
    slug: "port-agency",
    title: "Port & Husbandry Agency",
    category: "Agency",
    short: "Port formalities, husbandry coordination, and owner representation.",
    body: "Acting as your local counterpart for Ras Al Khaimah port and anchorage calls — pre-arrival formalities, stakeholder coordination, husbandry arrangements, and clear reporting to owners, managers, and charterers.",
    image: "/services/port-agency.jpg",
    highlights: ["Pre-arrival formalities", "Husbandry desk", "Owner / charterer reporting"],
  },
  {
    slug: "ship-chandling",
    title: "Provisions & Ship Chandling",
    category: "Husbandry",
    short: "Fresh and dry provisions sourced and delivered to the vessel.",
    body: "Ship chandling for fresh food, dry stores, and bonded requirements — ordered, packed, and delivered to berth or launch with manifests that match your galley and bonded needs.",
    image: "/services/ship-chandling.jpg",
    highlights: ["Fresh & dry stores", "Bonded coordination", "Manifested delivery"],
  },
  {
    slug: "spares-delivery",
    title: "Spares & Technical Delivery",
    category: "Technical",
    short: "Clearance and delivery of ship spares, lubes, and technical consignments.",
    body: "Urgent and planned spare-parts handling: customs liaison, secure packing, and launch or berth delivery so engineers receive critical consignments when the vessel is ready.",
    image: "/services/spares-delivery.jpg",
    highlights: ["Urgent consignments", "Lubes & technical cargo", "Secure launch delivery"],
  },
  {
    slug: "medical-assistance",
    title: "Medical Assistance",
    category: "Husbandry",
    short: "Medical appointments, emergencies, and crew welfare support ashore.",
    body: "We arrange medical assistance for seafarers — clinic appointments, emergency support, and coordination with agents so crew welfare issues are handled quickly during the Ras Al Khaimah call.",
    image: "/services/medical-assistance.jpg",
    highlights: ["Clinic appointments", "Emergency liaison", "Crew welfare"],
  },
  {
    slug: "bunker-coordination",
    title: "Bunker Coordination",
    category: "Agency",
    short: "Coordination of bunker and MGO supply at port or anchorage.",
    body: "We coordinate with bunker suppliers for fuel and MGO stems at Ras Al Khaimah — timing, documentation awareness, and operational liaison so bunkering fits the vessel’s port or anchorage programme.",
    image: "/services/bunker-coordination.jpg",
    highlights: ["Port & anchorage stems", "Supplier liaison", "Stem timing"],
  },
  {
    slug: "waste-disposal",
    title: "Garbage & Slop Disposal",
    category: "Technical",
    short: "Coordination of garbage removal and slop / sludge disposal services.",
    body: "Environmental support for Ras Al Khaimah calls: arranging garbage collection and slop or sludge disposal through approved providers, with the paperwork and timing your master needs for compliance.",
    image: "/services/waste-disposal.jpg",
    highlights: ["Garbage removal", "Slop / sludge coordination", "Compliance timing"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceCategories = ["Husbandry", "Agency", "Logistics", "Technical"] as const;
