export type Vessel = {
  slug: string;
  name: string;
  formerName?: string;
  yearOfBuild: string;
  flag: string;
  registry: string;
  shipyard: string;
  hull: string;
  loa: string;
  breadth: string;
  depth: string;
  operationDraft: string;
  minimumDraft: string;
  grt: string;
  nrt?: string;
  lightShip: string;
  deckCargo: string;
  bunkerCapacity?: string;
  freshWaterCapacity?: string;
  freeDeckArea?: string;
  mainEngines: string;
  generators: string;
  serviceSpeed: string;
  passengerCapacity: string;
  crew: string;
  callSign?: string;
  mmsi?: string;
  classNotation?: string;
  owner: string;
  operator: string;
  pdf: string;
  summary: string;
};

export const vessels: Vessel[] = [
  {
    slug: "crd-alpha",
    name: "CRD ALPHA",
    formerName: "OPL-101",
    yearOfBuild: "2011",
    flag: "UAE",
    registry: "Fujairah",
    shipyard: "Zhoushan Well Ship MND., China",
    hull: "Steel",
    loa: "20.29 m",
    breadth: "7.00 m",
    depth: "2.40 m",
    operationDraft: "1.40 m",
    minimumDraft: "1.40 m",
    grt: "56 T",
    nrt: "16 T",
    lightShip: "16 MT",
    deckCargo: "Up to 20 tons",
    freeDeckArea: "20 tons deck cargo",
    mainEngines: "2 × Cummins KTA-19-M425 (351 kW × 2 @ 1800 RPM)",
    generators: "24 kW × 2",
    serviceSpeed: "12 knots",
    passengerCapacity: "12 persons",
    crew: "5 persons (Filipino)",
    callSign: "A6E2508",
    mmsi: "470956000",
    classNotation: "N/A",
    owner: "CRD Marine S A LLC",
    operator: "CRD Marine S A LLC",
    pdf: "/fleet/CRD ALPHA Q88 2023.pdf",
    summary:
      "Compact steel support craft built for Fujairah port operations — crew transfer, light cargo, and bay-to-vessel runs.",
  },
  {
    slug: "crd-delta",
    name: "CRD DELTA",
    formerName: "KOSMAS-3",
    yearOfBuild: "2012",
    flag: "UAE",
    registry: "Sharjah",
    shipyard: "Greece — Perema Port, Piraeus",
    hull: "Steel",
    loa: "29.80 m",
    breadth: "7.50 m",
    depth: "2.37 m",
    operationDraft: "1.50 m",
    minimumDraft: "1.40 m",
    grt: "134 T",
    nrt: "60 M³ / 212.13 GT figures per Q88",
    lightShip: "45.58 MT",
    deckCargo: "Up to 40 tons",
    bunkerCapacity: "129.01 M³",
    freshWaterCapacity: "150 M³",
    freeDeckArea: "40 tons",
    mainEngines: "2 × Doosan V158TI / Cummins (351 kW × 2 @ 1800 RPM)",
    generators: "45 kW × 2",
    serviceSpeed: "10 knots",
    passengerCapacity: "16 persons (+ 6 crew berths)",
    crew: "6 persons (Filipino)",
    callSign: "A6E2598",
    mmsi: "470478000",
    classNotation: "Tasneef",
    owner: "CRD Marine S A LLC",
    operator: "CRD Marine S A LLC",
    pdf: "/fleet/CRD DELTA  Q88  2024.pdf",
    summary:
      "Workhorse barge for fresh water, bunker support, and heavier deck cargo alongside Fujairah anchorage vessels.",
  },
  {
    slug: "crd-eco",
    name: "CRD ECO",
    formerName: "ZEUS",
    yearOfBuild: "2010",
    flag: "UAE",
    registry: "UAE",
    shipyard: "Maracaibo, Venezuela",
    hull: "Steel",
    loa: "14.14 m",
    breadth: "4.00 m",
    depth: "2.10 m",
    operationDraft: "1.50 m",
    minimumDraft: "1.00 m",
    grt: "24 T",
    lightShip: "TBA",
    deckCargo: "Up to 5 tons",
    freeDeckArea: "5 tons",
    mainEngines: "2 × Cummins 298 kW @ 1800 RPM",
    generators: "Weichai 19 kVA",
    serviceSpeed: "12–18 knots",
    passengerCapacity: "13 persons (10 + 3)",
    crew: "3 persons (SL + Filipino)",
    callSign: "A6E2914",
    mmsi: "47014000",
    classNotation: "Tasneef",
    owner: "CRD Marine S A LLC",
    operator: "CRD Marine S A LLC",
    pdf: "/fleet/CRD ECO Q88  2023.pdf",
    summary:
      "Fast, agile craft for rapid crew transportation and light supply runs between bay and vessel.",
  },
  {
    slug: "anastasiya",
    name: "ANASTASIYA",
    yearOfBuild: "1985",
    flag: "UAE",
    registry: "Dubai",
    shipyard: "Aluminium Boats Inc., USA",
    hull: "Aluminium",
    loa: "34.00 m",
    breadth: "7.44 m",
    depth: "3.05 m",
    operationDraft: "1.50 m",
    minimumDraft: "1.20 m",
    grt: "153 T",
    lightShip: "46 MT",
    deckCargo: "Up to 40 tons",
    bunkerCapacity: "14,500 USG",
    freshWaterCapacity: "7,600 USG",
    freeDeckArea: "40 tons",
    mainEngines: "3 × Detroit Diesel 12V71TI (525 HP each)",
    generators: "Detroit / Stamford — 45 kW",
    serviceSpeed: "12–14 knots",
    passengerCapacity: "44 persons",
    crew: "7 persons (Filipino)",
    callSign: "A6E2813",
    classNotation: "Tasneef",
    owner: "Archipelago Middle East Shipping",
    operator: "Archipelago Middle East Shipping",
    pdf: "/fleet/ANASTASIYA.pdf",
    summary:
      "Large aluminium passenger and supply craft suited to high-capacity crew changes and deck cargo.",
  },
  {
    slug: "anastasiya-ii",
    name: "ANASTASIYA II",
    formerName: "EXPRESS 24",
    yearOfBuild: "1997",
    flag: "Saint Kitts and Nevis",
    registry: "Saint Kitts and Nevis",
    shipyard: "USA",
    hull: "Aluminium",
    loa: "30.55 m",
    breadth: "7.72 m",
    depth: "2.13 m",
    operationDraft: "2.00 m",
    minimumDraft: "1.50 m",
    grt: "169 T",
    nrt: "50 T",
    lightShip: "50 MT",
    deckCargo: "Up to 72 M³ free deck",
    bunkerCapacity: "25 M³",
    freshWaterCapacity: "20 M³",
    freeDeckArea: "72.00 M³",
    mainEngines: "4 × Detroit 12-71TIH (447 kW)",
    generators: "Detroit Diesel 4-71 — 50 kW",
    serviceSpeed: "14 knots",
    passengerCapacity: "40 persons",
    crew: "6 persons (Filipino)",
    callSign: "V4AC5",
    mmsi: "351973000",
    classNotation: "BV",
    owner: "Archipelago Middle East Shipping",
    operator: "Federal Archipelago Marine Services",
    pdf: "/fleet/ANASTASIYA -II.pdf",
    summary:
      "High-speed aluminium vessel for passenger transfer and open-deck cargo across Gulf waters.",
  },
];

export function getVessel(slug: string) {
  return vessels.find((v) => v.slug === slug);
}
