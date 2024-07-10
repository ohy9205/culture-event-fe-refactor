"use client";

import { responseHandler } from "@/src/shared/lib";
import { ContextStore } from "@/src/shared/store";
import { ResponseHandler } from "@/src/shared/types";
import { postSignin, postSignout, postSignup } from "../api";
import { AuthState, Signin, Signup } from "../types";

const authStore = new ContextStore<AuthState>({
  auth: {
    isLoggedIn: false,
    user: {
      email: null,
      nick: null,
    },
  },
});

const useAuth = () => {
  const [state, updateState] = authStore.useGlobalState();

  const signin = async (form: Signin, handler: ResponseHandler) => {
    const rs = await postSignin(form);
    if (rs) {
      if (rs.result === "success") {
        updateState({
          auth: {
            isLoggedIn: true,
            user: {
              email: rs.payload.email,
              nick: rs.payload.nick,
            },
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
          auth: { isLoggedIn: false, user: { email: null, nick: null } },
        });
      }
      responseHandler(rs, handler);
    }
  };

  return {
    data: {
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    },
    signin,
    signup,
    signout,
    Provider: authStore.StoreProvider,
  };
};

export default useAuth;
