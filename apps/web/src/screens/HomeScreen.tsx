import { useNavigate } from "react-router-dom";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";
import { HOME_TILES } from "../lib/tiles";
import { Analytics } from "../lib/analytics";

export default function HomeScreen() {
  const navigate = useNavigate();
  const villageId = useUserPrefsStore((s) => s.villageId);
  const housingType = useUserPrefsStore((s) => s.housingType);
  const baseId = useUserPrefsStore((s) => s.baseId);

  function getLocationLabel(): string {
    if (housingType === "on-base" && baseId) {
      return baseId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    if (housingType === "off-base" && villageId) {
      return villageId.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    return "Okinawa";
  }

  function handleTileTap(tile: typeof HOME_TILES[0]) {
    if (tile.isLive) {
      Analytics.tileTapped(tile.id);
      navigate(tile.route);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div
        className="px-5 pt-12 pb-5 relative"
        style={{
          background: "linear-gradient(135deg, var(--color-brand-dark) 0%, var(--color-brand) 100%)",
        }}
      >
        <h1 className="text-2xl font-bold text-white tracking-tight">BaseLine</h1>
        <p className="mt-1 text-blue-200 text-sm">📍 {getLocationLabel()}</p>

        {/* Header actions */}
        <div className="absolute right-5 top-12 flex gap-4">
          <button
            onClick={() => navigate("/search")}
            className="text-white text-2xl active:opacity-70"
            aria-label="Search"
            aria-hidden="true"
          >
            🔍
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="text-white text-2xl active:opacity-70"
            aria-label="Settings"
            aria-hidden="true"
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
              flex flex-col items-start px-4 py-5 rounded-2xl
              active:scale-95 transition-all duration-150 text-left
              ${tile.id === "emergency"
                ? "col-span-2 shadow-lg shadow-red-200"
                : tile.isLive
                  ? "shadow-sm hover:shadow-md"
                  : "opacity-60"
              }
            `}
            style={{
              backgroundColor: tile.id === "emergency"
                ? "var(--color-danger)"
                : "var(--color-surface-card)",
              color: tile.id === "emergency" ? "white" : "var(--color-text-primary)",
            }}
          >
            <span className="text-3xl mb-3" aria-hidden="true">
              {tile.icon}
            </span>
            <span className="font-semibold text-sm leading-tight">{tile.title}</span>
            {!tile.isLive && tile.id !== "emergency" && (
              <span className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                Coming soon
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}