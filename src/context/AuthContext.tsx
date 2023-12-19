"use client";

import { createContext, useContext, useState } from "react";

const initialValue = {
  state: {
    isLoggedIn: false,
    user: {
      email: "",
      nick: "",
    },
  },
  setAuth: (email: string, nick: string) => {},
  initAuth: () => {},
};

const AuthContext = createContext(initialValue);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState(initialValue.state);

  const setAuth = (email: string, nick: string) => {
    setAuthState({ isLoggedIn: true, user: { email, nick } });
  };

  const initAuth = () => {
    setAuthState(initialValue.state);
  };

  return (
    <AuthContext.Provider value={{ state: authState, setAuth, initAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
