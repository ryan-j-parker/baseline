import { describe, it, expect } from "vitest";
import { render, screen } from "./utils";
import NotFoundScreen from "../screens/NotFoundScreen";

describe("NotFoundScreen", () => {
  it("renders the not found message", () => {
    render(<NotFoundScreen />);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders a back to home button", () => {
    render(<NotFoundScreen />);
    expect(screen.getByRole("button", { name: /back to home/i })).toBeInTheDocument();
  });

  it("renders the map emoji", () => {
    render(<NotFoundScreen />);
    expect(screen.getByText("🗺️")).toBeInTheDocument();
  });
});