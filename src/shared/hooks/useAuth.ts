"use client";

import { postSignin, postSignout, postSignup } from "../../apis/auth/auth";
import responseHandler, {
  ResponseHandler,
} from "../../utils/common/responseHandler";
import ZustandSingletone from "../../utils/globalStore/ZustandSingletone";
import { Signin, Signup } from "../types/APIRequest";
import { AuthStatus } from "../types/user";

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
