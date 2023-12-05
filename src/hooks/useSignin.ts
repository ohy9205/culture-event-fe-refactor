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

  const responseHandler = (status: number, message: string) => {
    if (status === 403) {
      setEmailValid(message);
    } else if (status === 409) {
      alert(`${message} 이메일 또는 비밀번호를 확인해주세요`);
      setEmail("");
      setPassword("");
      setEmailValid("");
    } else if (status === 200) {
      mutate();
      router.push("/");
    }
  };

  const signin = async () => {
    const requestBody = {
      email,
      password,
    };

    const result = await postSignin(requestBody);

    if (result) {
      responseHandler(result.status, result.message);
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
