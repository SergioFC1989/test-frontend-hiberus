"use client";

import {
  Character,
  CharactersProps,
  ComicPage,
  DetailCharacterProps
} from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from "react";

interface AppConfigContextProps {
  characters: CharactersProps | null;
  setCharacters: Dispatch<SetStateAction<CharactersProps | null>>;
  detailCharacter: DetailCharacterProps | null;
  setDetailCharacter: Dispatch<SetStateAction<DetailCharacterProps | null>>;
  comics: ComicPage[] | [];
  setComics: Dispatch<SetStateAction<ComicPage[] | []>>;
  favCharacters: Character[] | null;
  setFavCharacters: Dispatch<SetStateAction<Character[] | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const AppConfigContext = createContext<AppConfigContextProps>({
  characters: null,
  setCharacters: () => {},
  detailCharacter: null,
  setDetailCharacter: () => {},
  comics: [],
  setComics: () => {},
  favCharacters: null,
  setFavCharacters: () => {},
  isLoading: false,
  setIsLoading: () => {},
  searchValue: "",
  setSearchValue: () => {}
});

export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharactersProps | null>(null);
  const [detailCharacter, setDetailCharacter] =
    useState<DetailCharacterProps | null>(null);
  const [comics, setComics] = useState<ComicPage[] | []>([]);
  const [favCharacters, setFavCharacters] = useState<Character[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const values = useMemo(
    () => ({
      characters,
      setCharacters,
      detailCharacter,
      setDetailCharacter,
      comics,
      setComics,
      favCharacters,
      setFavCharacters,
      isLoading,
      setIsLoading,
      searchValue,
      setSearchValue
    }),
    [characters, comics, detailCharacter, favCharacters, isLoading, searchValue]
  );

  return (
    <AppConfigContext.Provider value={values}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
