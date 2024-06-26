"use client";

import { responseHandler } from "@/src/shared/lib";
import { ZustandSingletone } from "@/src/shared/store";
import { ResponseHandler } from "@/src/shared/types";
import { AuthStatus } from "../../user/types";
import { postSignin, postSignout, postSignup } from "../api";
import { Signin, Signup } from "../types";

type State = AuthStatus | undefined;

const useAuth = (initialValue?: AuthStatus) => {
  const authStore = ZustandSingletone.create<State>("auth", initialValue);
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

  return {
    data: {
      isLoggedIn: state?.isLoggedIn ? true : false,
      user: state?.user ? state?.user : undefined,
    },
    signin,
    signup,
    signout,
    Provider: authStore.StoreProvider,
  };
};

export default useAuth;
