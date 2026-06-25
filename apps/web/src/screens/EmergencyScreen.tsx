import { useNavigate } from "react-router-dom";
import emergencyData from "@baseline/content/okinawa/modules/emergency.json";

const CATEGORY_ICONS: Record<string, string> = {
  emergency: "🚨",
  medical: "🏥",
  typhoon: "🌀",
  family: "🤝",
};

export default function EmergencyScreen() {
  const navigate = useNavigate();

  function handleCall(number: string) {
    if (/^\d{3}$/.test(number.trim())) {
      window.location.href = `tel:${number.trim()}`;
      return;
    }
    const digits = number.replace(/[^0-9]/g, "");
    if (digits.startsWith("0")) {
      window.location.href = `tel:01181${digits.slice(1)}`;
      return;
    }
    window.location.href = `tel:${digits}`;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* Header */}
      <div className="px-5 pt-10 pb-4 bg-red-600">
        <button
          onClick={() => navigate("/")}
          className="text-red-200 text-sm mb-2 active:opacity-70"
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Emergency</h1>
        <p className="text-red-200 text-sm mt-1">
          Tap any number to call
        </p>
      </div>

      {/* Warning banner */}
      <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-2xl px-4 py-3" role="note">
        <p className="text-red-700 text-sm font-medium">
          <span aria-hidden="true">🇯🇵</span>{" "}
          In Japan, call <strong>110</strong> for police and <strong>119</strong> for fire or ambulance.
        </p>
        <p className="text-red-500 text-xs mt-1">
          On-base 911 only works from DSN lines or base phones.
        </p>
      </div>

      {/* Contact sections */}
      <div className="px-4 py-4 flex flex-col gap-6 pb-12">
        {emergencyData.map((section) => (
          <div key={section.category}>
            <h2 className="text-xs text-gray-400 uppercase tracking-wide mb-2 px-1">
              <span aria-hidden="true">{CATEGORY_ICONS[section.category]}</span>{" "}
              {section.title}
            </h2>
            <div className="flex flex-col gap-2" role="list">
              {section.contacts.map((contact, i) => (
                <button
                  key={i}
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-white rounded-2xl px-4 py-4 shadow-sm text-left active:scale-95 transition-transform"
                  aria-label={`Call ${contact.label} at ${contact.number}`}
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
                      {contact.number}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}