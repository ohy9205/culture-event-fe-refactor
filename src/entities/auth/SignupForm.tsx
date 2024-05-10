"use client";

import useSignup from "@/src/hooks/useSignup";

const SignupForm = () => {
  const {
    data: { form, valid },
    changeForm,
    validForm,
    validPasswordConfirm,
    signup,
  } = useSignup();

  return (
    <form className="flex flex-col p-7" onSubmit={signup}>
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
          validPasswordConfirm(e);
        }}
      />
      {valid && (
        <p className="text-center text-sm text-red-800 mb-4">{valid}</p>
      )}
      <button
        className={`w-full font-semibold text-xl border rounded-md py-[12px] ${
          validForm(form) ? "bg-slate-900 text-white" : "bg-white"
        }`}
        disabled={!validForm(form)}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
