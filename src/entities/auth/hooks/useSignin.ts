"use client";

import { useAuth } from "@/src/entities/auth";
import { useForm } from "@/src/shared/hooks";
import { APIResponse } from "@/src/shared/types";
import { Signin } from "../types";

const useSignin = () => {
  const {
    data: { form, valid },
    setValid,
    reset,
    changeForm,
  } = useForm<Signin>({ email: "", password: "" });
  const { signin } = useAuth();

  return {
    data: { form, valid },
    changeForm,
    signin: async (e: React.FormEvent) => {
      e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
      reset();

      // signin 함수 호출 및 결과에 따른 처리 로직
      await signin(form, {
        success: () => {
          // 로그인 성공 시 리다이렉션
          alert("로그인에 성공했습니다.");
          window.location.href = "/";
        },
        status403: (rs: APIResponse<{}>) => {
          // 403 에러 처리
          setValid(rs.message);
        },
        status409: (rs: APIResponse<{}>) => {
          // 409 에러 처리
          alert(`${rs.message} 이메일 또는 비밀번호를 확인해주세요`);
          setValid(""); // 유효성 검증 메시지 초기화
        },
      });
    },
  };
};

export default useSignin;
