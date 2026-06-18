import Plausible from "plausible-tracker";

// Initialize — domain will be your Vercel URL or custom domain
// In dev mode this does nothing, only fires in production
const isProd = import.meta.env.PROD;

const plausible = isProd
  ? Plausible({
      domain: "onisland.io",
      trackLocalhost: false,
    })
  : null;

// Track page views manually (called on route changes)
export function trackPageView(url?: string) {
  if (!plausible) return;
  plausible.trackPageview({ url });
}

// Track custom events
export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>
) {
  if (!plausible) return;
  plausible.trackEvent(name, { props });
}

// Pre-defined events for BaseLine
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