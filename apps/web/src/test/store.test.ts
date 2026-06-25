import { describe, it, expect, beforeEach } from "vitest";
import { useUserPrefsStore } from "../stores/useUserPrefsStore";

describe("useUserPrefsStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useUserPrefsStore.setState({
      hasCompletedOnboarding: false,
      housingType: null,
      housingAgency: null,
      baseId: null,
      villageId: null,
    });
  });

  it("starts with no housing setup", () => {
    const state = useUserPrefsStore.getState();
    expect(state.housingType).toBeNull();
    expect(state.housingAgency).toBeNull();
    expect(state.baseId).toBeNull();
    expect(state.villageId).toBeNull();
    expect(state.hasCompletedOnboarding).toBe(false);
  });

  it("sets housing type", () => {
    useUserPrefsStore.getState().setHousingType("off-base");
    expect(useUserPrefsStore.getState().housingType).toBe("off-base");
  });

  it("sets village id", () => {
    useUserPrefsStore.getState().setVillageId("yomitan");
    expect(useUserPrefsStore.getState().villageId).toBe("yomitan");
  });

  it("sets housing agency", () => {
    useUserPrefsStore.getState().setHousingAgency("joy-housing");
    expect(useUserPrefsStore.getState().housingAgency).toBe("joy-housing");
  });

  it("sets base id", () => {
    useUserPrefsStore.getState().setBaseId("kadena");
    expect(useUserPrefsStore.getState().baseId).toBe("kadena");
  });

  it("completes onboarding", () => {
    useUserPrefsStore.getState().completeOnboarding();
    expect(useUserPrefsStore.getState().hasCompletedOnboarding).toBe(true);
  });

  it("resets onboarding", () => {
    useUserPrefsStore.getState().setVillageId("chatan");
    useUserPrefsStore.getState().setHousingType("off-base");
    useUserPrefsStore.getState().completeOnboarding();
    useUserPrefsStore.getState().resetOnboarding();
    const state = useUserPrefsStore.getState();
    expect(state.hasCompletedOnboarding).toBe(false);
    expect(state.housingType).toBeNull();
    expect(state.villageId).toBeNull();
  });
});