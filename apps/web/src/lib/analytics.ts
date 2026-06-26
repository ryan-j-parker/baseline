// Initialize — domain will be your Vercel URL or custom domain
const isProd = import.meta.env.PROD;

// Track page views — handled automatically by the script tag
export function trackPageView(_url?: string) {
  // Handled by Plausible script tag automatically
}

// Track custom events via Plausible's global function
export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>
) {
  if (!isProd) return;
  if (typeof window === "undefined") return;
  // @ts-ignore
  if (typeof window.plausible === "function") {
    // @ts-ignore
    window.plausible(name, { props });
  }
}

export const Analytics = {
  villageSelected: (villageId: string) =>
    trackEvent("Village Selected", { village: villageId }),

  tileTapped: (tileId: string) =>
    trackEvent("Tile Tapped", { tile: tileId }),

  screenViewed: (screen: string) =>
    trackEvent("Screen Viewed", { screen }),

  emergencyNumberCalled: (label: string) =>
    trackEvent("Emergency Number Called", { label }),

  searchPerformed: (query: string) =>
    trackEvent("Search Performed", { query }),

  externalLinkOpened: (label: string, destination: string) =>
    trackEvent("External Link Opened", { label, destination }),

  mapOpened: (label: string, app: string) =>
    trackEvent("Map Opened", { label, app }),

  villageChanged: (from: string, to: string) =>
    trackEvent("Village Changed", { from, to }),
};