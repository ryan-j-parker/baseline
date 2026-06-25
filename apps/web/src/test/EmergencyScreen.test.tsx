import { describe, it, expect } from "vitest";
import { render, screen } from "./utils";
import EmergencyScreen from "../screens/EmergencyScreen";

describe("EmergencyScreen", () => {
  it("renders the emergency heading", () => {
    render(<EmergencyScreen />);
    expect(screen.getByText("Emergency")).toBeInTheDocument();
  });

  it("renders the 110 police number", () => {
    render(<EmergencyScreen />);
    const elements = screen.getAllByText("110");
    expect(elements.length).toBeGreaterThan(0);
  });

  it("renders the 119 fire number", () => {
    render(<EmergencyScreen />);
    const elements = screen.getAllByText("119");
    expect(elements.length).toBeGreaterThan(0);
  });

  it("renders the warning banner", () => {
    render(<EmergencyScreen />);
    expect(screen.getByText(/on-base 911 only works from DSN/i)).toBeInTheDocument();
  });

  it("renders tap to call instruction", () => {
    render(<EmergencyScreen />);
    expect(screen.getByText(/tap any number to call/i)).toBeInTheDocument();
  });
});