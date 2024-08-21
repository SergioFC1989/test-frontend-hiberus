import { render } from "@testing-library/react";
import { vi } from "vitest";
import { AppConfigProvider, useAppConfig } from "./app-config-context";

let context = undefined;
const charactersSpy = vi.fn();
const setCharactersSpy = vi.fn();
const filteredCharactersSpy = vi.fn();
const setFilteredCharactersSpy = vi.fn();
const detailCharacterSpy = vi.fn();
const setDetailCharacterSpy = vi.fn();
const comicsSpy = vi.fn();
const setComicsSpy = vi.fn();
const favCharactersSpy = vi.fn();
const setFavCharactersSpy = vi.fn();
const isLoadingSpy = vi.fn();
const setIsLoadingSpy = vi.fn();
const searchValueSpy = vi.fn();
const setSearchValueSpy = vi.fn();

const MockContext = () => {
  context = useAppConfig();
  charactersSpy(context.characters);
  setCharactersSpy(context.setCharacters);
  filteredCharactersSpy(context.filteredCharacters);
  setFilteredCharactersSpy(context.setFilteredCharacters);
  detailCharacterSpy(context.detailCharacter);
  setDetailCharacterSpy(context.setDetailCharacter);
  comicsSpy(context.comics);
  setComicsSpy(context.setComics);
  favCharactersSpy(context.favCharacters);
  setFavCharactersSpy(context.setFavCharacters);
  isLoadingSpy(context.isLoading);
  setIsLoadingSpy(context.setIsLoading);
  searchValueSpy(context.searchValue);
  setSearchValueSpy(context.setSearchValue);

  return <div />;
};

describe("App config context test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the provider and access the context values", () => {
    render(
      <AppConfigProvider>
        <MockContext />
      </AppConfigProvider>
    );

    expect(charactersSpy).toHaveBeenCalledWith(null);
    expect(setCharactersSpy).toBeInstanceOf(Function);
    expect(filteredCharactersSpy).toHaveBeenCalledWith(null);
    expect(setFilteredCharactersSpy).toBeInstanceOf(Function);
    expect(detailCharacterSpy).toHaveBeenCalledWith(null);
    expect(setDetailCharacterSpy).toBeInstanceOf(Function);
    expect(comicsSpy).toHaveBeenCalledWith([]);
    expect(setComicsSpy).toBeInstanceOf(Function);
    expect(favCharactersSpy).toHaveBeenCalledWith(null);
    expect(setFavCharactersSpy).toBeInstanceOf(Function);
    expect(isLoadingSpy).toHaveBeenCalledWith(true);
    expect(setIsLoadingSpy).toBeInstanceOf(Function);
    expect(searchValueSpy).toHaveBeenCalledWith("");
    expect(setSearchValueSpy).toBeInstanceOf(Function);
  });
});
