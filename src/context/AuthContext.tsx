"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserMe } from "../apis/user/user";

type InitialValue = {
  state: InitialState;
  setAuth: (email: string, nick: string) => void;
  resetAuth: () => void;
};

type InitialState = {
  isLoggedIn: boolean;
  user: {
    email: string;
    nick: string;
  };
};

const initialValue = {
  state: {
    isLoggedIn: false,
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
  hasToken,
}: {
  children: React.ReactNode;
  hasToken: boolean;
}) => {
  console.log("isLoggedIn Props  ", hasToken);

  const [authState, setAuthState] = useState<InitialState>({
    isLoggedIn: hasToken,
    user: {
      email: "",
      nick: "",
    },
  });

  const setAuth = (email: string, nick: string) => {
    setAuthState({ isLoggedIn: true, user: { email, nick } });
  };

  const resetAuth = () => {
    setAuthState(() => ({
      isLoggedIn: false,
      user: { email: "", nick: "" },
    }));
  };

  useEffect(() => {
    const checkLogin = async () => {
      const { status, payload } = await getUserMe();
      if (status === 200) {
        setAuthState((prev) => ({
          ...prev,
          user: { email: payload.user.email, nick: payload.user.nick },
        }));
      }
    };

    if (hasToken) {
      checkLogin();
    }
  }, [hasToken]);

  return (
    <AuthContext.Provider value={{ state: authState, setAuth, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
