export type SearchResult = {
  id: string;
  title: string;
  summary: string;
  route: string;
  category: string;
};

export function buildSearchIndex(): SearchResult[] {
  return [
    // Emergency
    {
      id: "emergency-police",
      title: "Police (Japan)",
      summary: "Call 110 for Japanese police. Works from any phone.",
      route: "/emergency",
      category: "Emergency",
    },
    {
      id: "emergency-fire",
      title: "Fire & Ambulance (Japan)",
      summary: "Call 119 for fire or ambulance. Works from any phone.",
      route: "/emergency",
      category: "Emergency",
    },
    {
      id: "emergency-hospital",
      title: "Naval Hospital Okinawa",
      summary: "Main US military hospital. Camp Foster Building 2966.",
      route: "/emergency",
      category: "Emergency",
    },
    {
      id: "emergency-typhoon",
      title: "Typhoon Condition Hotline",
      summary: "Call for current TCCOR status during typhoon season.",
      route: "/emergency",
      category: "Emergency",
    },

    // Trash
    {
      id: "trash-burnable",
      title: "Burnable Trash",
      summary: "Food scraps, paper, clothing. Use village-designated bags.",
      route: "/trash",
      category: "Trash & Recycling",
    },
    {
      id: "trash-nonburnable",
      title: "Non-Burnable Trash",
      summary: "Ceramics, glass, small appliances. Use designated bags.",
      route: "/trash",
      category: "Trash & Recycling",
    },
    {
      id: "trash-cans",
      title: "Cans",
      summary: "Rinse cans before disposal. Any clear bag is fine.",
      route: "/trash",
      category: "Trash & Recycling",
    },
    {
      id: "trash-bags",
      title: "Trash Bags",
      summary: "Village-designated bags required for burnable and non-burnable trash. Available at supermarkets and convenience stores.",
      route: "/trash",
      category: "Trash & Recycling",
    },

    // Utilities
    {
      id: "utilities-electricity",
      title: "Electricity Setup",
      summary: "Okinawa Electric Power Company (OEPC). Call English hotline at 098-853-2110.",
      route: "/utilities",
      category: "Utilities",
    },
    {
      id: "utilities-water",
      title: "Water Setup",
      summary: "Okinawa Prefecture Waterworks Bureau. Call 098-879-3710 to start service.",
      route: "/utilities",
      category: "Utilities",
    },
    {
      id: "utilities-gas",
      title: "Gas Setup",
      summary: "Most homes use propane (LP gas). Contact your landlord for the right provider.",
      route: "/utilities",
      category: "Utilities",
    },
    {
      id: "utilities-internet",
      title: "Internet Setup",
      summary: "Docomo Hikari and SoftBank most common. Setup takes 2–4 weeks. Get pocket WiFi immediately.",
      route: "/utilities",
      category: "Utilities",
    },
    {
      id: "utilities-phone",
      title: "Phone & SIM",
      summary: "Rakuten Mobile is cheapest. Docomo has best coverage. Bring passport and residence card.",
      route: "/utilities",
      category: "Utilities",
    },
    {
      id: "utilities-pocketwifi",
      title: "Pocket WiFi",
      summary: "Available at the airport and carrier stores. Works immediately while you wait for home internet.",
      route: "/utilities",
      category: "Utilities",
    },

    // Medical
    {
      id: "medical-hospital",
      title: "Naval Hospital Okinawa",
      summary: "Primary US military hospital on Camp Foster. Call 098-960-4820 for appointments.",
      route: "/medical",
      category: "Medical",
    },
    {
      id: "medical-dental",
      title: "Dental Clinics",
      summary: "On-base dental at Camp Foster and Kadena. Off-base options available in Chatan.",
      route: "/medical",
      category: "Medical",
    },
    {
      id: "medical-pharmacy",
      title: "Pharmacy",
      summary: "On-base pharmacy at Naval Hospital. Japanese pharmacies (薬局) island-wide.",
      route: "/medical",
      category: "Medical",
    },
    {
      id: "medical-tricare",
      title: "TRICARE Overseas",
      summary: "TRICARE Overseas Program (TOP) covers you in Okinawa. Call 1-888-777-8343.",
      route: "/medical",
      category: "Medical",
    },
    {
      id: "medical-mentalhealth",
      title: "Mental Health Support",
      summary: "Naval Hospital Behavioral Health, Military OneSource (1-800-342-9647), and Crisis Line (988).",
      route: "/medical",
      category: "Medical",
    },
    // Car & Driving
    {
  id: "car-sofa-license",
  title: "SOFA Driver's License",
  summary: "Get your SOFA license at the Newcomer's Brief. Bring your US license and military ID.",
  route: "/car-and-driving",
  category: "Car & Driving",
},
{
  id: "car-jci",
  title: "JCI Insurance",
  summary: "Mandatory Japanese vehicle liability insurance. Check expiration before buying a car.",
  route: "/car-and-driving",
  category: "Car & Driving",
},
{
  id: "car-buying",
  title: "Buying a Car",
  summary: "Lemon Lot on base, Facebook groups, GoodSpeed and Navi Okinawa dealerships.",
  route: "/car-and-driving",
  category: "Car & Driving",
},
{
  id: "car-road-tax",
  title: "Road Tax",
  summary: "Billed every May. Pay at any convenience store using the payment slip.",
  route: "/car-and-driving",
  category: "Car & Driving",
},
{
  id: "car-typhoon-driving",
  title: "Typhoon Driving Rules",
  summary: "Check TCCOR status before driving during typhoon season. TCCOR 1 means do not drive.",
  route: "/car-and-driving",
  category: "Car & Driving",
},
{
  id: "car-selling",
  title: "Selling Your Car Before PCS",
  summary: "List on Facebook groups 2–4 weeks before PCS. Include JCI date, shakken date, and photos.",
  route: "/car-and-driving",
  category: "Car & Driving",
},
    // Schools
    {
  id: "schools-dodea",
  title: "DoDEA Schools",
  summary: "On-base US schools K-12. Enroll at the district office with birth certificate and immunization records.",
  route: "/schools",
  category: "Schools",
},
{
  id: "schools-slo",
  title: "School Liaison Officer",
  summary: "Free help navigating school enrollment, IEPs, and special education transitions.",
  route: "/schools",
  category: "Schools",
},
{
  id: "schools-special-ed",
  title: "Special Education & IEP",
  summary: "DoDEA provides IEP and 504 services. Contact EFMP and the SLO before you arrive.",
  route: "/schools",
  category: "Schools",
},
{
  id: "schools-homeschool",
  title: "Homeschooling",
  summary: "Permitted for SOFA families. Follow your home state laws. Active co-op community on island.",
  route: "/schools",
  category: "Schools",
},
{
  id: "schools-japanese",
  title: "Japanese Local Schools",
  summary: "Enroll through your village office. Full immersion — no English instruction provided.",
  route: "/schools",
  category: "Schools",
},
// Groceries
{
  id: "groceries-commissary",
  title: "Commissary",
  summary: "On-base US grocery store. Cheapest source for American brands, meat, and dairy.",
  route: "/groceries",
  category: "Groceries",
},
{
  id: "groceries-san-a",
  title: "San-A Supermarket",
  summary: "Okinawa's largest supermarket chain. Best for everyday Japanese grocery shopping.",
  route: "/groceries",
  category: "Groceries",
},
{
  id: "groceries-costco",
  title: "Costco Japan",
  summary: "Membership warehouse in Chatan. US brands, bulk quantities, popular with military families.",
  route: "/groceries",
  category: "Groceries",
},
{
  id: "groceries-donki",
  title: "Don Quijote",
  summary: "24-hour discount store. Groceries, imported snacks, household goods. Chatan location.",
  route: "/groceries",
  category: "Groceries",
},
{
  id: "groceries-convenience",
  title: "Convenience Stores",
  summary: "7-Eleven, Family Mart, Lawson. Fresh food, bill payment, ATMs. Use constantly.",
  route: "/groceries",
  category: "Groceries",
},
{
  id: "groceries-farmers-market",
  title: "JA Farmers Markets",
  summary: "Fresh local produce at low prices. Go early — popular items sell out.",
  route: "/groceries",
  category: "Groceries",
},
{
  id: "groceries-cash",
  title: "Cash & Payment in Japan",
  summary: "Japan is cash-heavy. Use 7-Eleven ATMs for yen. Carry ¥10,000–¥20,000 at all times.",
  route: "/groceries",
  category: "Groceries",
},
// Maps
{
  id: "maps-foster",
  title: "Camp Foster",
  summary: "Main Marine Corps hub. Commissary, hospital, PX, legal office.",
  route: "/maps",
  category: "Maps",
},
{
  id: "maps-kadena",
  title: "Kadena Air Base",
  summary: "Largest US Air Force base in Asia. Main gate off Route 58.",
  route: "/maps",
  category: "Maps",
},
{
  id: "maps-hospital",
  title: "Naval Hospital Okinawa",
  summary: "Main US military hospital on Camp Foster.",
  route: "/maps",
  category: "Maps",
},
{
  id: "maps-costco",
  title: "Costco Japan Chatan",
  summary: "Membership warehouse store. US brands and bulk quantities.",
  route: "/maps",
  category: "Maps",
},
{
  id: "maps-american-village",
  title: "American Village",
  summary: "Shopping, restaurants, and entertainment in Chatan. Popular with military families.",
  route: "/maps",
  category: "Maps",
},
{
  id: "maps-shuri-castle",
  title: "Shuri Castle",
  summary: "UNESCO World Heritage Site. Historic Ryukyuan castle in Naha.",
  route: "/maps",
  category: "Maps",
},
  ];
}