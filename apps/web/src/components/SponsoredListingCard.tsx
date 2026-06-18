import type { SponsoredListing } from "../hooks/useSponsoredListings";
import { Analytics } from "../lib/analytics";

type Props = {
  listing: SponsoredListing;
};

export default function SponsoredListingCard({ listing }: Props) {
  function handleCall() {
    if (!listing.phone) return;
    Analytics.externalLinkOpened(listing.title, "phone");
    const digits = listing.phone.replace(/[^0-9]/g, "");
    if (digits.startsWith("0")) {
      window.location.href = `tel:+81${digits.slice(1)}`;
    } else {
      window.location.href = `tel:${digits}`;
    }
  }

  function handleWebsite() {
    if (!listing.website) return;
    Analytics.externalLinkOpened(listing.title, "website");
    window.open(listing.website, "_blank", "noopener noreferrer");
  }

  function handleWaze() {
    if (!listing.waze_url) return;
    Analytics.mapOpened(listing.title, "waze");
    window.location.href = listing.waze_url;
  }

  function handleMap() {
    if (!listing.map_url) return;
    Analytics.mapOpened(listing.title, "google");
    window.open(listing.map_url, "_blank", "noopener noreferrer");
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-amber-200">

      {/* Sponsored label */}
      <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: "#FEF9EE" }}>
        <span className="text-xs text-amber-600 font-medium uppercase tracking-wide">⭐ Sponsored</span>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <div className="flex items-start justify-between mb-2">
          <p className="font-semibold text-gray-800">{listing.title}</p>
          {listing.english_friendly && (
            <span
              className="text-xs px-2 py-1 rounded-full ml-2 shrink-0"
              style={{ backgroundColor: "#E8F0FB", color: "var(--color-brand)" }}
            >
              🇬🇧 English OK
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mb-4">{listing.description}</p>

        {/* Action buttons — Waze first */}
        <div className="flex gap-2 flex-wrap">
          {listing.phone && (
            <button
              onClick={handleCall}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-white active:scale-95 transition-transform"
              style={{ backgroundColor: "var(--color-brand)" }}
            >
              📞 Call
            </button>
          )}
          {listing.waze_url && (
            <button
              onClick={handleWaze}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-white active:scale-95 transition-transform"
              style={{ backgroundColor: "#33CCFF" }}
            >
              🗺️ Waze
            </button>
          )}
          {listing.map_url && (
            <button
              onClick={handleMap}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 active:scale-95 transition-transform"
            >
              📍 Maps
            </button>
          )}
          {listing.website && (
            <button
              onClick={handleWebsite}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 active:scale-95 transition-transform"
            >
              🌐 Website
            </button>
          )}
        </div>
      </div>
    </div>
  );
}