import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { postSignin } from "../apis/auth/auth";
import { responseHandler } from "../apis/common/responseHandler";
import { useAuthContext } from "../context/AuthContext";
import useForm from "./useForm";

const useSignin = () => {
  const { setAuth } = useAuthContext();
  const router = useRouter();
  const [valid, setValid] = useState("");
  const {
    data: { values },
    change,
    reset,
  } = useForm({ email: "", password: "" });

  return {
    data: { form: values, valid },
    change,
    signin: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const rs = await postSignin(values);

      if (rs) {
        const handler = {
          success: () => {
            setAuth(rs.payload.email, rs.payload.nick);
            router.push("/");
          },
          status403: () => {
            setValid(rs.message);
          },
          status409: () => {
            alert(`${rs.message} 이메일 또는 비밀번호를 확인해주세요`);
            reset();
            setValid("");
          },
        };
        responseHandler(rs, handler);
      }
    },
  };
};

export default useSignin;
