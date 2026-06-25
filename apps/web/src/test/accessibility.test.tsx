import { describe, it, expect, afterEach } from "vitest";
import { render } from "./utils";
import axe from "axe-core";
import EmergencyScreen from "../screens/EmergencyScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SearchScreen from "../screens/SearchScreen";

afterEach(() => {
  document.body.innerHTML = "";
});

async function checkA11y(container: Element) {
  const results = await axe.run(container);
  const violations = results.violations;
  if (violations.length > 0) {
    const messages = violations.map(
      (v) => `[${v.impact}] ${v.id}: ${v.description}\n  ${v.nodes.map((n) => n.html).join("\n  ")}`
    ).join("\n\n");
    throw new Error(`Accessibility violations found:\n\n${messages}`);
  }
  return violations;
}

describe("Accessibility — WCAG 2.1 AA", () => {
  it("EmergencyScreen has no accessibility violations", async () => {
    const { container } = render(<EmergencyScreen />);
    const violations = await checkA11y(container);
    expect(violations).toHaveLength(0);
  });

  it("NotFoundScreen has no accessibility violations", async () => {
    const { container } = render(<NotFoundScreen />);
    const violations = await checkA11y(container);
    expect(violations).toHaveLength(0);
  });

  it("SearchScreen has no accessibility violations", async () => {
    const { container } = render(<SearchScreen />);
    const violations = await checkA11y(container);
    expect(violations).toHaveLength(0);
  });
});