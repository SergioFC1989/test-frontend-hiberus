import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CustomCornerCard } from "./custom-corner-card";

describe("CustomCornerCard", () => {
  it("should renders without errors", () => {
    render(<CustomCornerCard />);
  });

  it("should sets the width and height correctly", () => {
    const width = 20;
    const height = 30;
    const { getByTestId } = render(
      <CustomCornerCard width={width} height={height} />
    );

    const corner = getByTestId("corner");
    expect(corner.style.getPropertyValue("--width-corner")).toBe(`${width}px`);
    expect(corner.style.getPropertyValue("--height-corner")).toBe(`${height}px`);
  });
});