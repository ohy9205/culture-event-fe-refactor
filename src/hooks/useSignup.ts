import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postSignup } from "../apis/auth";
import useUser from "./useUser";

const useSignup = () => {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

    if (result.code !== 200) {
      alert(result.message);
      router.push("/");
    } else {
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
  };
};

export default useSignup;
