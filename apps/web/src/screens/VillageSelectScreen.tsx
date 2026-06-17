import { useNavigate } from "react-router-dom";
import { VILLAGES } from "@baseline/core";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";
import type { VillageId } from "@baseline/core";
import { Analytics } from "../lib/analytics";

export default function VillageSelectScreen() {
  const navigate = useNavigate();
  const setVillageId = useUserPrefsStore((s) => s.setVillageId);
  const completeOnboarding = useUserPrefsStore((s) => s.completeOnboarding);

  function handleSelect(id: VillageId) {
  Analytics.villageSelected(id);
  setVillageId(id);
  completeOnboarding();
  navigate("/");
}

  return (
    <div className="min-h-screen flex flex-col px-6 py-12"
         style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold" style={{ color: "var(--color-brand)" }}>
          BaseLine
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Welcome to Okinawa.
        </p>
        <p className="text-gray-500 mt-1">
          Where are you living?
        </p>
      </div>

      {/* Village buttons */}
      <div className="flex flex-col gap-3">
        {VILLAGES.map((village) => (
          <button
            key={village.id}
            onClick={() => handleSelect(village.id)}
            className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
          >
            <span className="text-lg font-medium text-gray-800">
              {village.name}
            </span>
            <span className="ml-2 text-gray-400 text-sm">
              {village.nameJa}
            </span>
          </button>
        ))}

        {/* Not sure yet */}
        <button
          onClick={() => handleSelect("chatan")}
          className="w-full text-left px-5 py-4 rounded-2xl border border-dashed border-gray-300 text-gray-400 active:scale-95 transition-transform mt-2"
        >
          Not sure yet
        </button>
      </div>
    </div>
  );
}