import { describe, it, expect } from "vitest";
import { buildSearchIndex } from "@baseline/core";

describe("buildSearchIndex", () => {
  it("returns a non-empty array", () => {
    const index = buildSearchIndex();
    expect(index.length).toBeGreaterThan(0);
  });

  it("every result has required fields", () => {
    const index = buildSearchIndex();
    index.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("summary");
      expect(item).toHaveProperty("route");
      expect(item).toHaveProperty("category");
    });
  });

  it("finds trash results when searching for trash", () => {
    const index = buildSearchIndex();
    const results = index.filter(
      (item) =>
        item.title.toLowerCase().includes("trash") ||
        item.summary.toLowerCase().includes("trash") ||
        item.category.toLowerCase().includes("trash")
    );
    expect(results.length).toBeGreaterThan(0);
  });

  it("all routes start with /", () => {
    const index = buildSearchIndex();
    index.forEach((item) => {
      expect(item.route).toMatch(/^\//);
    });
  });
});