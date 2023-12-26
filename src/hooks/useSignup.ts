import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { postSignup } from "../apis/auth/auth";
import { responseHandler } from "../apis/common/commonAPIFetch";

const useSignup = () => {
  const [form, setForm] = useState({
    email: "",
    nick: "",
    password: "",
    passwordConfirm: "",
  });
  const [valid, setValid] = useState("");
  const router = useRouter();

  const controller = {};

  return {
    get: () => ({ form, valid }),
    change: (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    signup: async () => {
      const { email, nick, password } = form;
      const rs = await postSignup({ email, nick, password });

      if (rs) {
        const handler = {
          success: () => router.push("/signin"),
          status403: () => setValid(""),
          status409: () => setValid(""),
        };
        responseHandler(rs, handler);
      }
    },
  };
};

export default useSignup;
