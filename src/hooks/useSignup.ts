import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postSignup } from "../apis/auth/auth";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [valid, setValid] = useState("");
  const {
    state: { isLoggedIn },
  } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const signup = async () => {
    const requestBody = {
      email,
      nick,
      password,
    };

    const rs = await postSignup(requestBody);
    if (rs) {
      const handler = {
        success: () => router.push("/signin"),
        status403: () => setValid(rs.message),
        status409: () => setValid(rs.message),
      };
      responseHandler(rs, handler);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    nick,
    setNick,
    passwordConfirm,
    setPasswordConfirm,
    signup,
    valid,
  };
};

export default useSignup;
