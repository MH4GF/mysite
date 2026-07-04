import { describe, expect, it } from "vitest";
import { cn } from "../cn";

describe("cn", () => {
  it("merges class names, drops falsy values, and resolves tailwind conflicts", () => {
    expect(cn("p-2", "text-sm")).toBe("p-2 text-sm");
    expect(cn("p-2", false, undefined, null, "text-sm")).toBe("p-2 text-sm");
    // twMerge resolves conflicting utility classes, keeping the last one
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
