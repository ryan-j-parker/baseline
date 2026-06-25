import { describe, it, expect } from "vitest";
import { render, screen } from "./utils";
import userEvent from "@testing-library/user-event";
import SearchScreen from "../screens/SearchScreen";

describe("SearchScreen", () => {
  it("renders the search heading", () => {
    render(<SearchScreen />);
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<SearchScreen />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("shows empty state by default", () => {
    render(<SearchScreen />);
    expect(screen.getByText(/search across all baseline content/i)).toBeInTheDocument();
  });

  it("shows results when searching for trash", async () => {
    const user = userEvent.setup();
    render(<SearchScreen />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "trash");
    expect(screen.queryByText(/search across all baseline content/i)).not.toBeInTheDocument();
  });

  it("shows no results message for unknown query", async () => {
    const user = userEvent.setup();
    render(<SearchScreen />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "xyznotarealquery");
    expect(screen.getByText(/no results for/i)).toBeInTheDocument();
  });
});