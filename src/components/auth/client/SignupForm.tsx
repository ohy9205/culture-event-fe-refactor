"use client";

import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSignup from "../../../hooks/useSignup";

const SignupForm = () => {
  const { data, change, signup } = useSignup();
  const {
    state: { isLoggedIn },
  } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="max-w-[1200px] min-w-[800px] py-[30px]">
      <form className="flex flex-col">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          placeholder="email@culture.com"
          className="w-full py-[12px] px-[20px] my-[8px]"
          required
          value={data.form.email}
          onChange={(e) => change(e)}
        />
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          name="nickname"
          placeholder="nickname"
          className="w-full py-[12px] px-[20px] my-[8px]"
          required
          value={data.form.nick}
          onChange={(e) => change(e)}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full py-[12px] px-[20px] my-[8px]"
          required
          value={data.form.password}
          onChange={(e) => change(e)}
        />
        <label htmlFor="passwrodConfim">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="password Confirm"
          className="w-full py-[12px] px-[20px] my-[8px]"
          required
          value={data.form.passwordConfirm}
          onChange={(e) => {
            change(e);
            if (data.form.password !== e.target.value) {
              console.log("비밀번호가 일치하지 않습니다");
            }
          }}
        />
      </form>
      {data.valid && (
        <p className="text-center text-sm text-red-800 mb-4">{data.valid}</p>
      )}
      <button
        className="w-full font-semibold text-xl border rounded-md py-[12px]"
        onClick={signup}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignupForm;
