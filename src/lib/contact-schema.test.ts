import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

describe("contactSchema", () => {
  it("accepts valid payload", () => {
    const result = contactSchema.safeParse({
      name: "Igor",
      email: "igor@example.com",
      message: "Hello from the portfolio contact form.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short message", () => {
    const result = contactSchema.safeParse({
      name: "Igor",
      email: "igor@example.com",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Igor",
      email: "not-an-email",
      message: "Valid length message here.",
    });
    expect(result.success).toBe(false);
  });
});
