"use client";

import { CharactersProps } from "@/types";
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
}

const AppConfigContext = createContext<AppConfigContextProps>({
  characters: null,
  setCharacters: () => {},
  // detailCharacters: [],
  // setDetailCharacters: (detailCharacters: any) => {},
  isLoading: false,
  setIsLoading: () => {}
});

export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharactersProps | null>(null);
  // const [detailCharacters, setDetailCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const values = useMemo(
    () => ({ characters, setCharacters, isLoading, setIsLoading }),
    [characters, isLoading]
  );

  return (
    <AppConfigContext.Provider value={values}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => useContext(AppConfigContext);
