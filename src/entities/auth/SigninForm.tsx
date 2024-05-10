"use client";

import useSignin from "@/src/hooks/useSignin";

const SigninForm = () => {
  const {
    data: { form, valid },
    signin,
    changeForm,
  } = useSignin();

  return (
    <form className="flex flex-col gap-4 p-7" onSubmit={signin}>
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
