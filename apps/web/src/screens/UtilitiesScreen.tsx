import { useState } from "react";
import { useNavigate } from "react-router-dom";
import utilitiesData from "@baseline/content/okinawa/modules/utilities.json";

type Utility = typeof utilitiesData[0];

export default function UtilitiesScreen() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(utilitiesData[0].id);
  const active = utilitiesData.find((u) => u.id === activeId) as Utility;

  function handleCall(number: string) {
    if (!number) return;
    const digits = number.replace(/[^0-9]/g, "");
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
        <h1 className="text-2xl font-bold text-white">Utilities</h1>
        <p className="text-blue-200 text-sm mt-1">Setup guides for your first week</p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-2 px-4 py-3 overflow-x-auto"
        role="tablist"
        aria-label="Utility categories"
      >
        {utilitiesData.map((u) => (
          <button
            key={u.id}
            onClick={() => setActiveId(u.id)}
            role="tab"
            aria-selected={activeId === u.id}
            aria-controls={`tabpanel-${u.id}`}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeId === u.id
                ? "text-white"
                : "bg-white text-gray-500 border border-gray-200"
              }
            `}
            style={activeId === u.id ? { backgroundColor: "var(--color-brand)" } : {}}
          >
            <span aria-hidden="true">{u.icon}</span>{" "}{u.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        id={`tabpanel-${activeId}`}
        role="tabpanel"
        aria-label={active.title}
        className="px-4 pb-12 flex flex-col gap-4"
      >

        {/* Provider + summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Provider</p>
          <p className="font-semibold text-gray-800 text-sm">{active.provider}</p>
          <p className="text-gray-500 text-sm mt-2">{active.summary}</p>
        </div>

        {/* Contacts */}
        {active.contacts.filter((c) => c.number).length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide px-1">Contact</p>
            {active.contacts.filter((c) => c.number).map((contact, i) => (
              <button
                key={i}
                onClick={() => handleCall(contact.number)}
                className="w-full bg-white rounded-2xl px-4 py-4 shadow-sm text-left active:scale-95 transition-transform"
                aria-label={`Call ${contact.label} at ${contact.number}`}
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
                    {contact.number}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Steps */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Steps</p>
          <ol className="flex flex-col gap-3" aria-label="Setup steps">
            {active.steps.map((step, i) => (
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

        {/* Tips */}
        {active.tips && active.tips.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4" role="note">
            <p className="text-xs text-amber-600 uppercase tracking-wide mb-3">Tips</p>
            <ul className="flex flex-col gap-2" aria-label="Tips">
              {active.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-amber-400 mt-0.5" aria-hidden="true">💡</span>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}