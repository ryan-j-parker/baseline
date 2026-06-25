import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mapsData from "@baseline/content/okinawa/modules/maps.json";

type Location = {
  label: string;
  note: string;
  wazeUrl: string;
  googleUrl: string;
};

type MapCategory = {
  id: string;
  title: string;
  icon: string;
  locations: Location[];
};

export default function MapsScreen() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(mapsData[0].id);
  const active = mapsData.find((m) => m.id === activeId) as MapCategory;

  function openWaze(url: string) {
    window.location.href = url;
  }

  function openGoogle(url: string) {
    window.open(url, "_blank", "noopener noreferrer");
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div className="px-5 pt-10 pb-4" style={{ backgroundColor: "var(--color-brand)" }}>
        <button
          onClick={() => navigate("/")}
          className="text-blue-200 text-sm mb-2 active:opacity-70"
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Maps</h1>
        <p className="text-blue-200 text-sm mt-1">Key locations around Okinawa</p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-2 px-4 py-3 overflow-x-auto"
        role="tablist"
        aria-label="Map categories"
      >
        {mapsData.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveId(m.id)}
            role="tab"
            aria-selected={activeId === m.id}
            aria-controls={`tabpanel-${m.id}`}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeId === m.id
                ? "text-white"
                : "bg-white text-gray-500 border border-gray-200"
              }
            `}
            style={activeId === m.id ? { backgroundColor: "var(--color-brand)" } : {}}
          >
            <span aria-hidden="true">{m.icon}</span>{" "}{m.title}
          </button>
        ))}
      </div>

      {/* Locations */}
      <div
        id={`tabpanel-${activeId}`}
        role="tabpanel"
        aria-label={active.title}
        className="px-4 pb-12 flex flex-col gap-3"
      >
        {active.locations.map((location, i) => (
          <div key={i} className="bg-white rounded-2xl px-4 py-4 shadow-sm">

            {/* Label + note */}
            <p className="font-semibold text-gray-800 text-sm">{location.label}</p>
            {location.note && (
              <p className="text-gray-400 text-xs mt-1 mb-3">{location.note}</p>
            )}

            {/* Map buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => openWaze(location.wazeUrl)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-white active:scale-95 transition-transform"
                style={{ backgroundColor: "var(--color-brand)" }}
                aria-label={`Open ${location.label} in Waze`}
              >
                <span aria-hidden="true">🗺️</span>
                <span>Waze</span>
              </button>
              <button
                onClick={() => openGoogle(location.googleUrl)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 active:scale-95 transition-transform"
                aria-label={`Open ${location.label} in Google Maps`}
              >
                <span aria-hidden="true">📍</span>
                <span>Google Maps</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}