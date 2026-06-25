import type { QuickTile } from "@baseline/core";

export const HOME_TILES: QuickTile[] = [
  { id: "emergency",  title: "Emergency",      icon: "🚨", route: "/emergency",    priority: 1, isLive: true },
  { id: "trash",      title: "Trash & Recycling", icon: "🗑️", route: "/trash",   priority: 2, isLive: true  },
  { id: "utilities",  title: "Utilities",       icon: "💡", route: "/utilities",   priority: 3, isLive: true },
  { id: "medical",    title: "Medical",          icon: "🏥", route: "/medical",    priority: 4, isLive: true },
  { id: "car-and-driving", title: "Car & Driving", icon: "🚗", route: "/car-and-driving", priority: 5, isLive: true },  
  { id: "schools",    title: "Schools",          icon: "🏫", route: "/schools",    priority: 6, isLive: true },
  { id: "phone",      title: "Phone & Internet", icon: "📱", route: "/phone",      priority: 7, isLive: true },
  { id: "groceries",  title: "Groceries",        icon: "🛒", route: "/groceries",  priority: 9, isLive: true },
  { id: "maps",       title: "Maps",             icon: "🗺️", route: "/maps",      priority: 10, isLive: true },
  { id: "search",     title: "Search",           icon: "🔍", route: "/search",     priority: 11, isLive: true },
];