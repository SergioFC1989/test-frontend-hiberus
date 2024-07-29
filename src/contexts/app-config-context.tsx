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
  charactersFav: Character[] | null;
  setCharactersFav: Dispatch<SetStateAction<Character[] | null>>;
}

const AppConfigContext = createContext<AppConfigContextProps>({
  characters: null,
  setCharacters: () => {},
  // detailCharacters: [],
  // setDetailCharacters: (detailCharacters: any) => {},
  isLoading: false,
  setIsLoading: () => {},
  charactersFav: null,
  setCharactersFav: () => {}
});

export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharactersProps | null>(null);
  // const [detailCharacters, setDetailCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [charactersFav, setCharactersFav] = useState<Character[] | null>(null);

  const values = useMemo(
    () => ({
      characters,
      setCharacters,
      isLoading,
      setIsLoading,
      charactersFav,
      setCharactersFav
    }),
    [charactersFav, characters, isLoading]
  );

  return (
    <AppConfigContext.Provider value={values}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
