import { useRouter } from "next/navigation";
import { useState } from "react";
import { postSignin } from "../apis/auth/auth";
import useUser from "./useUser";

const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const router = useRouter();
  const { mutate } = useUser();

  const signin = async () => {
    const requestBody = {
      email,
      password,
    };

    const result = await postSignin(requestBody);

    if (result.status === 403) {
      setEmailValid(result.message);
    } else if (result.status === 409) {
      alert(`${result.message} 이메일 또는 비밀번호를 확인해주세요`);
      setEmail("");
      setPassword("");
      setEmailValid("");
    } else {
      mutate();
      router.push("/");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    signin,
    emailValid,
  };
};

export default useSignin;
