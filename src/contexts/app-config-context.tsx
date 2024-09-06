"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer
} from "react";
import { appConfigReducer } from "./reducers/app-config-reducer";
import { appConfigInitialState } from "./states/app-config-initial-state";
import { AppConfigContextProps } from "./types";

const AppConfigContext = createContext<AppConfigContextProps>(undefined);

export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appConfigReducer, appConfigInitialState);

  const values = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppConfigContext.Provider value={values}>
      {children}
    </AppConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);

  if (!context) {
    throw new Error("useAppConfig must be used within an AppConfigProvider");
  }

  return context;
};
