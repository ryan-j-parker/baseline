import { useState } from "react";
import { useNavigate } from "react-router-dom";
import carData from "@baseline/content/okinawa/modules/car-and-driving.json";
import SponsoredListingCard from "../components/SponsoredListingCard";
import { useSponsoredListings } from "../hooks/useSponsoredListings";

type Contact = {
  label: string;
  number: string;
  note?: string;
};

type Section = {
  heading: string;
  body: string;
  contacts: Contact[];
  steps: string[];
  tips: string[];
};

type CarCategory = {
  id: string;
  title: string;
  icon: string;
  sections: Section[];
};

const EXTERNAL_LINKS: Record<string, { label: string; url: string; icon: string }[]> = {
  "car-buying": [
    {
      label: "Open Facebook Marketplace",
      url: "https://www.facebook.com/marketplace/okinawa",
      icon: "📘",
    },
    {
      label: "Yahoo Auctions Japan",
      url: "https://auctions.yahoo.co.jp/category/list/2084055786",
      icon: "🔨",
    },
  ],
  "driving-rules": [
    {
      label: "Open in Waze",
      url: "https://waze.com",
      icon: "🗺️",
    },
    {
      label: "Open in Google Maps",
      url: "https://maps.google.com",
      icon: "📍",
    },
  ],
};

export default function CarAndDrivingScreen() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(carData[0].id);
  const active = carData.find((c) => c.id === activeId) as CarCategory;
  const externalLinks = EXTERNAL_LINKS[activeId] ?? [];
  const { data: sponsoredListings } = useSponsoredListings("car");

  function handleContact(number: string) {
    if (!number) return;
    if (number.startsWith("http")) {
      window.open(number, "_blank", "noopener noreferrer");
      return;
    }
    const digits = number.replace(/[^0-9]/g, "");
    if (!digits) return;
    if (digits.startsWith("0")) {
      window.location.href = `tel:+81${digits.slice(1)}`;
      return;
    }
    window.location.href = `tel:${digits}`;
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
        <h1 className="text-2xl font-bold text-white">Car & Driving</h1>
        <p className="text-blue-200 text-sm mt-1">Everything you need on Okinawa roads</p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-2 px-4 py-3 overflow-x-auto"
        role="tablist"
        aria-label="Car and driving categories"
      >
        {carData.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            role="tab"
            aria-selected={activeId === c.id}
            aria-controls={`tabpanel-${c.id}`}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeId === c.id
                ? "text-white"
                : "bg-white text-gray-500 border border-gray-200"
              }
            `}
            style={activeId === c.id ? { backgroundColor: "var(--color-brand)" } : {}}
          >
            <span aria-hidden="true">{c.icon}</span>{" "}{c.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        id={`tabpanel-${activeId}`}
        role="tabpanel"
        aria-label={active.title}
        className="px-4 pb-12 flex flex-col gap-6"
      >

        {/* Sponsored listings — car-buying tab only */}
        {activeId === "car-buying" && sponsoredListings && sponsoredListings.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide px-1">Featured</p>
            {sponsoredListings.map((listing) => (
              <SponsoredListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}

        {/* External links */}
        {externalLinks.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide px-1">Open In</p>
            <div className="flex gap-2 flex-wrap">
              {externalLinks.map((link) => (
                <button
                  key={link.url}
                  onClick={() => window.open(link.url, "_blank", "noopener noreferrer")}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 text-sm font-medium text-gray-700 active:scale-95 transition-transform"
                  aria-label={link.label}
                >
                  <span aria-hidden="true">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {active.sections.map((section, si) => (
          <div key={si} className="flex flex-col gap-3">

            {/* Heading + body */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-2">{section.heading}</p>
              <p className="text-gray-500 text-sm">{section.body}</p>
            </div>

            {/* Contacts */}
            {section.contacts.filter((c) => c.number).length > 0 && (
              <div className="flex flex-col gap-2" role="list">
                {section.contacts.filter((c) => c.number).map((contact, i) => (
                  <button
                    key={i}
                    onClick={() => handleContact(contact.number)}
                    className="w-full bg-white rounded-2xl px-4 py-4 shadow-sm text-left active:scale-95 transition-transform"
                    aria-label={
                      contact.number.startsWith("http")
                        ? `Visit ${contact.label}`
                        : `Call ${contact.label} at ${contact.number}`
                    }
                    role="listitem"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-3">
                        <p className="font-semibold text-gray-800 text-sm">{contact.label}</p>
                        {contact.note && (
                          <p className="text-gray-400 text-xs mt-1">{contact.note}</p>
                        )}
                      </div>
                      <span
                        className="text-sm font-bold shrink-0"
                        style={{ color: "var(--color-brand)" }}
                        aria-hidden="true"
                      >
                        {contact.number.startsWith("http") ? "↗" : contact.number}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Non-callable contacts */}
            {section.contacts.filter((c) => !c.number && c.label).length > 0 && (
              <div className="flex flex-col gap-2" role="list">
                {section.contacts.filter((c) => !c.number).map((contact, i) => (
                  <div
                    key={i}
                    role="listitem"
                    className="bg-white rounded-2xl px-4 py-4 shadow-sm"
                  >
                    <p className="font-semibold text-gray-800 text-sm">{contact.label}</p>
                    {contact.note && (
                      <p className="text-gray-400 text-xs mt-1">{contact.note}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Steps */}
            {section.steps && section.steps.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Steps</p>
                <ol className="flex flex-col gap-3" aria-label="Steps">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0"
                        style={{ backgroundColor: "var(--color-brand)" }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="text-gray-700 text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tips */}
            {section.tips && section.tips.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4" role="note">
                <p className="text-xs text-amber-600 uppercase tracking-wide mb-3">Tips</p>
                <ul className="flex flex-col gap-2" aria-label="Tips">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-amber-400 mt-0.5" aria-hidden="true">💡</span>
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}