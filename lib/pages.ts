import type { PageData, Breadcrumb, ListItem, CarType, FAQ, RelatedLink, FareBreakdown } from "@/lib/types";
import { ROUTE_DATA, CITY_DATA, computeFares } from "@/lib/route-data";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Capitalise a slug fragment: "chennai" -> "Chennai", "cmc-vellore" -> "CMC Vellore" */
function titleCase(s: string): string {
  const specials: Record<string, string> = {
    cmc: "CMC",
    ooty: "Ooty",
    coonoor: "Coonoor",
  };
  return s
    .split("-")
    .map((w) => specials[w.toLowerCase()] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Shared fragments
// ---------------------------------------------------------------------------

const ROUTE_LIST_ITEMS: ListItem[] = [
  { label: "Pickup", value: "Doorstep pickup & drop at any address" },
  { label: "Fleet", value: "Mini, Sedan, Etios, SUV, Innova, Innova Crysta" },
  { label: "Support", value: "24x7 live customer support via phone & Telegram" },
];

const ROUTE_CAR_TYPES: CarType[] = [
  { name: "Mini (3+1)", description: "Compact and economical for solo or couple travel." },
  { name: "Sedan (4+1)", description: "Comfortable ride for small families and business trips." },
  { name: "Etios (4+1)", description: "Spacious sedan with generous boot space." },
  { name: "SUV (6+1 / 7+1)", description: "Family-friendly with carrier for extra luggage." },
  { name: "Innova (6+1 / 7+1)", description: "Reliable group travel with roof carrier." },
  { name: "Innova Crysta (6+1)", description: "Premium choice for corporate and VIP travel." },
];

const ROUTE_FAQS: FAQ[] = [
  { question: "How do I book a one way taxi?", answer: "You can book instantly via our website or Telegram. Share your pickup and drop locations and we will confirm the fare." },
  { question: "Is there a return fare charge?", answer: "No. You only pay for the one way distance. There is no hidden return fare or extra charge." },
  { question: "What payment methods are accepted?", answer: "We accept cash, UPI, and online bank transfers. Payment is collected after the trip." },
];

const ROUTE_RELATED_LINKS: RelatedLink[] = [
  { title: "All Routes", description: "Browse every one way taxi route we serve.", href: "/routes" },
  { title: "Cities", description: "Explore drop taxi services by city.", href: "/cities" },
  { title: "Contact Us", description: "Get in touch for custom bookings.", href: "/contact" },
];

const CITY_LIST_ITEMS: ListItem[] = [
  { label: "Service", value: "One way and outstation drop taxi" },
  { label: "Coverage", value: "All major towns and tourist spots" },
  { label: "Fleet", value: "Mini, Sedan, Etios, SUV, Innova, Innova Crysta" },
  { label: "Support", value: "24x7 live customer support" },
];

const CITY_FAQS: FAQ[] = [
  { question: "How do I book a drop taxi in my city?", answer: "Visit our website or send a Telegram message with your pickup location, drop location, and travel date. We will confirm the fare instantly." },
  { question: "Are your fares fixed?", answer: "Yes. All fares are fixed and transparent with no hidden charges or return fare." },
  { question: "Do you offer airport pickup and drop?", answer: "Yes. We provide airport taxi services at all major airports in South India." },
];

const CITY_RELATED_LINKS: RelatedLink[] = [
  { title: "All Cities", description: "See every city we serve.", href: "/cities" },
  { title: "Routes", description: "Browse popular one way routes.", href: "/routes" },
  { title: "Contact Us", description: "Reach out for custom bookings.", href: "/contact" },
];

const AIRPORT_FAQS: FAQ[] = [
  { question: "Can I book an airport taxi in advance?", answer: "Yes. We recommend booking at least 2 hours before your flight for a smooth pickup experience." },
  { question: "Do you track flight delays?", answer: "Our drivers monitor flight status and adjust pickup time accordingly at no extra cost." },
  { question: "Is there a meet-and-greet service?", answer: "Yes. Our driver will meet you at the arrivals gate with a name board." },
];

const AIRPORT_RELATED_LINKS: RelatedLink[] = [
  { title: "All Cities", description: "Explore city-wise taxi services.", href: "/cities" },
  { title: "Routes", description: "Browse popular one way routes.", href: "/routes" },
  { title: "Contact Us", description: "Reach out for custom bookings.", href: "/contact" },
];

const STATIC_FAQS: FAQ[] = [
  { question: "What is DropTaxi?", answer: "DropTaxi is a one way taxi booking service covering South India with fixed fares and no return charges." },
  { question: "How do I contact support?", answer: "You can reach us via phone, Telegram, or the contact form on our website." },
  { question: "Which cities do you cover?", answer: "We cover all major cities and towns in Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh." },
];

const STATIC_RELATED_LINKS: RelatedLink[] = [
  { title: "Home", description: "Return to the homepage.", href: "/" },
  { title: "Routes", description: "Browse all one way taxi routes.", href: "/routes" },
  { title: "Contact Us", description: "Get in touch with our team.", href: "/contact" },
];

// ---------------------------------------------------------------------------
// Factory functions
// ---------------------------------------------------------------------------

function parseRoute(slug: string): [string, string] {
  const clean = slug.replace(/-(taxi|cab)$/, "");
  const idx = clean.indexOf("-to-");
  if (idx === -1) return [clean, ""];
  return [clean.substring(0, idx), clean.substring(idx + 4)];
}

function parseCitySlug(slug: string): string {
  return slug
    .replace(/^drop-taxi-in-/, "")
    .replace(/^drop-taxi-/, "")
    .replace(/-drop-taxi$/, "")
    .replace(/^call-taxi-in-/, "")
    .replace(/^call-taxi-/, "")
    .replace(/-call-taxi$/, "");
}

function parseAirportSlug(slug: string): string {
  return slug
    .replace(/^airport-taxi-in-/, "")
    .replace(/^airport-taxi-/, "")
    .replace(/-airport-taxi$/, "");
}

function makeRoutePage(slug: string, from: string, to: string): PageData {
  const f = titleCase(from);
  const t = titleCase(to);
  const info = ROUTE_DATA[slug];
  const fares = info ? computeFares(info.distance) : undefined;

  const listItems: ListItem[] = [
    ...(info ? [
      { label: "Distance", value: info.distance + " km" },
      { label: "Duration", value: info.duration },
      ...(info.highway ? [{ label: "Highway", value: info.highway }] : []),
      ...(info.tollEstimate ? [{ label: "Tolls (approx)", value: info.tollEstimate }] : []),
    ] : []),
    ...ROUTE_LIST_ITEMS,
  ];

  const fareBreakdown: FareBreakdown[] | undefined = fares ? [
    { carType: "Mini (3+1)", fare: `INR ${fares.mini}`, perKm: "INR 11/km" },
    { carType: "Sedan / Etios (4+1)", fare: `INR ${fares.sedan}`, perKm: "INR 13/km" },
    { carType: "SUV (6+1 / 7+1)", fare: `INR ${fares.suv}`, perKm: "INR 17/km" },
    { carType: "Innova (6+1 / 7+1)", fare: `INR ${fares.innova}`, perKm: "INR 17/km" },
    { carType: "Innova Crysta (6+1)", fare: `INR ${fares.crysta}`, perKm: "INR 21/km" },
  ] : undefined;

  const routeFaqs: FAQ[] = [
    { question: `How much does a ${f} to ${t} taxi cost?`, answer: fares ? `Mini from INR ${fares.mini}, Sedan/Etios from INR ${fares.sedan}, SUV/Innova from INR ${fares.suv}, and Innova Crysta from INR ${fares.crysta}. Final fare is confirmed at booking.` : `Fare depends on vehicle type. Contact us on Telegram for an instant quote.` },
    { question: `What is the distance from ${f} to ${t}?`, answer: info ? `The distance is approximately ${info.distance} km and takes ${info.duration} by road${info.highway ? ` via ${info.highway}` : ""}.` : `Contact us for route details and duration estimate.` },
    { question: `Can I book a ${f} to ${t} taxi for night travel?`, answer: `Yes. We operate 24x7 including late night and early morning trips. Night charges may apply between 10 PM and 6 AM.` },
    { question: "Is there a return fare charge?", answer: "No. You only pay for the one way distance. There is no hidden return fare or extra charge." },
    { question: "What payment methods are accepted?", answer: "We accept cash, UPI, and online bank transfers. Payment is collected after the trip." },
  ];

  const sedanFare = fares ? `INR ${fares.sedan}` : "";

  return {
    slug,
    title: fares ? `${f} to ${t} Taxi @ ${sedanFare} | One Way Cab` : `${f} to ${t} One Way Taxi | DropTaxi`,
    h1: `${f} to ${t} One Way Taxi`,
    description: `Book ${f} to ${t} one way taxi${info ? ` — ${info.distance} km, ${info.duration}` : ""}. Mini, Sedan, Etios, SUV, Innova & Innova Crysta${fares ? ` from ${sedanFare}` : ""}. No return fare, verified drivers, 24x7 support.`,
    eyebrow: `${f} to ${t} One Way Drop Taxi`,
    lead: info?.description || "Travel with fixed one way fare, professional drivers, and live support throughout your trip.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Routes", href: "/routes" },
      { label: `${f} to ${t} Taxi` },
    ],
    sectionTitle: "Route Snapshot",
    listItems,
    bodyText: info ? `The ${f} to ${t} route covers ${info.distance} km in approximately ${info.duration}${info.highway ? ` via ${info.highway}` : ""}. Ideal for business travel, family visits, and airport transfers.` : "Ideal for business travel, family visits, and airport transfers.",
    ctaTitle: "Get Instant Fare",
    carTypes: ROUTE_CAR_TYPES,
    faqs: routeFaqs,
    relatedLinks: ROUTE_RELATED_LINKS,
    pageType: "route",
    routeDetails: info ? {
      distance: info.distance + " km",
      duration: info.duration,
      highway: info.highway,
      tollEstimate: info.tollEstimate,
      fareBreakdown,
      travelTips: [
        `Start early to avoid city traffic in ${f}. Best departure time is 5–6 AM for long routes.`,
        info.highway ? `The route via ${info.highway} has well-maintained rest stops for food and fuel.` : "Multiple rest stops available along the highway for food and fuel.",
        "Carry a valid ID — required for toll plaza documentation and hotel check-ins.",
        `Book at least 4–6 hours in advance for guaranteed vehicle availability on the ${f} to ${t} route.`,
      ],
      routeDescription: info.description,
    } : undefined,
  };
}

function makeCityPage(slug: string, city: string): PageData {
  const c = titleCase(city);
  const cityKey = city.toLowerCase().replace(/-/g, "");
  const info = CITY_DATA[cityKey] || CITY_DATA[city.toLowerCase()];

  const cityFaqs: FAQ[] = [
    { question: `How do I book a drop taxi in ${c}?`, answer: `Visit our website or send a Telegram message with your ${c} pickup location, drop city, and travel date. We confirm fare within minutes.` },
    { question: `What vehicles are available in ${c}?`, answer: `We offer Mini, Sedan, Etios, SUV, Innova, and Innova Crysta for trips from ${c}. Choose based on passengers and luggage.` },
    { question: `Are ${c} taxi fares fixed?`, answer: "Yes. All fares are fixed at booking with no hidden charges, return fare, or surge pricing." },
    { question: `Do you offer airport pickup in ${c}?`, answer: `Yes. We provide airport taxi services with flight tracking and meet-and-greet pickup at ${c} airport.` },
  ];

  return {
    slug,
    title: `Drop Taxi in ${c} — One Way Cab from INR 11/km`,
    h1: `Drop Taxi in ${c}`,
    description: `Book drop taxi in ${c} from INR 11/km. One way cab with fixed fare, no return charge, verified drivers & 24x7 support. Mini, Sedan, SUV, Innova & Innova Crysta available.`,
    eyebrow: `Drop Taxi ${c} — One Way Outstation Cab`,
    lead: info?.description || `Affordable one way taxi service in ${c} with transparent pricing and reliable drivers.`,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cities", href: "/cities" },
      { label: c },
    ],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: info?.description || `Whether you need a quick intercity transfer or an outstation trip, our ${c} taxi service has you covered with fixed fares, clean cabs, and verified drivers available 24x7.`,
    ctaTitle: "Book Your Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: cityFaqs,
    relatedLinks: info?.popularRoutes ? info.popularRoutes.map(r => ({ title: r.name, description: `One way taxi from ${c}.`, href: r.href })) : CITY_RELATED_LINKS,
    pageType: "city",
    cityDetails: info ? {
      pickupPoints: info.pickupPoints,
      popularRoutes: info.popularRoutes,
      cityDescription: info.description,
    } : undefined,
  };
}

function makeCallTaxiPage(slug: string, city: string): PageData {
  const c = titleCase(city);
  const cityKey = city.toLowerCase().replace(/-/g, "");
  const info = CITY_DATA[cityKey] || CITY_DATA[city.toLowerCase()];

  const callTaxiFaqs: FAQ[] = [
    { question: `How do I book a call taxi in ${c}?`, answer: `Call us at 99949 40558 or send a Telegram message with your ${c} pickup point, destination, and travel time. We confirm within minutes.` },
    { question: `Is call taxi available 24x7 in ${c}?`, answer: `Yes. Our ${c} call taxi service runs round the clock including nights, early mornings, and holidays.` },
    { question: `What is the call taxi fare in ${c}?`, answer: `Fares depend on distance and car type. Starting from INR 11/km for sedan. Contact us for exact fare to your destination.` },
    { question: `Can I book a call taxi for outstation from ${c}?`, answer: `Yes. Our call taxi service covers both local ${c} trips and outstation intercity travel with fixed one way fares.` },
  ];

  return {
    slug,
    title: `Call Taxi in ${c} — 24x7 Booking | DropTaxi`,
    h1: `Call Taxi in ${c}`,
    description: `Call taxi ${c} — book local & outstation cabs 24x7. Fixed fare from INR 11/km, no return charge, GPS-tracked rides. Call 99949 40558.`,
    eyebrow: `Call Taxi ${c} — Local & Outstation`,
    lead: info?.description || `Reliable call taxi service in ${c} with fixed fares and professional drivers available round the clock.`,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cities", href: "/cities" },
      { label: c },
    ],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: `Our call taxi service in ${c} covers local trips, railway station pickups, airport transfers, and intercity travel. All rides come with fixed fares, GPS tracking, and verified professional drivers.`,
    ctaTitle: "Book Now",
    carTypes: ROUTE_CAR_TYPES,
    faqs: callTaxiFaqs,
    relatedLinks: info?.popularRoutes ? info.popularRoutes.map(r => ({ title: r.name, description: `One way taxi from ${c}.`, href: r.href })) : CITY_RELATED_LINKS,
    pageType: "city",
    cityDetails: info ? {
      pickupPoints: info.pickupPoints,
      popularRoutes: info.popularRoutes,
      cityDescription: info.description,
    } : undefined,
  };
}

function makeAirportPage(slug: string, city: string): PageData {
  const c = titleCase(city);
  return {
    slug,
    title: `${c} Airport Taxi — Pickup & Drop from INR 11/km`,
    h1: `${c} Airport Taxi Service`,
    description: `Book ${c} airport taxi with flight tracking, meet & greet pickup, and fixed fare from INR 11/km. Mini, Sedan, SUV, Innova & Innova Crysta. No return fare. Call 99949 40558.`,
    eyebrow: `${c} Airport Transfer — Pickup & Drop`,
    lead: "Hassle-free airport pickup and drop with flight tracking and fixed one way fares.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Cities", href: "/cities" },
      { label: `${c} Airport Taxi` },
    ],
    sectionTitle: "Airport Transfer Highlights",
    listItems: [
      { label: "Flight Tracking", value: "Driver monitors your flight status" },
      { label: "Meet & Greet", value: "Name board pickup at arrivals" },
      { label: "Fleet", value: "Mini, Sedan, Etios, SUV, Innova, Innova Crysta" },
      { label: "Support", value: "24x7 live customer support" },
    ],
    bodyText: `Our ${c} airport taxi service ensures a smooth, stress-free transfer to or from the airport.`,
    ctaTitle: "Book Airport Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: AIRPORT_FAQS,
    relatedLinks: AIRPORT_RELATED_LINKS,
    pageType: "airport",
  };
}

function makeStaticPage(
  slug: string, title: string, h1: string, description?: string,
  overrides?: Partial<Pick<PageData, "contentSections" | "listItems" | "faqs" | "sectionTitle" | "bodyText" | "relatedLinks" | "lead">>
): PageData {
  return {
    slug,
    title: `${title} | DropTaxi`,
    h1,
    description: description ?? `${h1} — DropTaxi, South India's trusted one way taxi service.`,
    eyebrow: "DropTaxi",
    lead: overrides?.lead || "South India's trusted one way taxi booking service with fixed fares and no return charges.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: h1 },
    ],
    sectionTitle: overrides?.sectionTitle,
    listItems: overrides?.listItems,
    bodyText: overrides?.bodyText,
    faqs: overrides?.faqs || STATIC_FAQS,
    relatedLinks: overrides?.relatedLinks || STATIC_RELATED_LINKS,
    contentSections: overrides?.contentSections,
    pageType: "static",
  };
}

// ---------------------------------------------------------------------------
// Build ALL_PAGES — 316 total
// ---------------------------------------------------------------------------

const ALL_PAGES: PageData[] = [
  // ── Route pages (149) ──────────────────────────────────────────────
  ...[
    "bangalore-to-chennai-taxi",
    "bangalore-to-chikmagalur-taxi",
    "bangalore-to-coimbatore-taxi",
    "bangalore-to-coorg-taxi",
    "bangalore-to-hampi-taxi",
    "bangalore-to-hosur-taxi",
    "bangalore-to-hyderabad-taxi",
    "bangalore-to-kodaikanal-taxi",
    "bangalore-to-madurai-taxi",
    "bangalore-to-mangalore-taxi",
    "bangalore-to-munnar-cab",
    "bangalore-to-mysore-taxi",
    "bangalore-to-pondicherry-taxi",
    "bangalore-to-rameshwaram-taxi",
    "bangalore-to-tirupati-taxi",
    "bangalore-to-tiruvannamalai-taxi",
    "bangalore-to-trichy-taxi",
    "bangalore-to-vellore-taxi",
    "bangalore-to-wayanad-taxi",
    "chennai-to-bangalore-taxi",
    "chennai-to-coimbatore-taxi",
    "chennai-to-cuddalore-taxi",
    "chennai-to-kanchipuram-taxi",
    "chennai-to-karaikudi-taxi",
    "chennai-to-kodaikanal-taxi",
    "chennai-to-kumbakonam-taxi",
    "chennai-to-madurai-taxi",
    "chennai-to-mahabalipuram-taxi",
    "chennai-to-neyveli-taxi",
    "chennai-to-pondicherry-taxi",
    "chennai-to-rameshwaram-taxi",
    "chennai-to-ranipet-taxi",
    "chennai-to-salem-taxi",
    "chennai-to-tirunelveli-taxi",
    "chennai-to-tirupati-taxi",
    "chennai-to-tiruvannamalai-taxi",
    "chennai-to-trichy-taxi",
    "chennai-to-velankanni-taxi",
    "chennai-to-vellore-taxi",
    "chennai-airport-to-vellore-taxi",
    "chennai-airport-to-cmc-vellore-taxi",
    "cochin-to-munnar-taxi",
    "cochin-to-sabarimala-taxi",
    "coimbatore-to-chennai-taxi",
    "coimbatore-to-coonoor-taxi",
    "coimbatore-to-kodaikanal-cab",
    "coimbatore-to-madurai-taxi",
    "coimbatore-to-munnar-taxi",
    "coimbatore-to-ooty-taxi",
    "coimbatore-to-palakkad-taxi",
    "coimbatore-to-salem-taxi",
    "dindigul-to-kodaikanal-taxi",
    "ernakulam-to-munnar-taxi",
    "hyderabad-to-bangalore-taxi",
    "hyderabad-to-vijayawada-taxi",
    "kochi-to-alleppey-taxi",
    "kozhikode-to-wayanad-taxi",
    "madurai-to-bangalore-taxi",
    "madurai-to-chennai-taxi",
    "madurai-to-coimbatore-taxi",
    "madurai-to-kodaikanal-taxi",
    "madurai-to-pondicherry-taxi",
    "madurai-to-rameswaram-taxi",
    "madurai-to-salem-taxi",
    "madurai-to-tiruvannamalai-taxi",
    "madurai-to-trichy-taxi",
    "madurai-to-vellore-taxi",
    "mangalore-to-coorg-taxi",
    "munnar-to-alleppey-taxi",
    "munnar-to-thekkady-taxi",
    "mysore-to-bangalore-taxi",
    "mysore-to-coorg-cab",
    "mysore-to-ooty-taxi",
    "ooty-to-bangalore-taxi",
    "ooty-to-coimbatore-taxi",
    "pondicherry-to-bangalore-taxi",
    "pondicherry-to-chennai-taxi",
    "pondicherry-to-coimbatore-taxi",
    "pondicherry-to-madurai-taxi",
    "pondicherry-to-mahabalipuram-taxi",
    "pondicherry-to-salem-taxi",
    "rameswaram-to-madurai-taxi",
    "rameshwaram-to-kanyakumari-taxi",
    "salem-to-chennai-taxi",
    "salem-to-coimbatore-taxi",
    "salem-to-madurai-taxi",
    "salem-to-trichy-taxi",
    "salem-to-vellore-taxi",
    "salem-to-yercaud-taxi",
    "tirupati-to-arunachalam-cab",
    "tirupati-to-chennai-taxi",
    "tiruvannamalai-to-chennai-taxi",
    "trichy-to-chennai-taxi",
    "trichy-to-coimbatore-taxi",
    "trichy-to-madurai-taxi",
    "trichy-to-salem-taxi",
    "trichy-to-velankanni-cab",
    "trivandrum-to-kanyakumari-taxi",
    "velankanni-to-pondicherry-cab",
    "vellore-to-bangalore-taxi",
    "vellore-to-chennai-taxi",
    "vellore-to-pondicherry-taxi",
    "vellore-to-tiruvannamalai-cab",
    "vijayawada-to-hyderabad-taxi",
    "villupuram-to-chennai-taxi",
    "vellore-to-yelagiri-taxi",
    "vellore-to-sripuram-taxi",
    "madurai-to-kanyakumari-taxi",
    "chennai-to-ooty-taxi",
    "chennai-to-hosur-taxi",
    "coimbatore-to-erode-taxi",
    "coimbatore-to-palani-taxi",
    "chennai-to-yercaud-taxi",
    "trichy-to-kumbakonam-taxi",
    "madurai-to-tirunelveli-taxi",
    "madurai-to-munnar-taxi",
    "trichy-to-thanjavur-taxi",
    "salem-to-erode-taxi",
    "madurai-to-dindigul-taxi",
    "chennai-to-thanjavur-taxi",
    "bangalore-to-yercaud-taxi",
    "coimbatore-to-tirupur-taxi",
    "trichy-to-karur-taxi",
    "madurai-to-theni-taxi",
    "madurai-to-ooty-taxi",
    "chennai-to-chidambaram-taxi",
    "chennai-to-erode-taxi",
    "vellore-to-tirupati-taxi",
    "kanchipuram-to-vellore-taxi",
    "madurai-to-karaikudi-taxi",
    "nagercoil-to-kanyakumari-taxi",
    "madurai-to-tuticorin-taxi",
    "trichy-to-rameswaram-taxi",
    "coimbatore-to-karur-taxi",
    "chennai-to-dindigul-taxi",
    "madurai-to-sivakasi-taxi",
    "madurai-to-ramnad-taxi",
    "rameswaram-to-tiruchendur-taxi",
    "tirunelveli-to-tiruchendur-taxi",
    "thoothukudi-to-tiruchendur-taxi",
    "bangalore-to-tirunelveli-taxi",
    "chennai-to-tiruchendur-taxi",
    "coimbatore-to-pollachi-taxi",
    "coimbatore-to-mettupalayam-taxi",
    "madurai-to-palani-taxi",
    "coimbatore-to-dindigul-taxi",
    "chennai-to-nagercoil-taxi",
    "madurai-to-nagercoil-taxi",
    "chennai-to-palani-taxi",
  ].map((slug) => {
    const [from, to] = parseRoute(slug);
    return makeRoutePage(slug, from, to);
  }),

  // ── City / drop-taxi pages (53) ────────────────────────────────────
  // The generic "drop-taxi" landing page
  {
    slug: "drop-taxi",
    title: "Drop Taxi — One Way Cab from INR 11/km | South India",
    h1: "Drop Taxi — One Way Taxi Booking",
    description: "Book drop taxi across South India from INR 11/km. One way fare only — no return charge. Mini, Sedan, Etios, SUV, Innova & Innova Crysta. 100+ cities, 24x7 booking. Call 99949 40558.",
    eyebrow: "Drop Taxi — One Way Cab South India",
    lead: "Book drop taxi from Chennai, Bangalore, Coimbatore, Madurai, Hyderabad, and 100+ cities. Pay only for one way distance.",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Drop Taxi" }],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: "DropTaxi covers all major cities and towns across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.",
    ctaTitle: "Book Your Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: CITY_FAQS,
    relatedLinks: CITY_RELATED_LINKS,
    pageType: "city",
  },
  // Remaining drop-taxi city pages
  ...[
    "drop-taxi-cuddalore",
    "drop-taxi-hyderabad",
    "drop-taxi-in-bangalore",
    "drop-taxi-in-chengalpattu",
    "drop-taxi-in-chennai",
    "drop-taxi-in-chidambaram",
    "drop-taxi-in-chrompet",
    "drop-taxi-in-coimbatore",
    "drop-taxi-in-dharmapuri",
    "drop-taxi-in-dindigul",
    "drop-taxi-in-erode",
    "drop-taxi-in-hosur",
    "drop-taxi-in-kanchipuram",
    "drop-taxi-in-karaikudi",
    "drop-taxi-in-karur",
    "drop-taxi-in-koomapatti",
    "drop-taxi-in-krishnagiri",
    "drop-taxi-in-kumbakonam",
    "drop-taxi-in-mayiladuthurai",
    "drop-taxi-in-namakkal",
    "drop-taxi-in-palani",
    "drop-taxi-in-pondicherry",
    "drop-taxi-in-pudukkottai",
    "drop-taxi-in-ramanathapuram",
    "drop-taxi-in-ranipet",
    "drop-taxi-in-salem",
    "drop-taxi-in-sivakasi",
    "drop-taxi-in-tenkasi",
    "drop-taxi-in-theni",
    "drop-taxi-in-thoothukudi",
    "drop-taxi-in-tiruchendur",
    "drop-taxi-in-trichy",
    "drop-taxi-in-trivandrum",
    "drop-taxi-in-vellore",
    "drop-taxi-in-virudhunagar",
    "drop-taxi-madurai",
    "drop-taxi-munnar",
    "drop-taxi-neyveli",
    "drop-taxi-srirangam",
    "drop-taxi-thanjavur",
    "drop-taxi-tirunelveli",
    "drop-taxi-villupuram",
    "tiruvannamalai-drop-taxi",
    "drop-taxi-in-tirupur",
    "drop-taxi-in-nagercoil",
    "drop-taxi-in-kanyakumari",
    "drop-taxi-in-yelagiri",
    "drop-taxi-in-arakkonam",
    "drop-taxi-in-ambattur",
    "drop-taxi-in-perambur",
    "drop-taxi-in-walajapet",
  ].map((slug) => makeCityPage(slug, parseCitySlug(slug))),

  // ── Extra city-type pages (6) ──────────────────────────────────────
  {
    slug: "one-way-cab-booking",
    title: "One Way Cab Booking Online — From INR 11/km | DropTaxi",
    h1: "One Way Cab Booking Online",
    description: "Book one way cab online across South India from INR 11/km. Mini, Sedan, Etios, SUV, Innova & Innova Crysta with fixed fare, no return charge. 100+ cities, 24x7 booking.",
    eyebrow: "One Way Cab Booking — South India",
    lead: "Book one way intercity cabs from Chennai, Bangalore, Hyderabad, Coimbatore, and 100+ cities with transparent fixed fares.",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: "One Way Cab Booking" }],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: "Fixed fares, clean cabs, and professional drivers for every trip.",
    ctaTitle: "Book Your Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: CITY_FAQS,
    relatedLinks: CITY_RELATED_LINKS,
    pageType: "city",
  },
  {
    slug: "one-way-taxi-in-coimbatore",
    title: "One Way Taxi in Coimbatore — Outstation Cab from INR 11/km",
    h1: "One Way Taxi in Coimbatore",
    description: "Book one way taxi in Coimbatore to Ooty, Chennai, Madurai & more. Sedan from INR 11/km, no return fare. Verified drivers, 24x7 support.",
    eyebrow: "One Way Taxi Coimbatore — Outstation Cab",
    lead: "Affordable one way taxi from Coimbatore to Ooty, Chennai, Madurai, Salem, and all major South Indian cities.",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: "Coimbatore" }],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: "Whether you need a quick intercity transfer or an outstation trip, our Coimbatore taxi service has you covered.",
    ctaTitle: "Book Your Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: CITY_FAQS,
    relatedLinks: CITY_RELATED_LINKS,
    pageType: "city",
  },
  {
    slug: "one-way-taxi-in-madurai",
    title: "One Way Taxi in Madurai — Outstation Cab from INR 11/km",
    h1: "One Way Taxi in Madurai",
    description: "Book one way taxi in Madurai to Chennai, Rameswaram, Kodaikanal & more. Fixed fare from INR 11/km, no return charge. Call 99949 40558.",
    eyebrow: "One Way Taxi Madurai — Outstation Cab",
    lead: "Affordable one way taxi from Madurai to Chennai, Rameswaram, Kodaikanal, Trichy, and all South Indian cities.",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: "Madurai" }],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: "Whether you need a quick intercity transfer or an outstation trip, our Madurai taxi service has you covered.",
    ctaTitle: "Book Your Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: CITY_FAQS,
    relatedLinks: CITY_RELATED_LINKS,
    pageType: "city",
  },
  {
    slug: "one-way-taxi-in-trichy",
    title: "One Way Taxi in Trichy — Outstation Cab from INR 11/km",
    h1: "One Way Taxi in Trichy",
    description: "Book one way taxi in Trichy to Chennai, Madurai, Velankanni & more. Fixed fare from INR 11/km, no return charge. Verified drivers, 24x7 booking.",
    eyebrow: "One Way Taxi Trichy — Outstation Cab",
    lead: "Affordable one way taxi from Trichy to Chennai, Madurai, Velankanni, Salem, and all South Indian cities.",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: "Trichy" }],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: "Whether you need a quick intercity transfer or an outstation trip, our Trichy taxi service has you covered.",
    ctaTitle: "Book Your Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: CITY_FAQS,
    relatedLinks: CITY_RELATED_LINKS,
    pageType: "city",
  },
  {
    slug: "outstation-cabs",
    title: "Outstation Cabs — One Way from INR 11/km | DropTaxi",
    h1: "Outstation Cab Booking",
    description: "Book outstation cabs across South India from INR 11/km. One way & round trip with fixed fare, no return charge. Mini, Sedan, SUV, Innova & Innova Crysta. 100+ cities.",
    eyebrow: "Outstation Cabs — One Way & Round Trip",
    lead: "Book outstation cabs from Chennai, Bangalore, Hyderabad, Coimbatore, Madurai, and 100+ cities. Fixed fares, verified drivers, 24x7 support.",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: "Outstation Cabs" }],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: "Fixed fares, clean cabs, and professional drivers for every trip.",
    ctaTitle: "Book Your Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: CITY_FAQS,
    relatedLinks: CITY_RELATED_LINKS,
    pageType: "city",
  },
  {
    slug: "rameshwaram-taxi-service",
    title: "Rameshwaram Taxi Service — Temple Trips & Outstation",
    h1: "Rameshwaram Taxi Service",
    description: "Book Rameshwaram taxi for temple visits, Kanyakumari trips & outstation travel. Fixed fare from INR 11/km, no return charge. Call 99949 40558.",
    eyebrow: "Rameshwaram Taxi — Temple Trips & Outstation",
    lead: "Reliable taxi service in Rameshwaram for Rameswaram temple darshan, Kanyakumari trips, and outstation travel to Madurai and beyond.",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Cities", href: "/cities" }, { label: "Rameshwaram" }],
    sectionTitle: "Booking Highlights",
    listItems: CITY_LIST_ITEMS,
    bodyText: "Fixed fares, clean cabs, and professional drivers for every trip.",
    ctaTitle: "Book Your Taxi",
    carTypes: ROUTE_CAR_TYPES,
    faqs: CITY_FAQS,
    relatedLinks: CITY_RELATED_LINKS,
    pageType: "city",
  },

  // ── Call taxi pages (58) ───────────────────────────────────────────
  ...[
    "ambur-call-taxi",
    "arani-call-taxi",
    "ariyalur-call-taxi",
    "avinashi-call-taxi",
    "call-taxi-ambattur",
    "call-taxi-bhavani",
    "call-taxi-chidambaram",
    "call-taxi-gobichettipalayam",
    "call-taxi-in-adyar",
    "call-taxi-in-erode",
    "call-taxi-in-kanchipuram",
    "call-taxi-in-karur",
    "call-taxi-in-kodaikanal",
    "call-taxi-in-medavakkam",
    "call-taxi-in-mettupalayam",
    "call-taxi-in-mylapore",
    "call-taxi-in-ooty",
    "call-taxi-in-palakkad",
    "call-taxi-in-palladam",
    "call-taxi-in-paramakudi",
    "call-taxi-in-pollachi",
    "call-taxi-in-tambaram",
    "call-taxi-in-tirupur",
    "call-taxi-in-tiruvannamalai",
    "call-taxi-in-tuticorin",
    "call-taxi-in-udumalpet",
    "call-taxi-in-vellore",
    "call-taxi-kanyakumari",
    "call-taxi-karaikal",
    "call-taxi-karaikudi",
    "call-taxi-katpadi",
    "call-taxi-mayiladuthurai",
    "call-taxi-nagercoil",
    "call-taxi-perambalur",
    "call-taxi-perambur",
    "call-taxi-perundurai",
    "call-taxi-porur",
    "call-taxi-salem",
    "call-taxi-sriperumbudur",
    "call-taxi-tindivanam",
    "call-taxi-tiruchengode",
    "call-taxi-virudhachalam",
    "call-taxi-virudhunagar",
    "mannargudi-call-taxi",
    "sivagangai-call-taxi",
    "thiruvarur-call-taxi",
    "thuraiyur-call-taxi",
    "call-taxi-in-bangalore",
    "call-taxi-in-chennai",
    "call-taxi-in-madurai",
    "call-taxi-in-coimbatore",
    "call-taxi-in-hyderabad",
    "call-taxi-in-mysore",
    "call-taxi-in-trivandrum",
    "call-taxi-in-kolkata",
    "call-taxi-in-hosur",
    "call-taxi-in-thanjavur",
    "call-taxi-kumbakonam",
  ].map((slug) => makeCallTaxiPage(slug, parseCitySlug(slug))),

  // ── Airport pages (14) ────────────────────────────────────────────
  ...[
    "airport-taxi-hosur",
    "airport-taxi-in-bangalore",
    "airport-taxi-in-chennai",
    "airport-taxi-mangalore",
    "cochin-airport-taxi",
    "coimbatore-airport-taxi",
    "madurai-airport-taxi",
    "trichy-airport-taxi",
    "airport-taxi-in-hyderabad",
    "airport-taxi-trivandrum",
    "airport-taxi-tirupati",
    "airport-taxi-kanyakumari",
    "airport-taxi-salem",
    "airport-taxi-tuticorin",
  ].map((slug) => makeAirportPage(slug, parseAirportSlug(slug))),

  // ── Static pages (35 — removed duplicate contact-us) ─────────────
  makeStaticPage("about-us", "About DropTaxi", "About DropTaxi",
    "DropTaxi is South India's trusted one way taxi booking platform. Founded in 2020, we serve 100+ cities with fixed fares, verified drivers, and 24x7 support.", {
    lead: "Simplifying intercity travel across South India since 2020 — one ride at a time.",
    sectionTitle: "Company Overview",
    listItems: [
      { label: "Founded", value: "2020" },
      { label: "Trips Completed", value: "10,000+" },
      { label: "Cities Covered", value: "100+ across 5 states" },
      { label: "Fleet Size", value: "500+ vehicles (Mini, Sedan, Etios, SUV, Innova, Innova Crysta)" },
      { label: "Support", value: "24x7 live phone and Telegram" },
      { label: "Service Area", value: "Tamil Nadu, Karnataka, Kerala, AP, Telangana" },
    ],
    contentSections: [
      { heading: "Our Story", body: "DropTaxi was founded with a simple mission — to make intercity travel in South India affordable, safe, and hassle-free. Traditional taxi services charged return fares even for one way trips, doubling the cost for travellers. We built DropTaxi to solve this by connecting one way travellers with drivers heading in the same direction. Today, we serve over 100 cities and have completed more than 10,000 trips across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and Telangana." },
      { heading: "Why Travellers Trust Us", body: "Every DropTaxi driver is verified through background checks, driving licence validation, and vehicle inspection. Our fixed fare model means no surge pricing, no return fare charges, and no hidden costs. You know the exact fare before you book. Our 24x7 customer support team monitors every trip via GPS tracking, ensuring your safety from pickup to drop. We maintain a 4.8/5 average rating across all completed trips." },
      { heading: "Our Fleet", body: "We operate a diverse fleet to suit every travel need. Mini cars for economical solo travel. Sedans like Swift Dzire and Toyota Etios for comfortable 4+1 rides. SUVs and Innova for 6+1 or 7+1 family groups with roof carrier. Toyota Innova Crysta for premium 6+1 corporate travel. Every vehicle is regularly serviced, sanitized, and equipped with first-aid kits and GPS tracking." },
      { heading: "Service Coverage", body: "DropTaxi operates across South India's five major states. In Tamil Nadu, we cover Chennai, Coimbatore, Madurai, Trichy, Salem, Vellore, and 50+ towns. In Karnataka — Bangalore, Mysore, Mangalore, and Hubli. In Kerala — Kochi, Trivandrum, Kozhikode, and Thrissur. In Andhra Pradesh — Vijayawada, Visakhapatnam, and Tirupati. In Telangana — Hyderabad and Warangal." },
    ],
    faqs: [
      { question: "Who operates DropTaxi?", answer: "DropTaxi is a registered taxi aggregation service operating since 2020 across South India with verified fleet operators and independent drivers across 100+ cities." },
      { question: "Is DropTaxi safe for solo women travellers?", answer: "Yes. All drivers are background-verified, trips are GPS-tracked, and our 24x7 support team monitors rides in real-time. Driver details are shared before every trip." },
      { question: "How is DropTaxi different from Ola or Uber?", answer: "DropTaxi specializes in one way intercity trips with fixed fares. Unlike ride-hailing apps that charge surge pricing, our fares are locked at booking with no return fare." },
      { question: "Does DropTaxi operate during festivals and holidays?", answer: "Yes. We operate 365 days a year including Pongal, Diwali, Christmas, and all public holidays. Advance booking recommended during peak seasons." },
    ],
  }),
  makeStaticPage("all-routes", "All 105 One Way Taxi Routes & Fares", "All One Way Taxi Routes", "Browse 105+ one way taxi routes across South India with fares. Chennai, Bangalore, Coimbatore, Madurai & more. Sedan from INR 11/km."),
  makeStaticPage("blogs", "Blog — Travel Tips & Route Guides", "DropTaxi Blog", "Travel tips, route guides, fare comparisons, and booking advice for one way taxi travel across South India."),
  makeStaticPage("book-now", "Book One Way Taxi Now", "Book Your One Way Taxi", "Book a one way taxi instantly from INR 11/km. Mini, Sedan, Etios, SUV, Innova & Innova Crysta. Fixed fare, no return charge, 24x7 support. Call 99949 40558."),
  makeStaticPage("cities", "Drop Taxi in 100+ Cities — South India", "Cities We Serve", "Explore 100+ cities covered by DropTaxi for one way taxi and drop taxi services across Tamil Nadu, Karnataka, Kerala, AP & Telangana."),
  makeStaticPage("contact", "Contact DropTaxi", "Contact Us",
    "Get in touch with DropTaxi for bookings, support, or partnership enquiries. Available 24x7 via phone, Telegram, and email.", {
    lead: "We are available 24x7 to help you plan your trip.",
    sectionTitle: "How to Reach Us",
    listItems: [
      { label: "Phone", value: "+91 99949 40558 (24x7)" },
      { label: "Telegram", value: "+91 99949 40558" },
      { label: "Email", value: "enquiry@droptaxi.ai" },
      { label: "Response Time", value: "Under 5 minutes during business hours" },
    ],
    bodyText: "For instant booking, send your pickup city, drop city, travel date, and preferred car type on Telegram. Our dispatch team confirms fare and assigns a driver within minutes.",
    faqs: [
      { question: "What is the fastest way to book?", answer: "Telegram is fastest. Send trip details to +91 99949 40558 and get fare confirmation within minutes." },
      { question: "Can I modify my booking after confirmation?", answer: "Yes. Changes can be made up to 4 hours before pickup at no extra charge." },
      { question: "What if I need to cancel?", answer: "Cancellations 4+ hours before pickup are free. Late cancellations may incur a nominal fee." },
    ],
  }),
  makeStaticPage("explore-local-trips-with-the-convenience-of-a-one-way-taxi", "Explore Local Trips With a One Way Taxi", "Explore Local Trips With the Convenience of a One Way Taxi",
    "Discover how a one way taxi makes local trips easy and affordable with no return fare.", {
    contentSections: [
      { heading: "Why One Way Taxis Are Perfect for Local Trips", body: "One way taxis eliminate the biggest cost burden of traditional cab services — the return fare. When you book a round trip taxi for a one way journey, you pay for the driver's empty return trip. With DropTaxi, you only pay for your leg of the journey, saving 30–50% compared to round trip rates." },
      { heading: "Ideal Scenarios for Local One Way Travel", body: "One way taxis are perfect for airport drops, railway station transfers, hospital visits (especially to CMC Vellore), weekend getaways to Pondicherry or Ooty, and intercity business meetings. Even short trips like Chennai to Kanchipuram or Bangalore to Hosur benefit from one way pricing." },
      { heading: "How Pricing Works", body: "DropTaxi charges a per-kilometer rate by vehicle type. Mini starts at INR 11/km, Sedan/Etios at INR 13/km, SUV/Innova at INR 17/km, and Innova Crysta at INR 21/km. The fare includes fuel, driver charges, and vehicle cost. Tolls, parking, and state permits are additional at actual cost. No hidden charges or surge pricing." },
    ],
  }),
  makeStaticPage("faq", "FAQ", "Frequently Asked Questions",
    "Find answers to common questions about DropTaxi one way taxi booking, fares, and services.", {
    faqs: [
      { question: "What is DropTaxi?", answer: "DropTaxi is a one way taxi booking service covering 100+ cities across South India with fixed fares, verified drivers, and 24x7 support." },
      { question: "How do I book a one way taxi?", answer: "Send your pickup city, drop city, travel date, and preferred car type on Telegram (+91 99949 40558) or call us. We confirm fare within minutes." },
      { question: "Is there a return fare charge?", answer: "No. You only pay for the one way distance. No empty return fare." },
      { question: "What vehicles are available?", answer: "Mini (3+1), Sedan (4+1), Etios (4+1), Sedan Non-CNG (4+1), SUV (6+1/7+1), Innova (6+1/7+1), and Innova Crysta (6+1)." },
      { question: "Are drivers verified?", answer: "Yes. Background checks, licence verification, and vehicle inspection. Driver details shared before pickup." },
      { question: "What payment methods are accepted?", answer: "Cash, UPI (GPay, PhonePe, Paytm), and bank transfers. Payment after trip completion." },
      { question: "Can I book for night travel?", answer: "Yes. 24x7 service. Night charge of INR 200–300 between 10 PM and 6 AM." },
      { question: "Do you offer airport pickup?", answer: "Yes. Flight tracking and meet-and-greet at all major South Indian airports." },
    ],
  }),
  makeStaticPage("privacy-policy-2", "Privacy Policy", "Privacy Policy", "Read the DropTaxi privacy policy to understand how we handle your data."),
  makeStaticPage("reviews", "Customer Reviews", "Customer Reviews",
    "Read what travellers say about DropTaxi one way taxi service across South India.", {
    lead: "Hear from travellers who trust DropTaxi for their intercity rides.",
    contentSections: [
      { heading: "What Our Customers Say", body: "DropTaxi maintains a 4.8/5 average rating across 2,800+ completed trips. Our customers value transparent pricing, on-time pickups, clean vehicles, and professional drivers. Many are repeat travellers who book monthly for business or family travel." },
      { heading: "How We Maintain Quality", body: "Every trip is rated by the passenger. Drivers below 4.5 rating receive additional training. Vehicles are inspected monthly for cleanliness, AC performance, and mechanical condition. Our quality team reviews all feedback within 24 hours." },
    ],
  }),
  makeStaticPage("routes", "One Way Taxi Routes — 105+ South India Routes", "One Way Taxi Routes", "Browse 105+ popular one way taxi routes across Tamil Nadu, Karnataka, Kerala & AP with fares starting from INR 11/km."),
  makeStaticPage("tariff", "One Way Taxi Fare — Mini INR 11/km, Sedan INR 13/km, SUV INR 17/km", "Taxi Tariff and Fare Chart",
    "DropTaxi fare chart — Mini INR 11/km, Sedan INR 13/km, SUV/Innova INR 17/km, Innova Crysta INR 21/km. One way pricing only, no return fare.", {
    lead: "Transparent per-kilometer pricing with no hidden charges or return fares.",
    sectionTitle: "Fare Structure",
    listItems: [
      { label: "Mini (3+1)", value: "INR 11/km — economical for solo or couple travel" },
      { label: "Sedan (4+1)", value: "INR 13/km — comfortable for small families" },
      { label: "Etios (4+1)", value: "INR 13/km — spacious sedan with large boot" },
      { label: "Sedan Non-CNG (4+1)", value: "INR 13/km — petrol/diesel, ideal for hill routes" },
      { label: "SUV (6+1 / 7+1)", value: "INR 17/km — family groups with carrier" },
      { label: "Innova (6+1 / 7+1)", value: "INR 17/km — group travel with carrier" },
      { label: "Innova Crysta (6+1)", value: "INR 21/km — premium corporate travel" },
      { label: "Minimum Fare", value: "INR 1,500 for all vehicle types" },
      { label: "Night Charge", value: "INR 200–300 (10 PM to 6 AM)" },
      { label: "Tolls & Permits", value: "Actual cost added where applicable" },
    ],
    bodyText: "All fares are one way only — you never pay for the driver's return trip. Final fare is confirmed before booking and does not change.",
  }),
  makeStaticPage("terms-and-conditions", "Terms & Conditions", "Terms and Conditions", "Read the terms and conditions for using DropTaxi services."),
  makeStaticPage("the-benefits-of-booking-a-one-way-taxi-for-airport-pickup-drop", "Benefits of One Way Taxi for Airport Pickup & Drop", "The Benefits of Booking a One Way Taxi for Airport Pickup and Drop",
    "Learn why a one way taxi is the smartest choice for airport pickups and drops in South India.", {
    contentSections: [
      { heading: "Save Up to 50% on Airport Transfers", body: "Round trip airport taxis charge you for the driver's empty return journey. With a one way taxi, you only pay for the distance from the airport to your destination. For routes like Chennai Airport to Vellore (135 km), this saves INR 2,000–3,000 compared to round trip rates." },
      { heading: "Flight Tracking and Meet-and-Greet", body: "DropTaxi drivers monitor your flight status in real time. If your flight is delayed, the driver adjusts pickup time automatically at no extra charge. At arrivals, your driver waits with a name board and helps with luggage." },
      { heading: "Available at All Major Airports", body: "We serve Chennai (MAA), Bangalore (BLR), Hyderabad (HYD), Kochi (COK), Coimbatore (CJB), Madurai (IXM), Trichy (TRZ), Mangalore (IXE), and Trivandrum (TRV). Available 24x7 including midnight arrivals." },
    ],
  }),
  makeStaticPage("why-choose-a-one-way-taxi-for-your-outstation-trip", "Why Choose a One Way Taxi for Outstation Trips", "Why Choose a One Way Taxi for Your Outstation Trip",
    "Find out why one way taxis are the best option for outstation travel in South India.", {
    contentSections: [
      { heading: "The Hidden Cost of Round Trip Taxis", body: "When you book a round trip taxi for a one way journey, you pay for the driver's fuel, time, and tolls for the return trip — even though you are not in the car. On a 300 km route, this adds INR 3,000–5,000 to your bill. One way taxis solve this by matching you with drivers heading in your direction." },
      { heading: "Flexibility Without Commitment", body: "One way taxis give you the freedom to travel without planning a return. Stay at your destination for a day, a week, or a month. Take a bus or train back. Fly home. This flexibility is especially valuable for family visits, hospital trips, and business travel where return dates are uncertain." },
      { heading: "Comfort and Safety Over Long Distances", body: "Outstation trips of 200–600 km take 4–10 hours by road. DropTaxi vehicles are maintained for long-distance comfort — working AC, spacious boot, clean interiors, and experienced highway drivers. Every trip is GPS-tracked with our support team monitoring in real time." },
      { heading: "How to Book Your Outstation Trip", body: "Share your pickup city, destination, travel date, and preferred car type on Telegram (+91 99949 40558). We confirm the final fare — including tolls and permits — within minutes. Pay after the trip via cash, UPI, or bank transfer." },
    ],
  }),
  makeStaticPage("why-round-trip-taxi-services-can-be-a-cost-effective-option-for-your-journey", "Round Trip Taxi Services — Cost Effective Travel", "Why Round Trip Taxi Services Can Be a Cost Effective Option",
    "Explore when round trip taxi services offer better value for your travel plans.", {
    contentSections: [
      { heading: "When Round Trip Makes Sense", body: "Round trip taxis are cost effective for same day return trips, multi-city tours, and short visits where you know the return date. If your outstation trip involves returning within 24 hours, a round trip rate can be cheaper than two separate one way bookings." },
      { heading: "Comparing One Way vs Round Trip Costs", body: "For a Chennai to Pondicherry day trip (150 km one way), a round trip sedan costs approximately INR 3,500–4,000 including waiting time. Two separate one way bookings total around INR 4,000. The round trip includes waiting time while you explore, making it the better deal for day trips." },
      { heading: "Multi-City Tours and Pilgrimages", body: "Temple circuits (Madurai-Rameswaram-Kanyakumari), hill station tours (Ooty-Coonoor-Kodaikanal), and multi-city business trips are ideal for round trip bookings. The driver stays with you throughout, eliminating the hassle of booking separate cabs at each stop." },
    ],
  }),

  // ── New content pages targeting competitor keywords ──────────────
  makeStaticPage("car-rental-in-chennai", "Car Rental in Chennai — Sedan, SUV & Innova Crysta", "Car Rental in Chennai",
    "Book car rental in Chennai from INR 11/km. Sedan, SUV, Innova Crysta for local, outstation & airport transfers. No hidden charges. Call 99949 40558.", {
    lead: "Affordable car rental in Chennai with professional drivers for city tours, airport transfers, and outstation trips.",
    sectionTitle: "Car Rental Options",
    listItems: [
      { label: "Mini (3+1)", value: "From INR 11/km — economical solo/couple travel" },
      { label: "Sedan / Etios (4+1)", value: "From INR 13/km — comfortable family rides" },
      { label: "SUV / Innova (6+1 / 7+1)", value: "From INR 17/km — groups with carrier" },
      { label: "Innova Crysta (6+1)", value: "From INR 21/km — premium corporate travel" },
      { label: "Service", value: "Airport transfers, city tours, outstation, corporate" },
      { label: "Booking", value: "24x7 via Telegram, phone, or website" },
    ],
    bodyText: "Our Chennai car rental fleet covers all zones — T. Nagar, Anna Nagar, OMR, ECR, Adyar, and Chennai Airport. All vehicles come with experienced local drivers who know the city inside out.",
    contentSections: [
      { heading: "Why Choose DropTaxi Car Rental in Chennai", body: "Chennai car rental with DropTaxi gives you the freedom of a personal vehicle with the convenience of a professional driver. Unlike self-drive rentals, our chauffeur-driven service eliminates parking hassles, navigation stress, and the risk of driving in Chennai traffic. Fixed per-km rates with no surge pricing or hidden charges." },
      { heading: "Popular Car Rental Routes from Chennai", body: "Most popular routes include Chennai to Pondicherry (150 km), Chennai to Mahabalipuram (60 km), Chennai to Kanchipuram (75 km), Chennai to Vellore (135 km), and Chennai to Tirupati (135 km). Full-day rentals available for business meetings, hospital visits to CMC Vellore, and weekend getaways." },
      { heading: "Airport Transfers in Chennai", body: "Our Chennai airport car rental service includes flight tracking, arrivals pickup with name board, and luggage assistance. Available 24x7 including midnight arrivals. Pre-book for guaranteed vehicle availability during peak travel seasons." },
    ],
    faqs: [
      { question: "What is the car rental rate in Chennai?", answer: "Mini from INR 11/km, Sedan/Etios from INR 13/km, SUV/Innova from INR 17/km, Innova Crysta from INR 21/km. Minimum fare INR 1,500. Tolls and parking extra at actual cost." },
      { question: "Can I rent a car for a full day in Chennai?", answer: "Yes. Full-day packages available for city tours, business travel, and shopping trips. Contact us for customized packages." },
      { question: "Is driver included in Chennai car rental?", answer: "Yes. All our rentals are chauffeur-driven with experienced, verified drivers. No self-drive option." },
      { question: "Can I book a car rental from Chennai Airport?", answer: "Yes. We provide 24x7 airport pickup with flight tracking and meet-and-greet service at arrivals." },
    ],
    relatedLinks: [
      { title: "Chennai to Pondicherry Taxi", description: "One way taxi to Pondicherry.", href: "/chennai-to-pondicherry-taxi" },
      { title: "Chennai to Vellore Taxi", description: "One way taxi to Vellore.", href: "/chennai-to-vellore-taxi" },
      { title: "Airport Taxi in Chennai", description: "Chennai airport transfers.", href: "/airport-taxi-in-chennai" },
      { title: "Drop Taxi in Chennai", description: "One way drop taxi from Chennai.", href: "/drop-taxi-in-chennai" },
    ],
  }),
  makeStaticPage("car-rental-in-bangalore", "Car Rental in Bangalore — Sedan, SUV & Innova Crysta", "Car Rental in Bangalore",
    "Book car rental in Bangalore from INR 11/km. Sedan, SUV, Innova Crysta for local, outstation & airport transfers. No hidden charges. Call 99949 40558.", {
    lead: "Professional car rental in Bangalore with verified drivers for city tours, IT corridor transfers, and outstation trips.",
    sectionTitle: "Car Rental Options",
    listItems: [
      { label: "Mini (3+1)", value: "From INR 11/km — economical city transfers" },
      { label: "Sedan / Etios (4+1)", value: "From INR 13/km — airport & business" },
      { label: "SUV / Innova (6+1/7+1)", value: "From INR 17/km — family with carrier" },
      { label: "Innova Crysta (6+1)", value: "From INR 21/km — corporate & premium" },
      { label: "Coverage", value: "Whitefield, Electronic City, Koramangala, all zones" },
      { label: "Airport", value: "KIA Terminal pickup & drop with flight tracking" },
      { label: "Booking", value: "24x7 via Telegram, phone, or website" },
    ],
    bodyText: "Our Bangalore car rental covers all IT corridors, residential areas, and the Kempegowda International Airport. Professional drivers familiar with Bangalore's traffic patterns ensure timely arrivals.",
    contentSections: [
      { heading: "Bangalore Car Rental for Every Need", body: "Whether you need a ride from Whitefield to the airport, an outstation trip to Mysore or Coorg, or a full-day car for client meetings across the city, our Bangalore car rental service has you covered. All vehicles are AC, GPS-tracked, and driven by verified professionals." },
      { heading: "Popular Outstation Routes from Bangalore", body: "Top routes include Bangalore to Mysore (150 km), Bangalore to Coorg (265 km), Bangalore to Ooty (280 km), Bangalore to Goa (560 km), and Bangalore to Chennai (350 km). One way pricing means you never pay for the driver's return trip." },
    ],
    faqs: [
      { question: "What is the cheapest car rental in Bangalore?", answer: "Mini (3+1) starts at INR 11/km and Sedan (4+1) at INR 13/km with a minimum fare of INR 1,500. Mini is the most economical option." },
      { question: "Can I book a car from Bangalore Airport?", answer: "Yes. 24x7 airport transfers with flight tracking, name board pickup, and luggage assistance. Pre-booking recommended." },
      { question: "Do you have Innova available in Bangalore?", answer: "Yes. Toyota Innova Crysta available at INR 21/km for premium travel, corporate rides, and group trips of up to 7 passengers." },
    ],
    relatedLinks: [
      { title: "Bangalore to Mysore Taxi", description: "One way to Mysore.", href: "/bangalore-to-mysore-taxi" },
      { title: "Bangalore to Coorg Taxi", description: "One way to Coorg.", href: "/bangalore-to-coorg-taxi" },
      { title: "Airport Taxi Bangalore", description: "Airport transfers.", href: "/airport-taxi-in-bangalore" },
      { title: "Drop Taxi Bangalore", description: "Drop taxi from Bangalore.", href: "/drop-taxi-in-bangalore" },
    ],
  }),
  makeStaticPage("car-rental-in-coimbatore", "Car Rental in Coimbatore — Sedan, SUV & Innova Crysta", "Car Rental in Coimbatore",
    "Book car rental in Coimbatore from INR 11/km. Sedan, SUV, Innova for Ooty, Munnar, local & outstation travel. Fixed fare. Call 99949 40558.", {
    lead: "Affordable car rental in Coimbatore with verified drivers for hill station trips, airport transfers, and city rides.",
    sectionTitle: "Available Vehicles",
    listItems: [
      { label: "Mini / Sedan / Etios", value: "From INR 11/km (Mini) / INR 13/km (Sedan)" },
      { label: "SUV", value: "From INR 17/km — recommended for hill stations" },
      { label: "Innova Crysta", value: "From INR 21/km — premium" },
      { label: "Top Routes", value: "Ooty, Munnar, Kodaikanal, Chennai, Madurai" },
    ],
    bodyText: "Coimbatore is the gateway to the Nilgiris and Western Ghats. Our car rental service is ideal for trips to Ooty, Coonoor, Munnar, and Kodaikanal with experienced hill-road drivers.",
    faqs: [
      { question: "What is the car rental rate in Coimbatore?", answer: "Starting from INR 13/km for sedan. SUV recommended for hill station routes at INR 17/km." },
      { question: "Can I rent a car for Ooty trip from Coimbatore?", answer: "Yes. We recommend SUV or Innova for the ghat road. Our drivers are experienced in the 36 hairpin bends route." },
    ],
  }),
  makeStaticPage("car-rental-in-madurai", "Car Rental in Madurai — Sedan, SUV & Innova Crysta", "Car Rental in Madurai",
    "Book car rental in Madurai from INR 11/km. Sedan, SUV, Innova for Rameswaram, Kodaikanal, outstation trips. Fixed fare. Call 99949 40558.", {
    lead: "Reliable car rental in Madurai for temple trips, hill station visits, and outstation travel across South India.",
    sectionTitle: "Available Vehicles",
    listItems: [
      { label: "Mini / Sedan / Etios", value: "From INR 11/km (Mini) / INR 13/km (Sedan)" },
      { label: "SUV / Innova", value: "From INR 17/km — with carrier" },
      { label: "Innova Crysta", value: "From INR 21/km" },
      { label: "Top Routes", value: "Rameswaram, Kodaikanal, Munnar, Kanyakumari" },
    ],
    bodyText: "Madurai is the temple city of Tamil Nadu and a major hub for pilgrim travel. Our car rental service connects to Rameswaram, Kodaikanal, Kanyakumari, and all South Indian destinations.",
    faqs: [
      { question: "What is the car rental rate in Madurai?", answer: "Starting from INR 13/km for sedan, INR 17/km for SUV, INR 21/km for Innova Crysta." },
      { question: "Can I book a car for Rameswaram from Madurai?", answer: "Yes. Madurai to Rameswaram is 165 km, approximately 3.5 hours. Fixed fare, no return charge." },
    ],
  }),
  makeStaticPage("car-rental-in-trichy", "Car Rental in Trichy — Sedan, SUV & Innova Crysta", "Car Rental in Trichy",
    "Book car rental in Trichy from INR 11/km. Sedan, SUV, Innova for Thanjavur, Velankanni, outstation travel. Fixed fare. Call 99949 40558.", {
    lead: "Affordable car rental in Trichy for temple circuit tours, Velankanni pilgrimages, and outstation trips.",
    sectionTitle: "Available Vehicles",
    listItems: [
      { label: "Mini / Sedan / Etios", value: "From INR 11/km (Mini) / INR 13/km (Sedan)" },
      { label: "SUV / Innova", value: "From INR 17/km — with carrier" },
      { label: "Top Routes", value: "Thanjavur, Velankanni, Kumbakonam, Madurai, Chennai" },
    ],
    bodyText: "Trichy (Tiruchirappalli) is central Tamil Nadu's major city with the iconic Rock Fort Temple. Our car rental connects to the Chola temple circuit, Velankanni, and all major cities.",
  }),
  makeStaticPage("car-rental-in-salem", "Car Rental in Salem — Sedan, SUV & Innova Crysta", "Car Rental in Salem",
    "Book car rental in Salem from INR 11/km. Sedan, SUV, Innova for Yercaud, Chennai, Coimbatore. Fixed fare. Call 99949 40558.", {
    lead: "Car rental in Salem for Yercaud hill trips, business travel, and outstation rides across Tamil Nadu.",
    sectionTitle: "Available Vehicles",
    listItems: [
      { label: "Mini / Sedan / Etios", value: "From INR 11/km (Mini) / INR 13/km (Sedan)" },
      { label: "SUV", value: "From INR 17/km — recommended for Yercaud ghat" },
      { label: "Top Routes", value: "Yercaud, Chennai, Coimbatore, Erode, Trichy" },
    ],
    bodyText: "Salem is a major junction city in Tamil Nadu and the gateway to Yercaud hill station. Our car rental service covers all Salem routes including the scenic ghat road to Yercaud.",
  }),
  makeStaticPage("car-rental-in-vellore", "Car Rental in Vellore — Sedan, SUV & Innova Crysta", "Car Rental in Vellore",
    "Book car rental in Vellore from INR 11/km. Sedan, SUV, Innova for CMC Hospital transfers, Tirupati, Chennai. Call 99949 40558.", {
    lead: "Car rental in Vellore for CMC Hospital visits, Tirupati pilgrimages, and Chennai airport transfers.",
    sectionTitle: "Available Vehicles",
    listItems: [
      { label: "Mini / Sedan / Etios", value: "From INR 11/km (Mini) / INR 13/km (Sedan)" },
      { label: "SUV / Innova", value: "From INR 17/km — with carrier" },
      { label: "Top Routes", value: "Chennai, Tirupati, Yelagiri, Bangalore, Sripuram" },
    ],
    bodyText: "Vellore is home to the renowned CMC Hospital and the golden Sripuram Temple. Our car rental service is popular for medical travel, pilgrimage, and airport transfers.",
  }),
  makeStaticPage("car-rental-in-pondicherry", "Car Rental in Pondicherry — Sedan, SUV & Innova Crysta", "Car Rental in Pondicherry",
    "Book car rental in Pondicherry from INR 11/km. Sedan, SUV, Innova for city tours, outstation travel. Fixed fare. Call 99949 40558.", {
    lead: "Explore Pondicherry and beyond with our affordable car rental service. Beach tours, Auroville visits, and outstation trips.",
    sectionTitle: "Available Vehicles",
    listItems: [
      { label: "Mini / Sedan / Etios", value: "From INR 11/km (Mini) / INR 13/km (Sedan)" },
      { label: "SUV / Innova", value: "From INR 17/km — with carrier" },
      { label: "Top Routes", value: "Chennai, Mahabalipuram, Chidambaram, Bangalore" },
    ],
    bodyText: "Pondicherry is a charming coastal union territory known for French Quarter, beaches, and Auroville. Our car rental covers city tours and outstation routes.",
  }),
  makeStaticPage("car-rental-in-tirupati", "Car Rental in Tirupati — Sedan, SUV & Innova Crysta", "Car Rental in Tirupati",
    "Book car rental in Tirupati from INR 11/km. Sedan, SUV, Innova for Tirumala darshan, Chennai, outstation. Call 99949 40558.", {
    lead: "Car rental in Tirupati for Tirumala Temple visits, airport transfers, and outstation travel.",
    sectionTitle: "Available Vehicles",
    listItems: [
      { label: "Mini / Sedan / Etios", value: "From INR 11/km (Mini) / INR 13/km (Sedan)" },
      { label: "SUV / Innova", value: "From INR 17/km — with carrier" },
      { label: "Top Routes", value: "Tirumala, Chennai, Vellore, Bangalore, Kanchipuram" },
    ],
    bodyText: "Tirupati serves millions of pilgrims annually visiting the Tirumala Venkateswara Temple. Our car rental provides comfortable temple transfers and outstation rides.",
  }),
  makeStaticPage("car-rental-in-kodaikanal", "Car Rental in Kodaikanal — SUV & Innova for Hill Roads", "Car Rental in Kodaikanal",
    "Book car rental in Kodaikanal from INR 17/km. SUV & Innova recommended for ghat roads. Local sightseeing & outstation. Call 99949 40558.", {
    lead: "Hill station car rental in Kodaikanal with experienced ghat-road drivers for sightseeing and outstation travel.",
    sectionTitle: "Available Vehicles",
    listItems: [
      { label: "SUV / Innova (6+1/7+1)", value: "From INR 17/km — best for hill roads, with carrier" },
      { label: "Innova Crysta (6+1)", value: "From INR 21/km — premium hill station travel" },
      { label: "Top Routes", value: "Madurai, Dindigul, Coimbatore, Palani" },
    ],
    bodyText: "Kodaikanal, the Princess of Hill Stations, sits at 2,133 metres in the Palani Hills. Our car rental service includes drivers experienced in the steep ghat roads with 36 hairpin bends.",
  }),
  makeStaticPage("cab-booking-online", "Online Cab Booking — Book One Way Taxi Instantly", "Online Cab Booking",
    "Book cab online across South India from INR 11/km. Instant confirmation via Telegram. Mini, Sedan, SUV, Innova & Innova Crysta. No app download needed. Call 99949 40558.", {
    lead: "Book your cab online in under 2 minutes. Share trip details on Telegram or phone. Get instant fare confirmation with no app download required.",
    sectionTitle: "How Online Booking Works",
    listItems: [
      { label: "Step 1", value: "Share pickup city, drop city, date & car type" },
      { label: "Step 2", value: "Get instant fare confirmation (fixed, no surge)" },
      { label: "Step 3", value: "Driver details shared 2 hours before pickup" },
      { label: "Step 4", value: "Pay after trip via cash, UPI, or bank transfer" },
      { label: "Channels", value: "Telegram, WhatsApp, Phone call, Website" },
      { label: "Response Time", value: "Under 5 minutes" },
    ],
    bodyText: "No app download needed. Book via Telegram, WhatsApp, or phone call. Our dispatch team confirms fare and assigns a verified driver within minutes. Track your ride in real time.",
    contentSections: [
      { heading: "Why Book a Cab Online with DropTaxi", body: "Online cab booking with DropTaxi is simpler than any app. Just message us on Telegram or WhatsApp with your trip details. No registration, no credit card required. We confirm the exact fare — no surge pricing, no return charges. Your driver details including name, phone, vehicle number, and photo are shared before pickup." },
      { heading: "Book Cabs for Any Occasion", body: "Our online booking covers all travel needs — airport pickups, railway station transfers, hospital visits, wedding travel, corporate trips, and outstation journeys. Available in 100+ cities across Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, and Telangana." },
    ],
    faqs: [
      { question: "How do I book a cab online?", answer: "Message us on Telegram (+91 99949 40558) with pickup city, drop city, travel date, and preferred car type. We confirm fare within minutes." },
      { question: "Do I need to download an app?", answer: "No. Book directly via Telegram, WhatsApp, phone call, or our website. No app download or registration required." },
      { question: "Is online booking cheaper?", answer: "Our rates are the same across all channels — fixed per-km pricing with no surge. Online booking is simply more convenient." },
      { question: "Can I book a cab online for tomorrow?", answer: "Yes. We accept bookings from 2 hours in advance to 30 days ahead. Advance booking recommended for guaranteed availability." },
    ],
  }),
  makeStaticPage("taxi-service-near-me", "Taxi Service Near Me — Book One Way Cab", "Taxi Service Near Me",
    "Find the nearest taxi service with DropTaxi. One way cab from INR 11/km across 100+ cities in South India. Fixed fare, no return charge. Call 99949 40558.", {
    lead: "Looking for a taxi service near you? DropTaxi operates in 100+ cities across South India with doorstep pickup and fixed one way fares.",
    sectionTitle: "Service Coverage",
    listItems: [
      { label: "Tamil Nadu", value: "Chennai, Coimbatore, Madurai, Trichy, Salem, Vellore & 50+ cities" },
      { label: "Karnataka", value: "Bangalore, Mysore, Mangalore, Hubli" },
      { label: "Kerala", value: "Kochi, Trivandrum, Kozhikode, Munnar" },
      { label: "Andhra Pradesh", value: "Vijayawada, Visakhapatnam, Tirupati" },
      { label: "Telangana", value: "Hyderabad, Secunderabad, Warangal" },
      { label: "Pickup", value: "Doorstep pickup at any address, hotel, airport, or station" },
    ],
    bodyText: "No matter where you are in South India, DropTaxi is near you. Our fleet of 500+ vehicles across 100+ cities ensures a cab is always within reach. Doorstep pickup and drop at any address.",
    contentSections: [
      { heading: "How to Find a Taxi Near You", body: "Simply call 99949 40558 or message us on Telegram with your current location and destination. Our dispatch team identifies the nearest available driver and confirms pickup time and fare within minutes. No app download needed — just a phone call or message." },
      { heading: "Why DropTaxi for Local & Outstation", body: "Unlike ride-hailing apps that charge surge pricing during peak hours, DropTaxi offers fixed per-km rates 24x7. Whether you need a local city ride, airport transfer, or outstation trip, our fare remains the same. Mini from INR 11/km, Sedan/Etios from INR 13/km, SUV/Innova from INR 17/km, Innova Crysta from INR 21/km." },
    ],
    faqs: [
      { question: "How do I find a taxi near me?", answer: "Call 99949 40558 or message on Telegram. Share your pickup location and we will assign the nearest available driver." },
      { question: "Is DropTaxi available in my city?", answer: "We operate in 100+ cities across Tamil Nadu, Karnataka, Kerala, AP, and Telangana. Call us to check availability in your area." },
      { question: "Can I get a taxi immediately?", answer: "Yes, subject to driver availability. For guaranteed service, we recommend booking at least 2 hours in advance." },
    ],
  }),
  makeStaticPage("places-to-visit-in-chennai", "Places to Visit in Chennai — Top Tourist Spots & Taxi Guide", "Places to Visit in Chennai",
    "Discover top places to visit in Chennai with our complete travel guide. Book a taxi for sightseeing from INR 13/km. Marina Beach, Kapaleeshwarar Temple & more.", {
    lead: "Explore Chennai's best tourist places with a comfortable taxi. From Marina Beach to Mahabalipuram, discover the cultural capital of South India.",
    sectionTitle: "Top Chennai Attractions",
    listItems: [
      { label: "Marina Beach", value: "India's longest urban beach — 13 km stretch" },
      { label: "Kapaleeshwarar Temple", value: "Iconic Dravidian architecture in Mylapore" },
      { label: "Fort St. George", value: "Historic British-era fort, now state legislature" },
      { label: "Government Museum", value: "India's second oldest museum, Egmore" },
      { label: "San Thome Cathedral", value: "Built over tomb of St. Thomas the Apostle" },
      { label: "DakshinaChitra", value: "Living museum of South Indian heritage" },
    ],
    bodyText: "Chennai, the gateway to South India, offers a blend of ancient temples, colonial architecture, vibrant culture, and beautiful beaches. Book a DropTaxi for a comfortable full-day city tour.",
    contentSections: [
      { heading: "Best Places to Visit in Chennai in One Day", body: "Start early at Marina Beach for a sunrise walk, visit the Kapaleeshwarar Temple in Mylapore, explore Fort St. George and the Government Museum in the morning. After lunch at a Chettinad restaurant, visit San Thome Cathedral and finish with sunset at Elliot's Beach in Besant Nagar. A DropTaxi for the full day costs approximately INR 2,500–3,500." },
      { heading: "Day Trips from Chennai by Taxi", body: "Chennai is a base for excellent day trips: Mahabalipuram (60 km, UNESCO Shore Temple), Kanchipuram (75 km, City of Thousand Temples), Pondicherry (150 km, French Quarter), and Tiruvannamalai (200 km, Arunachaleswarar Temple). All are comfortable round trips by DropTaxi." },
      { heading: "Chennai Shopping & Food Tour", body: "T. Nagar for silk sarees and jewelry, Pondy Bazaar for street shopping, Spencer Plaza for branded goods, and Express Avenue for modern retail. Chennai's food scene includes filter coffee at Saravana Bhavan, biryani at Thalappakatti, and seafood at Marina Beach stalls." },
    ],
    faqs: [
      { question: "What are the top 10 places to visit in Chennai?", answer: "Marina Beach, Kapaleeshwarar Temple, Fort St. George, Government Museum, San Thome Cathedral, Elliot's Beach, DakshinaChitra, Guindy National Park, Birla Planetarium, and Valluvar Kottam." },
      { question: "How much does a full-day Chennai tour taxi cost?", answer: "A sedan for a full-day city tour costs approximately INR 2,500–3,500 depending on distance covered. SUV and Innova available for larger groups." },
      { question: "Can I book a taxi for a Chennai day trip?", answer: "Yes. Popular day trips include Mahabalipuram (INR 1,500–2,000), Kanchipuram (INR 1,800–2,500), and Pondicherry (INR 3,500–4,500) by sedan." },
    ],
    relatedLinks: [
      { title: "Drop Taxi in Chennai", description: "One way taxi from Chennai.", href: "/drop-taxi-in-chennai" },
      { title: "Chennai to Pondicherry", description: "Day trip to Pondicherry.", href: "/chennai-to-pondicherry-taxi" },
      { title: "Chennai to Mahabalipuram", description: "Shore Temple day trip.", href: "/chennai-to-mahabalipuram-taxi" },
      { title: "Car Rental Chennai", description: "Full day car rental.", href: "/car-rental-in-chennai" },
    ],
  }),
  makeStaticPage("temples-in-madurai", "Famous Temples in Madurai — Meenakshi & More | Taxi Guide", "Temples in Madurai",
    "Explore famous temples in Madurai with a comfortable taxi. Meenakshi Amman Temple, Thiruparankundram & more. Book taxi from INR 13/km.", {
    lead: "Discover Madurai's magnificent temples with a DropTaxi. From the iconic Meenakshi Temple to the ancient Thiruparankundram, explore the temple city in comfort.",
    sectionTitle: "Must-Visit Temples",
    listItems: [
      { label: "Meenakshi Amman Temple", value: "Iconic 14-tower temple, heart of Madurai" },
      { label: "Thiruparankundram", value: "One of six abodes of Lord Murugan" },
      { label: "Alagar Kovil", value: "Vishnu temple in the Alagar Hills" },
      { label: "Koodal Azhagar Temple", value: "Rare triple-form Vishnu temple" },
      { label: "Gandhi Memorial Museum", value: "Historic museum in Tamukkam Palace" },
    ],
    bodyText: "Madurai, the 2,500-year-old temple city, is one of the oldest continuously inhabited cities in the world. Book a DropTaxi for a comfortable temple circuit tour.",
    contentSections: [
      { heading: "Madurai Temple Circuit by Taxi", body: "The ideal Madurai temple tour covers Meenakshi Amman Temple (2–3 hours), Thiruparankundram Murugan Temple (12 km), Alagar Kovil (21 km), and Koodal Azhagar Temple (city centre). A full-day sedan taxi covers this circuit for approximately INR 2,000–3,000. Start early to avoid midday heat." },
      { heading: "Day Trips from Madurai", body: "Popular day trips include Rameswaram (165 km, Ramanathaswamy Temple), Kodaikanal (120 km, hill station), and Courtallam/Tirunelveli (160 km, waterfalls). All accessible by DropTaxi with one way pricing." },
    ],
    faqs: [
      { question: "How much is a taxi for Madurai temple tour?", answer: "A full-day sedan for Madurai temples costs approximately INR 2,000–3,000 depending on temples visited. Meenakshi Temple, Thiruparankundram, and Alagar Kovil circuit is the most popular." },
      { question: "Can I book a taxi from Madurai to Rameswaram?", answer: "Yes. Madurai to Rameswaram is 165 km, approximately 3.5 hours. Sedan fare around INR 2,299." },
    ],
    relatedLinks: [
      { title: "Drop Taxi in Madurai", description: "One way taxi from Madurai.", href: "/drop-taxi-madurai" },
      { title: "Madurai to Rameswaram", description: "Temple circuit route.", href: "/madurai-to-rameswaram-taxi" },
      { title: "Madurai to Kodaikanal", description: "Hill station trip.", href: "/madurai-to-kodaikanal-taxi" },
    ],
  }),
  makeStaticPage("one-day-trip-from-chennai", "One Day Trip from Chennai — Best Getaways & Taxi Booking", "One Day Trip from Chennai",
    "Plan the best one day trips from Chennai by taxi. Pondicherry, Mahabalipuram, Kanchipuram & more. Sedan from INR 11/km. Book now.", {
    lead: "The best one day getaways from Chennai with comfortable taxi service. Explore beaches, temples, and hill stations within a day.",
    sectionTitle: "Top Day Trips",
    listItems: [
      { label: "Mahabalipuram", value: "60 km — UNESCO Shore Temple, beach" },
      { label: "Kanchipuram", value: "75 km — City of Thousand Temples, silk sarees" },
      { label: "Pondicherry", value: "150 km — French Quarter, beaches, Auroville" },
      { label: "Tiruvannamalai", value: "200 km — Arunachaleswarar Temple, girivalam" },
      { label: "Yelagiri", value: "230 km — Hill station, boating, trekking" },
      { label: "Vellore", value: "135 km — Golden Temple, CMC Hospital" },
    ],
    bodyText: "Chennai's strategic location makes it perfect for day trips to beaches, temples, hill stations, and heritage towns. Book a DropTaxi one way or round trip for a hassle-free getaway.",
    contentSections: [
      { heading: "Budget Day Trips Under INR 3,000", body: "Mahabalipuram (60 km, INR 1,500 sedan one way): UNESCO Shore Temple, Five Rathas, beach. Kanchipuram (75 km, INR 1,800): Ekambareswarar Temple, Kailasanathar Temple, silk weaving centres. Both are comfortable half-day trips leaving Chennai by 7 AM." },
      { heading: "Weekend Getaways Within 200 km", body: "Pondicherry (150 km, INR 3,500 round trip): French Quarter, Promenade Beach, Auroville, Paradise Beach. Vellore (135 km): Sripuram Golden Temple and Vellore Fort. Tiruvannamalai (200 km): Arunachaleswarar Temple and full moon girivalam." },
    ],
    faqs: [
      { question: "What is the best one day trip from Chennai?", answer: "Pondicherry (150 km) and Mahabalipuram (60 km) are the most popular. Pondicherry offers French Quarter, beaches, and Auroville. Mahabalipuram has UNESCO heritage sites and beach." },
      { question: "How much does a day trip taxi from Chennai cost?", answer: "Mahabalipuram round trip: INR 1,500–2,000. Kanchipuram: INR 1,800–2,500. Pondicherry: INR 3,500–4,500. All sedan rates." },
    ],
    relatedLinks: [
      { title: "Chennai to Pondicherry", description: "Popular day trip route.", href: "/chennai-to-pondicherry-taxi" },
      { title: "Chennai to Mahabalipuram", description: "Shore Temple day trip.", href: "/chennai-to-mahabalipuram-taxi" },
      { title: "Places to Visit in Chennai", description: "City attractions guide.", href: "/places-to-visit-in-chennai" },
    ],
  }),
  makeStaticPage("outstation-taxi-booking", "Outstation Taxi Booking — One Way from INR 11/km", "Outstation Taxi Booking",
    "Book outstation taxi online across South India from INR 11/km. One way fixed fare, no return charge. Sedan, SUV, Innova. 100+ cities. Call 99949 40558.", {
    lead: "Book outstation taxi for intercity travel across South India. Fixed one way fares, verified drivers, and 24x7 support.",
    sectionTitle: "Outstation Booking Details",
    listItems: [
      { label: "Coverage", value: "100+ cities across 5 South Indian states" },
      { label: "Pricing", value: "Sedan INR 13/km, SUV INR 17/km, Innova INR 21/km" },
      { label: "Booking", value: "Via Telegram, phone, or website — instant confirmation" },
      { label: "Payment", value: "Cash, UPI, or bank transfer after trip" },
      { label: "Support", value: "24x7 live customer support with GPS tracking" },
    ],
    bodyText: "Outstation travel made simple — share your trip details, get instant fare confirmation, and travel with a verified driver. No hidden charges, no return fare.",
    contentSections: [
      { heading: "How Outstation Taxi Booking Works", body: "Share your pickup city, destination, travel date, preferred car type, and number of passengers. We confirm the exact fare including toll estimates within minutes. Driver details (name, phone, vehicle number) are shared 2 hours before pickup. Pay after the trip — no advance payment required." },
      { heading: "Popular Outstation Routes", body: "Our most booked outstation routes include Chennai to Bangalore (350 km), Bangalore to Mysore (150 km), Chennai to Pondicherry (150 km), Madurai to Rameswaram (165 km), and Coimbatore to Ooty (90 km). All available with one way pricing — no return fare." },
    ],
    faqs: [
      { question: "How do I book an outstation taxi?", answer: "Call 99949 40558 or message on Telegram. Share pickup city, drop city, date, and car preference. Fare confirmed within minutes." },
      { question: "Is there a minimum fare for outstation?", answer: "Yes. Minimum fare is INR 1,500 for all vehicle types regardless of distance." },
      { question: "Can I book outstation taxi for one way?", answer: "Yes. That's our specialty. You pay only for one way distance with no return fare charge." },
    ],
  }),
  makeStaticPage("acting-driver-in-chennai", "Acting Driver in Chennai — Hire a Professional Driver", "Acting Driver in Chennai",
    "Hire an acting driver in Chennai for your own car. Professional, verified drivers available 24x7. Daily & monthly packages. Call 99949 40558.", {
    lead: "Need a driver for your own car in Chennai? Our acting drivers are experienced, verified, and available for daily, weekly, or monthly hire.",
    sectionTitle: "Acting Driver Service",
    listItems: [
      { label: "Service", value: "Professional driver for your personal vehicle" },
      { label: "Availability", value: "24x7 including nights, weekends, holidays" },
      { label: "Verification", value: "Background checked, licence verified drivers" },
      { label: "Coverage", value: "Chennai city, airport, outstation trips" },
      { label: "Booking", value: "Call or Telegram for instant assignment" },
    ],
    bodyText: "Our acting driver service in Chennai provides verified, professional drivers for your personal car. Whether you need a driver for a day trip, airport pickup, wedding, or regular commute, we have experienced drivers available round the clock.",
    faqs: [
      { question: "What is an acting driver?", answer: "An acting driver is a professional driver who drives your personal vehicle. You provide the car, we provide the experienced driver." },
      { question: "How much does an acting driver cost in Chennai?", answer: "Daily rates start from INR 800–1,200 depending on hours and distance. Monthly packages available for regular commuters." },
      { question: "Are acting drivers available for outstation?", answer: "Yes. Our drivers are experienced in highway driving and can drive your car for outstation trips across Tamil Nadu and beyond." },
    ],
  }),
  makeStaticPage("innova-car-rental", "Innova Crysta Rental — Premium Taxi from INR 21/km", "Innova Crysta Car Rental",
    "Book Toyota Innova Crysta rental from INR 21/km. Premium 7-seater for family, corporate & group travel. Chauffeur-driven. Call 99949 40558.", {
    lead: "Toyota Innova Crysta — the premium choice for family travel, corporate trips, and group pilgrimages across South India.",
    sectionTitle: "Innova Rental Details",
    listItems: [
      { label: "Rate", value: "From INR 21/km" },
      { label: "Capacity", value: "6–7 passengers with luggage" },
      { label: "Features", value: "AC, spacious boot, reclining seats, premium comfort" },
      { label: "Best For", value: "Family trips, corporate travel, pilgrimages, VIP transfers" },
      { label: "Availability", value: "All 100+ cities, 24x7 booking" },
    ],
    bodyText: "The Toyota Innova Crysta is our premium vehicle offering maximum comfort for long-distance travel. Spacious interiors, powerful AC, ample luggage space, and smooth ride quality make it the top choice for discerning travellers.",
    faqs: [
      { question: "How much does an Innova rental cost?", answer: "INR 21/km with a minimum fare of INR 1,500. For a 300 km trip, the fare is approximately INR 6,399." },
      { question: "Is the Innova suitable for hill stations?", answer: "Yes. The Innova Crysta's powerful engine handles ghat roads comfortably. Recommended for Ooty, Kodaikanal, Munnar, and Coorg trips." },
      { question: "Can I book an Innova for a multi-day trip?", answer: "Yes. Multi-day packages available with driver accommodation included. Contact us for customized quotes." },
    ],
  }),
];

// ---------------------------------------------------------------------------
// Lookup map
// ---------------------------------------------------------------------------

const pageMap = new Map<string, PageData>();
for (const page of ALL_PAGES) {
  pageMap.set(page.slug, page);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns structured data for every page. */
export function getAllPages(): PageData[] {
  return ALL_PAGES;
}

/** Look up a single page by its slug. */
export function getPageBySlug(slug: string): PageData | undefined {
  return pageMap.get(slug);
}

/** Returns an array of all valid page slugs. */
export function getAllSlugs(): string[] {
  return ALL_PAGES.map((p) => p.slug);
}
