export const APP_NAME = "DropTaxi";

// Phone — single source of truth. Update these to change the number site-wide.
export const SUPPORT_PHONE_E164 = "+917810046010";       // tel: hrefs, JSON-LD telephone
export const SUPPORT_PHONE = "+91 78100 46010";          // human display, with country code
export const SUPPORT_PHONE_DISPLAY = "78100 46010";      // human display, no country code
export const WHATSAPP_NUMBER = "917810046010";           // digits-only for wa.me
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const SUPPORT_EMAIL = "enquiry@droptaxi.ai";
export const SITE_URL = "https://www.droptaxi.ai";

// Fare rates — single source of truth.
// "Final" rates per ops; update here only.
export const ONE_WAY_RATES = {
  sedan: 13,
  suv: 18,
  innova: 19,
  crysta: 25,
} as const;
export const ROUND_TRIP_RATES = {
  sedan: 12,
  suv: 17,
  innova: 18,
  crysta: 23,
} as const;
export const ONE_WAY_MIN_KM = 130;
export const ROUND_TRIP_MIN_KM = 250;

export const VEHICLE_TYPES = [
  { name: "Mini", description: "Compact and economical for 3+1 passengers with light luggage." },
  { name: "Sedan", description: "Comfortable ride for 4+1 passengers with medium luggage." },
  { name: "Etios", description: "Spacious sedan for 4+1 passengers with generous boot space." },
  { name: "Sedan (Non-CNG)", description: "Petrol/diesel sedan for 4+1 passengers — ideal for hill routes." },
  { name: "SUV", description: "Spacious 6+1 or 7+1 seater with carrier — perfect for families." },
  { name: "Innova", description: "Reliable 6+1 or 7+1 seater with carrier for group travel." },
  { name: "Innova Crysta", description: "Premium 6+1 seater for corporate and VIP travel." },
];

export const TRUST_BADGES = ["No Return Fare", "24x7 Live Support", "GPS-Tracked Trips", "Verified Drivers"];
