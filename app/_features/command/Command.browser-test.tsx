import { describe, expect, it } from "vitest";
import { Command } from "./Command";
import { render, screen } from "@testing-library/react";

describe(Command, () => {
  it("Open and close with mouse", () => {
    render(<Command />);
    const button = screen.getByRole("button", { name: "Open command palette" });
    expect(button).toBeInTheDocument();
  });
});
