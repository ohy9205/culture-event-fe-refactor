import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { postSignup } from "../apis/auth/auth";
import { responseHandler } from "../apis/common/responseHandler";
import useForm from "./useForm";

const useSignup = () => {
  const {
    data: { form, valid },
    changeForm,
    setValid,
  } = useForm({
    email: "",
    nick: "",
    password: "",
    passwordConfirm: "",
  });
  const router = useRouter();

  const validate = (values: Record<string, string>) => {
    if (values.password !== values.passwordConfirm) {
      setValid("비밀번호가 일치하지 않습니다");
      return false;
    } else {
      return true;
    }
  };

  return {
    data: { form, valid },
    changeForm,
    signup: async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validate(form)) {
        return;
      }
      const rs = await postSignup(form);

      if (rs) {
        const handler = {
          success: () => router.push("/signin"),
          status403: () => {
            setValid(rs.message);
          },
          status409: () => {
            setValid(rs.message);
          },
        };
        responseHandler(rs, handler);
      }
    },
  };
};

export default useSignup;
