import { describe, expect, it } from "vitest";
import { compareDesc, format } from "../date";

describe("compareDesc", () => {
  it("returns -1 when left is newer than right", () => {
    expect(compareDesc(new Date("2024-02-01"), new Date("2024-01-01"))).toBe(-1);
  });

  it("returns 1 when left is older than right", () => {
    expect(compareDesc(new Date("2024-01-01"), new Date("2024-02-01"))).toBe(1);
  });

  it("returns 0 when both dates are equal", () => {
    const date = new Date("2024-01-01");
    expect(compareDesc(date, new Date("2024-01-01"))).toBe(0);
  });
});

describe("format", () => {
  it("zero-pads single-digit month and day", () => {
    expect(format(new Date(2024, 0, 5))).toBe("2024-01-05");
  });

  it("keeps double-digit month and day as-is", () => {
    expect(format(new Date(2024, 11, 25))).toBe("2024-12-25");
  });
});
