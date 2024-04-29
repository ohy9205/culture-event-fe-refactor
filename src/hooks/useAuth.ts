"use client";

import { useEffect } from "react";
import { postSignin, postSignout, postSignup } from "../apis/auth/auth";
import { Signin, Signup } from "../types/APIRequest";
import { AuthStatus } from "../types/user";
import {
  ResponseHandler,
  responseHandler,
} from "../utils/common/responseHandler";
import { ZustandStore } from "../utils/globalStore/ZustandStore";

const authStore = new ZustandStore<AuthStatus>({
  isLoggedIn: false,
  user: {
    email: "",
    nick: "",
  },
});

export const useAuth = (initialValue?: AuthStatus) => {
  const [state, updateState] = authStore.useGlobalState();

  const signin = async (form: Signin, handler: ResponseHandler) => {
    const rs = await postSignin(form);
    if (rs) {
      if (rs.result === "success") {
        updateState({
          isLoggedIn: true,
          user: {
            email: rs.payload.email,
            nick: rs.payload.nick,
          },
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

    if (rs) {
      if (rs.result === "success") {
        updateState({
          isLoggedIn: false,
          user: { email: "", nick: "" },
        });
      }
      responseHandler(rs, handler);
    }
  };

  useEffect(() => {
    if (initialValue) {
      updateState(initialValue);
    }
  }, [initialValue, updateState]);

  return {
    data: {
      isLoggedIn: state.isLoggedIn,
      user: state.user,
    },
    signin,
    signup,
    signout,
    Provider: authStore.StoreProvider,
  };
};
