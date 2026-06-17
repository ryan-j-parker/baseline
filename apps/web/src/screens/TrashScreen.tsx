import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";
import trashData from "@baseline/content/okinawa/modules/trash.json";
import type { TrashCategory } from "@baseline/core";

type TrashRule = {
  villageId: string;
  category: TrashCategory;
  title: string;
  bagNote?: string;
  bagColor?: string;
  instructions: string[];
  pickupDays?: string;
  pickupTime?: string;
};

const typedTrashData = trashData as TrashRule[];

const CATEGORY_LABELS: Record<TrashCategory, string> = {
  burnable: "🔥 Burnable",
  nonBurnable: "🚫 Non-Burnable",
  cans: "🥫 Cans",
  glass: "🫙 Glass",
  "plastic bottles": "♻️ Plastic bottles",
  cardboard: "📦 Cardboard",
};

export default function TrashScreen() {
  const navigate = useNavigate();
  const villageId = useUserPrefsStore((s) => s.villageId);
  const villageRules = typedTrashData.filter((r) => r.villageId === villageId);
  const categories = villageRules.map((r) => r.category as TrashCategory);
  const [activeCategory, setActiveCategory] = useState<TrashCategory>(categories[0]);
  const activeRule = villageRules.find((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div className="px-5 pt-10 pb-4" style={{ backgroundColor: "var(--color-brand)" }}>
        <button onClick={() => navigate("/")} className="text-blue-200 text-sm mb-2 active:opacity-70">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Trash & Recycling</h1>
        <p className="text-blue-200 text-sm mt-1 capitalize">{villageId}</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeCategory === cat
                ? "text-white"
                : "bg-white text-gray-500 border border-gray-200"
              }
            `}
            style={activeCategory === cat ? { backgroundColor: "var(--color-brand)" } : {}}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeRule ? (
        <div className="px-4 pb-8 flex flex-col gap-4">

          {/* Pickup info */}
          {activeRule.pickupDays && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Pickup Days</p>
              <p className="font-semibold text-gray-800">{activeRule.pickupDays}</p>
              {activeRule.pickupTime && (
                <p className="text-gray-500 text-sm mt-1">Before {activeRule.pickupTime}</p>
              )}
            </div>
          )}

          {/* Bag info */}
          {activeRule.bagNote && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-xs text-amber-600 uppercase tracking-wide mb-1">Bag Requirements</p>
              <p className="text-gray-800 text-sm">{activeRule.bagNote}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Instructions</p>
            <ul className="flex flex-col gap-3">
              {activeRule.instructions.map((instruction, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0"
                        style={{ backgroundColor: "var(--color-brand)" }}>
                    {i + 1}
                  </span>
                  <span className="text-gray-700 text-sm">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-gray-400">
          No trash rules found for your village yet.
        </div>
      )}
    </div>
  );
}