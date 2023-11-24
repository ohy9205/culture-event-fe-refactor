"use client";

import { ChangeEvent } from "react";
import useSignin from "../../hooks/useSignin";

// TODO email, nick, password

const SigninForm = () => {
  const { email, password, setEmail, setPassword, signin } = useSignin();

  return (
    <div className="max-w-[1200px] min-w-[800px] py-[30px]">
      <form className="flex flex-col">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          placeholder="email@culture.com"
          className="w-full py-[12px] px-[20px] my-[8px]"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full py-[12px] px-[20px] my-[8px]"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
        <button
          type="button"
          className="font-semibold text-xl border rounded-md py-[12px]"
          onClick={signin}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
