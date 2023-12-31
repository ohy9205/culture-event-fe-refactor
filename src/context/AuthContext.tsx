"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserMe } from "../apis/user/user";

type InitialValue = {
  state: InitialState;
  setAuth: (email: string, nick: string) => void;
  resetAuth: () => void;
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
  resetAuth: () => {},
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

  const resetAuth = () => {
    setAuthState((prev) => ({ ...prev, isLoggedIn: false }));
  };

  useEffect(() => {
    const checkLogin = async () => {
      const { status, payload } = await getUserMe();
      if (status === 200) {
        setAuthState((prev) => ({
          ...prev,
          isLoggedIn: true,
          user: { email: payload.user.email, nick: payload.user.nick },
        }));
      } else {
        setAuthState((prev) => ({ ...prev, isLoggedIn: false }));
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ state: authState, setAuth, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
