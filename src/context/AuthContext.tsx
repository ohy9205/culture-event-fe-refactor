"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAccessToken } from "../utils/getAccessToken";

type InitialValue = {
  state: InitialState;
  setAuth: (email: string, nick: string) => void;
  initAuth: () => void;
};

type InitialState = {
  isLoggedIn: boolean | undefined;
  user: {
    email: string;
    nick: string;
  };
};

const initialValue = {
  state: {
    isLoggedIn: undefined,
    user: {
      email: "",
      nick: "",
    },
  },
  setAuth: (email: string, nick: string) => {},
  initAuth: () => {},
};

const AuthContext = createContext<InitialValue>(initialValue);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState<InitialState>(initialValue.state);

  const setAuth = (email: string, nick: string) => {
    setAuthState({ isLoggedIn: true, user: { email, nick } });
  };

  const initAuth = () => {
    setAuthState((prev) => ({ ...prev, isLoggedIn: false }));
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAuthState((prev) => ({ ...prev, isLoggedIn: true }));
    } else {
      setAuthState((prev) => ({ ...prev, isLoggedIn: false }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state: authState, setAuth, initAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
