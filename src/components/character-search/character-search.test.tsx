import { mockCharacter } from "@/lib/mock";
import { fireEvent, render, screen } from "@testing-library/react";
import { CharacterSearch } from "./character-search";

describe("CharacterSearch", () => {
  it("should render the title", () => {
    render(
      <CharacterSearch
        title="Search Characters"
        results={0}
        filteredCharacters={[]}
        favCharacters={[]}
        isLoading={false}
      />
    );
    const titleElement = screen.getByText("Search Characters");
    const resultsElement = screen.getByText("0 RESULTS");

    expect(titleElement).toBeInTheDocument();
    expect(resultsElement).toBeInTheDocument();
  });

  it("should render the loader when isLoading is true", () => {
    render(
      <CharacterSearch
        filteredCharacters={[]}
        favCharacters={[mockCharacter]}
        isLoading={true}
      />
    );
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  it("should render the characters when isLoading is false and filteredCharacters is not empty", () => {
    render(
      <CharacterSearch
        results={1}
        favCharacters={[mockCharacter]}
        filteredCharacters={[mockCharacter]}
        isLoading={false}
      />
    );

    const characterElements = screen.getAllByTestId("card-character");
    const resultsElement = screen.getByText("1 RESULTS");

    expect(characterElements.length).toBe(1);
    expect(resultsElement).toBeInTheDocument();
  });

  it("should click button favorite", () => {
    render(
      <CharacterSearch
        results={1}
        favCharacters={[mockCharacter]}
        filteredCharacters={[mockCharacter]}
        isLoading={false}
      />
    );

    const buttonFavoriteElement = screen.getByTestId("button-favorite");
    fireEvent.click(buttonFavoriteElement);

    expect(buttonFavoriteElement).toBeInTheDocument();
  });

  it("should render no characters when isLoading is false and filteredCharacters is empty", () => {
    render(
      <CharacterSearch
        results={0}
        favCharacters={[]}
        filteredCharacters={[]}
        isLoading={false}
      />
    );

    const characterElements = screen.queryAllByTestId("card-character");
    expect(characterElements.length).toBe(0);
  });
});
