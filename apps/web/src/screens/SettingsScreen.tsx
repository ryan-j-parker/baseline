import { useNavigate } from "react-router-dom";
import { VILLAGES } from "@baseline/core";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";
import type { VillageId } from "@baseline/core";

export default function SettingsScreen() {
  const navigate = useNavigate();
  const villageId = useUserPrefsStore((s) => s.villageId);
  const setVillageId = useUserPrefsStore((s) => s.setVillageId);

  function handleVillageChange(id: VillageId) {
    setVillageId(id);
  }

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div className="px-5 pt-10 pb-4" style={{ backgroundColor: "var(--color-brand)" }}>
        <button onClick={() => navigate("/")} className="text-blue-200 text-sm mb-2 active:opacity-70">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-blue-200 text-sm mt-1">Manage your BaseLine preferences</p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-6 pb-12">

        {/* Village selection */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 px-1">Your Village</p>
          <div className="flex flex-col gap-2">
            {VILLAGES.map((village) => (
              <button
                key={village.id}
                onClick={() => handleVillageChange(village.id)}
                className={`
                  w-full text-left px-5 py-4 rounded-2xl border transition-colors
                  ${villageId === village.id
                    ? "border-transparent text-white"
                    : "bg-white border-gray-200 text-gray-800"
                  }
                `}
                style={villageId === village.id ? { backgroundColor: "var(--color-brand)" } : {}}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{village.name}</span>
                    <span className="ml-2 text-sm opacity-60">{village.nameJa}</span>
                  </div>
                  {villageId === village.id && (
                    <span className="text-white text-lg">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2 px-1">About</p>
          <div className="bg-white rounded-2xl px-5 py-4 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">App</span>
              <span className="text-gray-800 font-medium text-sm">BaseLine Okinawa</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Version</span>
              <span className="text-gray-800 font-medium text-sm">0.1.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Built for</span>
              <span className="text-gray-800 font-medium text-sm">US Military Families</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs text-amber-600 uppercase tracking-wide mb-2">Disclaimer</p>
          <p className="text-gray-600 text-xs leading-relaxed">
            BaseLine is an unofficial community resource. Information is provided in good faith but may not reflect the latest changes. Always verify critical information with your installation, village office, or official sources. In an emergency, call 110 (police) or 119 (fire/ambulance).
          </p>
        </div>

      </div>
    </div>
  );
}