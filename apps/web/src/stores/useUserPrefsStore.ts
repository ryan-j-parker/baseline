import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VillageId, HousingType, HousingAgencyId, BaseId } from "@baseline/core";

type UserPrefsState = {
  // Onboarding
  hasCompletedOnboarding: boolean;

  // Housing
  housingType: HousingType;
  housingAgency: HousingAgencyId | null;
  baseId: BaseId | null;
  villageId: VillageId | null;

  // Actions
  setHousingType: (type: HousingType) => void;
  setHousingAgency: (agency: HousingAgencyId | null) => void;
  setBaseId: (base: BaseId | null) => void;
  setVillageId: (id: VillageId | null) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

export const useUserPrefsStore = create<UserPrefsState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      housingType: null,
      housingAgency: null,
      baseId: null,
      villageId: null,

      setHousingType: (housingType) => set({ housingType }),
      setHousingAgency: (housingAgency) => set({ housingAgency }),
      setBaseId: (baseId) => set({ baseId }),
      setVillageId: (villageId) => set({ villageId }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({
        hasCompletedOnboarding: false,
        housingType: null,
        housingAgency: null,
        baseId: null,
        villageId: null,
      }),
    }),
    { name: "baseline-user-prefs" }
  )
);