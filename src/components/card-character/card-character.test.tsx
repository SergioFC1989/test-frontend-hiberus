import { mockCharacter } from "@/lib/mock";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CardCharacter } from "./card-character";

const onClickMock = vi.fn();

describe("CardCharacter", () => {
  it("should render without errors", () => {
    render(<CardCharacter data={mockCharacter} isActive={false} />);
  });

  it("should call onClick when button is clicked", () => {
    const { getByRole } = render(
      <CardCharacter
        data={mockCharacter}
        isActive={false}
        onClick={onClickMock}
      />
    );

    fireEvent.click(getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });
});