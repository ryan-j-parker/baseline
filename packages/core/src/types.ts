export type VillageId =
  | "yomitan" | "chatan" | "okinawa-city"
  | "ginowan" | "uruma" | "onna";

export const VILLAGES: { id: VillageId; name: string; nameJa: string }[] = [
  { id: "yomitan",      name: "Yomitan",       nameJa: "読谷村" },
  { id: "chatan",       name: "Chatan",         nameJa: "北谷町" },
  { id: "okinawa-city", name: "Okinawa City",   nameJa: "沖縄市" },
  { id: "ginowan",      name: "Ginowan",        nameJa: "宜野湾市" },
  { id: "uruma",        name: "Uruma",          nameJa: "うるま市" },
  { id: "onna",         name: "Onna",           nameJa: "恩納村" },
];

export type TrashCategory =
  | "burnable"
  | "nonBurnable"
  | "cans"
  | "glass"
  | "plastic bottles"
  | "cardboard";

export type TrashRule = {
  villageId: VillageId;
  category: TrashCategory;
  title: string;
  bagColor?: string;
  bagNote?: string;
  instructions: string[];
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
  icon: string;          // emoji for now
  route: string;
  priority: number;
  isLive: boolean;       // grays out tiles not yet built
};