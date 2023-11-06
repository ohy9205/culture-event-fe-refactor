"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { postSignup } from "../utils/auth";

// TODO email, nick, password

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("at");
    if (token) {
      router.push("/");
    }
  }, []);

  const signup = async () => {
    const requestBody = {
      email,
      nick,
      password,
    };

    const result = await postSignup(requestBody);
    console.log("result", result);

    if (result.code !== 200) {
      alert(result.message);
      router.push("/");
    } else {
      router.push("/signin");
    }
    // 성공이면 로그인 페이지로 이동
    // 실패면 그냥 메인페이지
  };

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
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          name="nickname"
          placeholder="nickname"
          className="w-full py-[12px] px-[20px] my-[8px]"
          required
          value={nick}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNick(e.target.value)
          }
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full py-[12px] px-[20px] my-[8px]"
          required
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <label htmlFor="passwrodConfim">비밀번호 확인</label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="password Confirm"
          className="w-full py-[12px] px-[20px] my-[8px]"
          required
          value={passwordConfirm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPasswordConfirm(e.target.value);
            if (password !== e.target.value) {
              console.log("비밀번호가 일치하지 않습니다");
            }
          }}
        />
      </form>
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
