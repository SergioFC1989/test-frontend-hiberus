import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CustomButtonFav } from "./custom-button-fav";

describe("CustomButtonFav", () => {
  it("should renders without errors", () => {
    render(<CustomButtonFav isActive />);
  });

  it("should calls onClick when clicked", () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <CustomButtonFav isActive={false} onClick={onClickMock} />
    );

    fireEvent.click(getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });
});