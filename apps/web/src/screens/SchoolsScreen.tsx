import { useState } from "react";
import { useNavigate } from "react-router-dom";
import schoolsData from "@baseline/content/okinawa/modules/schools.json";

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

type SchoolCategory = {
  id: string;
  title: string;
  icon: string;
  sections: Section[];
};

export default function SchoolsScreen() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string>(schoolsData[0].id);
  const active = schoolsData.find((s) => s.id === activeId) as SchoolCategory;

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
        <button onClick={() => navigate("/")} className="text-blue-200 text-sm mb-2 active:opacity-70">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-white">Schools</h1>
        <p className="text-blue-200 text-sm mt-1">DoDEA, homeschool, and local options</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {schoolsData.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeId === s.id
                ? "text-white"
                : "bg-white text-gray-500 border border-gray-200"
              }
            `}
            style={activeId === s.id ? { backgroundColor: "var(--color-brand)" } : {}}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 pb-12 flex flex-col gap-6">
        {active.sections.map((section, si) => (
          <div key={si} className="flex flex-col gap-3">

            {/* Heading + body */}
            {section.body && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="font-semibold text-gray-800 mb-2">{section.heading}</p>
                <p className="text-gray-500 text-sm">{section.body}</p>
              </div>
            )}

            {/* Contacts */}
            {section.contacts.filter((c) => c.number).map((contact, i) => (
              <button
                key={i}
                onClick={() => handleContact(contact.number)}
                className="w-full bg-white rounded-2xl px-4 py-4 shadow-sm text-left active:scale-95 transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-3">
                    <p className="font-semibold text-gray-800 text-sm">{contact.label}</p>
                    {contact.note && (
                      <p className="text-gray-400 text-xs mt-1">{contact.note}</p>
                    )}
                  </div>
                  <span className="text-sm font-bold shrink-0" style={{ color: "var(--color-brand)" }}>
                    {contact.number.startsWith("http") ? "↗" : contact.number}
                  </span>
                </div>
              </button>
            ))}

            {/* Non-callable contacts */}
            {section.contacts.filter((c) => !c.number && c.label).map((contact, i) => (
              <div key={i} className="bg-white rounded-2xl px-4 py-4 shadow-sm">
                <p className="font-semibold text-gray-800 text-sm">{contact.label}</p>
                {contact.note && (
                  <p className="text-gray-400 text-xs mt-1">{contact.note}</p>
                )}
              </div>
            ))}

            {/* Steps */}
            {section.steps && section.steps.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Steps</p>
                <ul className="flex flex-col gap-3">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0"
                        style={{ backgroundColor: "var(--color-brand)" }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-gray-700 text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {section.tips && section.tips.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-xs text-amber-600 uppercase tracking-wide mb-3">Tips</p>
                <ul className="flex flex-col gap-2">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="text-amber-400 mt-0.5">💡</span>
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