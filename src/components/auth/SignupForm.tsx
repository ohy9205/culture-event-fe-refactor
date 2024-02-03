"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSignup from "../../hooks/useSignup";

const SignupForm = () => {
  const { data, changeForm, signup } = useSignup();
  const {
    state: { isLoggedIn },
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <form className="flex flex-col p-7" onSubmit={signup}>
      <label htmlFor="email">이메일</label>
      <input
        type="email"
        name="email"
        placeholder="email@culture.com"
        className="w-full py-[12px] px-[20px] my-[8px]"
        required
        value={data.form.email}
        onChange={(e) => changeForm(e.target.name, e.target.value)}
      />
      <label htmlFor="nickname">닉네임</label>
      <input
        type="text"
        name="nick"
        placeholder="nick"
        className="w-full py-[12px] px-[20px] my-[8px]"
        required
        value={data.form.nick}
        onChange={(e) => changeForm(e.target.name, e.target.value)}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        className="w-full py-[12px] px-[20px] my-[8px]"
        required
        value={data.form.password}
        onChange={(e) => changeForm(e.target.name, e.target.value)}
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
          changeForm(e.target.name, e.target.value);
          if (data.form.password !== e.target.value) {
            console.log("비밀번호가 일치하지 않습니다");
          }
        }}
      />
      {data.valid && (
        <p className="text-center text-sm text-red-800 mb-4">{data.valid}</p>
      )}
      <button className="w-full font-semibold text-xl border rounded-md py-[12px]">
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
