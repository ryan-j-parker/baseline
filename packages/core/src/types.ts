export type VillageId =
  | "yomitan"
  | "chatan"
  | "okinawa-city"
  | "ginowan"
  | "uruma"
  | "onna";

export type HousingType = "on-base" | "off-base" | "temporary" | null;

export type BaseId =
  | "camp-foster"
  | "kadena"
  | "camp-kinser"
  | "camp-courtney"
  | "camp-hansen"
  | "camp-schwab"
  | "torii-station";

export type HousingAgencyId =
  | "joy-housing"
  | "sunrise-housing"
  | "my-housing"
  | "imperial-housing"
  | "ace-family-housing"
  | "japan-family-housing"
  | "koza-housing"
  | "ishiken-housing"
  | "united-housing"
  | "star-housing"
  | "utopia-housing"
  | "seaside-housing"
  | "tokuzato-housing"
  | "central-housing"
  | "dynasty-housing"
  | "sky-housing"
  | "robinson-housing"
  | "ryo-housing";

export const VILLAGES: { id: VillageId; name: string; nameJa: string }[] = [
  { id: "yomitan",      name: "Yomitan",       nameJa: "読谷村" },
  { id: "chatan",       name: "Chatan",         nameJa: "北谷町" },
  { id: "okinawa-city", name: "Okinawa City",   nameJa: "沖縄市" },
  { id: "ginowan",      name: "Ginowan",        nameJa: "宜野湾市" },
  { id: "uruma",        name: "Uruma",          nameJa: "うるま市" },
  { id: "onna",         name: "Onna",           nameJa: "恩納村" },
];

export const BASES: { id: BaseId; name: string }[] = [
  { id: "camp-foster",    name: "Camp Foster" },
  { id: "kadena",         name: "Kadena Air Base" },
  { id: "camp-kinser",    name: "Camp Kinser" },
  { id: "camp-courtney",  name: "Camp Courtney" },
  { id: "camp-hansen",    name: "Camp Hansen" },
  { id: "camp-schwab",    name: "Camp Schwab" },
  { id: "torii-station",  name: "Torii Station" },
];

export const HOUSING_AGENCIES: { id: HousingAgencyId; name: string; url: string }[] = [
  { id: "joy-housing",          name: "Joy Housing",          url: "https://www.joy-housing.com" },
  { id: "sunrise-housing",      name: "Sunrise Housing",      url: "https://www.sunrisehousingokinawa.com" },
  { id: "my-housing",           name: "My Housing",           url: "https://myhousing.okinawa" },
  { id: "imperial-housing",     name: "Imperial Housing",     url: "https://www.imperialhousing-okinawa.com" },
  { id: "ace-family-housing",   name: "Ace Family Housing",   url: "https://www.acefamilyhousing.com" },
  { id: "japan-family-housing", name: "Japan Family Housing", url: "https://www.japanfamilyhousing.com" },
  { id: "koza-housing",         name: "Koza Housing",         url: "https://www.kozahousing.jp" },
  { id: "ishiken-housing",      name: "Ishiken Housing",      url: "https://www.ishikenhousingokinawa.com" },
  { id: "united-housing",       name: "United Housing",       url: "https://en.unitedhousing.co.jp" },
  { id: "star-housing",         name: "Star Housing",         url: "https://www.starhousing1.com" },
  { id: "utopia-housing",       name: "Utopia Housing",       url: "https://www.utopiahousing.okinawa" },
  { id: "seaside-housing",      name: "Seaside Housing",      url: "https://www.seasidehousing.jp" },
  { id: "tokuzato-housing",     name: "Tokuzato Housing",     url: "https://www.tokuzato.com" },
  { id: "central-housing",      name: "Central Housing",      url: "https://centralhousingokinawa.com" },
  { id: "dynasty-housing",      name: "Dynasty Housing",      url: "http://dynastyhousing.jp" },
  { id: "sky-housing",          name: "Sky Housing",          url: "https://sky-offbase.com" },
  { id: "robinson-housing",     name: "Robinson Housing",     url: "https://www.robinsonhousing-okinawa.com" },
  { id: "ryo-housing",          name: "Ryo Housing",          url: "https://www.ryohousing.com" },
];

export type TrashCategory =
  | "burnable"
  | "nonBurnable"
  | "cans"
  | "bottles"
  | "glass"
  | "plastic"
  | "cardboard";

export type TrashRule = {
  villageId: VillageId;
  category: TrashCategory;
  title: string;
  bagColor?: string;
  bagNote?: string;
  instructions: string[];
  pickupNotes?: string;
  pickupDays?: string;
  pickupTime?: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "contact"; label: string; phone: string }
  | { type: "warning"; text: string };

export type QuickTile = {
  id: string;
  title: string;
  icon: string;
  route: string;
  priority: number;
  isLive: boolean;
};