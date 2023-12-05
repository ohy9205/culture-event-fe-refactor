import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postSignup } from "../apis/auth/auth";
import useUser from "./useUser";

const useSignup = () => {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [valid, setValid] = useState("");

  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const signup = async () => {
    const requestBody = {
      email,
      nick,
      password,
    };

    const result = await postSignup(requestBody);

    if (result.status === 409 || result.status === 403) {
      setValid(result.message);
    } else if (result.status === 200) {
      router.push("/signin");
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
