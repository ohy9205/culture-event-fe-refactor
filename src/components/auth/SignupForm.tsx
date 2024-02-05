"use client";

import { useAuth } from "@/src/hooks/useAuth";
import useForm from "@/src/hooks/useForm";
import { Signup } from "@/src/types/APIRequest";
import { APIResponse } from "@/src/types/APIResponse";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SignupForm = () => {
  const {
    data: { form, valid },
    changeForm,
    setValid,
  } = useForm<Signup>({
    email: "",
    nick: "",
    password: "",
    passwordConfirm: "",
  });
  const { signup } = useAuth();
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm(form)) {
      return;
    }

    signup(form, {
      success: () => router.push("/signin"),
      status403: (rs: APIResponse) => {
        setValid(rs.message);
      },
      status409: (rs: APIResponse) => {
        setValid(rs.message);
      },
    });
  };

  return (
    <form className="flex flex-col p-7" onSubmit={onSubmit}>
      <label htmlFor="email">이메일</label>
      <input
        type="email"
        name="email"
        placeholder="email@culture.com"
        className="w-full py-[12px] px-[20px] my-[8px]"
        required
        value={form.email}
        onChange={(e) => changeForm(e.target.name, e.target.value)}
      />
      <label htmlFor="nickname">닉네임</label>
      <input
        type="text"
        name="nick"
        placeholder="nick"
        className="w-full py-[12px] px-[20px] my-[8px]"
        required
        value={form.nick}
        onChange={(e) => changeForm(e.target.name, e.target.value)}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        className="w-full py-[12px] px-[20px] my-[8px]"
        required
        value={form.password}
        onChange={(e) => changeForm(e.target.name, e.target.value)}
      />
      <label htmlFor="passwrodConfim">비밀번호 확인</label>
      <input
        type="password"
        name="passwordConfirm"
        placeholder="password Confirm"
        className="w-full py-[12px] px-[20px] my-[8px]"
        required
        value={form.passwordConfirm}
        onChange={(e) => {
          changeForm(e.target.name, e.target.value);
          if (!validatePasswordCheck(form.password, e.target.value)) {
            setValid("비밀번호가 일치하지 않습니다");
          } else {
            setValid("");
          }
        }}
      />
      {valid && (
        <p className="text-center text-sm text-red-800 mb-4">{valid}</p>
      )}
      <button
        className={`w-full font-semibold text-xl border rounded-md py-[12px] ${
          validateForm(form) ? "bg-slate-900 text-white" : "bg-white"
        }`}
        disabled={!validateForm(form)}
      >
        회원가입
      </button>
    </form>
  );
};

const validateForm = (form: Signup) => {
  const isValidPassword = validatePasswordCheck(
    form.password,
    form.passwordConfirm
  );
  const isValidFormContent = Object.values(form).every((value) => value !== "");
  if (isValidPassword && isValidFormContent) {
    return true;
  } else {
    return false;
  }
};

const validatePasswordCheck = (password: string, confirm: string) => {
  if (password !== confirm) {
    return false;
  } else {
    return true;
  }
};

export default SignupForm;
