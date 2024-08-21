import { mockCharacter } from "@/lib/mock";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CharacterDetail } from "./character-detail";

describe("CharacterDetail", () => {
  it("should render the loader when data is not available", () => {
    const { getByTestId } = render(
      <CharacterDetail data={null} favCharacters={[]} />
    );
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should render the character details when data is available", () => {
    const { getByText, getByAltText } = render(
      <CharacterDetail data={mockCharacter} favCharacters={[mockCharacter]} />
    );

    expect(getByAltText("character-detail-page")).toBeInTheDocument();
    expect(getByText("3-D MAN")).toBeInTheDocument();
    expect(getByText("Without description")).toBeInTheDocument();
  });

  it("should call onClickFav when favorite button is clicked", () => {
    const onClickFavMock = vi.fn();
    const { getByRole } = render(
      <CharacterDetail
        data={mockCharacter}
        favCharacters={[mockCharacter]}
        onClickFav={onClickFavMock}
      />
    );

    fireEvent.click(getByRole("button"));
    expect(onClickFavMock).toHaveBeenCalledWith(mockCharacter);
  });
});
