import { prettify } from "./prettify";
import { test, expect } from "vitest";

test("prettify", () => {
  expect(prettify("  My Variable Name  ")).toBe("my-variable-name");
  expect(prettify("  My Variable - Name  ")).toBe("my-variable-name");
  expect(prettify("✅  My Variable Name  ")).toBe("my-variable-name");
  expect(prettify("🚦 User State - Input")).toBe("user-state-input");
});
