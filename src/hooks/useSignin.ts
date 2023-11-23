import { useRouter } from "next/navigation";
import { useState } from "react";
import { postSignin } from "../apis/auth";
import useUser from "./useUser";

const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { mutate } = useUser();

  const signin = async () => {
    const requestBody = {
      email,
      password,
    };

    const result = await postSignin(requestBody);

    if (result.code !== 200) {
      alert(result.message);
    } else {
      localStorage.setItem("at", result.at);
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
  };
};

export default useSignin;
