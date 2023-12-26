import { useRouter } from "next/navigation";
import { useState } from "react";
import { postSignin } from "../apis/auth/auth";
import { responseHandler } from "../apis/common/commonAPIFetch";
import { useAuthContext } from "../context/AuthContext";

const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const router = useRouter();
  const { setAuth } = useAuthContext();

  const signin = async () => {
    const requestBody = {
      email,
      password,
    };

    const rs = await postSignin(requestBody);

    if (rs) {
      const handler = {
        success: () => {
          setAuth(rs.payload.email, rs.payload.nick);
          router.push("/");
        },
        status403: () => {
          setEmailValid(rs.message);
        },
        status409: () => {
          alert(`${rs.message} 이메일 또는 비밀번호를 확인해주세요`);
          setEmail("");
          setPassword("");
          setEmailValid("");
        },
      };
      responseHandler(rs, handler);
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
