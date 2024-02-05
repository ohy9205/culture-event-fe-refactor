"use client";

import { useAuth } from "@/src/hooks/useAuth";
import useForm from "@/src/hooks/useForm";
import { Signin } from "@/src/types/APIRequest";
import { APIResponse } from "@/src/types/APIResponse";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SigninForm = () => {
  const {
    data: { form, valid },
    reset,
    changeForm,
    setValid,
  } = useForm<Signin>({ email: "", password: "" });
  const { signin } = useAuth();
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    signin(form, {
      success: () => {
        router.push("/");
      },
      status403: (rs: APIResponse) => {
        setValid(rs.message);
      },
      status409: (rs: APIResponse) => {
        alert(`${rs.message} 이메일 또는 비밀번호를 확인해주세요`);
        reset();
        setValid("");
      },
    });
  };

  return (
    <form className="flex flex-col gap-4 p-7" onSubmit={onSubmit}>
      <label htmlFor="email">이메일</label>
      <input
        type="email"
        name="email"
        placeholder="email@culture.com"
        className="w-full py-[12px] px-[20px] bg-slate-200"
        value={form.email}
        onChange={(e) => changeForm(e.target.name, e.target.value)}
        required
      />
      {valid && <p className="text-sm text-red-800 mb-5">{valid}</p>}
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        className="w-full py-[12px] px-[20px] my-[8px]"
        value={form.password}
        onChange={(e) => changeForm(e.target.name, e.target.value)}
        required
      />
      <button className="font-semibold text-xl border rounded-md py-[12px]">
        로그인
      </button>
    </form>
  );
};

export default SigninForm;
