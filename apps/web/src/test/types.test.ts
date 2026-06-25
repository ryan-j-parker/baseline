import { describe, it, expect } from "vitest";
import { VILLAGES, BASES, HOUSING_AGENCIES } from "@baseline/core";

describe("VILLAGES", () => {
  it("contains expected villages", () => {
    const ids = VILLAGES.map((v) => v.id);
    expect(ids).toContain("yomitan");
    expect(ids).toContain("chatan");
    expect(ids).toContain("okinawa-city");
  });

  it("every village has id, name, and nameJa", () => {
    VILLAGES.forEach((v) => {
      expect(v.id).toBeTruthy();
      expect(v.name).toBeTruthy();
      expect(v.nameJa).toBeTruthy();
    });
  });
});

describe("BASES", () => {
  it("contains all expected bases", () => {
    const ids = BASES.map((b) => b.id);
    expect(ids).toContain("camp-foster");
    expect(ids).toContain("kadena");
    expect(ids).toContain("torii-station");
  });

  it("every base has id and name", () => {
    BASES.forEach((b) => {
      expect(b.id).toBeTruthy();
      expect(b.name).toBeTruthy();
    });
  });
});

describe("HOUSING_AGENCIES", () => {
  it("contains 18 agencies", () => {
    expect(HOUSING_AGENCIES.length).toBe(18);
  });

  it("every agency has id, name, url, and phone", () => {
    HOUSING_AGENCIES.forEach((a) => {
      expect(a.id).toBeTruthy();
      expect(a.name).toBeTruthy();
      expect(a.url).toBeTruthy();
      expect(a.phone).toBeTruthy();
    });
  });

  it("all phone numbers match Japanese format", () => {
    HOUSING_AGENCIES.forEach((a) => {
      expect(a.phone).toMatch(/^0\d{2}-\d{3,4}-\d{4}$|^0\d{2}-\d{4}-\d{4}$|^09\d-\d{4}-\d{4}$/);
    });
  });

  it("all URLs start with http", () => {
    HOUSING_AGENCIES.forEach((a) => {
      expect(a.url).toMatch(/^https?:\/\//);
    });
  });
});