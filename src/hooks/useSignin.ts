import { useRouter } from "next/navigation";
import { useState } from "react";
import { postSignin } from "../apis/auth/auth";
import { useAuthContext } from "../context/AuthContext";

const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const router = useRouter();
  const { setAuth } = useAuthContext();

  const responseHandler = (result: {
    status: number;
    message: string;
    payload: Record<string, any>;
  }) => {
    const { status, message, payload } = result;
    if (status === 403) {
      setEmailValid(message);
    } else if (status === 409) {
      alert(`${message} 이메일 또는 비밀번호를 확인해주세요`);
      setEmail("");
      setPassword("");
      setEmailValid("");
    } else if (status === 200) {
      setAuth(payload.email, payload.nick);
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
      responseHandler(result);
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
