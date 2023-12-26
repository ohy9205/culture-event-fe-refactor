"use client";

import useSignin from "../../../hooks/useSignin";

const SigninForm = () => {
  const { get, change, signin } = useSignin();

  return (
    <div className="max-w-[1200px] min-w-[800px] py-[30px]">
      <form className="flex flex-col gap-4">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          placeholder="email@culture.com"
          className="w-full py-[12px] px-[20px] bg-slate-200"
          value={get().form.email}
          onChange={(e) => change(e)}
          required
        />
        {get().valid && (
          <p className="text-sm text-red-800 mb-5">{get().valid}</p>
        )}
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-full py-[12px] px-[20px] my-[8px]"
          value={get().form.password}
          onChange={(e) => change(e)}
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
