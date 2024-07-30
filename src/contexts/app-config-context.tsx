"use client";

import { Character, CharactersProps } from "@/types";
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
  // detailCharacters: null;
  // setDetailCharacters: (detailCharacters: any) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  favCharacters: Character[] | null;
  setFavCharacters: Dispatch<SetStateAction<Character[] | null>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const AppConfigContext = createContext<AppConfigContextProps>({
  characters: null,
  setCharacters: () => {},
  // detailCharacters: [],
  // setDetailCharacters: (detailCharacters: any) => {},
  isLoading: false,
  setIsLoading: () => {},
  favCharacters: null,
  setFavCharacters: () => {},
  searchValue: "",
  setSearchValue: () => {}
});

export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharactersProps | null>(null);
  // const [detailCharacters, setDetailCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favCharacters, setFavCharacters] = useState<Character[] | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const values = useMemo(
    () => ({
      characters,
      setCharacters,
      isLoading,
      setIsLoading,
      favCharacters,
      setFavCharacters,
      searchValue,
      setSearchValue
    }),
    [characters, isLoading, favCharacters, searchValue]
  );

  return (
    <AppConfigContext.Provider value={values}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
