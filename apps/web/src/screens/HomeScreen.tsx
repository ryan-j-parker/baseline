import { useNavigate } from "react-router-dom";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";
import { HOME_TILES } from "../lib/tiles";

export default function HomeScreen() {
  const navigate = useNavigate();
  const villageId = useUserPrefsStore((s) => s.villageId);
  
const villageName = villageId
  ? villageId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
  : "Okinawa";

  function handleTileTap(tile: typeof HOME_TILES[0]) {
    if (tile.isLive) {
      navigate(tile.route);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div className="px-5 pt-10 pb-4 relative" style={{ backgroundColor: "var(--color-brand)" }}>
        <h1 className="text-2xl font-bold text-white">BaseLine</h1>
        <p className="mt-1 text-blue-200 text-sm">📍 {villageName}</p>
        {/* Header actions */}
  <div className="absolute right-5 top-10 flex gap-4">
    <button
      onClick={() => navigate("/search")}
      className="text-white text-2xl active:opacity-70"
    >
      🔍
    </button>
    <button
      onClick={() => navigate("/settings")}
      className="text-white text-2xl active:opacity-70"
    >
      ⚙️
    </button>
  </div>
  </div>

      {/* Tile grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {HOME_TILES.sort((a, b) => a.priority - b.priority).map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleTileTap(tile)}
            className={`
              flex flex-col items-start px-4 py-5 rounded-2xl shadow-sm
              active:scale-95 transition-transform text-left
              ${tile.id === "emergency"
                ? "col-span-2 bg-red-600 text-white"
                : tile.isLive
                  ? "bg-white text-gray-800"
                  : "bg-white text-gray-300"
              }
            `}
          >
            <span className="text-3xl mb-2">{tile.icon}</span>
            <span className="font-semibold text-base">{tile.title}</span>
            {!tile.isLive && tile.id !== "emergency" && (
              <span className="text-xs mt-1 text-gray-300">Coming soon</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}