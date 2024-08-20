import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CharacterInputSearch } from "./character-input-search";

const mockSetSearchValue = vi.fn();

vi.mock("@/hooks/useCharacterInputSearch.ts", () => ({
  useCharacterInputSearch: () => ({
    isLoading: false,
    searchValue: "",
    setSearchValue: mockSetSearchValue,
    handleFilterCharacters: vi.fn()
  })
}));

describe("CharacterInputSearch", () => {
  it("should render the search input", () => {
    render(<CharacterInputSearch results={0} />);
    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
  });

  it("should change input text", () => {
    render(<CharacterInputSearch results={0} />);
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Iron Man" } });
    expect(mockSetSearchValue).toHaveBeenCalledWith("Iron Man");
  });
});
