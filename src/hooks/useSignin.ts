"use client";

import { useRouter } from "next/navigation";
import { Signin } from "../types/APIRequest";
import { APIResponse } from "../types/APIResponse";
import { useAuth } from "./useAuth";
import useForm from "./useForm";

const useSignin = () => {
  const {
    data: { form, valid },
    setValid,
    reset,
    changeForm,
  } = useForm<Signin>({ email: "", password: "" });
  const { signin } = useAuth();
  const router = useRouter();

  return {
    data: { form, valid },
    changeForm,
    signin: async (e: React.FormEvent) => {
      e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

      // signin 함수 호출 및 결과에 따른 처리 로직
      await signin(form, {
        success: () => {
          // 로그인 성공 시 리다이렉션
          window.location.href = "/";
        },
        status403: (rs: APIResponse) => {
          // 403 에러 처리
          setValid(rs.message);
        },
        status409: (rs: APIResponse) => {
          // 409 에러 처리
          alert(`${rs.message} 이메일 또는 비밀번호를 확인해주세요`);
          reset(); // 폼 초기화
          setValid(""); // 유효성 검증 메시지 초기화
        },
      });
    },
  };
};

export default useSignin;
