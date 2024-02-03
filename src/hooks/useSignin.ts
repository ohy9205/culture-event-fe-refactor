import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { postSignin } from "../apis/auth/auth";
import { responseHandler } from "../utils/common/responseHandler";
import { useAuth } from "./useAuth";
import useForm from "./useForm";

const useSignin = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const {
    data: { form, valid },
    changeForm,
    reset,
    setValid,
  } = useForm({ email: "", password: "" });

  return {
    data: { form, valid },
    changeForm,
    signin: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const rs = await postSignin(form);

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
