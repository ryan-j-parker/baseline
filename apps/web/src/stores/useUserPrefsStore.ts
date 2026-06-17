import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { VillageId } from "@baseline/core";

type UserPrefsState = {
  villageId: VillageId | null;
  hasCompletedOnboarding: boolean;
  setVillageId: (id: VillageId) => void;
  completeOnboarding: () => void;
};

export const useUserPrefsStore = create<UserPrefsState>()(
  persist(
    (set) => ({
      villageId: null,
      hasCompletedOnboarding: false,
      setVillageId: (id) => set({ villageId: id }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    { name: "baseline-user-prefs" }
  )
);