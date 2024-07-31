import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CustomButtonFav } from "./custom-button-fav";

describe("CustomButtonFav", () => {
  it("renders without errors", () => {
    render(<CustomButtonFav isActive={false} />);
  });

  it("calls onClick when clicked", () => {
    const onClickMock = vi.fn();
    const { getByRole } = render(
      <CustomButtonFav isActive={false} onClick={onClickMock} />
    );

    fireEvent.click(getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("renders with active styles when isActive is true", () => {
    const { container } = render(<CustomButtonFav isActive={true} />);
    const iconElement = container.querySelector(".iconFilled");

    expect(iconElement).toBeInTheDocument();
  });

  it("renders with outlined styles when isActive is false", () => {
    const { container } = render(<CustomButtonFav isActive={false} />);
    const iconElement = container.querySelector(".iconOutlined");

    expect(iconElement).toBeInTheDocument();
  });
});