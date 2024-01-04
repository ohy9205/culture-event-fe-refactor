import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { postSignin } from "../apis/auth/auth";
import { responseHandler } from "../apis/common/responseHandler";
import { useAuthContext } from "../context/AuthContext";

const useSignin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [valid, setValid] = useState("");
  const { setAuth } = useAuthContext();
  const router = useRouter();

  return {
    get: () => ({ form, valid }),
    change: (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    signin: async () => {
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
            setForm({ email: "", password: "" });
            setValid("");
          },
        };
        responseHandler(rs, handler);
      }
    },
  };
};

export default useSignin;
