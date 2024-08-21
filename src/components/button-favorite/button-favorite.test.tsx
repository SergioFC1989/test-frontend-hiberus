import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ButtonFavorite } from "./button-favorite";

describe("ButtonFavorite", () => {
  it("should renders without errors", () => {
    render(<ButtonFavorite isActive />);
  });

  it("should calls onClick when clicked", () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <ButtonFavorite isActive={false} onClick={onClickMock} />
    );

    fireEvent.click(getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });
});
