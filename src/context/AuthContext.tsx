"use client";

import { createContext, useEffect, useState } from "react";
import { postSignin, postSignout, postSignup } from "../apis/auth/auth";
import { getUserMe } from "../apis/user/user";
import { Signin, Signup } from "../types/APIRequest";
import {
  ResponseHandler,
  responseHandler,
} from "../utils/common/responseHandler";

type Context = {
  state: {
    isLoggedIn: boolean;
    user: {
      email: string;
      nick: string;
    };
  };
  signin: (form: Signin, handler: ResponseHandler) => Promise<void>;
  signup: (form: Signup, handler: ResponseHandler) => Promise<void>;
  signout: (handler: ResponseHandler) => Promise<void>;
};

export const AuthContext = createContext<Context>({
  state: {
    isLoggedIn: false,
    user: {
      email: "",
      nick: "",
    },
  },
  signin: async (form: Signin) => {},
  signup: async (form: Signup) => {},
  signout: async () => {},
});

export const AuthContextProvider = ({
  children,
  hasToken,
}: {
  children: React.ReactNode;
  hasToken: boolean;
}) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: hasToken,
    user: {
      email: "",
      nick: "",
    },
  });

  const signin = async (form: Signin, handler: ResponseHandler) => {
    const rs = await postSignin(form);
    if (rs) {
      if (rs.result === "success") {
        setAuthState({
          isLoggedIn: true,
          user: { email: rs.payload.email, nick: rs.payload.nick },
        });
      }
      if (handler) {
        responseHandler(rs, handler);
      }
    }
  };

  const signup = async (form: Signup, handler: ResponseHandler) => {
    const rs = await postSignup(form);
    if (rs) {
      responseHandler(rs, handler);
    }
  };

  const signout = async (handler: ResponseHandler) => {
    const rs = await postSignout();
    console.log(rs);
    if (rs) {
      if (rs.result === "success") {
        setAuthState(() => ({
          isLoggedIn: false,
          user: { email: "", nick: "" },
        }));
      }
      responseHandler(rs, handler);
    }
  };

  // 로그인중인지 체크
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
    <AuthContext.Provider value={{ state: authState, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
