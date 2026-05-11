// Route-specific data for SEO content enrichment
// Distance in km, duration in hours, fares in INR

import {
  ONE_WAY_RATES,
  ROUND_TRIP_RATES,
  ONE_WAY_MIN_KM,
  ROUND_TRIP_MIN_KM,
} from "@/lib/constants";

export interface RouteInfo {
  distance: number;
  duration: string;
  highway?: string;
  tollEstimate?: string;
  description: string;
}

// One-way: Sedan ₹13/km, SUV ₹18/km, Innova ₹19/km, Crysta ₹25/km — min 130 km billed.
// "mini" alias kept for backward compatibility with existing callers (= sedan rate).
function roundFare(value: number): number {
  return Math.round(value / 100) * 100 + 99;
}

export function computeFares(distanceKm: number): { mini: string; sedan: string; suv: string; innova: string; crysta: string } {
  const km = Math.max(distanceKm, ONE_WAY_MIN_KM);
  const sedan = roundFare(km * ONE_WAY_RATES.sedan);
  const suv = roundFare(km * ONE_WAY_RATES.suv);
  const innova = roundFare(km * ONE_WAY_RATES.innova);
  const crysta = roundFare(km * ONE_WAY_RATES.crysta);
  return {
    mini: sedan.toLocaleString("en-IN"),
    sedan: sedan.toLocaleString("en-IN"),
    suv: suv.toLocaleString("en-IN"),
    innova: innova.toLocaleString("en-IN"),
    crysta: crysta.toLocaleString("en-IN"),
  };
}

// Round-trip: bills 2× one-way distance OR 250 km, whichever is greater.
// Round-trip rates are ₹1 lower per km than one-way (sedan ₹12, SUV ₹17, etc.).
export function computeRoundTripFares(distanceKm: number): { sedan: string; suv: string; innova: string; crysta: string } {
  const km = Math.max(distanceKm * 2, ROUND_TRIP_MIN_KM);
  return {
    sedan: roundFare(km * ROUND_TRIP_RATES.sedan).toLocaleString("en-IN"),
    suv: roundFare(km * ROUND_TRIP_RATES.suv).toLocaleString("en-IN"),
    innova: roundFare(km * ROUND_TRIP_RATES.innova).toLocaleString("en-IN"),
    crysta: roundFare(km * ROUND_TRIP_RATES.crysta).toLocaleString("en-IN"),
  };
}

export const ROUTE_DATA: Record<string, RouteInfo> = {
  // ── Bangalore routes ─────────────────────────────────────────
  "bangalore-to-chennai-taxi": {
    distance: 350, duration: "5–6 hours", highway: "NH48 / NH44",
    tollEstimate: "INR 400–600",
    description: "The Bangalore to Chennai route via NH48 is one of the busiest intercity corridors in South India. The highway passes through Kolar and Vellore with well-maintained rest stops at Kolar Gold Fields and Ambur. Best to start early morning to avoid Bangalore city traffic.",
  },
  "bangalore-to-chikmagalur-taxi": {
    distance: 245, duration: "4–5 hours", highway: "NH75 / NH73",
    tollEstimate: "INR 200–350",
    description: "Travel from Bangalore to Chikmagalur through lush Western Ghats scenery. The route passes through Hassan with coffee plantations appearing after Sakleshpur. Ideal for weekend getaways to Mullayanagiri and Baba Budangiri peaks.",
  },
  "bangalore-to-coimbatore-taxi": {
    distance: 365, duration: "6–7 hours", highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "The Bangalore to Coimbatore route runs along NH44 through Salem. The highway is well-maintained with food stops at Krishnagiri and Salem bypass. Cross the Tamil Nadu border near Hosur for a smooth ride into the Manchester of South India.",
  },
  "bangalore-to-coorg-taxi": {
    distance: 265, duration: "5–6 hours", highway: "NH275 / SH88",
    tollEstimate: "INR 150–250",
    description: "Drive from Bangalore to Coorg (Kodagu) through Mysore and Kushalnagar. The route winds through coffee estates and spice plantations in the Western Ghats. Popular stops include Bylakuppe Tibetan settlement and Abbey Falls.",
  },
  "bangalore-to-hampi-taxi": {
    distance: 340, duration: "6–7 hours", highway: "NH44 / NH48",
    tollEstimate: "INR 300–400",
    description: "The Bangalore to Hampi route takes you to the UNESCO World Heritage ruins of the Vijayanagara Empire. Travel via Chitradurga fort and Hospet. The journey passes through the Deccan Plateau with dramatic boulder landscapes near Hampi.",
  },
  "bangalore-to-hosur-taxi": {
    distance: 45, duration: "1–1.5 hours", highway: "NH44",
    tollEstimate: "INR 50–100",
    description: "One of the shortest intercity routes, Bangalore to Hosur is a quick ride along NH44 crossing the Karnataka-Tamil Nadu border. Popular for IT commuters and industrial visitors. Light traffic outside rush hours makes this a smooth trip.",
  },
  "bangalore-to-hyderabad-taxi": {
    distance: 570, duration: "8–9 hours", highway: "NH44",
    tollEstimate: "INR 600–900",
    description: "The Bangalore to Hyderabad corridor runs along NH44 through Anantapur and Kurnool. This is a long-distance route best suited for early morning departure. The highway is a national expressway with excellent rest areas at Penukonda and Kurnool.",
  },
  "bangalore-to-kodaikanal-taxi": {
    distance: 465, duration: "7–8 hours", highway: "NH44 / NH49",
    tollEstimate: "INR 400–550",
    description: "Travel from Bangalore to the Princess of Hill Stations via Salem and Dindigul. The last 80 km involves scenic ghat road with 36 hairpin bends. Book a comfortable SUV or Innova for the mountain stretch.",
  },
  "bangalore-to-madurai-taxi": {
    distance: 435, duration: "7–8 hours", highway: "NH44",
    tollEstimate: "INR 400–550",
    description: "The Bangalore to Madurai route passes through Salem and Dindigul along NH44. Visit the famous Meenakshi Temple upon arrival. The highway has good food stops at Krishnagiri, Salem, and Dindigul known for its biryani.",
  },
  "bangalore-to-mangalore-taxi": {
    distance: 350, duration: "6–7 hours", highway: "NH75",
    tollEstimate: "INR 250–400",
    description: "Drive from Bangalore to Mangalore via the spectacular Shiradi Ghat or Hassan-Sakleshpur route. The Western Ghats section offers breathtaking views but requires experienced drivers, which DropTaxi provides. Best during October to March.",
  },
  "bangalore-to-munnar-cab": {
    distance: 475, duration: "8–9 hours", highway: "NH44 / NH49",
    tollEstimate: "INR 400–550",
    description: "The Bangalore to Munnar journey takes you through Tamil Nadu into Kerala's tea country. The route via Coimbatore and Udumalpet offers the best road conditions. The final stretch through Marayoor sandalwood forests is scenic.",
  },
  "bangalore-to-mysore-taxi": {
    distance: 150, duration: "3–3.5 hours", highway: "NH275 (Mysore Expressway)",
    tollEstimate: "INR 100–200",
    description: "One of India's best expressways connects Bangalore to Mysore in under 3 hours. The 6-lane Mysore Expressway is smooth and toll-based. Visit Mysore Palace, Chamundi Hills, and Brindavan Gardens upon arrival.",
  },
  "bangalore-to-pondicherry-taxi": {
    distance: 310, duration: "5–6 hours", highway: "NH48 / ECR",
    tollEstimate: "INR 350–500",
    description: "Travel from Bangalore to Pondicherry via Vellore or Tindivanam. The route passes through the Eastern Ghats foothills. Pondicherry's French Quarter, Auroville, and beachfront promenade make this a popular weekend route.",
  },
  "bangalore-to-rameshwaram-taxi": {
    distance: 580, duration: "9–10 hours", highway: "NH44 / NH49",
    tollEstimate: "INR 500–700",
    description: "The Bangalore to Rameshwaram pilgrimage route passes through Madurai. The final stretch crosses the Pamban Bridge connecting the mainland to Rameshwaram island. An overnight or early morning departure is recommended for this long journey.",
  },
  "bangalore-to-tirupati-taxi": {
    distance: 255, duration: "4–5 hours", highway: "NH44 / NH69",
    tollEstimate: "INR 250–400",
    description: "The Bangalore to Tirupati route serves millions of pilgrims visiting Lord Venkateswara Temple at Tirumala. The highway runs through Kolar and Chittoor. Early morning trips ensure you reach before darshan queue times peak.",
  },
  "bangalore-to-tiruvannamalai-taxi": {
    distance: 200, duration: "3.5–4.5 hours", highway: "NH48 / SH4",
    tollEstimate: "INR 200–300",
    description: "Drive from Bangalore to the sacred temple town of Tiruvannamalai, home of Arunachaleswarar Temple and Ramana Maharshi Ashram. The route passes through Vellore. Popular during Karthigai Deepam festival in November-December.",
  },
  "bangalore-to-trichy-taxi": {
    distance: 345, duration: "6–7 hours", highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "The Bangalore to Trichy route along NH44 passes through Salem and Namakkal. Trichy is known for the Rock Fort Temple and Ranganathaswamy Temple at Srirangam. Good highway with rest stops at Salem and Namakkal.",
  },
  "bangalore-to-vellore-taxi": {
    distance: 215, duration: "3.5–4 hours", highway: "NH48",
    tollEstimate: "INR 200–350",
    description: "A popular medical tourism route from Bangalore to Vellore, home to CMC Vellore hospital. The route via NH48 through Kolar is well-maintained. Many patients and families use this service for hospital visits.",
  },
  "bangalore-to-wayanad-taxi": {
    distance: 280, duration: "5–6 hours", highway: "NH275 / NH766",
    tollEstimate: "INR 200–350",
    description: "Travel from Bangalore to Wayanad through Mysore and the Bandipur-Mudumalai wildlife corridor. The forest stretch may have time restrictions for wildlife protection. Wayanad's misty hills and spice plantations await.",
  },

  // ── Chennai routes ─────────────────────────────────────────
  "chennai-to-bangalore-taxi": {
    distance: 350, duration: "5–6 hours", highway: "NH48 / NH44",
    tollEstimate: "INR 400–600",
    description: "Chennai to Bangalore is the most popular intercity taxi route in South India. The well-maintained NH48 passes through Vellore and Kolar with multiple food and fuel stops. Cross the Tamil Nadu-Karnataka border at Hosur for a smooth ride.",
  },
  "chennai-to-coimbatore-taxi": {
    distance: 500, duration: "8–9 hours", highway: "NH44",
    tollEstimate: "INR 500–700",
    description: "The Chennai to Coimbatore route runs the length of Tamil Nadu along NH44 through Salem. This long route benefits from an early departure. Stop at Salem for a break — it's the midpoint with excellent restaurants.",
  },
  "chennai-to-cuddalore-taxi": {
    distance: 185, duration: "3–4 hours", highway: "ECR / NH32",
    tollEstimate: "INR 100–200",
    description: "Drive from Chennai to Cuddalore along the scenic East Coast Road. The route passes through Mahabalipuram and Pondicherry. A coastal journey with views of the Bay of Bengal for most of the drive.",
  },
  "chennai-to-kanchipuram-taxi": {
    distance: 75, duration: "1.5–2 hours", highway: "NH48 / GST Road",
    tollEstimate: "INR 50–100",
    description: "A short ride from Chennai to the City of Thousand Temples. Kanchipuram is famous for silk sarees and ancient Pallava temples. The route via GST Road is quick and well-connected.",
  },
  "chennai-to-karaikudi-taxi": {
    distance: 400, duration: "6–7 hours", highway: "NH45 / NH36",
    tollEstimate: "INR 350–500",
    description: "Travel from Chennai to Karaikudi, the heart of Chettinad known for its palatial mansions and spicy cuisine. The route goes through Trichy. A food lover's journey ending in India's culinary capital.",
  },
  "chennai-to-kodaikanal-taxi": {
    distance: 530, duration: "8–9 hours", highway: "NH45 / NH49",
    tollEstimate: "INR 450–650",
    description: "Chennai to Kodaikanal is a long but rewarding drive to the Princess of Hill Stations. Route via Dindigul with 36 hairpin bends in the ghat section. Book an SUV or Innova for comfortable hill climbing.",
  },
  "chennai-to-kumbakonam-taxi": {
    distance: 300, duration: "5–6 hours", highway: "NH45",
    tollEstimate: "INR 250–400",
    description: "Drive from Chennai to the temple town of Kumbakonam via Villupuram and Thanjavur. Known as the City of Temples with the famous Mahamaham tank. The route passes through the fertile Cauvery delta region.",
  },
  "chennai-to-madurai-taxi": {
    distance: 460, duration: "7–8 hours", highway: "NH45 / NH44",
    tollEstimate: "INR 400–600",
    description: "The Chennai to Madurai route runs through Trichy and Dindigul along NH45. Madurai, home to the magnificent Meenakshi Temple, is Tamil Nadu's cultural capital. Stop at Dindigul for famous biryani en route.",
  },
  "chennai-to-mahabalipuram-taxi": {
    distance: 60, duration: "1–1.5 hours", highway: "ECR (East Coast Road)",
    tollEstimate: "INR 0–50",
    description: "A quick coastal drive from Chennai to the UNESCO World Heritage site of Mahabalipuram. The East Coast Road offers beautiful ocean views. Visit the Shore Temple, Five Rathas, and enjoy fresh seafood at the beach shacks.",
  },
  "chennai-to-neyveli-taxi": {
    distance: 220, duration: "3.5–4.5 hours", highway: "NH45C",
    tollEstimate: "INR 150–250",
    description: "Drive from Chennai to the planned township of Neyveli, home to NLC India's lignite operations. The route passes through Villupuram. A well-connected route used by NLC employees and business visitors.",
  },
  "chennai-to-pondicherry-taxi": {
    distance: 150, duration: "2.5–3 hours", highway: "ECR / NH32",
    tollEstimate: "INR 100–200",
    description: "The most popular weekend route from Chennai, the East Coast Road to Pondicherry hugs the coastline past Mahabalipuram. Visit the French Quarter, Auroville, Paradise Beach, and enjoy the café culture of this charming union territory.",
  },
  "chennai-to-rameshwaram-taxi": {
    distance: 580, duration: "9–10 hours", highway: "NH45 / NH49",
    tollEstimate: "INR 500–700",
    description: "The Chennai to Rameshwaram pilgrimage route passes through Madurai and crosses the iconic Pamban Bridge. This long route is best with an early morning start. The sacred island town is one of the Char Dham pilgrimage sites.",
  },
  "chennai-to-ranipet-taxi": {
    distance: 120, duration: "2–2.5 hours", highway: "NH48",
    tollEstimate: "INR 100–150",
    description: "A quick ride from Chennai to the industrial town of Ranipet via NH48. The route passes through Sriperumbudur and Kanchipuram. Popular for business travel to Ranipet's leather and manufacturing industries.",
  },
  "chennai-to-salem-taxi": {
    distance: 340, duration: "5–6 hours", highway: "NH44",
    tollEstimate: "INR 300–450",
    description: "The Chennai to Salem route along NH44 is a major corridor connecting the capital to central Tamil Nadu. Salem is known for steel, mangoes, and its strategic location as a transit hub. Smooth four-lane highway throughout.",
  },
  "chennai-to-tirunelveli-taxi": {
    distance: 620, duration: "9–10 hours", highway: "NH44 / NH7",
    tollEstimate: "INR 550–750",
    description: "One of the longest routes from Chennai, reaching deep south Tamil Nadu. The route passes through Madurai and Virudhunagar. Tirunelveli is known for its halwa and the Nellaiappar Temple. Consider an overnight stop at Madurai.",
  },
  "chennai-to-tirupati-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH48 / NH69",
    tollEstimate: "INR 150–250",
    description: "A popular pilgrimage route from Chennai to Lord Venkateswara Temple at Tirumala. The well-maintained highway crosses into Andhra Pradesh at Tada. Early morning trips recommended to beat temple crowd timing.",
  },
  "chennai-to-tiruvannamalai-taxi": {
    distance: 190, duration: "3–4 hours", highway: "NH48 / SH4",
    tollEstimate: "INR 150–250",
    description: "Drive from Chennai to the sacred Arunachaleswarar Temple town via Kanchipuram or Vellore. Tiruvannamalai is a major Shaivite pilgrimage center. The Girivalam path around the Annamalai hill draws thousands during full moon.",
  },
  "chennai-to-trichy-taxi": {
    distance: 330, duration: "5–6 hours", highway: "NH45",
    tollEstimate: "INR 300–450",
    description: "The Chennai to Trichy route along NH45 passes through Villupuram and Perambalur. Trichy's Rock Fort Temple and Srirangam are must-visit landmarks. The highway is well-maintained with regular food stops.",
  },
  "chennai-to-velankanni-taxi": {
    distance: 340, duration: "5–6 hours", highway: "NH45 / NH36",
    tollEstimate: "INR 300–450",
    description: "Travel from Chennai to the Basilica of Our Lady of Good Health at Velankanni, one of India's most visited Catholic pilgrimage sites. The route goes through Kumbakonam. Peak season during the annual feast in August-September.",
  },
  "chennai-to-vellore-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH46",
    tollEstimate: "INR 100–200",
    description: "A popular medical tourism route from Chennai to Vellore, home of CMC Hospital. The NH46 route is direct and well-maintained. Thousands of patients travel this route annually for treatment at CMC and other hospitals.",
  },
  "chennai-airport-to-vellore-taxi": {
    distance: 135, duration: "2.5–3 hours", highway: "NH46",
    tollEstimate: "INR 100–200",
    description: "Direct airport pickup from Chennai International Airport to Vellore. Our driver meets you at arrivals with a name board. Most popular for medical tourists heading to CMC Vellore. Flight tracking ensures no delays.",
  },
  "chennai-airport-to-cmc-vellore-taxi": {
    distance: 135, duration: "2.5–3 hours", highway: "NH46",
    tollEstimate: "INR 100–200",
    description: "Dedicated airport taxi from Chennai Airport directly to CMC Vellore Hospital campus. Driver meets at arrivals, assists with luggage, and drops you at the hospital entrance. Available 24x7 including late night flights.",
  },

  // ── Coimbatore routes ─────────────────────────────────────────
  "coimbatore-to-chennai-taxi": {
    distance: 500, duration: "8–9 hours", highway: "NH44",
    tollEstimate: "INR 500–700",
    description: "The Coimbatore to Chennai route covers the breadth of Tamil Nadu along NH44 via Salem. A long drive best started early morning. Multiple rest stops available at Salem and Krishnagiri along the way.",
  },
  "coimbatore-to-coonoor-taxi": {
    distance: 75, duration: "2–2.5 hours", highway: "NH181 / Nilgiri Ghat Road",
    tollEstimate: "INR 0–50",
    description: "A scenic hill drive from Coimbatore to Coonoor through the Nilgiri Mountains. The ghat road passes through Mettupalayam with views of tea estates and the toy train route. Best in an SUV for the winding roads.",
  },
  "coimbatore-to-kodaikanal-cab": {
    distance: 175, duration: "4–5 hours", highway: "NH44 / NH49",
    tollEstimate: "INR 100–200",
    description: "Drive from Coimbatore to Kodaikanal via Palani and Dindigul. The ghat section has beautiful hairpin bends through dense forests. Kodaikanal Lake, Pillar Rocks, and Bryant Park are popular attractions.",
  },
  "coimbatore-to-madurai-taxi": {
    distance: 220, duration: "4–5 hours", highway: "NH44",
    tollEstimate: "INR 150–250",
    description: "The Coimbatore to Madurai route via NH44 passes through Dindigul. A comfortable half-day journey to reach the temple city. Stop at Dindigul for its famous biryani and lock fort.",
  },
  "coimbatore-to-munnar-taxi": {
    distance: 160, duration: "4–5 hours", highway: "NH49 / SH17",
    tollEstimate: "INR 100–150",
    description: "Cross from Tamil Nadu into Kerala's tea highlands. The route via Udumalpet and Marayoor passes through sandalwood forests before ascending into Munnar's emerald tea plantations. Stunning Western Ghats scenery throughout.",
  },
  "coimbatore-to-ooty-taxi": {
    distance: 90, duration: "2.5–3 hours", highway: "NH181",
    tollEstimate: "INR 0–50",
    description: "The popular Coimbatore to Ooty route climbs through 36 hairpin bends in the Nilgiri Mountains. The ghat road from Mettupalayam offers spectacular views. Ooty's botanical gardens, Doddabetta Peak, and tea estates await at the top.",
  },
  "coimbatore-to-palakkad-taxi": {
    distance: 55, duration: "1–1.5 hours", highway: "NH544",
    tollEstimate: "INR 0–50",
    description: "A short cross-border ride from Coimbatore to Palakkad through the Palakkad Gap in the Western Ghats. This natural pass connects Tamil Nadu to Kerala. Quick and easy for business and family visits.",
  },
  "coimbatore-to-salem-taxi": {
    distance: 170, duration: "3–3.5 hours", highway: "NH44",
    tollEstimate: "INR 100–200",
    description: "A straightforward ride along NH44 from Coimbatore to Salem through Erode. Salem is a major transit hub in central Tamil Nadu. The highway is well-maintained with rest stops at Erode and Bhavani.",
  },

  // ── Cochin / Kochi routes ─────────────────────────────────────
  "cochin-to-munnar-taxi": {
    distance: 130, duration: "3.5–4 hours", highway: "NH49",
    tollEstimate: "INR 50–100",
    description: "The Kochi to Munnar route ascends from the Kerala coast into the Western Ghats tea country. Pass through Periyar wildlife area and spice gardens at Adimali. Munnar's misty hills and tea estates are a photographer's paradise.",
  },
  "cochin-to-sabarimala-taxi": {
    distance: 175, duration: "4–5 hours", highway: "NH183 / MC Road",
    tollEstimate: "INR 100–150",
    description: "A pilgrimage route from Kochi to the Ayyappa Temple at Sabarimala via Ernakulam and Pala. Peak demand during Mandalam-Makaravilakku season (November-January). Our drivers know the forest road routes and parking areas well.",
  },

  // ── Madurai routes ─────────────────────────────────────────
  "madurai-to-bangalore-taxi": {
    distance: 435, duration: "7–8 hours", highway: "NH44",
    tollEstimate: "INR 400–550",
    description: "The Madurai to Bangalore route via NH44 passes through Dindigul and Salem. Start after visiting the Meenakshi Temple. The highway offers good rest stops at Dindigul (biryani) and Salem (steel city).",
  },
  "madurai-to-chennai-taxi": {
    distance: 460, duration: "7–8 hours", highway: "NH45 / NH44",
    tollEstimate: "INR 400–600",
    description: "Travel from the temple city of Madurai to Chennai via Trichy and Villupuram. A long route best begun early morning. Break the journey at Trichy to visit the Rock Fort Temple.",
  },
  "madurai-to-coimbatore-taxi": {
    distance: 220, duration: "4–5 hours", highway: "NH44",
    tollEstimate: "INR 150–250",
    description: "A half-day drive from Madurai to Coimbatore along NH44 via Dindigul and Dharapuram. Both cities are major textile and industrial hubs in Tamil Nadu. The route is smooth with minimal tolls.",
  },
  "madurai-to-kodaikanal-taxi": {
    distance: 120, duration: "3–4 hours", highway: "NH49 / SH72",
    tollEstimate: "INR 50–100",
    description: "The shortest route to Kodaikanal from any major city. The ghat road from Batlagundu winds through 36 hairpin bends. Silver Cascade waterfall is a popular stop on the ascent. Book an SUV for the hill section.",
  },
  "madurai-to-pondicherry-taxi": {
    distance: 310, duration: "5–6 hours", highway: "NH45B / NH32",
    tollEstimate: "INR 250–400",
    description: "Travel from Madurai to the French-colonial charm of Pondicherry via Pudukkottai and Cuddalore. The route passes through the Cauvery delta. Enjoy Pondicherry's promenade beach, Auroville, and café culture upon arrival.",
  },
  "madurai-to-rameswaram-taxi": {
    distance: 170, duration: "3–4 hours", highway: "NH49",
    tollEstimate: "INR 100–200",
    description: "The Madurai to Rameshwaram pilgrimage route crosses the spectacular Pamban Bridge to reach the sacred island. Visit the Ramanathaswamy Temple with its famous corridors. The drive along the coast is scenic and serene.",
  },
  "madurai-to-salem-taxi": {
    distance: 230, duration: "4–5 hours", highway: "NH44",
    tollEstimate: "INR 150–250",
    description: "Drive from Madurai to Salem along NH44 through Dindigul and Namakkal. Salem is a central Tamil Nadu hub known for steel and mangoes. The highway passes through agricultural landscapes of the Kaveri basin.",
  },
  "madurai-to-tiruvannamalai-taxi": {
    distance: 340, duration: "6–7 hours", highway: "NH45 / SH4",
    tollEstimate: "INR 300–450",
    description: "A spiritual journey from Madurai's Meenakshi Temple to Tiruvannamalai's Arunachaleswarar Temple via Trichy. Both are major Shaivite pilgimage centers. The route passes through central Tamil Nadu's temple country.",
  },
  "madurai-to-trichy-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH44 / NH45",
    tollEstimate: "INR 100–200",
    description: "A comfortable short drive connecting two of Tamil Nadu's most important temple cities. The highway passes through Sivagangai. Visit Trichy's Rock Fort and Srirangam Temple, the largest functioning Hindu temple in the world.",
  },
  "madurai-to-vellore-taxi": {
    distance: 400, duration: "6–7 hours", highway: "NH44 / NH46",
    tollEstimate: "INR 350–500",
    description: "The Madurai to Vellore route via Salem serves medical tourists heading to CMC Hospital. The NH44 and NH46 are well-maintained. Break the journey at Salem or Krishnagiri for refreshments.",
  },

  // ── Other routes ─────────────────────────────────────────
  "cochin-airport-taxi": {
    distance: 30, duration: "0.5–1 hours", highway: "NH544",
    tollEstimate: "INR 0",
    description: "Quick pickup and drop at Cochin International Airport with flight tracking. Our drivers meet you at arrivals with a name board. Kochi airport is one of the world's first fully solar-powered airports.",
  },
  "dindigul-to-kodaikanal-taxi": {
    distance: 95, duration: "2.5–3 hours", highway: "NH49 / Ghat Road",
    tollEstimate: "INR 0–50",
    description: "The nearest plains city to Kodaikanal, Dindigul offers the quickest access to the hill station. The ghat road begins after Batlagundu with dramatic hairpin bends through dense forest. Silver Cascade waterfall is a must-stop.",
  },
  "ernakulam-to-munnar-taxi": {
    distance: 130, duration: "3.5–4 hours", highway: "NH49",
    tollEstimate: "INR 50–100",
    description: "Same as the Kochi to Munnar route, starting from Ernakulam city. Ascend into Kerala's tea highlands through Kothamangalam and Adimali. The route passes through spice gardens and cardamom plantations.",
  },
  "hyderabad-to-bangalore-taxi": {
    distance: 570, duration: "8–9 hours", highway: "NH44",
    tollEstimate: "INR 600–900",
    description: "The Hyderabad to Bangalore express corridor along NH44 is one of India's busiest highways. Pass through Kurnool, Anantapur, and Penukonda. This route benefits from the ongoing expressway upgrades for faster travel.",
  },
  "hyderabad-to-vijayawada-taxi": {
    distance: 275, duration: "4–5 hours", highway: "NH65",
    tollEstimate: "INR 250–400",
    description: "Connect Telangana's capital to Andhra Pradesh's commercial hub via NH65. The highway passes through Suryapet and Khammam region. Vijayawada's Kanaka Durga Temple and Krishna River make it a cultural destination.",
  },
  "kochi-to-alleppey-taxi": {
    distance: 55, duration: "1.5–2 hours", highway: "NH66",
    tollEstimate: "INR 0–50",
    description: "A short coastal drive from Kochi to the Venice of the East. Alleppey's famous houseboat cruises through backwaters start from the boat jetty. The NH66 route along the coast is scenic and quick.",
  },
  "kozhikode-to-wayanad-taxi": {
    distance: 85, duration: "2–3 hours", highway: "NH766",
    tollEstimate: "INR 0–50",
    description: "Climb from the Malabar coast at Kozhikode into the misty Wayanad hills. The ghat road through Thamarassery has 9 hairpin bends with viewpoints. Wayanad's wildlife sanctuaries and spice gardens are the reward.",
  },
  "mangalore-to-coorg-taxi": {
    distance: 135, duration: "3–3.5 hours", highway: "NH275",
    tollEstimate: "INR 50–100",
    description: "Drive from the coastal city of Mangalore to the coffee capital of Coorg via Sullia and Virajpet. The route winds through areca nut and rubber plantations before reaching Kodagu's misty coffee estates.",
  },
  "munnar-to-alleppey-taxi": {
    distance: 170, duration: "4.5–5 hours", highway: "SH39 / NH66",
    tollEstimate: "INR 50–100",
    description: "Descend from Munnar's tea hills to Alleppey's backwaters — two of Kerala's most iconic destinations in one trip. The route passes through Kothamangalam and Chengannur. Perfect for a Kerala highlights tour.",
  },
  "munnar-to-thekkady-taxi": {
    distance: 90, duration: "3–3.5 hours", highway: "SH39",
    tollEstimate: "INR 0–50",
    description: "Connect Kerala's two premier hill stations through the Western Ghats. The route passes through Chinnakanal and Vandanmedu spice villages. Thekkady's Periyar Wildlife Sanctuary offers boat safaris and elephant sightings.",
  },
  "mysore-to-bangalore-taxi": {
    distance: 150, duration: "3–3.5 hours", highway: "NH275 (Mysore Expressway)",
    tollEstimate: "INR 100–200",
    description: "Return from the City of Palaces to Bangalore via the modern Mysore Expressway. The 6-lane highway makes this one of the fastest intercity routes in South India. Smooth, toll-based, and well-maintained throughout.",
  },
  "mysore-to-coorg-cab": {
    distance: 120, duration: "2.5–3 hours", highway: "SH88",
    tollEstimate: "INR 0–50",
    description: "A scenic drive from Mysore to Coorg (Kodagu) through Kushalnagar. Visit Bylakuppe's Tibetan monastery en route. Coorg's coffee plantations, Abbey Falls, and misty mountain trails make it Karnataka's Scotland.",
  },
  "mysore-to-ooty-taxi": {
    distance: 125, duration: "3–3.5 hours", highway: "NH766 / NH181",
    tollEstimate: "INR 50–100",
    description: "Cross from Karnataka to Tamil Nadu's Queen of Hill Stations. The route through Bandipur National Park may have time restrictions for wildlife. Ooty's botanical garden, Doddabetta Peak, and rose garden await.",
  },
  "ooty-to-bangalore-taxi": {
    distance: 280, duration: "5–6 hours", highway: "NH181 / NH275",
    tollEstimate: "INR 200–300",
    description: "Descend from the Nilgiri Hills and head to Bangalore via Mysore. The ghat road section from Ooty to Mettupalayam has spectacular views. The Mysore Expressway portion ensures a fast finish.",
  },
  "ooty-to-coimbatore-taxi": {
    distance: 90, duration: "2.5–3 hours", highway: "NH181",
    tollEstimate: "INR 0–50",
    description: "The popular downhill route from Ooty to Coimbatore descends through 36 hairpin bends via Coonoor and Mettupalayam. The Nilgiri Mountain Railway runs alongside for parts of the route. Tea estate views throughout.",
  },
  "pondicherry-to-bangalore-taxi": {
    distance: 310, duration: "5–6 hours", highway: "NH32 / NH48",
    tollEstimate: "INR 350–500",
    description: "Return from Pondicherry's French charm to Bangalore via Tindivanam and Vellore. The route crosses the Eastern Ghats. A comfortable drive after a relaxing Pondicherry weekend.",
  },
  "pondicherry-to-chennai-taxi": {
    distance: 150, duration: "2.5–3 hours", highway: "ECR / NH32",
    tollEstimate: "INR 100–200",
    description: "The scenic East Coast Road from Pondicherry to Chennai is one of India's most beautiful coastal drives. Pass through Mahabalipuram. Stop at Dakshinachitra heritage village or the crocodile bank en route.",
  },
  "pondicherry-to-coimbatore-taxi": {
    distance: 385, duration: "6–7 hours", highway: "NH32 / NH44",
    tollEstimate: "INR 300–450",
    description: "Cross Tamil Nadu from the eastern coast to the western industrial hub. The route passes through Villupuram, Salem, and Erode. A full-day drive connecting the French Quarter to the Manchester of South India.",
  },
  "pondicherry-to-madurai-taxi": {
    distance: 310, duration: "5–6 hours", highway: "NH32 / NH45B",
    tollEstimate: "INR 250–400",
    description: "Travel from Pondicherry to Madurai via Thanjavur or Trichy. Pass through the rice bowl of Tamil Nadu — the Cauvery delta region. Arrive at the ancient temple city and its magnificent Meenakshi Temple.",
  },
  "pondicherry-to-mahabalipuram-taxi": {
    distance: 95, duration: "1.5–2 hours", highway: "ECR",
    tollEstimate: "INR 0–50",
    description: "A short coastal drive along ECR connecting two tourist hotspots. Visit the UNESCO Shore Temple, Five Rathas, and Arjuna's Penance at Mahabalipuram. The beachfront road offers excellent Bay of Bengal views.",
  },
  "pondicherry-to-salem-taxi": {
    distance: 215, duration: "4–5 hours", highway: "NH32 / NH44",
    tollEstimate: "INR 150–250",
    description: "Drive inland from Pondicherry to Salem through Villupuram and Attur. Salem is a major transit hub with connections to all parts of Tamil Nadu. The route passes through agricultural countryside.",
  },
  "rameswaram-to-madurai-taxi": {
    distance: 170, duration: "3–4 hours", highway: "NH49",
    tollEstimate: "INR 100–200",
    description: "Return from the sacred island of Rameshwaram to Madurai after completing your temple visit. Cross the Pamban Bridge one more time for stunning sea views. The coastal drive is peaceful and scenic.",
  },
  "rameshwaram-to-kanyakumari-taxi": {
    distance: 310, duration: "5–6 hours", highway: "NH49 / NH7",
    tollEstimate: "INR 200–350",
    description: "Connect two of India's most sacred coastal points — from Rameshwaram to the southern tip at Kanyakumari. The route follows the Tamil Nadu coastline through Tuticorin. Watch the sunrise at Kanyakumari where three seas meet.",
  },
  "salem-to-chennai-taxi": {
    distance: 340, duration: "5–6 hours", highway: "NH44",
    tollEstimate: "INR 300–450",
    description: "The Salem to Chennai route along NH44 is a major corridor connecting central Tamil Nadu to the capital. The highway passes through Krishnagiri and Vellore region. A smooth four-lane drive throughout.",
  },
  "salem-to-coimbatore-taxi": {
    distance: 170, duration: "3–3.5 hours", highway: "NH44",
    tollEstimate: "INR 100–200",
    description: "A quick ride between two of Tamil Nadu's major industrial cities via NH44 through Erode. Both cities are well-connected textile and manufacturing hubs. Rest stops available at Bhavani and Erode.",
  },
  "salem-to-madurai-taxi": {
    distance: 230, duration: "4–5 hours", highway: "NH44",
    tollEstimate: "INR 150–250",
    description: "Drive south from Salem to Madurai along NH44 through Namakkal and Dindigul. The route passes through central Tamil Nadu's agricultural belt. Madurai's Meenakshi Temple is the highlight of arrival.",
  },
  "salem-to-trichy-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH44 / NH45",
    tollEstimate: "INR 100–200",
    description: "Connect Salem to Trichy through Namakkal and Musiri. Both are important cities in central Tamil Nadu. Trichy's Rockfort Temple is visible from miles away as you approach the city.",
  },
  "salem-to-vellore-taxi": {
    distance: 215, duration: "3.5–4 hours", highway: "NH44 / NH46",
    tollEstimate: "INR 200–300",
    description: "The Salem to Vellore route via Krishnagiri connects central Tamil Nadu to the northern medical hub. Popular for hospital visits to CMC Vellore. The highway is smooth and well-maintained.",
  },
  "salem-to-yercaud-taxi": {
    distance: 35, duration: "1–1.5 hours", highway: "Yercaud Ghat Road",
    tollEstimate: "INR 0",
    description: "A quick getaway from Salem to the Jewel of the South — Yercaud hill station. Just 20 hairpin bends take you to the scenic plateau at 1500m. Yercaud Lake, Lady's Seat viewpoint, and coffee estates make this a refreshing day trip.",
  },
  "tirupati-to-arunachalam-cab": {
    distance: 250, duration: "5–6 hours", highway: "NH48 / SH4",
    tollEstimate: "INR 200–300",
    description: "A spiritual route connecting two of South India's most revered temples — Tirumala Venkateswara and Arunachaleswarar at Tiruvannamalai. Pass through Vellore. Popular with pilgrims covering multiple temple visits.",
  },
  "tirupati-to-chennai-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH69 / NH48",
    tollEstimate: "INR 150–250",
    description: "Return from Tirupati to Chennai after your Tirumala darshan. The highway through Tada and Nellore bypass is well-maintained. Our drivers are familiar with temple timings and plan pickups accordingly.",
  },
  "tiruvannamalai-to-chennai-taxi": {
    distance: 190, duration: "3–4 hours", highway: "SH4 / NH48",
    tollEstimate: "INR 150–250",
    description: "Return from the spiritual town of Tiruvannamalai to Chennai via Kanchipuram or Vellore. The route passes through the northern Tamil Nadu countryside. Popular after Girivalam (circumambulation) during full moon nights.",
  },
  "trichy-to-chennai-taxi": {
    distance: 330, duration: "5–6 hours", highway: "NH45",
    tollEstimate: "INR 300–450",
    description: "The Trichy to Chennai route along NH45 through Villupuram is a well-traveled corridor. Depart after visiting Srirangam Temple, the largest functioning Hindu temple complex. Smooth highway with multiple rest stops.",
  },
  "trichy-to-coimbatore-taxi": {
    distance: 210, duration: "4–5 hours", highway: "NH44",
    tollEstimate: "INR 150–250",
    description: "Connect two of Tamil Nadu's tier-2 cities via NH44 through Karur and Erode. The route passes through the textile belt of central Tamil Nadu. Both cities are major educational and industrial centers.",
  },
  "trichy-to-madurai-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH44 / NH45",
    tollEstimate: "INR 100–200",
    description: "A short drive connecting Trichy's Rock Fort to Madurai's Meenakshi Temple — two of Tamil Nadu's most iconic landmarks. The highway through Sivagangai is smooth and fast.",
  },
  "trichy-to-salem-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH44 / NH45",
    tollEstimate: "INR 100–200",
    description: "The Trichy to Salem route through Namakkal connects two important transit hubs. The highway passes through agricultural countryside and the rock fortress at Namakkal. Quick and comfortable drive.",
  },
  "trichy-to-velankanni-cab": {
    distance: 130, duration: "2.5–3 hours", highway: "NH36",
    tollEstimate: "INR 50–100",
    description: "A pilgrimage drive from Trichy to the Basilica of Our Lady of Good Health at Velankanni via Thanjavur. Pass through the Cauvery delta rice bowl. Peak pilgrimage during the September feast season.",
  },
  "trivandrum-to-kanyakumari-taxi": {
    distance: 90, duration: "2–2.5 hours", highway: "NH66",
    tollEstimate: "INR 50–100",
    description: "Drive from Kerala's capital Trivandrum to the southern tip of India at Kanyakumari. Watch the sunset where the Arabian Sea, Bay of Bengal, and Indian Ocean converge. Visit the Vivekananda Rock Memorial.",
  },
  "velankanni-to-pondicherry-cab": {
    distance: 165, duration: "3–3.5 hours", highway: "NH36 / ECR",
    tollEstimate: "INR 100–150",
    description: "Travel from the Catholic pilgrimage center of Velankanni to the French Quarter of Pondicherry along the coast. The route passes through Karaikal and Cuddalore. A journey connecting faith and French-colonial heritage.",
  },
  "vellore-to-bangalore-taxi": {
    distance: 215, duration: "3.5–4 hours", highway: "NH48",
    tollEstimate: "INR 200–350",
    description: "The Vellore to Bangalore route via NH48 passes through Kolar. Popular for medical tourists returning from CMC Hospital. The highway is smooth with minimal traffic outside peak hours.",
  },
  "vellore-to-chennai-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH46",
    tollEstimate: "INR 100–200",
    description: "Return from Vellore to Chennai via NH46 — a popular medical tourism corridor. Thousands travel this route annually for CMC Vellore treatments. Direct and well-maintained highway throughout.",
  },
  "vellore-to-pondicherry-taxi": {
    distance: 155, duration: "3–3.5 hours", highway: "NH46 / NH32",
    tollEstimate: "INR 100–200",
    description: "Drive from the medical hub of Vellore to the coastal charm of Pondicherry. The route passes through Tindivanam. Combine a hospital visit with a relaxing Pondicherry beach weekend.",
  },
  "vellore-to-tiruvannamalai-cab": {
    distance: 85, duration: "1.5–2 hours", highway: "SH4",
    tollEstimate: "INR 0–50",
    description: "A quick spiritual journey from Vellore to the sacred Arunachaleswarar Temple at Tiruvannamalai. The state highway passes through Polur. Popular for combining a CMC visit with a temple pilgrimage.",
  },
  "vijayawada-to-hyderabad-taxi": {
    distance: 275, duration: "4–5 hours", highway: "NH65",
    tollEstimate: "INR 250–400",
    description: "The Vijayawada to Hyderabad route along NH65 connects AP's commercial capital to Telangana. The highway through Suryapet is a national corridor with excellent infrastructure. Business travelers frequently use this route.",
  },
  "villupuram-to-chennai-taxi": {
    distance: 160, duration: "2.5–3.5 hours", highway: "NH45",
    tollEstimate: "INR 100–200",
    description: "A transit route from Villupuram, a major railway junction, to Chennai along NH45. The highway is smooth and direct. Popular with passengers connecting from trains to Chennai airport or city.",
  },

  // ── New routes targeting competitor keywords ──────────────────────
  "vellore-to-yelagiri-taxi": {
    distance: 95, duration: "2–2.5 hours", highway: "NH48 / SH4",
    tollEstimate: "INR 50–100",
    description: "Drive from Vellore to Yelagiri Hills, a popular weekend getaway in Tirupattur district. The route passes through Jolarpet before the scenic ghat road climb with 14 hairpin bends up to the hill station at 1,100 metres elevation.",
  },
  "vellore-to-sripuram-taxi": {
    distance: 12, duration: "30–45 minutes",
    description: "A short trip from Vellore city to the famous Sripuram Golden Temple (Lakshmi Narayani Golden Temple) in Thirumalaikodi. The temple campus features a 1,500 kg gold-plated structure and is a major pilgrimage destination in Tamil Nadu.",
  },
  "madurai-to-kanyakumari-taxi": {
    distance: 245, duration: "4.5–5.5 hours", highway: "NH44 / NH87",
    tollEstimate: "INR 200–350",
    description: "Travel from the temple city of Madurai to Kanyakumari, the southernmost tip of India. The route passes through Tirunelveli and Nagercoil. Visit the Vivekananda Rock Memorial and Thiruvalluvar Statue at Kanyakumari.",
  },
  "chennai-to-ooty-taxi": {
    distance: 560, duration: "9–10 hours", highway: "NH44 / NH181",
    tollEstimate: "INR 500–700",
    description: "Long-distance journey from Chennai to the Queen of Hill Stations via Salem and Mettupalayam. The final 36 km ghat road features 36 hairpin bends. Start early morning for the best experience. SUV recommended for the mountain stretch.",
  },
  "chennai-to-hosur-taxi": {
    distance: 310, duration: "4.5–5.5 hours", highway: "NH44",
    tollEstimate: "INR 300–450",
    description: "Travel from Chennai to Hosur via the NH44 corridor through Vellore. Hosur is an industrial hub at the Karnataka-Tamil Nadu border with a growing IT sector. Best departure before 6 AM to avoid Chennai traffic.",
  },
  "coimbatore-to-erode-taxi": {
    distance: 100, duration: "1.5–2 hours", highway: "NH544",
    tollEstimate: "INR 50–100",
    description: "A short intercity trip from Coimbatore to Erode, a major textile and turmeric trading centre. The route along NH544 is well-maintained with good food stops at Tirupur and Perundurai.",
  },
  "coimbatore-to-palani-taxi": {
    distance: 110, duration: "2–2.5 hours", highway: "NH544 / NH83",
    tollEstimate: "INR 50–100",
    description: "Travel from Coimbatore to the famous Palani Murugan Temple, one of the six abodes of Lord Murugan. The route passes through Pollachi and Udumalpet with scenic views of the Western Ghats.",
  },
  "chennai-to-yercaud-taxi": {
    distance: 365, duration: "6–7 hours", highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "Drive from Chennai to Yercaud, the Jewel of the South nestled in the Shevaroy Hills near Salem. The route follows NH44 to Salem, then a scenic 32 km ghat road with 20 hairpin bends. Perfect weekend getaway from Chennai.",
  },
  "trichy-to-kumbakonam-taxi": {
    distance: 95, duration: "1.5–2 hours", highway: "NH36",
    tollEstimate: "INR 50–80",
    description: "Short trip from Trichy to Kumbakonam, the temple town famous for Mahamaham festival and Chola-era temples. The Cauvery delta route passes through rich paddy fields and ancient temple towns.",
  },
  "madurai-to-tirunelveli-taxi": {
    distance: 160, duration: "2.5–3 hours", highway: "NH44",
    tollEstimate: "INR 100–200",
    description: "Travel from Madurai to Tirunelveli, known for its halwa and Nellaiappar Temple. The route via NH44 passes through Virudhunagar and Kovilpatti. A smooth highway drive through southern Tamil Nadu.",
  },
  "madurai-to-munnar-taxi": {
    distance: 160, duration: "4–5 hours", highway: "NH85 / SH17",
    tollEstimate: "INR 100–150",
    description: "Scenic journey from Madurai to Munnar through Theni and Bodinayakanur. The last 60 km winds through tea plantations and cardamom hills of Kerala. One of the most beautiful drives in South India.",
  },
  "trichy-to-thanjavur-taxi": {
    distance: 60, duration: "1–1.5 hours", highway: "NH83",
    tollEstimate: "INR 30–50",
    description: "Quick trip from Trichy to Thanjavur (Tanjore), home of the UNESCO World Heritage Brihadeeswarar Temple. The route runs through the fertile Cauvery delta, the rice bowl of Tamil Nadu.",
  },
  "salem-to-erode-taxi": {
    distance: 65, duration: "1–1.5 hours", highway: "NH544",
    tollEstimate: "INR 30–50",
    description: "Short trip connecting Salem and Erode, two major commercial centres in western Tamil Nadu. The NH544 route is smooth and direct, passing through Sankagiri.",
  },
  "madurai-to-dindigul-taxi": {
    distance: 65, duration: "1–1.5 hours", highway: "NH44",
    tollEstimate: "INR 30–50",
    description: "Short drive from Madurai to Dindigul, famous for its biryani and the Dindigul Fort. The NH44 route is well-maintained. Gateway to Kodaikanal hill station via Dindigul.",
  },
  "chennai-to-thanjavur-taxi": {
    distance: 340, duration: "5.5–6.5 hours", highway: "NH45C / NH36",
    tollEstimate: "INR 300–450",
    description: "Journey from Chennai to the Great Living Chola Temple city of Thanjavur. The route passes through Villupuram and Trichy. Visit the Brihadeeswarar Temple, a UNESCO World Heritage Site built by Raja Raja Chola.",
  },
  "bangalore-to-yercaud-taxi": {
    distance: 230, duration: "4–5 hours", highway: "NH44",
    tollEstimate: "INR 200–350",
    description: "Drive from Bangalore to Yercaud hill station via Krishnagiri and Salem. After Salem, a scenic ghat road leads up the Shevaroy Hills. Popular weekend destination from Bangalore with pleasant year-round climate.",
  },
  "coimbatore-to-tirupur-taxi": {
    distance: 50, duration: "1–1.5 hours", highway: "NH544",
    tollEstimate: "INR 20–40",
    description: "Quick transfer from Coimbatore to Tirupur, the knitwear capital of India. The NH544 route is smooth and direct. Popular for business commuters in the textile industry corridor.",
  },
  "trichy-to-karur-taxi": {
    distance: 80, duration: "1.5–2 hours", highway: "NH44",
    tollEstimate: "INR 40–60",
    description: "Travel from Trichy to Karur, a major textile and bus-body building centre. The NH44 route passes through Manapparai. Karur is a key junction for routes to Coimbatore and Dindigul.",
  },
  "madurai-to-theni-taxi": {
    distance: 75, duration: "1.5–2 hours", highway: "NH85",
    tollEstimate: "INR 40–60",
    description: "Drive from Madurai to Theni, the gateway to Megamalai and Suruli Falls. The route via NH85 passes through Usilampatti. Theni district is known for cardamom, grapes, and proximity to the Western Ghats.",
  },
  "madurai-to-ooty-taxi": {
    distance: 290, duration: "5.5–6.5 hours", highway: "NH44 / NH181",
    tollEstimate: "INR 200–350",
    description: "Journey from Madurai to Ooty (Udhagamandalam) via Dindigul and Coimbatore. The final stretch from Mettupalayam features the famous 36 hairpin bends. A scenic cross-Tamil Nadu drive through diverse landscapes.",
  },
  "chennai-to-chidambaram-taxi": {
    distance: 245, duration: "4.5–5.5 hours", highway: "NH45C / ECR",
    tollEstimate: "INR 200–300",
    description: "Travel from Chennai to Chidambaram, home of the Nataraja Temple dedicated to Lord Shiva's cosmic dance. The route via Pondicherry and Cuddalore follows the East Coast Road for part of the journey.",
  },
  "chennai-to-erode-taxi": {
    distance: 400, duration: "6.5–7.5 hours", highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "Long-distance drive from Chennai to Erode, the turmeric and textile city of western Tamil Nadu. The route follows NH44 through Vellore and Salem. Start early to cover this journey comfortably.",
  },
  "vellore-to-tirupati-taxi": {
    distance: 130, duration: "2.5–3 hours", highway: "NH46 / NH71",
    tollEstimate: "INR 100–200",
    description: "Drive from Vellore to Tirupati, home of the world-famous Tirumala Venkateswara Temple. The cross-border route enters Andhra Pradesh at Palamaner. Book in advance during festival season for guaranteed vehicles.",
  },
  "kanchipuram-to-vellore-taxi": {
    distance: 70, duration: "1.5–2 hours", highway: "NH48",
    tollEstimate: "INR 40–60",
    description: "Short trip connecting two ancient cities — Kanchipuram (City of Thousand Temples) and Vellore (home of CMC Hospital). The route via NH48 is smooth and direct through Ranipet.",
  },
  "madurai-to-karaikudi-taxi": {
    distance: 90, duration: "1.5–2 hours", highway: "NH36",
    tollEstimate: "INR 50–80",
    description: "Drive from Madurai to Karaikudi, the capital of Chettinad known for its mansions, cuisine, and Athangudi tiles. Explore the heritage homes and taste authentic Chettinad cuisine.",
  },
  "nagercoil-to-kanyakumari-taxi": {
    distance: 20, duration: "30–45 minutes",
    description: "Quick transfer from Nagercoil town to Kanyakumari, the southernmost tip of mainland India. Visit the Vivekananda Rock Memorial, Thiruvalluvar Statue, and witness the confluence of three seas.",
  },
  "madurai-to-tuticorin-taxi": {
    distance: 140, duration: "2.5–3 hours", highway: "NH45B",
    tollEstimate: "INR 100–150",
    description: "Travel from Madurai to Tuticorin (Thoothukudi), a major port city on the Gulf of Mannar. The route passes through Kovilpatti. Tuticorin is known for its pearl diving heritage and Hare Island.",
  },
  "trichy-to-rameswaram-taxi": {
    distance: 210, duration: "4–5 hours", highway: "NH36 / NH87",
    tollEstimate: "INR 150–250",
    description: "Pilgrimage route from Trichy to Rameswaram via Sivagangai. The journey ends with the iconic Pamban Bridge crossing to Rameswaram island. Visit the Ramanathaswamy Temple with its famous 22 sacred wells.",
  },
  "coimbatore-to-karur-taxi": {
    distance: 165, duration: "2.5–3.5 hours", highway: "NH544 / NH44",
    tollEstimate: "INR 100–150",
    description: "Drive from Coimbatore to Karur via Tirupur and Erode. Karur is a major bus-body building and textile centre. The route follows NH544 and connects two of Tamil Nadu's industrial corridors.",
  },
  "chennai-to-dindigul-taxi": {
    distance: 410, duration: "6.5–7.5 hours", highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "Travel from Chennai to Dindigul, the gateway to Kodaikanal. The route via NH44 passes through Vellore, Salem, and Namakkal. Dindigul is famous for its biryani and historical rock fort.",
  },
  "madurai-to-sivakasi-taxi": {
    distance: 70, duration: "1.5–2 hours", highway: "NH44",
    tollEstimate: "INR 40–60",
    description: "Short drive from Madurai to Sivakasi, the fireworks and printing capital of India. Sivakasi produces 90% of India's fireworks and 80% of safety matches, making it a unique industrial destination.",
  },
  "madurai-to-ramnad-taxi": {
    distance: 110, duration: "2–2.5 hours", highway: "NH36",
    tollEstimate: "INR 60–100",
    description: "Drive from Madurai to Ramanathapuram (Ramnad), the gateway to Rameswaram island. Historic district with the Ramanathapuram Palace and rich Setupathi heritage. The route is part of the temple circuit pilgrimage.",
  },
  "chennai-to-palani-taxi": {
    distance: 470, duration: "7.5–8.5 hours", highway: "NH44 / NH83",
    tollEstimate: "INR 400–550",
    description: "Long-distance pilgrimage route from Chennai to Palani Murugan Temple, one of the six abodes of Lord Murugan. Via Salem and Dindigul. The hilltop temple at 1,500 feet can be reached by steps, winch, or ropeway.",
  },
  "rameswaram-to-tiruchendur-taxi": {
    distance: 170, duration: "3.5–4.5 hours", highway: "NH87 / SH44",
    tollEstimate: "INR 100–150",
    description: "Temple circuit route connecting Rameswaram to Tiruchendur, home of the Subramania Swamy Temple on the beach. This route covers two of the six abodes of Lord Murugan, making it a key pilgrimage drive.",
  },
  "tirunelveli-to-tiruchendur-taxi": {
    distance: 55, duration: "1–1.5 hours", highway: "SH44",
    tollEstimate: "INR 20–40",
    description: "Short drive from Tirunelveli to Tiruchendur beach temple. Tiruchendur Subramania Swamy Temple is one of the Arupadai Veedu (six abodes) of Lord Murugan, situated on the Bay of Bengal coast.",
  },
  "thoothukudi-to-tiruchendur-taxi": {
    distance: 40, duration: "45 minutes–1 hour",
    description: "Quick transfer from Thoothukudi (Tuticorin) to the seaside temple town of Tiruchendur. The Subramania Swamy Temple is one of Tamil Nadu's most important Murugan temples.",
  },
  "bangalore-to-tirunelveli-taxi": {
    distance: 600, duration: "9–10 hours", highway: "NH44",
    tollEstimate: "INR 500–700",
    description: "Long-distance journey from Bangalore to Tirunelveli in deep south Tamil Nadu. The route via Madurai follows NH44. Known for Nellaiappar Temple, banana cultivation, and proximity to Courtallam waterfalls.",
  },
  "chennai-to-tiruchendur-taxi": {
    distance: 600, duration: "9–10 hours", highway: "NH44 / SH44",
    tollEstimate: "INR 500–700",
    description: "Long-distance pilgrimage route from Chennai to Tiruchendur via Madurai. Home to the famous Subramania Swamy Temple on the Bay of Bengal coast. One of the six abodes of Lord Murugan.",
  },
  "coimbatore-to-pollachi-taxi": {
    distance: 40, duration: "45 minutes–1 hour", highway: "NH209",
    tollEstimate: "INR 20–30",
    description: "Quick transfer from Coimbatore to Pollachi, the gateway to Valparai, Topslip, and Anamalai Tiger Reserve. Pollachi is known as the coconut capital of Tamil Nadu.",
  },
  "coimbatore-to-mettupalayam-taxi": {
    distance: 35, duration: "40–50 minutes", highway: "NH181",
    tollEstimate: "INR 10–20",
    description: "Short drive from Coimbatore to Mettupalayam, the base station for the Nilgiri Mountain Railway (UNESCO heritage). From here, the famous toy train climbs to Ooty through tea plantations.",
  },
  "madurai-to-palani-taxi": {
    distance: 120, duration: "2–2.5 hours", highway: "NH83",
    tollEstimate: "INR 60–100",
    description: "Pilgrimage route from Madurai to Palani Murugan Temple via Dindigul. Palani is one of the six abodes of Lord Murugan. The hilltop temple is accessible by steps, winch system, or ropeway.",
  },
  "coimbatore-to-dindigul-taxi": {
    distance: 165, duration: "3–3.5 hours", highway: "NH544 / NH44",
    tollEstimate: "INR 100–150",
    description: "Drive from Coimbatore to Dindigul, famous for biryani and its rock fort. The route connects two of Tamil Nadu's major commercial towns via Tirupur and Karur. Dindigul is the gateway to Kodaikanal.",
  },
  "chennai-to-nagercoil-taxi": {
    distance: 680, duration: "10–11 hours", highway: "NH44",
    tollEstimate: "INR 600–800",
    description: "Long journey from Chennai to Nagercoil near the southern tip of India. The route via Madurai follows NH44. Nagercoil is the gateway to Kanyakumari and is known for its Nagaraja Temple.",
  },
  "madurai-to-nagercoil-taxi": {
    distance: 225, duration: "4–5 hours", highway: "NH44 / NH87",
    tollEstimate: "INR 200–300",
    description: "Drive from Madurai to Nagercoil via Tirunelveli. Nagercoil is the administrative capital of Kanyakumari district and a gateway to India's southernmost tip. Rich in temples and natural beauty.",
  },


  // ── Reverse-direction routes (auto-generated) ─────────────
  "chikmagalur-to-bangalore-taxi": {
    distance: 245, duration: "4–5 hours",
    highway: "NH75 / NH73",
    tollEstimate: "INR 200–350",
    description: "Travel from Chikmagalur to Bangalore along the same 245 km route, approximately 4–5 hours by road via NH75 / NH73. The route passes through Hassan with coffee plantations appearing after Sakleshpur. Ideal for weekend getaways to Mullayanagiri and Baba Budangiri peaks. Early morning departures from Chikmagalur avoid both peak city traffic and afternoon glare.",
  },
  "coimbatore-to-bangalore-taxi": {
    distance: 365, duration: "6–7 hours",
    highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "Travel from Coimbatore to Bangalore along the same 365 km route, approximately 6–7 hours by road via NH44. The highway is well-maintained with food stops at Krishnagiri and Salem bypass. Cross the Tamil Nadu border near Hosur for a smooth ride into the Manchester of South India. Early morning departures from Coimbatore avoid both peak city traffic and afternoon glare.",
  },
  "coorg-to-bangalore-taxi": {
    distance: 265, duration: "5–6 hours",
    highway: "NH275 / SH88",
    tollEstimate: "INR 150–250",
    description: "Travel from Coorg to Bangalore along the same 265 km route, approximately 5–6 hours by road via NH275 / SH88. The route winds through coffee estates and spice plantations in the Western Ghats. Popular stops include Bylakuppe Tibetan settlement and Abbey Falls. Early morning departures from Coorg avoid both peak city traffic and afternoon glare.",
  },
  "hampi-to-bangalore-taxi": {
    distance: 340, duration: "6–7 hours",
    highway: "NH44 / NH48",
    tollEstimate: "INR 300–400",
    description: "Travel from Hampi to Bangalore along the same 340 km route, approximately 6–7 hours by road via NH44 / NH48. Travel via Chitradurga fort and Hospet. The journey passes through the Deccan Plateau with dramatic boulder landscapes near Hampi. Early morning departures from Hampi avoid both peak city traffic and afternoon glare.",
  },
  "hosur-to-bangalore-taxi": {
    distance: 45, duration: "1–1.5 hours",
    highway: "NH44",
    tollEstimate: "INR 50–100",
    description: "Travel from Hosur to Bangalore along the same 45 km route, approximately 1–1.5 hours by road via NH44. Popular for IT commuters and industrial visitors. Light traffic outside rush hours makes this a smooth trip. Early morning departures from Hosur avoid both peak city traffic and afternoon glare.",
  },
  "kodaikanal-to-bangalore-taxi": {
    distance: 465, duration: "7–8 hours",
    highway: "NH44 / NH49",
    tollEstimate: "INR 400–550",
    description: "Travel from Kodaikanal to Bangalore along the same 465 km route, approximately 7–8 hours by road via NH44 / NH49. The last 80 km involves scenic ghat road with 36 hairpin bends. Book a comfortable SUV or Innova for the mountain stretch. Early morning departures from Kodaikanal avoid both peak city traffic and afternoon glare.",
  },
  "mangalore-to-bangalore-taxi": {
    distance: 350, duration: "6–7 hours",
    highway: "NH75",
    tollEstimate: "INR 250–400",
    description: "Travel from Mangalore to Bangalore along the same 350 km route, approximately 6–7 hours by road via NH75. The Western Ghats section offers breathtaking views but requires experienced drivers, which DropTaxi provides. Best during October to March. Early morning departures from Mangalore avoid both peak city traffic and afternoon glare.",
  },
  "munnar-to-bangalore-cab": {
    distance: 475, duration: "8–9 hours",
    highway: "NH44 / NH49",
    tollEstimate: "INR 400–550",
    description: "Travel from Munnar to Bangalore along the same 475 km route, approximately 8–9 hours by road via NH44 / NH49. The route via Coimbatore and Udumalpet offers the best road conditions. The final stretch through Marayoor sandalwood forests is scenic. Early morning departures from Munnar avoid both peak city traffic and afternoon glare.",
  },
  "rameshwaram-to-bangalore-taxi": {
    distance: 580, duration: "9–10 hours",
    highway: "NH44 / NH49",
    tollEstimate: "INR 500–700",
    description: "Travel from Rameshwaram to Bangalore along the same 580 km route, approximately 9–10 hours by road via NH44 / NH49. The final stretch crosses the Pamban Bridge connecting the mainland to Rameshwaram island. An overnight or early morning departure is recommended for this long journey. Early morning departures from Rameshwaram avoid both peak city traffic and afternoon glare.",
  },
  "tirupati-to-bangalore-taxi": {
    distance: 255, duration: "4–5 hours",
    highway: "NH44 / NH69",
    tollEstimate: "INR 250–400",
    description: "Travel from Tirupati to Bangalore along the same 255 km route, approximately 4–5 hours by road via NH44 / NH69. The highway runs through Kolar and Chittoor. Early morning trips ensure you reach before darshan queue times peak. Early morning departures from Tirupati avoid both peak city traffic and afternoon glare.",
  },
  "tiruvannamalai-to-bangalore-taxi": {
    distance: 200, duration: "3.5–4.5 hours",
    highway: "NH48 / SH4",
    tollEstimate: "INR 200–300",
    description: "Travel from Tiruvannamalai to Bangalore along the same 200 km route, approximately 3.5–4.5 hours by road via NH48 / SH4. The route passes through Vellore. Popular during Karthigai Deepam festival in November-December. Early morning departures from Tiruvannamalai avoid both peak city traffic and afternoon glare.",
  },
  "trichy-to-bangalore-taxi": {
    distance: 345, duration: "6–7 hours",
    highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "Travel from Trichy to Bangalore along the same 345 km route, approximately 6–7 hours by road via NH44. Trichy is known for the Rock Fort Temple and Ranganathaswamy Temple at Srirangam. Good highway with rest stops at Salem and Namakkal. Early morning departures from Trichy avoid both peak city traffic and afternoon glare.",
  },
  "wayanad-to-bangalore-taxi": {
    distance: 280, duration: "5–6 hours",
    highway: "NH275 / NH766",
    tollEstimate: "INR 200–350",
    description: "Travel from Wayanad to Bangalore along the same 280 km route, approximately 5–6 hours by road via NH275 / NH766. The forest stretch may have time restrictions for wildlife protection. Wayanad's misty hills and spice plantations await. Early morning departures from Wayanad avoid both peak city traffic and afternoon glare.",
  },
  "cuddalore-to-chennai-taxi": {
    distance: 185, duration: "3–4 hours",
    highway: "ECR / NH32",
    tollEstimate: "INR 100–200",
    description: "Travel from Cuddalore to Chennai along the same 185 km route, approximately 3–4 hours by road via ECR / NH32. The route passes through Mahabalipuram and Pondicherry. A coastal journey with views of the Bay of Bengal for most of the drive. Early morning departures from Cuddalore avoid both peak city traffic and afternoon glare.",
  },
  "kanchipuram-to-chennai-taxi": {
    distance: 75, duration: "1.5–2 hours",
    highway: "NH48 / GST Road",
    tollEstimate: "INR 50–100",
    description: "Travel from Kanchipuram to Chennai along the same 75 km route, approximately 1.5–2 hours by road via NH48 / GST Road. Kanchipuram is famous for silk sarees and ancient Pallava temples. The route via GST Road is quick and well-connected. Early morning departures from Kanchipuram avoid both peak city traffic and afternoon glare.",
  },
  "karaikudi-to-chennai-taxi": {
    distance: 400, duration: "6–7 hours",
    highway: "NH45 / NH36",
    tollEstimate: "INR 350–500",
    description: "Travel from Karaikudi to Chennai along the same 400 km route, approximately 6–7 hours by road via NH45 / NH36. The route goes through Trichy. A food lover's journey ending in India's culinary capital. Early morning departures from Karaikudi avoid both peak city traffic and afternoon glare.",
  },
  "kodaikanal-to-chennai-taxi": {
    distance: 530, duration: "8–9 hours",
    highway: "NH45 / NH49",
    tollEstimate: "INR 450–650",
    description: "Travel from Kodaikanal to Chennai along the same 530 km route, approximately 8–9 hours by road via NH45 / NH49. Route via Dindigul with 36 hairpin bends in the ghat section. Book an SUV or Innova for comfortable hill climbing. Early morning departures from Kodaikanal avoid both peak city traffic and afternoon glare.",
  },
  "kumbakonam-to-chennai-taxi": {
    distance: 300, duration: "5–6 hours",
    highway: "NH45",
    tollEstimate: "INR 250–400",
    description: "Travel from Kumbakonam to Chennai along the same 300 km route, approximately 5–6 hours by road via NH45. Known as the City of Temples with the famous Mahamaham tank. The route passes through the fertile Cauvery delta region. Early morning departures from Kumbakonam avoid both peak city traffic and afternoon glare.",
  },
  "mahabalipuram-to-chennai-taxi": {
    distance: 60, duration: "1–1.5 hours",
    highway: "ECR (East Coast Road)",
    tollEstimate: "INR 0–50",
    description: "Travel from Mahabalipuram to Chennai along the same 60 km route, approximately 1–1.5 hours by road via ECR (East Coast Road). The East Coast Road offers beautiful ocean views. Visit the Shore Temple, Five Rathas, and enjoy fresh seafood at the beach shacks. Early morning departures from Mahabalipuram avoid both peak city traffic and afternoon glare.",
  },
  "neyveli-to-chennai-taxi": {
    distance: 220, duration: "3.5–4.5 hours",
    highway: "NH45C",
    tollEstimate: "INR 150–250",
    description: "Travel from Neyveli to Chennai along the same 220 km route, approximately 3.5–4.5 hours by road via NH45C. The route passes through Villupuram. A well-connected route used by NLC employees and business visitors. Early morning departures from Neyveli avoid both peak city traffic and afternoon glare.",
  },
  "rameshwaram-to-chennai-taxi": {
    distance: 580, duration: "9–10 hours",
    highway: "NH45 / NH49",
    tollEstimate: "INR 500–700",
    description: "Travel from Rameshwaram to Chennai along the same 580 km route, approximately 9–10 hours by road via NH45 / NH49. This long route is best with an early morning start. The sacred island town is one of the Char Dham pilgrimage sites. Early morning departures from Rameshwaram avoid both peak city traffic and afternoon glare.",
  },
  "ranipet-to-chennai-taxi": {
    distance: 120, duration: "2–2.5 hours",
    highway: "NH48",
    tollEstimate: "INR 100–150",
    description: "Travel from Ranipet to Chennai along the same 120 km route, approximately 2–2.5 hours by road via NH48. The route passes through Sriperumbudur and Kanchipuram. Popular for business travel to Ranipet's leather and manufacturing industries. Early morning departures from Ranipet avoid both peak city traffic and afternoon glare.",
  },
  "tirunelveli-to-chennai-taxi": {
    distance: 620, duration: "9–10 hours",
    highway: "NH44 / NH7",
    tollEstimate: "INR 550–750",
    description: "Travel from Tirunelveli to Chennai along the same 620 km route, approximately 9–10 hours by road via NH44 / NH7. The route passes through Madurai and Virudhunagar. Tirunelveli is known for its halwa and the Nellaiappar Temple. Consider an overnight stop at Madurai. Early morning departures from Tirunelveli avoid both peak city traffic and afternoon glare.",
  },
  "velankanni-to-chennai-taxi": {
    distance: 340, duration: "5–6 hours",
    highway: "NH45 / NH36",
    tollEstimate: "INR 300–450",
    description: "Travel from Velankanni to Chennai along the same 340 km route, approximately 5–6 hours by road via NH45 / NH36. The route goes through Kumbakonam. Peak season during the annual feast in August-September. Early morning departures from Velankanni avoid both peak city traffic and afternoon glare.",
  },
  "vellore-to-chennai-airport-taxi": {
    distance: 135, duration: "2.5–3 hours",
    highway: "NH46",
    tollEstimate: "INR 100–200",
    description: "Travel from Vellore to Chennai Airport along the same 135 km route, approximately 2.5–3 hours by road via NH46. Our driver meets you at arrivals with a name board. Most popular for medical tourists heading to CMC Vellore. Flight tracking ensures no delays. Early morning departures from Vellore avoid both peak city traffic and afternoon glare.",
  },
  "cmc-vellore-to-chennai-airport-taxi": {
    distance: 135, duration: "2.5–3 hours",
    highway: "NH46",
    tollEstimate: "INR 100–200",
    description: "Travel from CMC Vellore to Chennai Airport along the same 135 km route, approximately 2.5–3 hours by road via NH46. Driver meets at arrivals, assists with luggage, and drops you at the hospital entrance. Available 24x7 including late night flights. Early morning departures from CMC Vellore avoid both peak city traffic and afternoon glare.",
  },
  "coonoor-to-coimbatore-taxi": {
    distance: 75, duration: "2–2.5 hours",
    highway: "NH181 / Nilgiri Ghat Road",
    tollEstimate: "INR 0–50",
    description: "Travel from Coonoor to Coimbatore along the same 75 km route, approximately 2–2.5 hours by road via NH181 / Nilgiri Ghat Road. The ghat road passes through Mettupalayam with views of tea estates and the toy train route. Best in an SUV for the winding roads. Early morning departures from Coonoor avoid both peak city traffic and afternoon glare.",
  },
  "kodaikanal-to-coimbatore-cab": {
    distance: 175, duration: "4–5 hours",
    highway: "NH44 / NH49",
    tollEstimate: "INR 100–200",
    description: "Travel from Kodaikanal to Coimbatore along the same 175 km route, approximately 4–5 hours by road via NH44 / NH49. The ghat section has beautiful hairpin bends through dense forests. Kodaikanal Lake, Pillar Rocks, and Bryant Park are popular attractions. Early morning departures from Kodaikanal avoid both peak city traffic and afternoon glare.",
  },
  "munnar-to-coimbatore-taxi": {
    distance: 160, duration: "4–5 hours",
    highway: "NH49 / SH17",
    tollEstimate: "INR 100–150",
    description: "Travel from Munnar to Coimbatore along the same 160 km route, approximately 4–5 hours by road via NH49 / SH17. The route via Udumalpet and Marayoor passes through sandalwood forests before ascending into Munnar's emerald tea plantations. Stunning Western Ghats scenery throughout. Early morning departures from Munnar avoid both peak city traffic and afternoon glare.",
  },
  "palakkad-to-coimbatore-taxi": {
    distance: 55, duration: "1–1.5 hours",
    highway: "NH544",
    tollEstimate: "INR 0–50",
    description: "Travel from Palakkad to Coimbatore along the same 55 km route, approximately 1–1.5 hours by road via NH544. This natural pass connects Tamil Nadu to Kerala. Quick and easy for business and family visits. Early morning departures from Palakkad avoid both peak city traffic and afternoon glare.",
  },
  "munnar-to-cochin-taxi": {
    distance: 130, duration: "3.5–4 hours",
    highway: "NH49",
    tollEstimate: "INR 50–100",
    description: "Travel from Munnar to Cochin along the same 130 km route, approximately 3.5–4 hours by road via NH49. Pass through Periyar wildlife area and spice gardens at Adimali. Munnar's misty hills and tea estates are a photographer's paradise. Early morning departures from Munnar avoid both peak city traffic and afternoon glare.",
  },
  "sabarimala-to-cochin-taxi": {
    distance: 175, duration: "4–5 hours",
    highway: "NH183 / MC Road",
    tollEstimate: "INR 100–150",
    description: "Travel from Sabarimala to Cochin along the same 175 km route, approximately 4–5 hours by road via NH183 / MC Road. Peak demand during Mandalam-Makaravilakku season (November-January). Our drivers know the forest road routes and parking areas well. Early morning departures from Sabarimala avoid both peak city traffic and afternoon glare.",
  },
  "kodaikanal-to-madurai-taxi": {
    distance: 120, duration: "3–4 hours",
    highway: "NH49 / SH72",
    tollEstimate: "INR 50–100",
    description: "Travel from Kodaikanal to Madurai along the same 120 km route, approximately 3–4 hours by road via NH49 / SH72. The ghat road from Batlagundu winds through 36 hairpin bends. Silver Cascade waterfall is a popular stop on the ascent. Book an SUV for the hill section. Early morning departures from Kodaikanal avoid both peak city traffic and afternoon glare.",
  },
  "tiruvannamalai-to-madurai-taxi": {
    distance: 340, duration: "6–7 hours",
    highway: "NH45 / SH4",
    tollEstimate: "INR 300–450",
    description: "Travel from Tiruvannamalai to Madurai along the same 340 km route, approximately 6–7 hours by road via NH45 / SH4. Both are major Shaivite pilgimage centers. The route passes through central Tamil Nadu's temple country. Early morning departures from Tiruvannamalai avoid both peak city traffic and afternoon glare.",
  },
  "vellore-to-madurai-taxi": {
    distance: 400, duration: "6–7 hours",
    highway: "NH44 / NH46",
    tollEstimate: "INR 350–500",
    description: "Travel from Vellore to Madurai along the same 400 km route, approximately 6–7 hours by road via NH44 / NH46. The NH44 and NH46 are well-maintained. Break the journey at Salem or Krishnagiri for refreshments. Early morning departures from Vellore avoid both peak city traffic and afternoon glare.",
  },
  "kodaikanal-to-dindigul-taxi": {
    distance: 95, duration: "2.5–3 hours",
    highway: "NH49 / Ghat Road",
    tollEstimate: "INR 0–50",
    description: "Travel from Kodaikanal to Dindigul along the same 95 km route, approximately 2.5–3 hours by road via NH49 / Ghat Road. The ghat road begins after Batlagundu with dramatic hairpin bends through dense forest. Silver Cascade waterfall is a must-stop. Early morning departures from Kodaikanal avoid both peak city traffic and afternoon glare.",
  },
  "munnar-to-ernakulam-taxi": {
    distance: 130, duration: "3.5–4 hours",
    highway: "NH49",
    tollEstimate: "INR 50–100",
    description: "Travel from Munnar to Ernakulam along the same 130 km route, approximately 3.5–4 hours by road via NH49. Ascend into Kerala's tea highlands through Kothamangalam and Adimali. The route passes through spice gardens and cardamom plantations. Early morning departures from Munnar avoid both peak city traffic and afternoon glare.",
  },
  "alleppey-to-kochi-taxi": {
    distance: 55, duration: "1.5–2 hours",
    highway: "NH66",
    tollEstimate: "INR 0–50",
    description: "Travel from Alleppey to Kochi along the same 55 km route, approximately 1.5–2 hours by road via NH66. Alleppey's famous houseboat cruises through backwaters start from the boat jetty. The NH66 route along the coast is scenic and quick. Early morning departures from Alleppey avoid both peak city traffic and afternoon glare.",
  },
  "wayanad-to-kozhikode-taxi": {
    distance: 85, duration: "2–3 hours",
    highway: "NH766",
    tollEstimate: "INR 0–50",
    description: "Travel from Wayanad to Kozhikode along the same 85 km route, approximately 2–3 hours by road via NH766. The ghat road through Thamarassery has 9 hairpin bends with viewpoints. Wayanad's wildlife sanctuaries and spice gardens are the reward. Early morning departures from Wayanad avoid both peak city traffic and afternoon glare.",
  },
  "coorg-to-mangalore-taxi": {
    distance: 135, duration: "3–3.5 hours",
    highway: "NH275",
    tollEstimate: "INR 50–100",
    description: "Travel from Coorg to Mangalore along the same 135 km route, approximately 3–3.5 hours by road via NH275. The route winds through areca nut and rubber plantations before reaching Kodagu's misty coffee estates. Early morning departures from Coorg avoid both peak city traffic and afternoon glare.",
  },
  "alleppey-to-munnar-taxi": {
    distance: 170, duration: "4.5–5 hours",
    highway: "SH39 / NH66",
    tollEstimate: "INR 50–100",
    description: "Travel from Alleppey to Munnar along the same 170 km route, approximately 4.5–5 hours by road via SH39 / NH66. The route passes through Kothamangalam and Chengannur. Perfect for a Kerala highlights tour. Early morning departures from Alleppey avoid both peak city traffic and afternoon glare.",
  },
  "thekkady-to-munnar-taxi": {
    distance: 90, duration: "3–3.5 hours",
    highway: "SH39",
    tollEstimate: "INR 0–50",
    description: "Travel from Thekkady to Munnar along the same 90 km route, approximately 3–3.5 hours by road via SH39. The route passes through Chinnakanal and Vandanmedu spice villages. Thekkady's Periyar Wildlife Sanctuary offers boat safaris and elephant sightings. Early morning departures from Thekkady avoid both peak city traffic and afternoon glare.",
  },
  "coorg-to-mysore-cab": {
    distance: 120, duration: "2.5–3 hours",
    highway: "SH88",
    tollEstimate: "INR 0–50",
    description: "Travel from Coorg to Mysore along the same 120 km route, approximately 2.5–3 hours by road via SH88. Visit Bylakuppe's Tibetan monastery en route. Coorg's coffee plantations, Abbey Falls, and misty mountain trails make it Karnataka's Scotland. Early morning departures from Coorg avoid both peak city traffic and afternoon glare.",
  },
  "ooty-to-mysore-taxi": {
    distance: 125, duration: "3–3.5 hours",
    highway: "NH766 / NH181",
    tollEstimate: "INR 50–100",
    description: "Travel from Ooty to Mysore along the same 125 km route, approximately 3–3.5 hours by road via NH766 / NH181. The route through Bandipur National Park may have time restrictions for wildlife. Ooty's botanical garden, Doddabetta Peak, and rose garden await. Early morning departures from Ooty avoid both peak city traffic and afternoon glare.",
  },
  "bangalore-to-ooty-taxi": {
    distance: 280, duration: "5–6 hours",
    highway: "NH181 / NH275",
    tollEstimate: "INR 200–300",
    description: "Travel from Bangalore to Ooty along the same 280 km route, approximately 5–6 hours by road via NH181 / NH275. The ghat road section from Ooty to Mettupalayam has spectacular views. The Mysore Expressway portion ensures a fast finish. Early morning departures from Bangalore avoid both peak city traffic and afternoon glare.",
  },
  "coimbatore-to-pondicherry-taxi": {
    distance: 385, duration: "6–7 hours",
    highway: "NH32 / NH44",
    tollEstimate: "INR 300–450",
    description: "Travel from Coimbatore to Pondicherry along the same 385 km route, approximately 6–7 hours by road via NH32 / NH44. The route passes through Villupuram, Salem, and Erode. A full-day drive connecting the French Quarter to the Manchester of South India. Early morning departures from Coimbatore avoid both peak city traffic and afternoon glare.",
  },
  "mahabalipuram-to-pondicherry-taxi": {
    distance: 95, duration: "1.5–2 hours",
    highway: "ECR",
    tollEstimate: "INR 0–50",
    description: "Travel from Mahabalipuram to Pondicherry along the same 95 km route, approximately 1.5–2 hours by road via ECR. Visit the UNESCO Shore Temple, Five Rathas, and Arjuna's Penance at Mahabalipuram. The beachfront road offers excellent Bay of Bengal views. Early morning departures from Mahabalipuram avoid both peak city traffic and afternoon glare.",
  },
  "salem-to-pondicherry-taxi": {
    distance: 215, duration: "4–5 hours",
    highway: "NH32 / NH44",
    tollEstimate: "INR 150–250",
    description: "Travel from Salem to Pondicherry along the same 215 km route, approximately 4–5 hours by road via NH32 / NH44. Salem is a major transit hub with connections to all parts of Tamil Nadu. The route passes through agricultural countryside. Early morning departures from Salem avoid both peak city traffic and afternoon glare.",
  },
  "kanyakumari-to-rameshwaram-taxi": {
    distance: 310, duration: "5–6 hours",
    highway: "NH49 / NH7",
    tollEstimate: "INR 200–350",
    description: "Travel from Kanyakumari to Rameshwaram along the same 310 km route, approximately 5–6 hours by road via NH49 / NH7. The route follows the Tamil Nadu coastline through Tuticorin. Watch the sunrise at Kanyakumari where three seas meet. Early morning departures from Kanyakumari avoid both peak city traffic and afternoon glare.",
  },
  "vellore-to-salem-taxi": {
    distance: 215, duration: "3.5–4 hours",
    highway: "NH44 / NH46",
    tollEstimate: "INR 200–300",
    description: "Travel from Vellore to Salem along the same 215 km route, approximately 3.5–4 hours by road via NH44 / NH46. Popular for hospital visits to CMC Vellore. The highway is smooth and well-maintained. Early morning departures from Vellore avoid both peak city traffic and afternoon glare.",
  },
  "yercaud-to-salem-taxi": {
    distance: 35, duration: "1–1.5 hours",
    highway: "Yercaud Ghat Road",
    tollEstimate: "INR 0",
    description: "Travel from Yercaud to Salem along the same 35 km route, approximately 1–1.5 hours by road via Yercaud Ghat Road. Just 20 hairpin bends take you to the scenic plateau at 1500m. Yercaud Lake, Lady's Seat viewpoint, and coffee estates make this a refreshing day trip. Early morning departures from Yercaud avoid both peak city traffic and afternoon glare.",
  },
  "arunachalam-to-tirupati-cab": {
    distance: 250, duration: "5–6 hours",
    highway: "NH48 / SH4",
    tollEstimate: "INR 200–300",
    description: "Travel from Arunachalam to Tirupati along the same 250 km route, approximately 5–6 hours by road via NH48 / SH4. Pass through Vellore. Popular with pilgrims covering multiple temple visits. Early morning departures from Arunachalam avoid both peak city traffic and afternoon glare.",
  },
  "coimbatore-to-trichy-taxi": {
    distance: 210, duration: "4–5 hours",
    highway: "NH44",
    tollEstimate: "INR 150–250",
    description: "Travel from Coimbatore to Trichy along the same 210 km route, approximately 4–5 hours by road via NH44. The route passes through the textile belt of central Tamil Nadu. Both cities are major educational and industrial centers. Early morning departures from Coimbatore avoid both peak city traffic and afternoon glare.",
  },
  "velankanni-to-trichy-cab": {
    distance: 130, duration: "2.5–3 hours",
    highway: "NH36",
    tollEstimate: "INR 50–100",
    description: "Travel from Velankanni to Trichy along the same 130 km route, approximately 2.5–3 hours by road via NH36. Pass through the Cauvery delta rice bowl. Peak pilgrimage during the September feast season. Early morning departures from Velankanni avoid both peak city traffic and afternoon glare.",
  },
  "kanyakumari-to-trivandrum-taxi": {
    distance: 90, duration: "2–2.5 hours",
    highway: "NH66",
    tollEstimate: "INR 50–100",
    description: "Travel from Kanyakumari to Trivandrum along the same 90 km route, approximately 2–2.5 hours by road via NH66. Watch the sunset where the Arabian Sea, Bay of Bengal, and Indian Ocean converge. Visit the Vivekananda Rock Memorial. Early morning departures from Kanyakumari avoid both peak city traffic and afternoon glare.",
  },
  "pondicherry-to-velankanni-cab": {
    distance: 165, duration: "3–3.5 hours",
    highway: "NH36 / ECR",
    tollEstimate: "INR 100–150",
    description: "Travel from Pondicherry to Velankanni along the same 165 km route, approximately 3–3.5 hours by road via NH36 / ECR. The route passes through Karaikal and Cuddalore. A journey connecting faith and French-colonial heritage. Early morning departures from Pondicherry avoid both peak city traffic and afternoon glare.",
  },
  "pondicherry-to-vellore-taxi": {
    distance: 155, duration: "3–3.5 hours",
    highway: "NH46 / NH32",
    tollEstimate: "INR 100–200",
    description: "Travel from Pondicherry to Vellore along the same 155 km route, approximately 3–3.5 hours by road via NH46 / NH32. The route passes through Tindivanam. Combine a hospital visit with a relaxing Pondicherry beach weekend. Early morning departures from Pondicherry avoid both peak city traffic and afternoon glare.",
  },
  "tiruvannamalai-to-vellore-cab": {
    distance: 85, duration: "1.5–2 hours",
    highway: "SH4",
    tollEstimate: "INR 0–50",
    description: "Travel from Tiruvannamalai to Vellore along the same 85 km route, approximately 1.5–2 hours by road via SH4. The state highway passes through Polur. Popular for combining a CMC visit with a temple pilgrimage. Early morning departures from Tiruvannamalai avoid both peak city traffic and afternoon glare.",
  },
  "chennai-to-villupuram-taxi": {
    distance: 160, duration: "2.5–3.5 hours",
    highway: "NH45",
    tollEstimate: "INR 100–200",
    description: "Travel from Chennai to Villupuram along the same 160 km route, approximately 2.5–3.5 hours by road via NH45. The highway is smooth and direct. Popular with passengers connecting from trains to Chennai airport or city. Early morning departures from Chennai avoid both peak city traffic and afternoon glare.",
  },
  "yelagiri-to-vellore-taxi": {
    distance: 95, duration: "2–2.5 hours",
    highway: "NH48 / SH4",
    tollEstimate: "INR 50–100",
    description: "Travel from Yelagiri to Vellore along the same 95 km route, approximately 2–2.5 hours by road via NH48 / SH4. The route passes through Jolarpet before the scenic ghat road climb with 14 hairpin bends up to the hill station at 1,100 metres elevation. Early morning departures from Yelagiri avoid both peak city traffic and afternoon glare.",
  },
  "sripuram-to-vellore-taxi": {
    distance: 12, duration: "30–45 minutes",
    description: "Travel from Sripuram to Vellore along the same 12 km route, approximately 30–45 minutes by road. The temple campus features a 1,500 kg gold-plated structure and is a major pilgrimage destination in Tamil Nadu. Early morning departures from Sripuram avoid both peak city traffic and afternoon glare.",
  },
  "kanyakumari-to-madurai-taxi": {
    distance: 245, duration: "4.5–5.5 hours",
    highway: "NH44 / NH87",
    tollEstimate: "INR 200–350",
    description: "Travel from Kanyakumari to Madurai along the same 245 km route, approximately 4.5–5.5 hours by road via NH44 / NH87. The route passes through Tirunelveli and Nagercoil. Visit the Vivekananda Rock Memorial and Thiruvalluvar Statue at Kanyakumari. Early morning departures from Kanyakumari avoid both peak city traffic and afternoon glare.",
  },
  "ooty-to-chennai-taxi": {
    distance: 560, duration: "9–10 hours",
    highway: "NH44 / NH181",
    tollEstimate: "INR 500–700",
    description: "Travel from Ooty to Chennai along the same 560 km route, approximately 9–10 hours by road via NH44 / NH181. The final 36 km ghat road features 36 hairpin bends. Start early morning for the best experience. SUV recommended for the mountain stretch. Early morning departures from Ooty avoid both peak city traffic and afternoon glare.",
  },
  "hosur-to-chennai-taxi": {
    distance: 310, duration: "4.5–5.5 hours",
    highway: "NH44",
    tollEstimate: "INR 300–450",
    description: "Travel from Hosur to Chennai along the same 310 km route, approximately 4.5–5.5 hours by road via NH44. Hosur is an industrial hub at the Karnataka-Tamil Nadu border with a growing IT sector. Best departure before 6 AM to avoid Chennai traffic. Early morning departures from Hosur avoid both peak city traffic and afternoon glare.",
  },
  "erode-to-coimbatore-taxi": {
    distance: 100, duration: "1.5–2 hours",
    highway: "NH544",
    tollEstimate: "INR 50–100",
    description: "Travel from Erode to Coimbatore along the same 100 km route, approximately 1.5–2 hours by road via NH544. The route along NH544 is well-maintained with good food stops at Tirupur and Perundurai. Early morning departures from Erode avoid both peak city traffic and afternoon glare.",
  },
  "palani-to-coimbatore-taxi": {
    distance: 110, duration: "2–2.5 hours",
    highway: "NH544 / NH83",
    tollEstimate: "INR 50–100",
    description: "Travel from Palani to Coimbatore along the same 110 km route, approximately 2–2.5 hours by road via NH544 / NH83. The route passes through Pollachi and Udumalpet with scenic views of the Western Ghats. Early morning departures from Palani avoid both peak city traffic and afternoon glare.",
  },
  "yercaud-to-chennai-taxi": {
    distance: 365, duration: "6–7 hours",
    highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "Travel from Yercaud to Chennai along the same 365 km route, approximately 6–7 hours by road via NH44. The route follows NH44 to Salem, then a scenic 32 km ghat road with 20 hairpin bends. Perfect weekend getaway from Chennai. Early morning departures from Yercaud avoid both peak city traffic and afternoon glare.",
  },
  "kumbakonam-to-trichy-taxi": {
    distance: 95, duration: "1.5–2 hours",
    highway: "NH36",
    tollEstimate: "INR 50–80",
    description: "Travel from Kumbakonam to Trichy along the same 95 km route, approximately 1.5–2 hours by road via NH36. The Cauvery delta route passes through rich paddy fields and ancient temple towns. Early morning departures from Kumbakonam avoid both peak city traffic and afternoon glare.",
  },
  "tirunelveli-to-madurai-taxi": {
    distance: 160, duration: "2.5–3 hours",
    highway: "NH44",
    tollEstimate: "INR 100–200",
    description: "Travel from Tirunelveli to Madurai along the same 160 km route, approximately 2.5–3 hours by road via NH44. The route via NH44 passes through Virudhunagar and Kovilpatti. A smooth highway drive through southern Tamil Nadu. Early morning departures from Tirunelveli avoid both peak city traffic and afternoon glare.",
  },
  "munnar-to-madurai-taxi": {
    distance: 160, duration: "4–5 hours",
    highway: "NH85 / SH17",
    tollEstimate: "INR 100–150",
    description: "Travel from Munnar to Madurai along the same 160 km route, approximately 4–5 hours by road via NH85 / SH17. The last 60 km winds through tea plantations and cardamom hills of Kerala. One of the most beautiful drives in South India. Early morning departures from Munnar avoid both peak city traffic and afternoon glare.",
  },
  "thanjavur-to-trichy-taxi": {
    distance: 60, duration: "1–1.5 hours",
    highway: "NH83",
    tollEstimate: "INR 30–50",
    description: "Travel from Thanjavur to Trichy along the same 60 km route, approximately 1–1.5 hours by road via NH83. The route runs through the fertile Cauvery delta, the rice bowl of Tamil Nadu. Early morning departures from Thanjavur avoid both peak city traffic and afternoon glare.",
  },
  "erode-to-salem-taxi": {
    distance: 65, duration: "1–1.5 hours",
    highway: "NH544",
    tollEstimate: "INR 30–50",
    description: "Travel from Erode to Salem along the same 65 km route, approximately 1–1.5 hours by road via NH544. The NH544 route is smooth and direct, passing through Sankagiri. Early morning departures from Erode avoid both peak city traffic and afternoon glare.",
  },
  "dindigul-to-madurai-taxi": {
    distance: 65, duration: "1–1.5 hours",
    highway: "NH44",
    tollEstimate: "INR 30–50",
    description: "Travel from Dindigul to Madurai along the same 65 km route, approximately 1–1.5 hours by road via NH44. The NH44 route is well-maintained. Gateway to Kodaikanal hill station via Dindigul. Early morning departures from Dindigul avoid both peak city traffic and afternoon glare.",
  },
  "thanjavur-to-chennai-taxi": {
    distance: 340, duration: "5.5–6.5 hours",
    highway: "NH45C / NH36",
    tollEstimate: "INR 300–450",
    description: "Travel from Thanjavur to Chennai along the same 340 km route, approximately 5.5–6.5 hours by road via NH45C / NH36. The route passes through Villupuram and Trichy. Visit the Brihadeeswarar Temple, a UNESCO World Heritage Site built by Raja Raja Chola. Early morning departures from Thanjavur avoid both peak city traffic and afternoon glare.",
  },
  "yercaud-to-bangalore-taxi": {
    distance: 230, duration: "4–5 hours",
    highway: "NH44",
    tollEstimate: "INR 200–350",
    description: "Travel from Yercaud to Bangalore along the same 230 km route, approximately 4–5 hours by road via NH44. After Salem, a scenic ghat road leads up the Shevaroy Hills. Popular weekend destination from Bangalore with pleasant year-round climate. Early morning departures from Yercaud avoid both peak city traffic and afternoon glare.",
  },
  "tirupur-to-coimbatore-taxi": {
    distance: 50, duration: "1–1.5 hours",
    highway: "NH544",
    tollEstimate: "INR 20–40",
    description: "Travel from Tirupur to Coimbatore along the same 50 km route, approximately 1–1.5 hours by road via NH544. The NH544 route is smooth and direct. Popular for business commuters in the textile industry corridor. Early morning departures from Tirupur avoid both peak city traffic and afternoon glare.",
  },
  "karur-to-trichy-taxi": {
    distance: 80, duration: "1.5–2 hours",
    highway: "NH44",
    tollEstimate: "INR 40–60",
    description: "Travel from Karur to Trichy along the same 80 km route, approximately 1.5–2 hours by road via NH44. The NH44 route passes through Manapparai. Karur is a key junction for routes to Coimbatore and Dindigul. Early morning departures from Karur avoid both peak city traffic and afternoon glare.",
  },
  "theni-to-madurai-taxi": {
    distance: 75, duration: "1.5–2 hours",
    highway: "NH85",
    tollEstimate: "INR 40–60",
    description: "Travel from Theni to Madurai along the same 75 km route, approximately 1.5–2 hours by road via NH85. The route via NH85 passes through Usilampatti. Theni district is known for cardamom, grapes, and proximity to the Western Ghats. Early morning departures from Theni avoid both peak city traffic and afternoon glare.",
  },
  "ooty-to-madurai-taxi": {
    distance: 290, duration: "5.5–6.5 hours",
    highway: "NH44 / NH181",
    tollEstimate: "INR 200–350",
    description: "Travel from Ooty to Madurai along the same 290 km route, approximately 5.5–6.5 hours by road via NH44 / NH181. The final stretch from Mettupalayam features the famous 36 hairpin bends. A scenic cross-Tamil Nadu drive through diverse landscapes. Early morning departures from Ooty avoid both peak city traffic and afternoon glare.",
  },
  "chidambaram-to-chennai-taxi": {
    distance: 245, duration: "4.5–5.5 hours",
    highway: "NH45C / ECR",
    tollEstimate: "INR 200–300",
    description: "Travel from Chidambaram to Chennai along the same 245 km route, approximately 4.5–5.5 hours by road via NH45C / ECR. The route via Pondicherry and Cuddalore follows the East Coast Road for part of the journey. Early morning departures from Chidambaram avoid both peak city traffic and afternoon glare.",
  },
  "erode-to-chennai-taxi": {
    distance: 400, duration: "6.5–7.5 hours",
    highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "Travel from Erode to Chennai along the same 400 km route, approximately 6.5–7.5 hours by road via NH44. The route follows NH44 through Vellore and Salem. Start early to cover this journey comfortably. Early morning departures from Erode avoid both peak city traffic and afternoon glare.",
  },
  "tirupati-to-vellore-taxi": {
    distance: 130, duration: "2.5–3 hours",
    highway: "NH46 / NH71",
    tollEstimate: "INR 100–200",
    description: "Travel from Tirupati to Vellore along the same 130 km route, approximately 2.5–3 hours by road via NH46 / NH71. The cross-border route enters Andhra Pradesh at Palamaner. Book in advance during festival season for guaranteed vehicles. Early morning departures from Tirupati avoid both peak city traffic and afternoon glare.",
  },
  "vellore-to-kanchipuram-taxi": {
    distance: 70, duration: "1.5–2 hours",
    highway: "NH48",
    tollEstimate: "INR 40–60",
    description: "Travel from Vellore to Kanchipuram along the same 70 km route, approximately 1.5–2 hours by road via NH48. The route via NH48 is smooth and direct through Ranipet. Early morning departures from Vellore avoid both peak city traffic and afternoon glare.",
  },
  "karaikudi-to-madurai-taxi": {
    distance: 90, duration: "1.5–2 hours",
    highway: "NH36",
    tollEstimate: "INR 50–80",
    description: "Travel from Karaikudi to Madurai along the same 90 km route, approximately 1.5–2 hours by road via NH36. Explore the heritage homes and taste authentic Chettinad cuisine. Early morning departures from Karaikudi avoid both peak city traffic and afternoon glare.",
  },
  "kanyakumari-to-nagercoil-taxi": {
    distance: 20, duration: "30–45 minutes",
    description: "Travel from Kanyakumari to Nagercoil along the same 20 km route, approximately 30–45 minutes by road. Visit the Vivekananda Rock Memorial, Thiruvalluvar Statue, and witness the confluence of three seas. Early morning departures from Kanyakumari avoid both peak city traffic and afternoon glare.",
  },
  "tuticorin-to-madurai-taxi": {
    distance: 140, duration: "2.5–3 hours",
    highway: "NH45B",
    tollEstimate: "INR 100–150",
    description: "Travel from Tuticorin to Madurai along the same 140 km route, approximately 2.5–3 hours by road via NH45B. The route passes through Kovilpatti. Tuticorin is known for its pearl diving heritage and Hare Island. Early morning departures from Tuticorin avoid both peak city traffic and afternoon glare.",
  },
  "rameswaram-to-trichy-taxi": {
    distance: 210, duration: "4–5 hours",
    highway: "NH36 / NH87",
    tollEstimate: "INR 150–250",
    description: "Travel from Rameswaram to Trichy along the same 210 km route, approximately 4–5 hours by road via NH36 / NH87. The journey ends with the iconic Pamban Bridge crossing to Rameswaram island. Visit the Ramanathaswamy Temple with its famous 22 sacred wells. Early morning departures from Rameswaram avoid both peak city traffic and afternoon glare.",
  },
  "karur-to-coimbatore-taxi": {
    distance: 165, duration: "2.5–3.5 hours",
    highway: "NH544 / NH44",
    tollEstimate: "INR 100–150",
    description: "Travel from Karur to Coimbatore along the same 165 km route, approximately 2.5–3.5 hours by road via NH544 / NH44. Karur is a major bus-body building and textile centre. The route follows NH544 and connects two of Tamil Nadu's industrial corridors. Early morning departures from Karur avoid both peak city traffic and afternoon glare.",
  },
  "dindigul-to-chennai-taxi": {
    distance: 410, duration: "6.5–7.5 hours",
    highway: "NH44",
    tollEstimate: "INR 350–500",
    description: "Travel from Dindigul to Chennai along the same 410 km route, approximately 6.5–7.5 hours by road via NH44. The route via NH44 passes through Vellore, Salem, and Namakkal. Dindigul is famous for its biryani and historical rock fort. Early morning departures from Dindigul avoid both peak city traffic and afternoon glare.",
  },
  "sivakasi-to-madurai-taxi": {
    distance: 70, duration: "1.5–2 hours",
    highway: "NH44",
    tollEstimate: "INR 40–60",
    description: "Travel from Sivakasi to Madurai along the same 70 km route, approximately 1.5–2 hours by road via NH44. Sivakasi produces 90% of India's fireworks and 80% of safety matches, making it a unique industrial destination. Early morning departures from Sivakasi avoid both peak city traffic and afternoon glare.",
  },
  "ramnad-to-madurai-taxi": {
    distance: 110, duration: "2–2.5 hours",
    highway: "NH36",
    tollEstimate: "INR 60–100",
    description: "Travel from Ramnad to Madurai along the same 110 km route, approximately 2–2.5 hours by road via NH36. Historic district with the Ramanathapuram Palace and rich Setupathi heritage. The route is part of the temple circuit pilgrimage. Early morning departures from Ramnad avoid both peak city traffic and afternoon glare.",
  },
  "palani-to-chennai-taxi": {
    distance: 470, duration: "7.5–8.5 hours",
    highway: "NH44 / NH83",
    tollEstimate: "INR 400–550",
    description: "Travel from Palani to Chennai along the same 470 km route, approximately 7.5–8.5 hours by road via NH44 / NH83. Via Salem and Dindigul. The hilltop temple at 1,500 feet can be reached by steps, winch, or ropeway. Early morning departures from Palani avoid both peak city traffic and afternoon glare.",
  },
  "tiruchendur-to-rameswaram-taxi": {
    distance: 170, duration: "3.5–4.5 hours",
    highway: "NH87 / SH44",
    tollEstimate: "INR 100–150",
    description: "Travel from Tiruchendur to Rameswaram along the same 170 km route, approximately 3.5–4.5 hours by road via NH87 / SH44. This route covers two of the six abodes of Lord Murugan, making it a key pilgrimage drive. Early morning departures from Tiruchendur avoid both peak city traffic and afternoon glare.",
  },
  "tiruchendur-to-tirunelveli-taxi": {
    distance: 55, duration: "1–1.5 hours",
    highway: "SH44",
    tollEstimate: "INR 20–40",
    description: "Travel from Tiruchendur to Tirunelveli along the same 55 km route, approximately 1–1.5 hours by road via SH44. Tiruchendur Subramania Swamy Temple is one of the Arupadai Veedu (six abodes) of Lord Murugan, situated on the Bay of Bengal coast. Early morning departures from Tiruchendur avoid both peak city traffic and afternoon glare.",
  },
  "tiruchendur-to-thoothukudi-taxi": {
    distance: 40, duration: "45 minutes–1 hour",
    description: "Travel from Tiruchendur to Thoothukudi along the same 40 km route, approximately 45 minutes–1 hour by road. The Subramania Swamy Temple is one of Tamil Nadu's most important Murugan temples. Early morning departures from Tiruchendur avoid both peak city traffic and afternoon glare.",
  },
  "tirunelveli-to-bangalore-taxi": {
    distance: 600, duration: "9–10 hours",
    highway: "NH44",
    tollEstimate: "INR 500–700",
    description: "Travel from Tirunelveli to Bangalore along the same 600 km route, approximately 9–10 hours by road via NH44. The route via Madurai follows NH44. Known for Nellaiappar Temple, banana cultivation, and proximity to Courtallam waterfalls. Early morning departures from Tirunelveli avoid both peak city traffic and afternoon glare.",
  },
  "tiruchendur-to-chennai-taxi": {
    distance: 600, duration: "9–10 hours",
    highway: "NH44 / SH44",
    tollEstimate: "INR 500–700",
    description: "Travel from Tiruchendur to Chennai along the same 600 km route, approximately 9–10 hours by road via NH44 / SH44. Home to the famous Subramania Swamy Temple on the Bay of Bengal coast. One of the six abodes of Lord Murugan. Early morning departures from Tiruchendur avoid both peak city traffic and afternoon glare.",
  },
  "pollachi-to-coimbatore-taxi": {
    distance: 40, duration: "45 minutes–1 hour",
    highway: "NH209",
    tollEstimate: "INR 20–30",
    description: "Travel from Pollachi to Coimbatore along the same 40 km route, approximately 45 minutes–1 hour by road via NH209. Pollachi is known as the coconut capital of Tamil Nadu. Early morning departures from Pollachi avoid both peak city traffic and afternoon glare.",
  },
  "mettupalayam-to-coimbatore-taxi": {
    distance: 35, duration: "40–50 minutes",
    highway: "NH181",
    tollEstimate: "INR 10–20",
    description: "Travel from Mettupalayam to Coimbatore along the same 35 km route, approximately 40–50 minutes by road via NH181. From here, the famous toy train climbs to Ooty through tea plantations. Early morning departures from Mettupalayam avoid both peak city traffic and afternoon glare.",
  },
  "palani-to-madurai-taxi": {
    distance: 120, duration: "2–2.5 hours",
    highway: "NH83",
    tollEstimate: "INR 60–100",
    description: "Travel from Palani to Madurai along the same 120 km route, approximately 2–2.5 hours by road via NH83. Palani is one of the six abodes of Lord Murugan. The hilltop temple is accessible by steps, winch system, or ropeway. Early morning departures from Palani avoid both peak city traffic and afternoon glare.",
  },
  "dindigul-to-coimbatore-taxi": {
    distance: 165, duration: "3–3.5 hours",
    highway: "NH544 / NH44",
    tollEstimate: "INR 100–150",
    description: "Travel from Dindigul to Coimbatore along the same 165 km route, approximately 3–3.5 hours by road via NH544 / NH44. The route connects two of Tamil Nadu's major commercial towns via Tirupur and Karur. Dindigul is the gateway to Kodaikanal. Early morning departures from Dindigul avoid both peak city traffic and afternoon glare.",
  },
  "nagercoil-to-chennai-taxi": {
    distance: 680, duration: "10–11 hours",
    highway: "NH44",
    tollEstimate: "INR 600–800",
    description: "Travel from Nagercoil to Chennai along the same 680 km route, approximately 10–11 hours by road via NH44. The route via Madurai follows NH44. Nagercoil is the gateway to Kanyakumari and is known for its Nagaraja Temple. Early morning departures from Nagercoil avoid both peak city traffic and afternoon glare.",
  },
  "nagercoil-to-madurai-taxi": {
    distance: 225, duration: "4–5 hours",
    highway: "NH44 / NH87",
    tollEstimate: "INR 200–300",
    description: "Travel from Nagercoil to Madurai along the same 225 km route, approximately 4–5 hours by road via NH44 / NH87. Nagercoil is the administrative capital of Kanyakumari district and a gateway to India's southernmost tip. Rich in temples and natural beauty. Early morning departures from Nagercoil avoid both peak city traffic and afternoon glare.",
  },


  // ── Hand-curated high-value pairs ─────────────────────────
  "chennai-to-hyderabad-taxi": {
    distance: 625, duration: "10–11 hours",
    highway: "NH16",
    tollEstimate: "INR 600–900",
    description: "The Chennai to Hyderabad corridor along NH16 (formerly NH5) passes through Nellore and Ongole. This is a long-haul route best suited for overnight or split-day travel. Multiple food and rest stops at Nellore, Ongole, and Vijayawada keep the journey manageable.",
  },
  "hyderabad-to-chennai-taxi": {
    distance: 625, duration: "10–11 hours",
    highway: "NH16",
    tollEstimate: "INR 600–900",
    description: "Travel from Hyderabad to Chennai along the same 625 km route, approximately 10–11 hours by road via NH16. This is a long-haul route best suited for overnight or split-day travel. Multiple food and rest stops at Nellore, Ongole, and Vijayawada keep the journey manageable. Early morning departures from Hyderabad avoid peak city traffic and afternoon glare.",
  },
  "chennai-to-cochin-taxi": {
    distance: 690, duration: "11–12 hours",
    highway: "NH544 / NH85",
    tollEstimate: "INR 600–850",
    description: "Travel from Chennai to Cochin via Coimbatore and Palakkad along NH544 then NH85 across the Western Ghats. Cross into Kerala past Walayar checkpoint. A long but scenic ride best done with an early-morning start.",
  },
  "cochin-to-chennai-taxi": {
    distance: 690, duration: "11–12 hours",
    highway: "NH544 / NH85",
    tollEstimate: "INR 600–850",
    description: "Travel from Cochin to Chennai along the same 690 km route, approximately 11–12 hours by road via NH544 / NH85. Cross into Kerala past Walayar checkpoint. A long but scenic ride best done with an early-morning start. Early morning departures from Cochin avoid peak city traffic and afternoon glare.",
  },
  "chennai-to-trivandrum-taxi": {
    distance: 745, duration: "12–13 hours",
    highway: "NH44 / NH66",
    tollEstimate: "INR 650–900",
    description: "The Chennai to Trivandrum drive is one of the longest South Indian routes. Travel via Madurai, Tirunelveli, and Kanyakumari district along NH44 then turn west on NH66. Recommend a two-day journey with an overnight halt at Madurai.",
  },
  "trivandrum-to-chennai-taxi": {
    distance: 745, duration: "12–13 hours",
    highway: "NH44 / NH66",
    tollEstimate: "INR 650–900",
    description: "Travel from Trivandrum to Chennai along the same 745 km route, approximately 12–13 hours by road via NH44 / NH66. Travel via Madurai, Tirunelveli, and Kanyakumari district along NH44 then turn west on NH66. Recommend a two-day journey with an overnight halt at Madurai. Early morning departures from Trivandrum avoid peak city traffic and afternoon glare.",
  },
  "bangalore-to-cochin-taxi": {
    distance: 565, duration: "9–10 hours",
    highway: "NH544 / NH85",
    tollEstimate: "INR 500–700",
    description: "Drive from Bangalore to Cochin via Salem, Coimbatore, and Palakkad. The route crosses the Western Ghats through dense forest near Walayar. Best to start before 5 AM to clear Bangalore city traffic.",
  },
  "cochin-to-bangalore-taxi": {
    distance: 565, duration: "9–10 hours",
    highway: "NH544 / NH85",
    tollEstimate: "INR 500–700",
    description: "Travel from Cochin to Bangalore along the same 565 km route, approximately 9–10 hours by road via NH544 / NH85. The route crosses the Western Ghats through dense forest near Walayar. Best to start before 5 AM to clear Bangalore city traffic. Early morning departures from Cochin avoid peak city traffic and afternoon glare.",
  },
  "bangalore-to-trivandrum-taxi": {
    distance: 715, duration: "12 hours",
    highway: "NH544 / NH66",
    tollEstimate: "INR 600–850",
    description: "Travel from Bangalore to Trivandrum via Coimbatore and Trichur. The Western Ghats stretch through Palakkad gap offers cool mountain views. A long route that benefits from a Coimbatore halt for fresh meals.",
  },
  "trivandrum-to-bangalore-taxi": {
    distance: 715, duration: "12 hours",
    highway: "NH544 / NH66",
    tollEstimate: "INR 600–850",
    description: "Travel from Trivandrum to Bangalore along the same 715 km route, approximately 12 hours by road via NH544 / NH66. The Western Ghats stretch through Palakkad gap offers cool mountain views. A long route that benefits from a Coimbatore halt for fresh meals. Early morning departures from Trivandrum avoid peak city traffic and afternoon glare.",
  },
  "bangalore-to-goa-taxi": {
    distance: 560, duration: "10 hours",
    highway: "NH48 / NH66",
    tollEstimate: "INR 500–700",
    description: "The Bangalore to Goa route via Hubli and Belgaum runs through the Deccan Plateau. The final stretch via NH66 along the Konkan coast is scenic but winding. Suitable for weekend beach getaways.",
  },
  "goa-to-bangalore-taxi": {
    distance: 560, duration: "10 hours",
    highway: "NH48 / NH66",
    tollEstimate: "INR 500–700",
    description: "Travel from Goa to Bangalore along the same 560 km route, approximately 10 hours by road via NH48 / NH66. The final stretch via NH66 along the Konkan coast is scenic but winding. Suitable for weekend beach getaways. Early morning departures from Goa avoid peak city traffic and afternoon glare.",
  },
  "coimbatore-to-trivandrum-taxi": {
    distance: 425, duration: "7–8 hours",
    highway: "NH544 / NH66",
    tollEstimate: "INR 400–600",
    description: "Coimbatore to Trivandrum cuts through the Palakkad gap of the Western Ghats. The Kerala stretch via Thrissur and Kollam runs along the coast for the final leg. Cool weather most of the year.",
  },
  "trivandrum-to-coimbatore-taxi": {
    distance: 425, duration: "7–8 hours",
    highway: "NH544 / NH66",
    tollEstimate: "INR 400–600",
    description: "Travel from Trivandrum to Coimbatore along the same 425 km route, approximately 7–8 hours by road via NH544 / NH66. The Kerala stretch via Thrissur and Kollam runs along the coast for the final leg. Cool weather most of the year. Early morning departures from Trivandrum avoid peak city traffic and afternoon glare.",
  },
  "madurai-to-trivandrum-taxi": {
    distance: 305, duration: "5–6 hours",
    highway: "NH44 / NH66",
    tollEstimate: "INR 250–400",
    description: "Travel from Madurai to Trivandrum via Tirunelveli and the western coastal road. Cross into Kerala past Aralvaimozhi gap. Convenient for connecting from Madurai Meenakshi Temple to Padmanabhaswamy Temple.",
  },
  "trivandrum-to-madurai-taxi": {
    distance: 305, duration: "5–6 hours",
    highway: "NH44 / NH66",
    tollEstimate: "INR 250–400",
    description: "Travel from Trivandrum to Madurai along the same 305 km route, approximately 5–6 hours by road via NH44 / NH66. Cross into Kerala past Aralvaimozhi gap. Convenient for connecting from Madurai Meenakshi Temple to Padmanabhaswamy Temple. Early morning departures from Trivandrum avoid peak city traffic and afternoon glare.",
  },
  "madurai-to-cochin-taxi": {
    distance: 360, duration: "6–7 hours",
    highway: "NH85",
    tollEstimate: "INR 300–500",
    description: "Drive from Madurai to Cochin via Theni and Kumily through the Periyar Tiger Reserve. The route crosses the Western Ghats with frequent wildlife sightings near Munnar. Spice plantations dot the descent into Kerala.",
  },
  "cochin-to-madurai-taxi": {
    distance: 360, duration: "6–7 hours",
    highway: "NH85",
    tollEstimate: "INR 300–500",
    description: "Travel from Cochin to Madurai along the same 360 km route, approximately 6–7 hours by road via NH85. The route crosses the Western Ghats with frequent wildlife sightings near Munnar. Spice plantations dot the descent into Kerala. Early morning departures from Cochin avoid peak city traffic and afternoon glare.",
  },
  "madurai-to-tirupati-taxi": {
    distance: 600, duration: "10 hours",
    highway: "NH44 / NH69",
    tollEstimate: "INR 550–750",
    description: "The Madurai to Tirupati pilgrimage route via Trichy, Vellore, and Chittoor is popular with families combining Meenakshi Temple and Tirumala darshan. Best to start before dawn for evening Tirupati arrival.",
  },
  "tirupati-to-madurai-taxi": {
    distance: 600, duration: "10 hours",
    highway: "NH44 / NH69",
    tollEstimate: "INR 550–750",
    description: "Travel from Tirupati to Madurai along the same 600 km route, approximately 10 hours by road via NH44 / NH69. Best to start before dawn for evening Tirupati arrival. Early morning departures from Tirupati avoid peak city traffic and afternoon glare.",
  },
  "hyderabad-to-tirupati-taxi": {
    distance: 565, duration: "9–10 hours",
    highway: "NH44 / NH69",
    tollEstimate: "INR 500–700",
    description: "Hyderabad to Tirupati passes through Kurnool and Chittoor along NH44. A common pilgrimage corridor with frequent fuel and food stops. Early departure recommended to reach Tirumala before darshan queues lengthen.",
  },
  "tirupati-to-hyderabad-taxi": {
    distance: 565, duration: "9–10 hours",
    highway: "NH44 / NH69",
    tollEstimate: "INR 500–700",
    description: "Travel from Tirupati to Hyderabad along the same 565 km route, approximately 9–10 hours by road via NH44 / NH69. A common pilgrimage corridor with frequent fuel and food stops. Early departure recommended to reach Tirumala before darshan queues lengthen. Early morning departures from Tirupati avoid peak city traffic and afternoon glare.",
  },
  "hyderabad-to-coimbatore-taxi": {
    distance: 880, duration: "14–15 hours",
    highway: "NH44",
    tollEstimate: "INR 750–1000",
    description: "A long inter-state run from Hyderabad to Coimbatore via Bangalore and Salem. Best done as a two-day journey with overnight stop at Bangalore or Salem. NH44 is well-maintained throughout.",
  },
  "coimbatore-to-hyderabad-taxi": {
    distance: 880, duration: "14–15 hours",
    highway: "NH44",
    tollEstimate: "INR 750–1000",
    description: "Travel from Coimbatore to Hyderabad along the same 880 km route, approximately 14–15 hours by road via NH44. Best done as a two-day journey with overnight stop at Bangalore or Salem. NH44 is well-maintained throughout. Early morning departures from Coimbatore avoid peak city traffic and afternoon glare.",
  },
  "chennai-to-mysore-taxi": {
    distance: 475, duration: "8–9 hours",
    highway: "NH48 / NH275",
    tollEstimate: "INR 450–600",
    description: "The Chennai to Mysore route goes via Bangalore on NH48 then onto the Bengaluru-Mysuru Expressway. The final stretch on the new expressway is one of India's smoothest highway sections.",
  },
  "mysore-to-chennai-taxi": {
    distance: 475, duration: "8–9 hours",
    highway: "NH48 / NH275",
    tollEstimate: "INR 450–600",
    description: "Travel from Mysore to Chennai along the same 475 km route, approximately 8–9 hours by road via NH48 / NH275. The final stretch on the new expressway is one of India's smoothest highway sections. Early morning departures from Mysore avoid peak city traffic and afternoon glare.",
  },
  "chennai-to-goa-taxi": {
    distance: 905, duration: "15–16 hours",
    highway: "NH48 / NH66",
    tollEstimate: "INR 850–1100",
    description: "Chennai to Goa is one of the longest pan-South-India routes. Plan as a two-day journey via Bangalore and the Konkan coast. The final stretch via NH66 hugs the Arabian Sea.",
  },
  "goa-to-chennai-taxi": {
    distance: 905, duration: "15–16 hours",
    highway: "NH48 / NH66",
    tollEstimate: "INR 850–1100",
    description: "Travel from Goa to Chennai along the same 905 km route, approximately 15–16 hours by road via NH48 / NH66. Plan as a two-day journey via Bangalore and the Konkan coast. The final stretch via NH66 hugs the Arabian Sea. Early morning departures from Goa avoid peak city traffic and afternoon glare.",
  },
  "salem-to-bangalore-taxi": {
    distance: 215, duration: "4 hours",
    highway: "NH44",
    tollEstimate: "INR 200–350",
    description: "The Salem to Bangalore route via Krishnagiri is a smooth NH44 drive through Tamil Nadu's western districts. Cross the Karnataka border near Hosur. Popular for industrial visitors and IT-corridor commuters.",
  },
  "bangalore-to-salem-taxi": {
    distance: 215, duration: "4 hours",
    highway: "NH44",
    tollEstimate: "INR 200–350",
    description: "Travel from Bangalore to Salem along the same 215 km route, approximately 4 hours by road via NH44. Cross the Karnataka border near Hosur. Popular for industrial visitors and IT-corridor commuters. Early morning departures from Bangalore avoid peak city traffic and afternoon glare.",
  },
  "salem-to-tirupati-taxi": {
    distance: 415, duration: "7 hours",
    highway: "NH44 / NH69",
    tollEstimate: "INR 400–550",
    description: "Drive from Salem to Tirupati via Krishnagiri, Vellore, and Chittoor. The route bypasses Chennai entirely. Many pilgrim families prefer this for direct Tirumala darshan access.",
  },
  "tirupati-to-salem-taxi": {
    distance: 415, duration: "7 hours",
    highway: "NH44 / NH69",
    tollEstimate: "INR 400–550",
    description: "Travel from Tirupati to Salem along the same 415 km route, approximately 7 hours by road via NH44 / NH69. The route bypasses Chennai entirely. Many pilgrim families prefer this for direct Tirumala darshan access. Early morning departures from Tirupati avoid peak city traffic and afternoon glare.",
  },
  "trichy-to-trivandrum-taxi": {
    distance: 480, duration: "8 hours",
    highway: "NH44 / NH66",
    tollEstimate: "INR 450–600",
    description: "Trichy to Trivandrum via Madurai and Tirunelveli ends on the western coastal road. Suitable for connecting Rock Fort Temple with Padmanabhaswamy Temple visits.",
  },
  "trivandrum-to-trichy-taxi": {
    distance: 480, duration: "8 hours",
    highway: "NH44 / NH66",
    tollEstimate: "INR 450–600",
    description: "Travel from Trivandrum to Trichy along the same 480 km route, approximately 8 hours by road via NH44 / NH66. Suitable for connecting Rock Fort Temple with Padmanabhaswamy Temple visits. Early morning departures from Trivandrum avoid peak city traffic and afternoon glare.",
  },
  "trichy-to-hyderabad-taxi": {
    distance: 950, duration: "15 hours",
    highway: "NH44",
    tollEstimate: "INR 850–1100",
    description: "An extended overland route from Trichy to Hyderabad via Bangalore. Plan a two-day journey with overnight stop at Bangalore or Anantapur. NH44 is the spine for the entire route.",
  },
  "hyderabad-to-trichy-taxi": {
    distance: 950, duration: "15 hours",
    highway: "NH44",
    tollEstimate: "INR 850–1100",
    description: "Travel from Hyderabad to Trichy along the same 950 km route, approximately 15 hours by road via NH44. Plan a two-day journey with overnight stop at Bangalore or Anantapur. NH44 is the spine for the entire route. Early morning departures from Hyderabad avoid peak city traffic and afternoon glare.",
  },
  "madurai-to-hyderabad-taxi": {
    distance: 1050, duration: "16–17 hours",
    highway: "NH44",
    tollEstimate: "INR 950–1200",
    description: "Madurai to Hyderabad is a major pan-south overland run via Bangalore. Typically done as a 2-day journey with an overnight rest. NH44 covers the full route. Suitable for relocations and bulk family travel.",
  },
  "hyderabad-to-madurai-taxi": {
    distance: 1050, duration: "16–17 hours",
    highway: "NH44",
    tollEstimate: "INR 950–1200",
    description: "Travel from Hyderabad to Madurai along the same 1050 km route, approximately 16–17 hours by road via NH44. Typically done as a 2-day journey with an overnight rest. NH44 covers the full route. Suitable for relocations and bulk family travel. Early morning departures from Hyderabad avoid peak city traffic and afternoon glare.",
  },
  "kanyakumari-to-chennai-taxi": {
    distance: 705, duration: "11–12 hours",
    highway: "NH44",
    tollEstimate: "INR 650–900",
    description: "The Kanyakumari to Chennai route runs the length of Tamil Nadu via Madurai and Trichy along NH44. Popular for pilgrim-tour return legs. Best to depart Kanyakumari in mid-morning to reach Chennai by night.",
  },
  "chennai-to-kanyakumari-taxi": {
    distance: 705, duration: "11–12 hours",
    highway: "NH44",
    tollEstimate: "INR 650–900",
    description: "Travel from Chennai to Kanyakumari along the same 705 km route, approximately 11–12 hours by road via NH44. Popular for pilgrim-tour return legs. Best to depart Kanyakumari in mid-morning to reach Chennai by night. Early morning departures from Chennai avoid peak city traffic and afternoon glare.",
  },
  "kanyakumari-to-cochin-taxi": {
    distance: 320, duration: "6 hours",
    highway: "NH66",
    tollEstimate: "INR 300–450",
    description: "Travel from Kanyakumari to Cochin along the Kerala coast on NH66. The route passes through Trivandrum, Kollam, and Alleppey backwaters. Beaches and lagoons line most of the highway.",
  },
  "cochin-to-kanyakumari-taxi": {
    distance: 320, duration: "6 hours",
    highway: "NH66",
    tollEstimate: "INR 300–450",
    description: "Travel from Cochin to Kanyakumari along the same 320 km route, approximately 6 hours by road via NH66. The route passes through Trivandrum, Kollam, and Alleppey backwaters. Beaches and lagoons line most of the highway. Early morning departures from Cochin avoid peak city traffic and afternoon glare.",
  },
  "vijayawada-to-tirupati-taxi": {
    distance: 380, duration: "6–7 hours",
    highway: "NH16 / NH69",
    tollEstimate: "INR 350–500",
    description: "Drive from Vijayawada to Tirupati via Ongole and Chittoor. The route ends with a climb to Tirumala via the seven hills. A pilgrim favorite for Andhra Pradesh families.",
  },
  "tirupati-to-vijayawada-taxi": {
    distance: 380, duration: "6–7 hours",
    highway: "NH16 / NH69",
    tollEstimate: "INR 350–500",
    description: "Travel from Tirupati to Vijayawada along the same 380 km route, approximately 6–7 hours by road via NH16 / NH69. The route ends with a climb to Tirumala via the seven hills. A pilgrim favorite for Andhra Pradesh families. Early morning departures from Tirupati avoid peak city traffic and afternoon glare.",
  },
  "vijayawada-to-chennai-taxi": {
    distance: 440, duration: "7–8 hours",
    highway: "NH16",
    tollEstimate: "INR 400–550",
    description: "The Vijayawada to Chennai stretch along NH16 is a smooth expressway drive through Ongole and Nellore. AP coast road with toll-plaza density. Suitable for business and family travel.",
  },
  "chennai-to-vijayawada-taxi": {
    distance: 440, duration: "7–8 hours",
    highway: "NH16",
    tollEstimate: "INR 400–550",
    description: "Travel from Chennai to Vijayawada along the same 440 km route, approximately 7–8 hours by road via NH16. AP coast road with toll-plaza density. Suitable for business and family travel. Early morning departures from Chennai avoid peak city traffic and afternoon glare.",
  },
  "vijayawada-to-bangalore-taxi": {
    distance: 600, duration: "10 hours",
    highway: "NH44",
    tollEstimate: "INR 550–750",
    description: "Travel from Vijayawada to Bangalore via Kurnool and Anantapur on NH44. Long but well-maintained highway. A common Telangana-Andhra to Karnataka relocation route.",
  },
  "bangalore-to-vijayawada-taxi": {
    distance: 600, duration: "10 hours",
    highway: "NH44",
    tollEstimate: "INR 550–750",
    description: "Travel from Bangalore to Vijayawada along the same 600 km route, approximately 10 hours by road via NH44. Long but well-maintained highway. A common Telangana-Andhra to Karnataka relocation route. Early morning departures from Bangalore avoid peak city traffic and afternoon glare.",
  },
  "chennai-airport-to-tirupati-taxi": {
    distance: 145, duration: "3 hours",
    highway: "NH716",
    tollEstimate: "INR 150–250",
    description: "Direct airport-to-Tirumala route — no city transit needed. From Chennai Airport, head north on NH716 via Tiruttani. Ideal for fliers continuing straight to darshan.",
  },
  "tirupati-to-chennai-airport-taxi": {
    distance: 145, duration: "3 hours",
    highway: "NH716",
    tollEstimate: "INR 150–250",
    description: "Travel from Tirupati to Chennai Airport along the same 145 km route, approximately 3 hours by road via NH716. From Chennai Airport, head north on NH716 via Tiruttani. Ideal for fliers continuing straight to darshan. Early morning departures from Tirupati avoid peak city traffic and afternoon glare.",
  },
  "chennai-airport-to-pondicherry-taxi": {
    distance: 145, duration: "3 hours",
    highway: "NH32 / ECR",
    tollEstimate: "INR 100–200",
    description: "Skip the Chennai city transit — direct from MAA airport to Pondicherry via NH32. The route bypasses central Chennai entirely. Recommended for short Puducherry weekend trips.",
  },
  "pondicherry-to-chennai-airport-taxi": {
    distance: 145, duration: "3 hours",
    highway: "NH32 / ECR",
    tollEstimate: "INR 100–200",
    description: "Travel from Pondicherry to Chennai Airport along the same 145 km route, approximately 3 hours by road via NH32 / ECR. The route bypasses central Chennai entirely. Recommended for short Puducherry weekend trips. Early morning departures from Pondicherry avoid peak city traffic and afternoon glare.",
  },
  "chennai-airport-to-bangalore-taxi": {
    distance: 355, duration: "6–7 hours",
    highway: "NH48",
    tollEstimate: "INR 400–600",
    description: "Direct outstation transfer from MAA to Bangalore via NH48 through Vellore. Skip the airport-to-city hop entirely. Common for fliers continuing to Bangalore for work or family.",
  },
  "bangalore-to-chennai-airport-taxi": {
    distance: 355, duration: "6–7 hours",
    highway: "NH48",
    tollEstimate: "INR 400–600",
    description: "Travel from Bangalore to Chennai Airport along the same 355 km route, approximately 6–7 hours by road via NH48. Skip the airport-to-city hop entirely. Common for fliers continuing to Bangalore for work or family. Early morning departures from Bangalore avoid peak city traffic and afternoon glare.",
  },
  "bangalore-airport-to-mysore-taxi": {
    distance: 200, duration: "3.5–4 hours",
    highway: "NH275",
    tollEstimate: "INR 200–300",
    description: "From BLR Kempegowda Airport directly to Mysore via the Bengaluru-Mysuru Expressway. Bypass Bangalore city completely. A smooth highway transfer for weekend Mysore Palace visitors.",
  },
  "mysore-to-bangalore-airport-taxi": {
    distance: 200, duration: "3.5–4 hours",
    highway: "NH275",
    tollEstimate: "INR 200–300",
    description: "Travel from Mysore to Bangalore Airport along the same 200 km route, approximately 3.5–4 hours by road via NH275. Bypass Bangalore city completely. A smooth highway transfer for weekend Mysore Palace visitors. Early morning departures from Mysore avoid peak city traffic and afternoon glare.",
  },
  "bangalore-airport-to-coorg-taxi": {
    distance: 285, duration: "5–6 hours",
    highway: "NH275 / SH88",
    tollEstimate: "INR 250–400",
    description: "Direct from BLR to Coorg through Mysore and Kushalnagar. Skip Bangalore city traffic entirely. Ideal for honeymooners and weekend hill-station getaways landing at BLR.",
  },
  "coorg-to-bangalore-airport-taxi": {
    distance: 285, duration: "5–6 hours",
    highway: "NH275 / SH88",
    tollEstimate: "INR 250–400",
    description: "Travel from Coorg to Bangalore Airport along the same 285 km route, approximately 5–6 hours by road via NH275 / SH88. Skip Bangalore city traffic entirely. Ideal for honeymooners and weekend hill-station getaways landing at BLR. Early morning departures from Coorg avoid peak city traffic and afternoon glare.",
  },
};

// City-specific data for enriched city pages
export interface CityInfo {
  pickupPoints: string[];
  popularRoutes: { name: string; href: string }[];
  description: string;
}

export const CITY_DATA: Record<string, CityInfo> = {
  chennai: {
    pickupPoints: ["Chennai Central Railway Station", "Chennai Egmore", "Chennai International Airport (MAA)", "T. Nagar Bus Stand", "Koyambedu CMBT Bus Terminus"],
    popularRoutes: [
      { name: "Chennai to Bangalore", href: "/chennai-to-bangalore-taxi" },
      { name: "Chennai to Pondicherry", href: "/chennai-to-pondicherry-taxi" },
      { name: "Chennai to Vellore", href: "/chennai-to-vellore-taxi" },
      { name: "Chennai to Tirupati", href: "/chennai-to-tirupati-taxi" },
    ],
    description: "Chennai is Tamil Nadu's capital and South India's largest metro, serving as a gateway for intercity travel. Our drop taxi service covers all Chennai zones — from T. Nagar and Anna Nagar to the IT corridors of OMR and Sholinganallur. Airport pickups and railway station drops are available 24x7.",
  },
  bangalore: {
    pickupPoints: ["Kempegowda International Airport (BLR)", "Bangalore City Railway Station (Majestic)", "Majestic Bus Stand (KSRTC)", "Whitefield IT Hub", "Electronic City"],
    popularRoutes: [
      { name: "Bangalore to Chennai", href: "/bangalore-to-chennai-taxi" },
      { name: "Bangalore to Mysore", href: "/bangalore-to-mysore-taxi" },
      { name: "Bangalore to Coorg", href: "/bangalore-to-coorg-taxi" },
      { name: "Bangalore to Tirupati", href: "/bangalore-to-tirupati-taxi" },
    ],
    description: "Bangalore is India's IT capital and Karnataka's largest city. Our one way taxi fleet operates across all Bangalore zones — from Koramangala and Indiranagar to the tech parks of Whitefield and Electronic City. Frequent routes connect to Mysore, Chennai, Hyderabad, and hill stations.",
  },
  coimbatore: {
    pickupPoints: ["Coimbatore Junction Railway Station", "Coimbatore International Airport (CJB)", "Gandhipuram Bus Stand", "Ukkadam Bus Stand", "Singanallur"],
    popularRoutes: [
      { name: "Coimbatore to Chennai", href: "/coimbatore-to-chennai-taxi" },
      { name: "Coimbatore to Ooty", href: "/coimbatore-to-ooty-taxi" },
      { name: "Coimbatore to Munnar", href: "/coimbatore-to-munnar-taxi" },
      { name: "Coimbatore to Madurai", href: "/coimbatore-to-madurai-taxi" },
    ],
    description: "Coimbatore, the Manchester of South India, is a major industrial and textile hub in western Tamil Nadu. Our taxi service connects Coimbatore to hill stations like Ooty, Kodaikanal, and Munnar as well as major cities. Gateway to the Nilgiris and Western Ghats tourism circuit.",
  },
  madurai: {
    pickupPoints: ["Madurai Junction Railway Station", "Madurai Airport (IXM)", "Periyar Bus Stand", "Mattuthavani Bus Terminal", "Meenakshi Temple Area"],
    popularRoutes: [
      { name: "Madurai to Chennai", href: "/madurai-to-chennai-taxi" },
      { name: "Madurai to Rameswaram", href: "/madurai-to-rameswaram-taxi" },
      { name: "Madurai to Kodaikanal", href: "/madurai-to-kodaikanal-taxi" },
      { name: "Madurai to Bangalore", href: "/madurai-to-bangalore-taxi" },
    ],
    description: "Madurai is Tamil Nadu's cultural capital, home to the 2,500-year-old Meenakshi Amman Temple. Our drop taxi service operates from all Madurai hubs including the airport, railway station, and bus terminals. Popular for pilgrimages to Rameswaram and hill trips to Kodaikanal.",
  },
  trichy: {
    pickupPoints: ["Trichy Junction Railway Station", "Trichy International Airport (TRZ)", "Central Bus Stand", "Chathiram Bus Stand", "Srirangam Temple Area"],
    popularRoutes: [
      { name: "Trichy to Chennai", href: "/trichy-to-chennai-taxi" },
      { name: "Trichy to Madurai", href: "/trichy-to-madurai-taxi" },
      { name: "Trichy to Velankanni", href: "/trichy-to-velankanni-cab" },
      { name: "Trichy to Coimbatore", href: "/trichy-to-coimbatore-taxi" },
    ],
    description: "Trichy (Tiruchirappalli) is a central Tamil Nadu hub famous for the Rock Fort Temple and Srirangam — the world's largest functioning Hindu temple. Our taxi service connects Trichy to all major cities and pilgrimage centers. An important transit point for southern Tamil Nadu travel.",
  },
  salem: {
    pickupPoints: ["Salem Junction Railway Station", "Salem New Bus Stand", "Salem Old Bus Stand", "Steel Plant Area", "Omalur Junction"],
    popularRoutes: [
      { name: "Salem to Chennai", href: "/salem-to-chennai-taxi" },
      { name: "Salem to Coimbatore", href: "/salem-to-coimbatore-taxi" },
      { name: "Salem to Yercaud", href: "/salem-to-yercaud-taxi" },
      { name: "Salem to Trichy", href: "/salem-to-trichy-taxi" },
    ],
    description: "Salem is a major transit hub at the crossroads of Tamil Nadu, connecting north-south and east-west highway corridors. Known for steel, textiles, and mangoes. Our taxi service provides quick access to Yercaud hill station and connects Salem to all major Tamil Nadu cities.",
  },
  vellore: {
    pickupPoints: ["Katpadi Junction Railway Station", "Vellore Bus Stand", "CMC Hospital Campus", "Vellore Fort Area", "Vellore IT Corridor"],
    popularRoutes: [
      { name: "Vellore to Chennai", href: "/vellore-to-chennai-taxi" },
      { name: "Vellore to Bangalore", href: "/vellore-to-bangalore-taxi" },
      { name: "Vellore to Tiruvannamalai", href: "/vellore-to-tiruvannamalai-cab" },
      { name: "Vellore to Pondicherry", href: "/vellore-to-pondicherry-taxi" },
    ],
    description: "Vellore is North Tamil Nadu's major city, world-renowned for CMC (Christian Medical College) Hospital. Thousands of medical tourists arrive daily for treatment. Our taxi service specializes in hospital transfers from Chennai Airport, Katpadi Railway Station, and Bangalore.",
  },
  pondicherry: {
    pickupPoints: ["Pondicherry Bus Stand", "Pondicherry Railway Station", "Auroville Entrance", "White Town / French Quarter", "Promenade Beach Area"],
    popularRoutes: [
      { name: "Pondicherry to Chennai", href: "/pondicherry-to-chennai-taxi" },
      { name: "Pondicherry to Bangalore", href: "/pondicherry-to-bangalore-taxi" },
      { name: "Pondicherry to Mahabalipuram", href: "/pondicherry-to-mahabalipuram-taxi" },
      { name: "Pondicherry to Madurai", href: "/pondicherry-to-madurai-taxi" },
    ],
    description: "Pondicherry (Puducherry) is a charming coastal union territory with French-colonial heritage, Auroville, and stunning beaches. Our taxi service connects Pondicherry to Chennai via the scenic East Coast Road and to all South Indian cities. Peak demand on weekends and holidays.",
  },
  hyderabad: {
    pickupPoints: ["Rajiv Gandhi International Airport (HYD)", "Secunderabad Railway Station", "Hyderabad Deccan Station (Nampally)", "MGBS Bus Station", "HITEC City"],
    popularRoutes: [
      { name: "Hyderabad to Vijayawada", href: "/hyderabad-to-vijayawada-taxi" },
      { name: "Hyderabad to Bangalore", href: "/hyderabad-to-bangalore-taxi" },
    ],
    description: "Hyderabad is Telangana's capital and a major IT hub. Our one way taxi service connects Hyderabad to Vijayawada, Bangalore, and other South Indian cities. Airport pickups from Shamshabad and drops across the city including HITEC City, Gachibowli, and Secunderabad.",
  },
  trivandrum: {
    pickupPoints: ["Trivandrum International Airport (TRV)", "Trivandrum Central Railway Station", "Thampanoor Bus Stand", "Technopark IT Campus", "Kovalam Beach Area"],
    popularRoutes: [
      { name: "Trivandrum to Kanyakumari", href: "/trivandrum-to-kanyakumari-taxi" },
    ],
    description: "Trivandrum (Thiruvananthapuram) is Kerala's capital with historic temples, beaches, and the growing Technopark IT corridor. Our taxi service provides airport transfers and intercity rides to Kanyakumari, Alleppey, and across Kerala and Tamil Nadu.",
  },
  hosur: {
    pickupPoints: ["Hosur Bus Stand", "Hosur Railway Station", "SIPCOT Industrial Area", "Hosur IT Park", "Hosur Main Road Junction"],
    popularRoutes: [
      { name: "Bangalore to Hosur", href: "/bangalore-to-hosur-taxi" },
    ],
    description: "Hosur is an industrial town on the Karnataka-Tamil Nadu border, often called the satellite city of Bangalore. Our taxi service connects Hosur to Bangalore, Chennai, and other cities. Popular with IT commuters and industrial visitors.",
  },
  erode: {
    pickupPoints: ["Erode Junction Railway Station", "Erode Bus Stand", "Perundurai Industrial Area", "Bhavani Junction", "Gobichettipalayam"],
    popularRoutes: [
      { name: "Salem to Coimbatore via Erode", href: "/salem-to-coimbatore-taxi" },
      { name: "Coimbatore to Salem via Erode", href: "/coimbatore-to-salem-taxi" },
    ],
    description: "Erode is a major textile and turmeric trading center in western Tamil Nadu, located between Coimbatore and Salem on NH44. Our taxi service covers local and outstation trips from Erode, Perundurai, Bhavani, and Gobichettipalayam.",
  },
  dindigul: {
    pickupPoints: ["Dindigul Junction Railway Station", "Dindigul Bus Stand", "Dindigul Fort Area", "Palani Road Junction", "Oddanchatram"],
    popularRoutes: [
      { name: "Dindigul to Kodaikanal", href: "/dindigul-to-kodaikanal-taxi" },
      { name: "Madurai to Coimbatore via Dindigul", href: "/madurai-to-coimbatore-taxi" },
    ],
    description: "Dindigul is the gateway to Kodaikanal hill station and famous for its biryani and lock-making industry. Located between Madurai and Coimbatore on NH44. Our taxi service provides the quickest transfers to Kodaikanal's ghat road.",
  },
  kanchipuram: {
    pickupPoints: ["Kanchipuram Bus Stand", "Kanchipuram Railway Station", "Ekambareswarar Temple Area", "Silk Weaving Center", "Enathur Junction"],
    popularRoutes: [
      { name: "Chennai to Kanchipuram", href: "/chennai-to-kanchipuram-taxi" },
    ],
    description: "Kanchipuram is the City of Thousand Temples and world-famous for Kanchipuram silk sarees. Located just 75 km from Chennai, it's one of the seven Moksha-giving sacred cities. Our taxi service connects Kanchipuram to Chennai, Vellore, and Pondicherry.",
  },
  kumbakonam: {
    pickupPoints: ["Kumbakonam Railway Station", "Kumbakonam Bus Stand", "Mahamaham Tank Area", "Darasuram (nearby)", "Swamimalai (nearby)"],
    popularRoutes: [
      { name: "Chennai to Kumbakonam", href: "/chennai-to-kumbakonam-taxi" },
    ],
    description: "Kumbakonam is the temple town of the Cauvery delta, known as the City of Temples with over 180 temples. Famous for the Mahamaham festival held every 12 years. Our taxi service covers Kumbakonam and nearby Thanjavur, Darasuram, and Swamimalai temple circuit.",
  },
  kolkata: {
    pickupPoints: ["Howrah Station", "Sealdah Station", "Netaji Subhas Chandra Bose Airport (CCU)", "Esplanade Bus Stand", "New Town Rajarhat"],
    popularRoutes: [],
    description: "Kolkata, the cultural capital of India, is the gateway to Eastern India. Our taxi service connects Kolkata to major destinations across West Bengal and beyond.",
  },
  mysore: {
    pickupPoints: ["Mysore Junction Railway Station", "Mysore KSRTC Bus Stand", "Mysore Airport (MYQ)", "Chamundi Hill Gate"],
    popularRoutes: [
      { name: "Mysore to Bangalore", href: "/mysore-to-bangalore-taxi" },
      { name: "Mysore to Coorg", href: "/mysore-to-coorg-cab" },
      { name: "Mysore to Ooty", href: "/mysore-to-ooty-taxi" },
    ],
    description: "Mysore (Mysuru), the City of Palaces, is Karnataka's cultural capital. Our taxi service covers all Mysore zones and connects to Bangalore, Coorg, Ooty, and other popular destinations.",
  },
  tirupati: {
    pickupPoints: ["Tirupati Railway Station", "Tirupati Airport (TIR)", "Alipiri Footpath Starting Point", "APSRTC Bus Stand"],
    popularRoutes: [
      { name: "Tirupati to Chennai", href: "/tirupati-to-chennai-taxi" },
      { name: "Tirupati to Arunachalam", href: "/tirupati-to-arunachalam-cab" },
    ],
    description: "Tirupati is home to the world-famous Tirumala Venkateswara Temple, the most visited religious site in the world. Our taxi service handles pilgrim transfers from airport, railway station, and intercity routes.",
  },
  kanyakumari: {
    pickupPoints: ["Kanyakumari Railway Station", "Kanyakumari Bus Stand", "Vivekananda Rock Memorial Jetty"],
    popularRoutes: [
      { name: "Kanyakumari to Rameshwaram", href: "/rameshwaram-to-kanyakumari-taxi" },
    ],
    description: "Kanyakumari, the southernmost tip of mainland India, where the Arabian Sea, Bay of Bengal, and Indian Ocean meet. A major pilgrimage and tourist destination with the Vivekananda Rock Memorial.",
  },
  nagercoil: {
    pickupPoints: ["Nagercoil Junction Railway Station", "Nagercoil Bus Stand", "Nagercoil Town"],
    popularRoutes: [
      { name: "Nagercoil to Kanyakumari", href: "/nagercoil-to-kanyakumari-taxi" },
    ],
    description: "Nagercoil is the administrative headquarters of Kanyakumari district, nestled between the Western Ghats and the coast. Known for the Nagaraja Temple and as a gateway to Kanyakumari and Padmanabhapuram Palace.",
  },
  thanjavur: {
    pickupPoints: ["Thanjavur Junction Railway Station", "Thanjavur New Bus Stand", "Brihadeeswarar Temple Gate"],
    popularRoutes: [
      { name: "Thanjavur to Trichy", href: "/trichy-to-thanjavur-taxi" },
    ],
    description: "Thanjavur (Tanjore), the rice bowl of Tamil Nadu and home to the UNESCO World Heritage Brihadeeswarar Temple. A cultural capital of Chola dynasty heritage with art, architecture, and classical dance traditions.",
  },
  yelagiri: {
    pickupPoints: ["Yelagiri Bus Stand", "Jolarpet Railway Station (nearest)"],
    popularRoutes: [
      { name: "Yelagiri to Vellore", href: "/vellore-to-yelagiri-taxi" },
    ],
    description: "Yelagiri Hills is a serene hill station at 1,100 metres in Tirupattur district. Known for rose gardens, lakes, trekking trails, and adventure sports. A popular weekend getaway from Chennai and Bangalore.",
  },


  // ── Tier-2 districts (auto-generated from Python pipeline) ──
  ariyalur: {
    pickupPoints: ["Ariyalur Bus Stand", "Ariyalur Railway Station", "Sendurai", "Jayamkondam"],
    popularRoutes: [
    ],
    description: "Ariyalur is known for ancient chola temples, limestone quarries, agricultural town. DropTaxi provides one way drop taxi and outstation cab service from Ariyalur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  chengalpattu: {
    pickupPoints: ["Chengalpattu Bus Stand", "Chengalpattu Railway Station", "Mahabalipuram", "GST Road Junction"],
    popularRoutes: [
    ],
    description: "Chengalpattu is known for mahabalipuram shore temple, vedanthangal bird sanctuary, gateway to ecr. DropTaxi provides one way drop taxi and outstation cab service from Chengalpattu to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  cuddalore: {
    pickupPoints: ["Cuddalore Bus Stand", "Cuddalore Railway Station", "Chidambaram", "Silver Beach"],
    popularRoutes: [
      { name: "Cuddalore to Chennai", href: "/cuddalore-to-chennai-taxi" }
    ],
    description: "Cuddalore is known for chidambaram nataraja temple, silver beach, french colonial heritage. DropTaxi provides one way drop taxi and outstation cab service from Cuddalore to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  dharmapuri: {
    pickupPoints: ["Dharmapuri Bus Stand", "Dharmapuri Railway Station", "Hogenakkal", "Pennagaram"],
    popularRoutes: [
    ],
    description: "Dharmapuri is known for hogenakkal falls, mango orchards, scenic granite hills. DropTaxi provides one way drop taxi and outstation cab service from Dharmapuri to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kallakurichi: {
    pickupPoints: ["Kallakurichi Bus Stand", "Chinnasalem", "Ulundurpet", "Sankarapuram"],
    popularRoutes: [
    ],
    description: "Kallakurichi is known for agricultural district, scenic eastern ghats, jackfruit orchards. DropTaxi provides one way drop taxi and outstation cab service from Kallakurichi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  karur: {
    pickupPoints: ["Karur Bus Stand", "Karur Junction Railway Station", "Kulithalai", "Aravakurichi"],
    popularRoutes: [
      { name: "Karur to Trichy", href: "/karur-to-trichy-taxi" },
      { name: "Karur to Coimbatore", href: "/karur-to-coimbatore-taxi" }
    ],
    description: "Karur is known for bus body building capital, textile exports, pasupatheeswara temple. DropTaxi provides one way drop taxi and outstation cab service from Karur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  krishnagiri: {
    pickupPoints: ["Krishnagiri Bus Stand", "Hosur", "Pochampalli", "Kaveripattinam"],
    popularRoutes: [
    ],
    description: "Krishnagiri is known for mango capital of india, krp dam, gateway to bangalore from tn. DropTaxi provides one way drop taxi and outstation cab service from Krishnagiri to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mayiladuthurai: {
    pickupPoints: ["Mayiladuthurai Bus Stand", "Mayiladuthurai Junction", "Sirkali", "Poompuhar"],
    popularRoutes: [
    ],
    description: "Mayiladuthurai is known for mayuranathaswamy temple, poompuhar ancient port, cauvery delta region. DropTaxi provides one way drop taxi and outstation cab service from Mayiladuthurai to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  nagapattinam: {
    pickupPoints: ["Nagapattinam Bus Stand", "Nagapattinam Railway Station", "Velankanni", "Karaikal"],
    popularRoutes: [
    ],
    description: "Nagapattinam is known for velankanni basilica, coastal heritage, nagore dargah. DropTaxi provides one way drop taxi and outstation cab service from Nagapattinam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  namakkal: {
    pickupPoints: ["Namakkal Bus Stand", "Rasipuram", "Tiruchengode", "Paramathi"],
    popularRoutes: [
    ],
    description: "Namakkal is known for namakkal fort, transport hub, poultry and egg capital of india. DropTaxi provides one way drop taxi and outstation cab service from Namakkal to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  perambalur: {
    pickupPoints: ["Perambalur Bus Stand", "Perambalur Railway Station", "Kunnam", "Veppanthattai"],
    popularRoutes: [
    ],
    description: "Perambalur is known for smallest district in tn, sathanur dam, ancient chola region. DropTaxi provides one way drop taxi and outstation cab service from Perambalur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  pudukkottai: {
    pickupPoints: ["Pudukkottai Bus Stand", "Pudukkottai Railway Station", "Aranthangi", "Karambakudi"],
    popularRoutes: [
    ],
    description: "Pudukkottai is known for former princely state, sittanavasal jain caves, ancient temples. DropTaxi provides one way drop taxi and outstation cab service from Pudukkottai to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  ramanathapuram: {
    pickupPoints: ["Ramanathapuram Bus Stand", "Ramanathapuram Railway Station", "Paramakudi", "Rameswaram"],
    popularRoutes: [
    ],
    description: "Ramanathapuram is known for gateway to rameswaram, pamban bridge, pilgrimage hub. DropTaxi provides one way drop taxi and outstation cab service from Ramanathapuram to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  ranipet: {
    pickupPoints: ["Ranipet Bus Stand", "Ranipet Railway Station", "Walajapet", "Arcot"],
    popularRoutes: [
      { name: "Ranipet to Chennai", href: "/ranipet-to-chennai-taxi" }
    ],
    description: "Ranipet is known for leather exports hub, arcot nawab heritage, ranipet fort. DropTaxi provides one way drop taxi and outstation cab service from Ranipet to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  sivagangai: {
    pickupPoints: ["Sivagangai Bus Stand", "Karaikudi", "Devakottai", "Chettinad"],
    popularRoutes: [
    ],
    description: "Sivagangai is known for chettinad palace heritage, karaikudi cuisine, pillaiyarpatti temple. DropTaxi provides one way drop taxi and outstation cab service from Sivagangai to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  tenkasi: {
    pickupPoints: ["Tenkasi Bus Stand", "Tenkasi Railway Station", "Courtallam", "Sankarankovil"],
    popularRoutes: [
    ],
    description: "Tenkasi is known for courtallam waterfalls (spa of south india), scenic western ghats. DropTaxi provides one way drop taxi and outstation cab service from Tenkasi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  theni: {
    pickupPoints: ["Theni Bus Stand", "Periyakulam", "Bodinayakanur", "Uthamapalayam"],
    popularRoutes: [
      { name: "Theni to Madurai", href: "/theni-to-madurai-taxi" }
    ],
    description: "Theni is known for gateway to meghamalai and munnar, cardamom hills, vaigai dam. DropTaxi provides one way drop taxi and outstation cab service from Theni to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  thoothukudi: {
    pickupPoints: ["Thoothukudi Bus Stand", "Thoothukudi Junction", "Tiruchendur", "VOC Port"],
    popularRoutes: [
    ],
    description: "Thoothukudi is known for voc port, tiruchendur murugan temple, salt pans, pearl city. DropTaxi provides one way drop taxi and outstation cab service from Thoothukudi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  tirunelveli: {
    pickupPoints: ["Tirunelveli Junction", "Tirunelveli Bus Stand", "Palayamkottai", "Ambasamudram"],
    popularRoutes: [
      { name: "Tirunelveli to Madurai", href: "/tirunelveli-to-madurai-taxi" }
    ],
    description: "Tirunelveli is known for nellaiappar temple, halwa city, papanasam dam, south tn hub. DropTaxi provides one way drop taxi and outstation cab service from Tirunelveli to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  tirupattur: {
    pickupPoints: ["Tirupattur Bus Stand", "Tirupattur Railway Station", "Ambur", "Vaniyambadi"],
    popularRoutes: [
    ],
    description: "Tirupattur is known for leather industry hub, ambur biryani, scenic javadi hills. DropTaxi provides one way drop taxi and outstation cab service from Tirupattur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  tirupur: {
    pickupPoints: ["Tirupur Bus Stand", "Tirupur Railway Station", "Avinashi", "Palladam", "Udumalpet"],
    popularRoutes: [
      { name: "Tirupur to Coimbatore", href: "/tirupur-to-coimbatore-taxi" }
    ],
    description: "Tirupur is known for knitwear capital, textile exports hub, dollar city. DropTaxi provides one way drop taxi and outstation cab service from Tirupur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  tiruvannamalai: {
    pickupPoints: ["Tiruvannamalai Bus Stand", "Tiruvannamalai Railway Station", "Arunachaleswarar Temple", "Ramana Ashram"],
    popularRoutes: [
      { name: "Tiruvannamalai to Chennai", href: "/tiruvannamalai-to-chennai-taxi" },
      { name: "Tiruvannamalai to Vellore", href: "/tiruvannamalai-to-vellore-cab" },
      { name: "Tiruvannamalai to Bangalore", href: "/tiruvannamalai-to-bangalore-taxi" }
    ],
    description: "Tiruvannamalai is known for arunachaleswarar temple, girivalam path, ramana maharshi ashram. DropTaxi provides one way drop taxi and outstation cab service from Tiruvannamalai to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  villupuram: {
    pickupPoints: ["Villupuram Bus Stand", "Villupuram Junction Railway Station", "Tindivanam", "Gingee"],
    popularRoutes: [
      { name: "Villupuram to Chennai", href: "/villupuram-to-chennai-taxi" }
    ],
    description: "Villupuram is known for gingee fort, french colonial heritage, ecr coastal route. DropTaxi provides one way drop taxi and outstation cab service from Villupuram to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  virudhunagar: {
    pickupPoints: ["Virudhunagar Bus Stand", "Virudhunagar Junction", "Sivakasi", "Aruppukkottai", "Rajapalayam"],
    popularRoutes: [
    ],
    description: "Virudhunagar is known for fireworks and match capital (sivakasi), printing hub, rajapalayam dogs. DropTaxi provides one way drop taxi and outstation cab service from Virudhunagar to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  tiruvallur: {
    pickupPoints: ["Tiruvallur Bus Stand", "Tiruvallur Railway Station", "Avadi", "Poonamallee", "Sriperumbudur"],
    popularRoutes: [
    ],
    description: "Tiruvallur is known for sriperumbudur birthplace of ramanuja, auto manufacturing hub. DropTaxi provides one way drop taxi and outstation cab service from Tiruvallur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  ooty: {
    pickupPoints: ["Ooty Bus Stand", "Ooty Railway Station", "Charring Cross", "Botanical Gardens", "Lake Area"],
    popularRoutes: [
      { name: "Ooty to Coimbatore", href: "/ooty-to-coimbatore-taxi" },
      { name: "Ooty to Mysore", href: "/ooty-to-mysore-taxi" },
      { name: "Ooty to Bangalore", href: "/ooty-to-bangalore-taxi" }
    ],
    description: "Ooty is known for queen of hill stations, nilgiri mountain railway, botanical gardens. DropTaxi provides one way drop taxi and outstation cab service from Ooty to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kodaikanal: {
    pickupPoints: ["Kodaikanal Bus Stand", "Kodai Lake", "Coakers Walk", "Seven Roads Junction"],
    popularRoutes: [
      { name: "Kodaikanal to Madurai", href: "/kodaikanal-to-madurai-taxi" },
      { name: "Kodaikanal to Dindigul", href: "/kodaikanal-to-dindigul-taxi" },
      { name: "Kodaikanal to Coimbatore", href: "/kodaikanal-to-coimbatore-cab" }
    ],
    description: "Kodaikanal is known for princess of hill stations, kodai lake, silver cascade, pine forests. DropTaxi provides one way drop taxi and outstation cab service from Kodaikanal to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  karaikudi: {
    pickupPoints: ["Karaikudi Bus Stand", "Karaikudi Railway Station", "Chettinad Palace", "Devakottai"],
    popularRoutes: [
      { name: "Karaikudi to Madurai", href: "/karaikudi-to-madurai-taxi" }
    ],
    description: "Karaikudi is known for chettinad heritage, palatial mansions, spicy chettinad cuisine. DropTaxi provides one way drop taxi and outstation cab service from Karaikudi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  palani: {
    pickupPoints: ["Palani Bus Stand", "Palani Railway Station", "Murugan Temple", "Palani Hills"],
    popularRoutes: [
      { name: "Palani to Madurai", href: "/palani-to-madurai-taxi" },
      { name: "Palani to Coimbatore", href: "/palani-to-coimbatore-taxi" }
    ],
    description: "Palani is known for palani murugan temple, one of the six abodes of lord murugan. DropTaxi provides one way drop taxi and outstation cab service from Palani to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  sivakasi: {
    pickupPoints: ["Sivakasi Bus Stand", "Sivakasi Town", "Virudhunagar Junction"],
    popularRoutes: [
      { name: "Sivakasi to Madurai", href: "/sivakasi-to-madurai-taxi" }
    ],
    description: "Sivakasi is known for fireworks and match industry capital, mini japan of india. DropTaxi provides one way drop taxi and outstation cab service from Sivakasi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  srirangam: {
    pickupPoints: ["Srirangam Bus Stand", "Ranganathaswamy Temple", "Srirangam Railway Station"],
    popularRoutes: [
    ],
    description: "Srirangam is known for sri ranganathaswamy temple, largest functioning hindu temple in the world. DropTaxi provides one way drop taxi and outstation cab service from Srirangam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  chrompet: {
    pickupPoints: ["Chrompet Bus Stand", "Chrompet Railway Station", "Pallavaram", "Tambaram"],
    popularRoutes: [
    ],
    description: "Chrompet is known for chennai suburb, railway junction, residential and commercial hub. DropTaxi provides one way drop taxi and outstation cab service from Chrompet to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  neyveli: {
    pickupPoints: ["Neyveli Bus Stand", "Neyveli Township", "NLC Gate"],
    popularRoutes: [
      { name: "Neyveli to Chennai", href: "/neyveli-to-chennai-taxi" }
    ],
    description: "Neyveli is known for nlc mining township, lignite capital of india, planned township. DropTaxi provides one way drop taxi and outstation cab service from Neyveli to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  tiruchendur: {
    pickupPoints: ["Tiruchendur Bus Stand", "Tiruchendur Temple", "Tiruchendur Beach"],
    popularRoutes: [
      { name: "Tiruchendur to Thoothukudi", href: "/tiruchendur-to-thoothukudi-taxi" },
      { name: "Tiruchendur to Tirunelveli", href: "/tiruchendur-to-tirunelveli-taxi" }
    ],
    description: "Tiruchendur is known for arulmigu subramaniya swamy temple, seaside murugan abode. DropTaxi provides one way drop taxi and outstation cab service from Tiruchendur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  chidambaram: {
    pickupPoints: ["Chidambaram Bus Stand", "Annamalai University", "Nataraja Temple"],
    popularRoutes: [
      { name: "Chidambaram to Chennai", href: "/chidambaram-to-chennai-taxi" }
    ],
    description: "Chidambaram is known for nataraja temple with chidambaram rahasyam, annamalai university. DropTaxi provides one way drop taxi and outstation cab service from Chidambaram to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  velankanni: {
    pickupPoints: ["Velankanni Bus Stand", "Velankanni Basilica", "Beach Road"],
    popularRoutes: [
      { name: "Velankanni to Trichy", href: "/velankanni-to-trichy-cab" },
      { name: "Velankanni to Chennai", href: "/velankanni-to-chennai-taxi" }
    ],
    description: "Velankanni is known for basilica of our lady of good health, lourdes of the east. DropTaxi provides one way drop taxi and outstation cab service from Velankanni to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  pollachi: {
    pickupPoints: ["Pollachi Bus Stand", "Pollachi Railway Station", "Aliyar Dam", "Topslip"],
    popularRoutes: [
      { name: "Pollachi to Coimbatore", href: "/pollachi-to-coimbatore-taxi" }
    ],
    description: "Pollachi is known for coconut capital, aliyar dam, topslip wildlife, gateway to valparai. DropTaxi provides one way drop taxi and outstation cab service from Pollachi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mettupalayam: {
    pickupPoints: ["Mettupalayam Bus Stand", "Mettupalayam Railway Station", "Karamadai"],
    popularRoutes: [
      { name: "Mettupalayam to Coimbatore", href: "/mettupalayam-to-coimbatore-taxi" }
    ],
    description: "Mettupalayam is known for gateway to nilgiris, nilgiri mountain railway starting point. DropTaxi provides one way drop taxi and outstation cab service from Mettupalayam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  coonoor: {
    pickupPoints: ["Coonoor Bus Stand", "Coonoor Railway Station", "Sims Park", "Dolphin Nose"],
    popularRoutes: [
      { name: "Coonoor to Coimbatore", href: "/coonoor-to-coimbatore-taxi" }
    ],
    description: "Coonoor is known for nilgiri tea estates, sims park, dolphin nose viewpoint. DropTaxi provides one way drop taxi and outstation cab service from Coonoor to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mahabalipuram: {
    pickupPoints: ["Mahabalipuram Bus Stand", "Shore Temple", "Five Rathas", "ECR Junction"],
    popularRoutes: [
      { name: "Mahabalipuram to Chennai", href: "/mahabalipuram-to-chennai-taxi" },
      { name: "Mahabalipuram to Pondicherry", href: "/mahabalipuram-to-pondicherry-taxi" }
    ],
    description: "Mahabalipuram is known for unesco shore temple, pallava rock-cut monuments, beach town. DropTaxi provides one way drop taxi and outstation cab service from Mahabalipuram to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kollam: {
    pickupPoints: ["Kollam Bus Stand", "Kollam Junction Railway Station", "Ashtamudi Lake", "Cashew Junction"],
    popularRoutes: [
    ],
    description: "Kollam is known for ashtamudi lake, cashew capital, gateway to kerala backwaters. DropTaxi provides one way drop taxi and outstation cab service from Kollam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  pathanamthitta: {
    pickupPoints: ["Pathanamthitta Bus Stand", "Pathanamthitta Town", "Sabarimala Base Camp", "Adoor"],
    popularRoutes: [
    ],
    description: "Pathanamthitta is known for sabarimala temple, pilgrimage capital of kerala, river district. DropTaxi provides one way drop taxi and outstation cab service from Pathanamthitta to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  alappuzha: {
    pickupPoints: ["Alappuzha Bus Stand", "Alappuzha Railway Station", "Alappuzha Beach", "Finishing Point"],
    popularRoutes: [
    ],
    description: "Alappuzha is known for venice of the east, houseboat backwaters, nehru trophy boat race. DropTaxi provides one way drop taxi and outstation cab service from Alappuzha to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kottayam: {
    pickupPoints: ["Kottayam Bus Stand", "Kottayam Railway Station", "Nagampadom", "Kumarakom"],
    popularRoutes: [
    ],
    description: "Kottayam is known for rubber capital of india, kumarakom backwaters, literary hub. DropTaxi provides one way drop taxi and outstation cab service from Kottayam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  idukki: {
    pickupPoints: ["Idukki Bus Stand", "Thodupuzha", "Painavu", "Adimali"],
    popularRoutes: [
    ],
    description: "Idukki is known for idukki arch dam, spice gardens, highest district in kerala. DropTaxi provides one way drop taxi and outstation cab service from Idukki to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kochi: {
    pickupPoints: ["Ernakulam Junction Railway Station", "Ernakulam Town Railway Station", "Vyttila Hub", "Fort Kochi", "Marine Drive"],
    popularRoutes: [
    ],
    description: "Kochi is known for queen of arabian sea, fort kochi, it hub, backwater cruise hub. DropTaxi provides one way drop taxi and outstation cab service from Kochi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  thrissur: {
    pickupPoints: ["Thrissur Bus Stand", "Thrissur Railway Station", "Swaraj Round", "Vadakkunnathan Temple"],
    popularRoutes: [
    ],
    description: "Thrissur is known for cultural capital of kerala, thrissur pooram, vadakkunnathan temple. DropTaxi provides one way drop taxi and outstation cab service from Thrissur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  palakkad: {
    pickupPoints: ["Palakkad Bus Stand", "Palakkad Junction Railway Station", "Palakkad Fort", "Olavakkode"],
    popularRoutes: [
      { name: "Palakkad to Coimbatore", href: "/palakkad-to-coimbatore-taxi" }
    ],
    description: "Palakkad is known for gateway of kerala, palakkad gap, silent valley, rice granary. DropTaxi provides one way drop taxi and outstation cab service from Palakkad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  malappuram: {
    pickupPoints: ["Malappuram Bus Stand", "Tirur Railway Station", "Manjeri", "Perinthalmanna"],
    popularRoutes: [
    ],
    description: "Malappuram is known for historical malabar region, educational hub, kottakkunnu heritage. DropTaxi provides one way drop taxi and outstation cab service from Malappuram to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kozhikode: {
    pickupPoints: ["Kozhikode Railway Station", "New Bus Stand", "Mananchira", "SM Street", "Beach Road"],
    popularRoutes: [
      { name: "Kozhikode to Wayanad", href: "/kozhikode-to-wayanad-taxi" }
    ],
    description: "Kozhikode is known for city of spices, kozhikode beach, kappad historic landing, halwa. DropTaxi provides one way drop taxi and outstation cab service from Kozhikode to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  wayanad: {
    pickupPoints: ["Kalpetta Bus Stand", "Sultan Bathery", "Mananthavady", "Meenangadi"],
    popularRoutes: [
      { name: "Wayanad to Kozhikode", href: "/wayanad-to-kozhikode-taxi" },
      { name: "Wayanad to Bangalore", href: "/wayanad-to-bangalore-taxi" }
    ],
    description: "Wayanad is known for western ghats paradise, edakkal caves, banasura dam, spice estates. DropTaxi provides one way drop taxi and outstation cab service from Wayanad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kannur: {
    pickupPoints: ["Kannur Railway Station", "Kannur Bus Stand", "Payyambalam Beach", "Fort Area"],
    popularRoutes: [
    ],
    description: "Kannur is known for land of looms and lores, theyyam art, st angelo fort, coir industry. DropTaxi provides one way drop taxi and outstation cab service from Kannur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kasaragod: {
    pickupPoints: ["Kasaragod Bus Stand", "Kasaragod Railway Station", "Bekal Fort", "Kanhangad"],
    popularRoutes: [
    ],
    description: "Kasaragod is known for bekal fort, northernmost district of kerala, seven languages district. DropTaxi provides one way drop taxi and outstation cab service from Kasaragod to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  munnar: {
    pickupPoints: ["Munnar Bus Stand", "Munnar Town", "Old Munnar", "KDHP Tea Museum"],
    popularRoutes: [
      { name: "Munnar to Thekkady", href: "/munnar-to-thekkady-taxi" },
      { name: "Munnar to Madurai", href: "/munnar-to-madurai-taxi" },
      { name: "Munnar to Coimbatore", href: "/munnar-to-coimbatore-taxi" }
    ],
    description: "Munnar is known for tea capital of south india, eravikulam, mattupetty dam, honeymoon spot. DropTaxi provides one way drop taxi and outstation cab service from Munnar to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  alleppey: {
    pickupPoints: ["Alleppey Bus Stand", "Alleppey Railway Station", "Alleppey Beach", "KSRTC Stand"],
    popularRoutes: [
      { name: "Alleppey to Kochi", href: "/alleppey-to-kochi-taxi" }
    ],
    description: "Alleppey is known for houseboat paradise, backwater capital, alappuzha beach, coir. DropTaxi provides one way drop taxi and outstation cab service from Alleppey to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  thekkady: {
    pickupPoints: ["Thekkady Bus Stand", "Kumily Town", "Periyar Tiger Reserve Gate"],
    popularRoutes: [
      { name: "Thekkady to Munnar", href: "/thekkady-to-munnar-taxi" }
    ],
    description: "Thekkady is known for periyar tiger reserve, spice plantation tours, elephant rides. DropTaxi provides one way drop taxi and outstation cab service from Thekkady to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  guruvayur: {
    pickupPoints: ["Guruvayur Bus Stand", "Guruvayur Railway Station", "Guruvayur Temple"],
    popularRoutes: [
    ],
    description: "Guruvayur is known for guruvayur sri krishna temple, punnathur kotta elephant sanctuary. DropTaxi provides one way drop taxi and outstation cab service from Guruvayur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kovalam: {
    pickupPoints: ["Kovalam Beach Junction", "Lighthouse Beach", "Hawa Beach", "Samudra Beach"],
    popularRoutes: [
    ],
    description: "Kovalam is known for crescent beach, lighthouse beach, ayurveda hub, international beach resort. DropTaxi provides one way drop taxi and outstation cab service from Kovalam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  varkala: {
    pickupPoints: ["Varkala Bus Stand", "Varkala Railway Station", "Varkala Cliff", "Papanasam Beach"],
    popularRoutes: [
    ],
    description: "Varkala is known for varkala cliff, papanasam beach, janardanaswamy temple, coastal retreat. DropTaxi provides one way drop taxi and outstation cab service from Varkala to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kumarakom: {
    pickupPoints: ["Kumarakom Boat Jetty", "Kumarakom Bird Sanctuary", "Taj Hotel Area"],
    popularRoutes: [
    ],
    description: "Kumarakom is known for vembanad lake backwaters, bird sanctuary, luxury houseboats. DropTaxi provides one way drop taxi and outstation cab service from Kumarakom to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  bagalkot: {
    pickupPoints: ["Bagalkot Bus Stand", "Bagalkot Railway Station", "Badami", "Pattadakal"],
    popularRoutes: [
    ],
    description: "Bagalkot is known for badami caves, pattadakal unesco site, aihole cradle of architecture. DropTaxi provides one way drop taxi and outstation cab service from Bagalkot to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  ballari: {
    pickupPoints: ["Ballari Bus Stand", "Ballari Junction Railway Station", "Ballari Fort", "Hospet"],
    popularRoutes: [
    ],
    description: "Ballari is known for hampi unesco site, vijayanagara empire ruins, iron ore mining hub. DropTaxi provides one way drop taxi and outstation cab service from Ballari to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  belagavi: {
    pickupPoints: ["Belagavi Bus Stand", "Belagavi Railway Station", "Camp Area", "Rani Channamma Circle"],
    popularRoutes: [
    ],
    description: "Belagavi is known for second capital of karnataka, military cantonment, jain heritage. DropTaxi provides one way drop taxi and outstation cab service from Belagavi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  bidar: {
    pickupPoints: ["Bidar Bus Stand", "Bidar Railway Station", "Bidar Fort", "Basavakalyan"],
    popularRoutes: [
    ],
    description: "Bidar is known for bidar fort, bahmani sultanate heritage, whispering gallery. DropTaxi provides one way drop taxi and outstation cab service from Bidar to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  chamarajanagar: {
    pickupPoints: ["Chamarajanagar Bus Stand", "Kollegal", "Male Mahadeshwara Hills"],
    popularRoutes: [
    ],
    description: "Chamarajanagar is known for male mahadeshwara hills, br hills wildlife, cauvery fishing camp. DropTaxi provides one way drop taxi and outstation cab service from Chamarajanagar to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  chikballapur: {
    pickupPoints: ["Chikballapur Bus Stand", "Chikballapur Railway Station", "Nandi Hills"],
    popularRoutes: [
    ],
    description: "Chikballapur is known for nandi hills sunrise point, granite quarries, silk farming. DropTaxi provides one way drop taxi and outstation cab service from Chikballapur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  chikkamagaluru: {
    pickupPoints: ["Chikkamagaluru Bus Stand", "Kadur Railway Station", "Mullayanagiri", "Coffee Estate Area"],
    popularRoutes: [
    ],
    description: "Chikkamagaluru is known for coffee land of india, mullayanagiri peak, baba budangiri, trekking hub. DropTaxi provides one way drop taxi and outstation cab service from Chikkamagaluru to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  chitradurga: {
    pickupPoints: ["Chitradurga Bus Stand", "Chitradurga Fort", "Challakere", "Holalkere"],
    popularRoutes: [
    ],
    description: "Chitradurga is known for stone fortress, chandravalli caves, onake obavva warrior heritage. DropTaxi provides one way drop taxi and outstation cab service from Chitradurga to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  davangere: {
    pickupPoints: ["Davangere Bus Stand", "Davangere Railway Station", "Benne Dosa Area"],
    popularRoutes: [
    ],
    description: "Davangere is known for benne dosa capital, cotton textile hub, education center. DropTaxi provides one way drop taxi and outstation cab service from Davangere to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  dharwad: {
    pickupPoints: ["Dharwad Bus Stand", "Dharwad Railway Station", "Karnataka University", "Saptapur"],
    popularRoutes: [
    ],
    description: "Dharwad is known for dharwad pedha sweet, education hub, hindustani classical music center. DropTaxi provides one way drop taxi and outstation cab service from Dharwad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  gadag: {
    pickupPoints: ["Gadag Bus Stand", "Gadag Railway Station", "Lakkundi", "Ron"],
    popularRoutes: [
    ],
    description: "Gadag is known for lakkundi jain temples, trikuteshwara temple, cotton trading center. DropTaxi provides one way drop taxi and outstation cab service from Gadag to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  hassan: {
    pickupPoints: ["Hassan Bus Stand", "Hassan Railway Station", "Belur", "Halebid"],
    popularRoutes: [
    ],
    description: "Hassan is known for belur-halebid hoysala temples, shravanabelagola bahubali statue. DropTaxi provides one way drop taxi and outstation cab service from Hassan to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  haveri: {
    pickupPoints: ["Haveri Bus Stand", "Haveri Railway Station", "Ranebennur", "Byadgi"],
    popularRoutes: [
    ],
    description: "Haveri is known for byadgi chilli market, handloom textiles, ranebennur blackbuck sanctuary. DropTaxi provides one way drop taxi and outstation cab service from Haveri to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kalaburagi: {
    pickupPoints: ["Kalaburagi Bus Stand", "Kalaburagi Railway Station", "Gulbarga Fort", "Sharana Basaveshwara Temple"],
    popularRoutes: [
    ],
    description: "Kalaburagi is known for gulbarga fort, sharana basaveshwara temple, al-beruni heritage. DropTaxi provides one way drop taxi and outstation cab service from Kalaburagi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kolar: {
    pickupPoints: ["Kolar Bus Stand", "Kolar Railway Station", "KGF", "Bangarpet"],
    popularRoutes: [
    ],
    description: "Kolar is known for kolar gold fields, anthargange caves, kolaramma temple. DropTaxi provides one way drop taxi and outstation cab service from Kolar to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  koppal: {
    pickupPoints: ["Koppal Bus Stand", "Koppal Railway Station", "Kuknur", "Gangavathi"],
    popularRoutes: [
    ],
    description: "Koppal is known for gateway to hampi, anjanadri hill (hanuman birthplace), tungabhadra dam. DropTaxi provides one way drop taxi and outstation cab service from Koppal to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mandya: {
    pickupPoints: ["Mandya Bus Stand", "Mandya Railway Station", "Srirangapatna", "KRS Dam"],
    popularRoutes: [
    ],
    description: "Mandya is known for sugar capital of karnataka, krs dam, srirangapatna tipu heritage. DropTaxi provides one way drop taxi and outstation cab service from Mandya to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  raichur: {
    pickupPoints: ["Raichur Bus Stand", "Raichur Junction Railway Station", "Raichur Fort"],
    popularRoutes: [
    ],
    description: "Raichur is known for raichur fort, rice and cotton granary, narayanpur dam. DropTaxi provides one way drop taxi and outstation cab service from Raichur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  ramanagara: {
    pickupPoints: ["Ramanagara Bus Stand", "Ramanagara Railway Station", "Channapatna", "Sholay Rocks"],
    popularRoutes: [
    ],
    description: "Ramanagara is known for sholay filming location, silk town channapatna, rock climbing hub. DropTaxi provides one way drop taxi and outstation cab service from Ramanagara to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  shivamogga: {
    pickupPoints: ["Shivamogga Bus Stand", "Shivamogga Railway Station", "Bhadravathi", "Jog Falls Road"],
    popularRoutes: [
    ],
    description: "Shivamogga is known for gateway to jog falls, sharavathi valley, western ghats greenery. DropTaxi provides one way drop taxi and outstation cab service from Shivamogga to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  tumakuru: {
    pickupPoints: ["Tumakuru Bus Stand", "Tumakuru Railway Station", "Sira", "Gubbi"],
    popularRoutes: [
    ],
    description: "Tumakuru is known for coconut capital, siddaganga mutt, devarayanadurga hills. DropTaxi provides one way drop taxi and outstation cab service from Tumakuru to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  udupi: {
    pickupPoints: ["Udupi Bus Stand", "Udupi Railway Station", "Sri Krishna Matha", "Malpe Beach"],
    popularRoutes: [
    ],
    description: "Udupi is known for udupi sri krishna temple, malpe beach, manipal university town. DropTaxi provides one way drop taxi and outstation cab service from Udupi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "uttara-kannada": {
    pickupPoints: ["Karwar Bus Stand", "Sirsi Bus Stand", "Dandeli", "Gokarna", "Kumta"],
    popularRoutes: [
    ],
    description: "Uttara Kannada is known for gokarna beaches, dandeli adventure sports, jog falls, coastal karnataka. DropTaxi provides one way drop taxi and outstation cab service from Uttara Kannada to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  vijayanagara: {
    pickupPoints: ["Hosapete Bus Stand", "Hosapete Railway Station", "Hampi Bazaar", "Tungabhadra Dam"],
    popularRoutes: [
    ],
    description: "Vijayanagara is known for hampi world heritage site, vijayanagara empire capital ruins. DropTaxi provides one way drop taxi and outstation cab service from Vijayanagara to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  vijayapura: {
    pickupPoints: ["Vijayapura Bus Stand", "Vijayapura Railway Station", "Gol Gumbaz", "Ibrahim Roza"],
    popularRoutes: [
    ],
    description: "Vijayapura is known for gol gumbaz, ibrahim roza, adil shahi architecture, grape wines. DropTaxi provides one way drop taxi and outstation cab service from Vijayapura to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  yadgir: {
    pickupPoints: ["Yadgir Bus Stand", "Yadgir Railway Station", "Yadgir Fort", "Sannati"],
    popularRoutes: [
    ],
    description: "Yadgir is known for yadgir fort, sannati buddhist site, bhima river heritage. DropTaxi provides one way drop taxi and outstation cab service from Yadgir to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mangalore: {
    pickupPoints: ["Mangalore Central Railway Station", "KSRTC Bus Stand", "Hampankatta", "Bejai", "Kankanady"],
    popularRoutes: [
      { name: "Mangalore to Bangalore", href: "/mangalore-to-bangalore-taxi" },
      { name: "Mangalore to Coorg", href: "/mangalore-to-coorg-taxi" }
    ],
    description: "Mangalore is known for port city, mangalorean cuisine, kudroli temple, new mangalore port. DropTaxi provides one way drop taxi and outstation cab service from Mangalore to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  hubli: {
    pickupPoints: ["Hubli Railway Station", "Hubli Bus Stand", "Deshpande Nagar", "Gokul Road", "Vidyanagar"],
    popularRoutes: [
    ],
    description: "Hubli is known for commercial capital of north karnataka, railway junction, trade hub. DropTaxi provides one way drop taxi and outstation cab service from Hubli to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  coorg: {
    pickupPoints: ["Madikeri Bus Stand", "Kushalnagar", "Virajpet", "Gonikoppal", "Somwarpet"],
    popularRoutes: [
      { name: "Coorg to Mysore", href: "/coorg-to-mysore-cab" },
      { name: "Coorg to Bangalore", href: "/coorg-to-bangalore-taxi" },
      { name: "Coorg to Mangalore", href: "/coorg-to-mangalore-taxi" }
    ],
    description: "Coorg is known for scotland of india, coffee plantations, abbey falls, dubare elephant camp. DropTaxi provides one way drop taxi and outstation cab service from Coorg to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  hampi: {
    pickupPoints: ["Hampi Bus Stand", "Hampi Bazaar", "Virupaksha Temple Gate", "Hippie Island"],
    popularRoutes: [
      { name: "Hampi to Bangalore", href: "/hampi-to-bangalore-taxi" }
    ],
    description: "Hampi is known for unesco world heritage ruins, boulder landscape, backpacker paradise. DropTaxi provides one way drop taxi and outstation cab service from Hampi to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  anantapur: {
    pickupPoints: ["Anantapur Bus Stand", "Anantapur Railway Station", "Penukonda", "Dharmavaram"],
    popularRoutes: [
    ],
    description: "Anantapur is known for penukonda fort, lepakshi temple, driest district in ap, peanut capital. DropTaxi provides one way drop taxi and outstation cab service from Anantapur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  chittoor: {
    pickupPoints: ["Chittoor Bus Stand", "Chittoor Railway Station", "Tirupati Road", "Kuppam"],
    popularRoutes: [
    ],
    description: "Chittoor is known for horsley hills, mango orchards, gateway to tirupati. DropTaxi provides one way drop taxi and outstation cab service from Chittoor to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "east-godavari": {
    pickupPoints: ["Rajahmundry Bus Stand", "Kakinada Bus Stand", "Rajamahendravaram Railway Station"],
    popularRoutes: [
    ],
    description: "East Godavari is known for godavari river delta, coconut groves, rajahmundry, papikondalu. DropTaxi provides one way drop taxi and outstation cab service from East Godavari to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  guntur: {
    pickupPoints: ["Guntur Bus Stand", "Guntur Junction Railway Station", "Brodipet", "Arundelpet"],
    popularRoutes: [
    ],
    description: "Guntur is known for chilli capital of india, amaravati buddhist stupa, kondaveedu fort. DropTaxi provides one way drop taxi and outstation cab service from Guntur to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kadapa: {
    pickupPoints: ["Kadapa Bus Stand", "Kadapa Railway Station", "Rajampet", "Proddatur"],
    popularRoutes: [
    ],
    description: "Kadapa is known for ameen peer dargah, gandikota grand canyon, belum caves nearby. DropTaxi provides one way drop taxi and outstation cab service from Kadapa to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  krishna: {
    pickupPoints: ["Machilipatnam Bus Stand", "Machilipatnam Railway Station", "Gudivada", "Nuzvid"],
    popularRoutes: [
    ],
    description: "Krishna is known for machilipatnam kalamkari art, ancient port city, krishna river delta. DropTaxi provides one way drop taxi and outstation cab service from Krishna to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kurnool: {
    pickupPoints: ["Kurnool Bus Stand", "Kurnool Railway Station", "Nandyal Road", "Adoni"],
    popularRoutes: [
    ],
    description: "Kurnool is known for belum caves, srisailam temple, former capital of andhra, mantralayam. DropTaxi provides one way drop taxi and outstation cab service from Kurnool to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  nellore: {
    pickupPoints: ["Nellore Bus Stand", "Nellore Railway Station", "Grand Trunk Road", "Kavali"],
    popularRoutes: [
    ],
    description: "Nellore is known for pulicat lake, mypadu beach, aquaculture hub, udayagiri fort. DropTaxi provides one way drop taxi and outstation cab service from Nellore to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  prakasam: {
    pickupPoints: ["Ongole Bus Stand", "Ongole Railway Station", "Markapuram", "Chirala"],
    popularRoutes: [
    ],
    description: "Prakasam is known for ongole cattle breed, chirala handlooms, kothapatnam beach. DropTaxi provides one way drop taxi and outstation cab service from Prakasam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  srikakulam: {
    pickupPoints: ["Srikakulam Bus Stand", "Srikakulam Road Railway Station", "Palasa", "Amadalavalasa"],
    popularRoutes: [
    ],
    description: "Srikakulam is known for arasavalli sun temple, srikurmam temple, northernmost ap district. DropTaxi provides one way drop taxi and outstation cab service from Srikakulam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  vizag: {
    pickupPoints: ["Visakhapatnam Railway Station", "RTC Complex Bus Stand", "Jagadamba Junction", "Gajuwaka", "MVP Colony"],
    popularRoutes: [
    ],
    description: "Visakhapatnam is known for city of destiny, araku valley, submarine museum, rk beach, it hub. DropTaxi provides one way drop taxi and outstation cab service from Visakhapatnam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  vizianagaram: {
    pickupPoints: ["Vizianagaram Bus Stand", "Vizianagaram Railway Station", "Fort Area", "Nellimarla"],
    popularRoutes: [
    ],
    description: "Vizianagaram is known for vizianagaram fort, bobbili veena, cultural heritage of north andhra. DropTaxi provides one way drop taxi and outstation cab service from Vizianagaram to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "west-godavari": {
    pickupPoints: ["Eluru Bus Stand", "Bhimavaram Bus Stand", "Tanuku", "Tadepalligudem"],
    popularRoutes: [
    ],
    description: "West Godavari is known for kolleru lake, bhimavaram prawn farming, dwarka tirumala temple. DropTaxi provides one way drop taxi and outstation cab service from West Godavari to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "alluri-sitharama-raju": {
    pickupPoints: ["Paderu Bus Stand", "Araku Valley", "Lambasingi"],
    popularRoutes: [
    ],
    description: "Alluri Sitharama Raju is known for araku valley coffee, lambasingi (andhra kashmir), tribal heritage. DropTaxi provides one way drop taxi and outstation cab service from Alluri Sitharama Raju to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  anakapalli: {
    pickupPoints: ["Anakapalli Bus Stand", "Anakapalli Railway Station", "Yellamanchili", "Narsipatnam"],
    popularRoutes: [
    ],
    description: "Anakapalli is known for anakapalli jaggery, bojjannakonda buddhist heritage, coastal town. DropTaxi provides one way drop taxi and outstation cab service from Anakapalli to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  bapatla: {
    pickupPoints: ["Bapatla Bus Stand", "Bapatla Railway Station", "Chirala", "Addanki"],
    popularRoutes: [
    ],
    description: "Bapatla is known for bapatla agricultural college, chirala handlooms, coastal heritage. DropTaxi provides one way drop taxi and outstation cab service from Bapatla to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  eluru: {
    pickupPoints: ["Eluru Bus Stand", "Eluru Railway Station", "Dwaraka Tirumala"],
    popularRoutes: [
    ],
    description: "Eluru is known for eluru carpets, dwaraka tirumala temple, kolleru lake. DropTaxi provides one way drop taxi and outstation cab service from Eluru to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kakinada: {
    pickupPoints: ["Kakinada Bus Stand", "Samalkot Junction", "Kakinada Port", "Hope Island"],
    popularRoutes: [
    ],
    description: "Kakinada is known for port city, hope island, coringa mangroves, natural gas hub. DropTaxi provides one way drop taxi and outstation cab service from Kakinada to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  konaseema: {
    pickupPoints: ["Amalapuram Bus Stand", "Amalapuram Town", "Razole", "Kothapeta"],
    popularRoutes: [
    ],
    description: "Konaseema is known for godavari delta island, coconut groves, antarvedi temple. DropTaxi provides one way drop taxi and outstation cab service from Konaseema to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  ntr: {
    pickupPoints: ["Vijayawada Bus Stand", "Jaggayyapeta", "Nandigama", "Tiruvuru"],
    popularRoutes: [
    ],
    description: "NTR District is known for named after nt rama rao, vijayawada adjacent, kondapalli toys. DropTaxi provides one way drop taxi and outstation cab service from NTR District to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  palnadu: {
    pickupPoints: ["Narasaraopet Bus Stand", "Macherla", "Gurazala", "Piduguralla"],
    popularRoutes: [
    ],
    description: "Palnadu is known for historic palnadu region, kotappakonda temple, limestone quarries. DropTaxi provides one way drop taxi and outstation cab service from Palnadu to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "parvathipuram-manyam": {
    pickupPoints: ["Parvathipuram Bus Stand", "Palakonda", "Saluru", "Bobbili"],
    popularRoutes: [
    ],
    description: "Parvathipuram Manyam is known for tribal heritage, eastern ghats forests, bobbili fort. DropTaxi provides one way drop taxi and outstation cab service from Parvathipuram Manyam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "sri-sathya-sai": {
    pickupPoints: ["Puttaparthi Bus Stand", "Puttaparthi Railway Station", "Prasanthi Nilayam"],
    popularRoutes: [
    ],
    description: "Sri Sathya Sai is known for puttaparthi prasanthi nilayam, sathya sai baba ashram, pilgrimage center. DropTaxi provides one way drop taxi and outstation cab service from Sri Sathya Sai to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  nandyal: {
    pickupPoints: ["Nandyal Bus Stand", "Nandyal Railway Station", "Banaganapalle", "Atmakur"],
    popularRoutes: [
    ],
    description: "Nandyal is known for mahanandi temple, srisailam dam gateway, banaganapalle mangoes. DropTaxi provides one way drop taxi and outstation cab service from Nandyal to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  annamayya: {
    pickupPoints: ["Rajampet Bus Stand", "Rajampet Railway Station", "Kodur", "Railway Kodur"],
    popularRoutes: [
    ],
    description: "Annamayya is known for talakona waterfalls, annamayya birthplace, sri venkateswara wildlife. DropTaxi provides one way drop taxi and outstation cab service from Annamayya to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  vijayawada: {
    pickupPoints: ["Vijayawada Junction Railway Station", "Pandit Nehru Bus Station", "Benz Circle", "MG Road", "Kanaka Durga Temple"],
    popularRoutes: [
      { name: "Vijayawada to Hyderabad", href: "/vijayawada-to-hyderabad-taxi" },
      { name: "Vijayawada to Chennai", href: "/vijayawada-to-chennai-taxi" },
      { name: "Vijayawada to Bangalore", href: "/vijayawada-to-bangalore-taxi" },
      { name: "Vijayawada to Tirupati", href: "/vijayawada-to-tirupati-taxi" }
    ],
    description: "Vijayawada is known for kanaka durga temple, prakasam barrage, business hub of ap. DropTaxi provides one way drop taxi and outstation cab service from Vijayawada to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  rajahmundry: {
    pickupPoints: ["Rajahmundry Railway Station", "RTC Complex", "Godavari Bridge", "Pushkar Ghat"],
    popularRoutes: [
    ],
    description: "Rajahmundry is known for godavari river, pushkaram, papikondalu boat ride, cultural capital. DropTaxi provides one way drop taxi and outstation cab service from Rajahmundry to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  ongole: {
    pickupPoints: ["Ongole Bus Stand", "Ongole Railway Station", "Kurnool Road", "Addanki Road"],
    popularRoutes: [
    ],
    description: "Ongole is known for ongole bull breed, kothapatnam beach, tobacco trading hub. DropTaxi provides one way drop taxi and outstation cab service from Ongole to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  adilabad: {
    pickupPoints: ["Adilabad Bus Stand", "Adilabad Railway Station", "Nirmal Road", "Utnoor"],
    popularRoutes: [
    ],
    description: "Adilabad is known for kuntala waterfall, kawal tiger reserve, tribal heritage. DropTaxi provides one way drop taxi and outstation cab service from Adilabad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "bhadradri-kothagudem": {
    pickupPoints: ["Kothagudem Bus Stand", "Bhadrachalam Bus Stand", "Bhadrachalam Temple", "Manuguru"],
    popularRoutes: [
    ],
    description: "Bhadradri Kothagudem is known for bhadrachalam temple, godavari river, kinnerasani wildlife. DropTaxi provides one way drop taxi and outstation cab service from Bhadradri Kothagudem to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  hanumakonda: {
    pickupPoints: ["Hanumakonda Bus Stand", "Kazipet Junction Railway Station", "Warangal Fort Area"],
    popularRoutes: [
    ],
    description: "Hanumakonda is known for thousand pillar temple, warangal fort, kakatiya heritage. DropTaxi provides one way drop taxi and outstation cab service from Hanumakonda to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  jagtial: {
    pickupPoints: ["Jagtial Bus Stand", "Jagtial Town", "Dharmapuri", "Koratla"],
    popularRoutes: [
    ],
    description: "Jagtial is known for jagtial fort, jute industry, dharmapuri laxmi narasimha temple. DropTaxi provides one way drop taxi and outstation cab service from Jagtial to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  jangaon: {
    pickupPoints: ["Jangaon Bus Stand", "Jangaon Railway Station", "Station Ghanpur"],
    popularRoutes: [
    ],
    description: "Jangaon is known for station ghanpur temple, handloom weaving, kakatiya era heritage. DropTaxi provides one way drop taxi and outstation cab service from Jangaon to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "jayashankar-bhupalpally": {
    pickupPoints: ["Bhupalpally Bus Stand", "Mahadevpur", "Kataram", "Tekumatla"],
    popularRoutes: [
    ],
    description: "Jayashankar Bhupalpally is known for dense forests, tribal areas, laknavaram lake, scenic eastern ghats. DropTaxi provides one way drop taxi and outstation cab service from Jayashankar Bhupalpally to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "jogulamba-gadwal": {
    pickupPoints: ["Gadwal Bus Stand", "Gadwal Railway Station", "Alampur", "Ieeja"],
    popularRoutes: [
    ],
    description: "Jogulamba Gadwal is known for jogulamba temple (shakti peetha), alampur navabrahma temples. DropTaxi provides one way drop taxi and outstation cab service from Jogulamba Gadwal to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  kamareddy: {
    pickupPoints: ["Kamareddy Bus Stand", "Kamareddy Railway Station", "Banswada", "Yellareddy"],
    popularRoutes: [
    ],
    description: "Kamareddy is known for turmeric markets, elgandal fort nearby, agricultural town. DropTaxi provides one way drop taxi and outstation cab service from Kamareddy to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  karimnagar: {
    pickupPoints: ["Karimnagar Bus Stand", "Karimnagar Town", "Elgandal Fort", "Jagtial Road"],
    popularRoutes: [
    ],
    description: "Karimnagar is known for silver filigree work, elgandal fort, granite exports, education hub. DropTaxi provides one way drop taxi and outstation cab service from Karimnagar to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  khammam: {
    pickupPoints: ["Khammam Bus Stand", "Khammam Railway Station", "Wyra", "Kothagudem Road"],
    popularRoutes: [
    ],
    description: "Khammam is known for khammam fort, paddy granary, tribal areas, kinnerasani dam. DropTaxi provides one way drop taxi and outstation cab service from Khammam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "kumuram-bheem-asifabad": {
    pickupPoints: ["Asifabad Bus Stand", "Kerameri", "Kaghaznagar", "Wankidi"],
    popularRoutes: [
    ],
    description: "Kumuram Bheem Asifabad is known for tribal heritage, kumuram bheem freedom fighter, jodeghat memorial. DropTaxi provides one way drop taxi and outstation cab service from Kumuram Bheem Asifabad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mahabubabad: {
    pickupPoints: ["Mahabubabad Bus Stand", "Mahabubabad Town", "Thorrur", "Kesamudram"],
    popularRoutes: [
    ],
    description: "Mahabubabad is known for tribal district, laknavaram lake, tadvai wildlife, bamboo craft. DropTaxi provides one way drop taxi and outstation cab service from Mahabubabad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mahabubnagar: {
    pickupPoints: ["Mahabubnagar Bus Stand", "Mahabubnagar Railway Station", "Jadcherla", "Narayanpet Road"],
    popularRoutes: [
    ],
    description: "Mahabubnagar is known for pillalamarri banyan tree, somasila project, handloom weaving. DropTaxi provides one way drop taxi and outstation cab service from Mahabubnagar to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mancherial: {
    pickupPoints: ["Mancherial Bus Stand", "Mancherial Railway Station", "Bellampalli", "Luxettipet"],
    popularRoutes: [
    ],
    description: "Mancherial is known for singareni coal mines, bellampalli collieries, pranahita river. DropTaxi provides one way drop taxi and outstation cab service from Mancherial to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  medak: {
    pickupPoints: ["Medak Bus Stand", "Medak Town", "Narsapur", "Toopran"],
    popularRoutes: [
    ],
    description: "Medak is known for medak cathedral, largest church in asia, pochampally handlooms. DropTaxi provides one way drop taxi and outstation cab service from Medak to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "medchal-malkajgiri": {
    pickupPoints: ["Malkajgiri Bus Stand", "Medchal", "Kompally", "Boduppal", "Uppal"],
    popularRoutes: [
    ],
    description: "Medchal Malkajgiri is known for hyderabad suburb, it corridor extension, keesara temple. DropTaxi provides one way drop taxi and outstation cab service from Medchal Malkajgiri to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mulugu: {
    pickupPoints: ["Mulugu Bus Stand", "Mulugu Town", "Medaram", "Tadvai"],
    popularRoutes: [
    ],
    description: "Mulugu is known for medaram jatara (largest tribal fair), laknavaram lake, forests. DropTaxi provides one way drop taxi and outstation cab service from Mulugu to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  nagarkurnool: {
    pickupPoints: ["Nagarkurnool Bus Stand", "Nagarkurnool Town", "Achampet", "Kalwakurthy"],
    popularRoutes: [
    ],
    description: "Nagarkurnool is known for srisailam dam gateway, amrabad tiger reserve, farahabad fort. DropTaxi provides one way drop taxi and outstation cab service from Nagarkurnool to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  nalgonda: {
    pickupPoints: ["Nalgonda Bus Stand", "Nalgonda Town", "Devarakonda", "Miryalguda"],
    popularRoutes: [
    ],
    description: "Nalgonda is known for nagarjuna sagar dam, panagal gardens, fluoride-free water project. DropTaxi provides one way drop taxi and outstation cab service from Nalgonda to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  narayanpet: {
    pickupPoints: ["Narayanpet Bus Stand", "Narayanpet Town", "Makthal", "Utkoor"],
    popularRoutes: [
    ],
    description: "Narayanpet is known for narayanpet handloom sarees, cotton weaving, makthal temple. DropTaxi provides one way drop taxi and outstation cab service from Narayanpet to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  nirmal: {
    pickupPoints: ["Nirmal Bus Stand", "Nirmal Town", "Bhainsa", "Khanapur"],
    popularRoutes: [
    ],
    description: "Nirmal is known for nirmal paintings (lacquer art), basara saraswati temple, sahastrakund. DropTaxi provides one way drop taxi and outstation cab service from Nirmal to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  nizamabad: {
    pickupPoints: ["Nizamabad Bus Stand", "Nizamabad Railway Station", "Bodhan", "Armoor"],
    popularRoutes: [
    ],
    description: "Nizamabad is known for turmeric city, nizamabad fort, kanteshwar temple, pochampally. DropTaxi provides one way drop taxi and outstation cab service from Nizamabad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  peddapalli: {
    pickupPoints: ["Peddapalli Bus Stand", "Peddapalli Railway Station", "Ramagundam", "Sultanabad"],
    popularRoutes: [
    ],
    description: "Peddapalli is known for ramagundam thermal power, godavarikhani coal mines, industrial hub. DropTaxi provides one way drop taxi and outstation cab service from Peddapalli to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "rajanna-sircilla": {
    pickupPoints: ["Sircilla Bus Stand", "Sircilla Town", "Vemulawada", "Konaraopet"],
    popularRoutes: [
    ],
    description: "Rajanna Sircilla is known for vemulawada rajanna temple, textile town, powerloom capital. DropTaxi provides one way drop taxi and outstation cab service from Rajanna Sircilla to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  rangareddy: {
    pickupPoints: ["Shamshabad", "Shadnagar", "Ibrahimpatnam", "Chevella", "Rajendranagar"],
    popularRoutes: [
    ],
    description: "Rangareddy is known for hyderabad it corridor, shamshabad airport area, pharma hub. DropTaxi provides one way drop taxi and outstation cab service from Rangareddy to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  sangareddy: {
    pickupPoints: ["Sangareddy Bus Stand", "Sangareddy Town", "Zaheerabad", "Patancheru"],
    popularRoutes: [
    ],
    description: "Sangareddy is known for patancheru industrial belt, sangareddy fort, ameenpur heritage. DropTaxi provides one way drop taxi and outstation cab service from Sangareddy to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  siddipet: {
    pickupPoints: ["Siddipet Bus Stand", "Siddipet Town", "Gajwel", "Dubbak", "Husnabad"],
    popularRoutes: [
    ],
    description: "Siddipet is known for komati cheruvu lake, turmeric market, handloom town. DropTaxi provides one way drop taxi and outstation cab service from Siddipet to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  suryapet: {
    pickupPoints: ["Suryapet Bus Stand", "Suryapet Town", "Kodad", "Huzurnagar"],
    popularRoutes: [
    ],
    description: "Suryapet is known for mattapalli temple, pilgrimage town, rice and cotton trading. DropTaxi provides one way drop taxi and outstation cab service from Suryapet to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  vikarabad: {
    pickupPoints: ["Vikarabad Bus Stand", "Vikarabad Railway Station", "Tandur", "Pargi", "Kodangal"],
    popularRoutes: [
    ],
    description: "Vikarabad is known for ananthagiri hills, rock climbing, nature retreat near hyderabad. DropTaxi provides one way drop taxi and outstation cab service from Vikarabad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  wanaparthy: {
    pickupPoints: ["Wanaparthy Bus Stand", "Wanaparthy Town", "Pebbair", "Pangal"],
    popularRoutes: [
    ],
    description: "Wanaparthy is known for wanaparthy palace, priyadarshini jurala project, former princely state. DropTaxi provides one way drop taxi and outstation cab service from Wanaparthy to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  warangal: {
    pickupPoints: ["Warangal Bus Stand", "Warangal Railway Station", "Warangal Fort", "Bhadrakali"],
    popularRoutes: [
    ],
    description: "Warangal is known for kakatiya dynasty capital, warangal fort, ramappa temple unesco site. DropTaxi provides one way drop taxi and outstation cab service from Warangal to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  "yadadri-bhuvanagiri": {
    pickupPoints: ["Bhongir Bus Stand", "Bhongir Railway Station", "Yadagirigutta", "Alair"],
    popularRoutes: [
    ],
    description: "Yadadri Bhuvanagiri is known for yadadri lakshmi narasimha temple, bhongir fort, pilgrimage center. DropTaxi provides one way drop taxi and outstation cab service from Yadadri Bhuvanagiri to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  secunderabad: {
    pickupPoints: ["Secunderabad Junction Railway Station", "Patny", "Paradise Circle", "Trimulgherry", "Bowenpally"],
    popularRoutes: [
    ],
    description: "Secunderabad is known for twin city of hyderabad, major railway junction, cantonment area. DropTaxi provides one way drop taxi and outstation cab service from Secunderabad to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  karaikal: {
    pickupPoints: ["Karaikal Bus Stand", "Karaikal Port", "Karaikal Beach"],
    popularRoutes: [
    ],
    description: "Karaikal is known for french enclave, karaikal beach, karaikal ammaiyar temple. DropTaxi provides one way drop taxi and outstation cab service from Karaikal to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  mahe: {
    pickupPoints: ["Mahe Bus Stand", "Mahe River Bridge", "Mahe Town"],
    popularRoutes: [
    ],
    description: "Mahe is known for smallest district of pondicherry, french heritage on malabar coast. DropTaxi provides one way drop taxi and outstation cab service from Mahe to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
  yanam: {
    pickupPoints: ["Yanam Bus Stand", "Yanam Town", "Yanam River"],
    popularRoutes: [
    ],
    description: "Yanam is known for french enclave in ap, yanam godavari riverfront, smallest ut district. DropTaxi provides one way drop taxi and outstation cab service from Yanam to all major South Indian cities. Sedan from INR 13/km with verified drivers and 24x7 booking via 78100 46010.",
  },
};
