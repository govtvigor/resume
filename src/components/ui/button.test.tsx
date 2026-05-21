/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Launch</Button>);
    expect(screen.getByRole("button", { name: "Launch" })).toBeInTheDocument();
  });
});
