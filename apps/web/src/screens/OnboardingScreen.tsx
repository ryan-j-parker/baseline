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

  // Welcome screen
  if (step === "welcome") {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--color-brand)" }}>
            BaseLine
          </h1>
          <p className="text-gray-500 text-lg mb-2">Welcome to Okinawa.</p>
          <p className="text-gray-400 text-sm mb-12">
            Your guide to life on island — from day one.
          </p>
          <button
            onClick={() => setStep("housing-status")}
            className="w-full max-w-sm py-4 rounded-2xl text-white font-semibold text-lg active:scale-95 transition-transform"
            style={{ backgroundColor: "var(--color-brand)" }}
          >
            Get Started
          </button>
          <button
            onClick={handleSkip}
            className="mt-4 text-gray-400 text-sm active:opacity-70"
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
        <div className="mb-8">
          <button
            onClick={() => setStep("welcome")}
            className="text-gray-400 text-sm mb-6 active:opacity-70"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Have you moved into permanent housing?
          </h2>
          <p className="text-gray-400 text-sm">
            This helps us show you the right information.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleHousingStatus("off-base")}
            className="w-full text-left px-5 py-5 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
          >
            <p className="font-semibold text-gray-800 text-lg">🏠 Yes — I'm off base</p>
            <p className="text-gray-400 text-sm mt-1">Living in a local housing agency property</p>
          </button>

          <button
            onClick={() => handleHousingStatus("on-base")}
            className="w-full text-left px-5 py-5 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
          >
            <p className="font-semibold text-gray-800 text-lg">🪖 Yes — I'm on base</p>
            <p className="text-gray-400 text-sm mt-1">Living in base housing</p>
          </button>

          <button
            onClick={() => handleHousingStatus("temporary")}
            className="w-full text-left px-5 py-5 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
          >
            <p className="font-semibold text-gray-800 text-lg">🏨 Not yet</p>
            <p className="text-gray-400 text-sm mt-1">Still in a hotel or temporary lodging</p>
          </button>
        </div>

        <button
          onClick={handleSkip}
          className="mt-6 text-center text-gray-400 text-sm active:opacity-70"
        >
          Skip for now
        </button>
      </div>
    );
  }

  // Select base (on-base flow)
  if (step === "select-base") {
    return (
      <div
        className="min-h-screen flex flex-col px-6 py-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="mb-8">
          <button
            onClick={() => setStep("housing-status")}
            className="text-gray-400 text-sm mb-6 active:opacity-70"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Which base?</h2>
          <p className="text-gray-400 text-sm">Select your installation.</p>
        </div>

        <div className="flex flex-col gap-3">
          {BASES.map((base) => (
            <button
              key={base.id}
              onClick={() => handleBaseSelect(base.id)}
              className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
            >
              <p className="font-semibold text-gray-800">{base.name}</p>
            </button>
          ))}
          <button
            onClick={handleSkip}
            className="w-full text-left px-5 py-4 rounded-2xl border border-dashed border-gray-300 text-gray-400 active:scale-95 transition-transform mt-2"
          >
            Not sure yet
          </button>
        </div>
      </div>
    );
  }

  // Select housing agency (off-base flow)
  if (step === "select-agency") {
    return (
      <div
        className="min-h-screen flex flex-col px-6 py-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="mb-8">
          <button
            onClick={() => setStep("housing-status")}
            className="text-gray-400 text-sm mb-6 active:opacity-70"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Who is your housing agency?
          </h2>
          <p className="text-gray-400 text-sm">
            This determines your trash pickup schedule.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {HOUSING_AGENCIES.map((agency) => (
            <button
              key={agency.id}
              onClick={() => handleAgencySelect(agency.id)}
              className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
            >
              <p className="font-semibold text-gray-800">{agency.name}</p>
            </button>
          ))}
          <button
            onClick={() => setStep("select-village")}
            className="w-full text-left px-5 py-4 rounded-2xl border border-dashed border-gray-300 text-gray-400 active:scale-95 transition-transform mt-2"
          >
            Not sure yet
          </button>
        </div>
      </div>
    );
  }

  // Select village (off-base flow, after agency)
  if (step === "select-village") {
    return (
      <div
        className="min-h-screen flex flex-col px-6 py-12"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="mb-8">
          <button
            onClick={() => setStep("select-agency")}
            className="text-gray-400 text-sm mb-6 active:opacity-70"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Which village are you in?
          </h2>
          <p className="text-gray-400 text-sm">
            Used for local info specific to your area.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {VILLAGES.map((village) => (
            <button
              key={village.id}
              onClick={() => handleVillageSelect(village.id)}
              className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm active:scale-95 transition-transform"
            >
              <span className="font-semibold text-gray-800">{village.name}</span>
              <span className="ml-2 text-gray-400 text-sm">{village.nameJa}</span>
            </button>
          ))}
          <button
            onClick={handleSkip}
            className="w-full text-left px-5 py-4 rounded-2xl border border-dashed border-gray-300 text-gray-400 active:scale-95 transition-transform mt-2"
          >
            Not sure yet
          </button>
        </div>
      </div>
    );
  }

  // Temporary housing
  if (step === "temporary") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <p className="text-5xl mb-6">🏨</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No problem</h2>
        <p className="text-gray-500 text-sm mb-2">
          You can update your housing details later in Settings once you're settled.
        </p>
        <p className="text-gray-400 text-xs mb-10">
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