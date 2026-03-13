// Route-specific data for SEO content enrichment
// Distance in km, duration in hours, fares in INR

export interface RouteInfo {
  distance: number;
  duration: string;
  highway?: string;
  tollEstimate?: string;
  description: string;
}

// Mini: ~INR 11/km, Sedan/Etios: ~INR 13/km, SUV/Innova: ~INR 17/km, Innova Crysta: ~INR 21/km
export function computeFares(distanceKm: number): { mini: string; sedan: string; suv: string; innova: string; crysta: string } {
  const mini = Math.round(distanceKm * 11.5 / 100) * 100 + 99;
  const sedan = Math.round(distanceKm * 13.5 / 100) * 100 + 99;
  const suv = Math.round(distanceKm * 17.5 / 100) * 100 + 99;
  const innova = Math.round(distanceKm * 17.5 / 100) * 100 + 99;
  const crysta = Math.round(distanceKm * 21 / 100) * 100 + 99;
  return {
    mini: mini.toLocaleString("en-IN"),
    sedan: sedan.toLocaleString("en-IN"),
    suv: suv.toLocaleString("en-IN"),
    innova: innova.toLocaleString("en-IN"),
    crysta: crysta.toLocaleString("en-IN"),
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
};
