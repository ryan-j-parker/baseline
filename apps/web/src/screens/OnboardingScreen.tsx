import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VILLAGES, BASES, HOUSING_AGENCIES } from "@baseline/core";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";
import type { HousingType, HousingAgencyId, BaseId, VillageId } from "@baseline/core";

type Step =
  | "welcome"
  | "housing-status"
  | "select-base"
  | "select-agency"
  | "select-village"
  | "temporary";

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const {
    setHousingType,
    setHousingAgency,
    setBaseId,
    setVillageId,
    completeOnboarding,
  } = useUserPrefsStore();

  const [step, setStep] = useState<Step>("welcome");

  function handleHousingStatus(type: HousingType) {
    setHousingType(type);
    if (type === "on-base") setStep("select-base");
    else if (type === "off-base") setStep("select-agency");
    else setStep("temporary");
  }

  function handleBaseSelect(baseId: BaseId) {
    setBaseId(baseId);
    completeOnboarding();
    navigate("/");
  }

  function handleAgencySelect(agencyId: HousingAgencyId) {
    setHousingAgency(agencyId);
    setStep("select-village");
  }

  function handleVillageSelect(villageId: VillageId) {
    setVillageId(villageId);
    completeOnboarding();
    navigate("/");
  }

  function handleSkip() {
    completeOnboarding();
    navigate("/");
  }

  // Welcome
  if (step === "welcome") {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: "linear-gradient(160deg, var(--color-brand-dark) 0%, var(--color-brand) 60%, #2563EB 100%)",
        }}
      >
        <div className="flex-1 flex flex-col justify-end px-6 pb-16">
          <p className="text-blue-300 text-xs font-semibold mb-3 tracking-widest uppercase">
            Okinawa, Japan
          </p>
          <h1 className="text-5xl font-bold text-white mb-3 leading-tight">
            Base<span style={{ color: "#93C5FD" }}>Line</span>
          </h1>
          <p className="text-blue-100 text-lg mb-1">
            Welcome to the island.
          </p>
          <p className="text-blue-300 text-sm mb-12">
            Everything you need for your first days on Okinawa — offline, fast, and free.
          </p>
          <button
            onClick={() => setStep("housing-status")}
            className="w-full py-4 rounded-2xl font-semibold text-base active:scale-95 transition-transform"
            style={{ backgroundColor: "white", color: "var(--color-brand)" }}
          >
            Get Started →
          </button>
          <button
            onClick={handleSkip}
            className="mt-4 text-center text-blue-300 text-sm active:opacity-70 py-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  // Housing status
  if (step === "housing-status") {
    return (
      <div
        className="min-h-screen flex flex-col px-6 py-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <button
          onClick={() => setStep("welcome")}
          className="text-gray-400 text-sm mb-8 active:opacity-70 text-left"
          aria-label="Go back"
        >
          ← Back
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
            Have you moved into permanent housing?
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            This helps us show you the right information.
          </p>
        </div>

        <div className="flex flex-col gap-3" role="list">
          <button
            onClick={() => handleHousingStatus("off-base")}
            className="w-full text-left px-5 py-5 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
            role="listitem"
          >
            <p className="font-semibold text-gray-800 text-base">
              <span aria-hidden="true">🏠</span>{" "}Yes — I'm off base
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              Living in a local housing agency property
            </p>
          </button>

          <button
            onClick={() => handleHousingStatus("on-base")}
            className="w-full text-left px-5 py-5 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
            role="listitem"
          >
            <p className="font-semibold text-gray-800 text-base">
              <span aria-hidden="true">🪖</span>{" "}Yes — I'm on base
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              Living in base housing
            </p>
          </button>

          <button
            onClick={() => handleHousingStatus("temporary")}
            className="w-full text-left px-5 py-5 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
            role="listitem"
          >
            <p className="font-semibold text-gray-800 text-base">
              <span aria-hidden="true">🏨</span>{" "}Not yet
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              Still in a hotel or temporary lodging
            </p>
          </button>
        </div>

        <button
          onClick={handleSkip}
          className="mt-8 text-center text-sm active:opacity-70 py-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          Skip for now
        </button>
      </div>
    );
  }

  // Select base
  if (step === "select-base") {
    return (
      <div
        className="min-h-screen flex flex-col px-6 py-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <button
          onClick={() => setStep("housing-status")}
          className="text-gray-400 text-sm mb-8 active:opacity-70 text-left"
          aria-label="Go back"
        >
          ← Back
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
            Which base?
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Select your installation.
          </p>
        </div>

        <div className="flex flex-col gap-3" role="list">
          {BASES.map((base) => (
            <button
              key={base.id}
              onClick={() => handleBaseSelect(base.id)}
              className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
              role="listitem"
            >
              <p className="font-semibold text-gray-800">{base.name}</p>
            </button>
          ))}
          <button
            onClick={handleSkip}
            className="w-full text-left px-5 py-4 rounded-2xl border border-dashed border-gray-300 active:scale-95 transition-transform mt-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            Not sure yet
          </button>
        </div>
      </div>
    );
  }

  // Select agency
  if (step === "select-agency") {
    return (
      <div
        className="min-h-screen flex flex-col px-6 py-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <button
          onClick={() => setStep("housing-status")}
          className="text-gray-400 text-sm mb-8 active:opacity-70 text-left"
          aria-label="Go back"
        >
          ← Back
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
            Who is your housing agency?
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            This determines your trash pickup schedule.
          </p>
        </div>

        <div className="flex flex-col gap-2" role="list">
          {HOUSING_AGENCIES.map((agency) => (
            <button
              key={agency.id}
              onClick={() => handleAgencySelect(agency.id)}
              className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
              aria-label={`Select ${agency.name}, phone ${agency.phone}`}
              role="listitem"
            >
              <p className="font-semibold text-gray-800">{agency.name}</p>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {agency.phone}
              </p>
            </button>
          ))}
          <button
            onClick={() => setStep("select-village")}
            className="w-full text-left px-5 py-4 rounded-2xl border border-dashed border-gray-300 active:scale-95 transition-transform mt-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            Not sure yet
          </button>
        </div>
      </div>
    );
  }

  // Select village
  if (step === "select-village") {
    return (
      <div
        className="min-h-screen flex flex-col px-6 py-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <button
          onClick={() => setStep("select-agency")}
          className="text-gray-400 text-sm mb-8 active:opacity-70 text-left"
          aria-label="Go back"
        >
          ← Back
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
            Which village are you in?
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Used for local info specific to your area.
          </p>
        </div>

        <div className="flex flex-col gap-3" role="list">
          {VILLAGES.map((village) => (
            <button
              key={village.id}
              onClick={() => handleVillageSelect(village.id)}
              className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
              aria-label={`Select ${village.name}`}
              role="listitem"
            >
              <span className="font-semibold text-gray-800">{village.name}</span>
              <span className="ml-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {village.nameJa}
              </span>
            </button>
          ))}
          <button
            onClick={handleSkip}
            className="w-full text-left px-5 py-4 rounded-2xl border border-dashed border-gray-300 active:scale-95 transition-transform mt-2"
            style={{ color: "var(--color-text-muted)" }}
          >
            Not sure yet
          </button>
        </div>
      </div>
    );
  }

  // Temporary
  if (step === "temporary") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <p className="text-5xl mb-6" aria-hidden="true">🏨</p>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
          No problem
        </h2>
        <p className="text-sm mb-2" style={{ color: "var(--color-text-secondary)" }}>
          You can update your housing details later in Settings once you're settled.
        </p>
        <p className="text-xs mb-10" style={{ color: "var(--color-text-muted)" }}>
          In the meantime, BaseLine has everything you need — emergency contacts, utilities setup, car info, and more.
        </p>
        <button
          onClick={handleSkip}
          className="w-full max-w-sm py-4 rounded-2xl text-white font-semibold active:scale-95 transition-transform"
          style={{ backgroundColor: "var(--color-brand)" }}
        >
          Take me to BaseLine
        </button>
      </div>
    );
  }

  return null;
}